-- TDT eContract - Hợp Đồng Điện Tử Database Schema
-- Created: December 2025
-- Giải pháp hợp đồng điện tử toàn diện cho doanh nghiệp

-- Database Creation
CREATE DATABASE IF NOT EXISTS tdt_econtract CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tdt_econtract;

-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'enterprise') DEFAULT 'user',
    plan_type ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_company (company)
) ENGINE=InnoDB;

-- Companies Table
CREATE TABLE companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    industry VARCHAR(100),
    plan_type ENUM('free', 'pro', 'enterprise') DEFAULT 'pro',
    contract_limit INT DEFAULT NULL, -- NULL = unlimited
    storage_limit_gb INT DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tax_code (tax_code)
) ENGINE=InnoDB;

-- User-Company Relationship
CREATE TABLE user_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    role_in_company ENUM('owner', 'admin', 'member') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_company (user_id, company_id)
) ENGINE=InnoDB;

-- Contracts Table
CREATE TABLE contracts (
    contract_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    contract_type ENUM('sale', 'service', 'employment', 'partnership', 'nda', 'other') DEFAULT 'other',
    status ENUM('draft', 'pending', 'signed', 'completed', 'cancelled', 'expired') DEFAULT 'draft',
    created_by INT NOT NULL,
    company_id INT,
    file_url VARCHAR(500),
    file_hash VARCHAR(255), -- SHA-256 hash for verification
    file_size_kb INT,
    total_signers INT DEFAULT 0,
    signed_count INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created_by (created_by),
    INDEX idx_company (company_id),
    INDEX idx_contract_number (contract_number)
) ENGINE=InnoDB;

-- Contract Signers Table
CREATE TABLE contract_signers (
    signer_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    user_id INT,
    signer_name VARCHAR(255) NOT NULL,
    signer_email VARCHAR(255) NOT NULL,
    signer_phone VARCHAR(20),
    signer_role ENUM('creator', 'approver', 'signer', 'viewer') DEFAULT 'signer',
    signing_order INT DEFAULT 1,
    status ENUM('pending', 'signed', 'rejected', 'expired') DEFAULT 'pending',
    signed_at TIMESTAMP NULL,
    signature_image_url VARCHAR(500),
    signature_method ENUM('draw', 'upload', 'type', 'digital_certificate') DEFAULT 'draw',
    ip_address VARCHAR(45),
    device_info TEXT,
    rejection_reason TEXT,
    notification_sent BOOLEAN DEFAULT FALSE,
    reminder_count INT DEFAULT 0,
    last_reminded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_contract (contract_id),
    INDEX idx_user (user_id),
    INDEX idx_email (signer_email),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Signatures Table (Audit Log)
CREATE TABLE signatures (
    signature_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    signer_id INT NOT NULL,
    signature_data TEXT NOT NULL, -- Base64 encoded signature image
    signature_hash VARCHAR(255), -- Hash for verification
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    geolocation VARCHAR(255),
    certificate_id VARCHAR(255), -- For digital certificates
    is_valid BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (signer_id) REFERENCES contract_signers(signer_id) ON DELETE CASCADE,
    INDEX idx_contract (contract_id),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB;

-- Contract History/Audit Trail
CREATE TABLE contract_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    user_id INT,
    action ENUM('created', 'updated', 'signed', 'rejected', 'sent', 'viewed', 'downloaded', 'cancelled', 'completed') NOT NULL,
    description TEXT,
    metadata JSON, -- Additional data
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_contract (contract_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Templates Table
CREATE TABLE templates (
    template_id INT AUTO_INCREMENT PRIMARY KEY,
    template_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    file_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    created_by INT,
    company_id INT,
    is_public BOOLEAN DEFAULT FALSE,
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_public (is_public)
) ENGINE=InnoDB;

-- Notifications Table
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('contract_created', 'contract_signed', 'signature_request', 'contract_completed', 'reminder', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Email Logs Table
CREATE TABLE email_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    recipient_email VARCHAR(255) NOT NULL,
    email_type ENUM('invitation', 'reminder', 'completed', 'rejected', 'notification') NOT NULL,
    subject VARCHAR(255),
    status ENUM('sent', 'failed', 'bounced') DEFAULT 'sent',
    error_message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE SET NULL,
    INDEX idx_contract (contract_id),
    INDEX idx_recipient (recipient_email),
    INDEX idx_sent_at (sent_at)
) ENGINE=InnoDB;

-- Subscriptions/Billing Table
CREATE TABLE subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    company_id INT,
    plan_type ENUM('free', 'pro', 'enterprise') NOT NULL,
    billing_cycle ENUM('monthly', 'annual') DEFAULT 'monthly',
    price DECIMAL(10, 2),
    start_date DATE NOT NULL,
    end_date DATE,
    status ENUM('active', 'cancelled', 'expired', 'trial') DEFAULT 'trial',
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_company (company_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- Payment History
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id) ON DELETE CASCADE,
    INDEX idx_subscription (subscription_id),
    INDEX idx_status (status),
    INDEX idx_payment_date (payment_date)
) ENGINE=InnoDB;

-- API Keys Table (for integrations)
CREATE TABLE api_keys (
    api_key_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    company_id INT,
    key_name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    api_secret VARCHAR(255),
    permissions JSON, -- Array of allowed endpoints
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    INDEX idx_api_key (api_key),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- System Settings
CREATE TABLE system_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('free_plan_contract_limit', '20', 'Monthly contract limit for free plan'),
('free_plan_storage_gb', '1', 'Storage limit in GB for free plan'),
('pro_plan_storage_gb', '50', 'Storage limit in GB for pro plan'),
('reminder_interval_days', '3', 'Days between signature reminders'),
('max_reminder_count', '5', 'Maximum number of reminders to send'),
('contract_expiry_days', '30', 'Default contract expiry in days'),
('session_timeout_minutes', '60', 'User session timeout in minutes');

-- Create Views for common queries
CREATE OR REPLACE VIEW active_contracts AS
SELECT 
    c.*,
    u.full_name AS creator_name,
    u.email AS creator_email,
    s.total_signers AS signer_total,
    s.signed_count AS signer_signed_total
FROM contracts c
LEFT JOIN users u ON c.created_by = u.user_id
LEFT JOIN (
    SELECT 
        contract_id,
        COUNT(*) AS total_signers,
        SUM(CASE WHEN status = 'signed' THEN 1 ELSE 0 END) AS signed_count
    FROM contract_signers
    GROUP BY contract_id
) s ON c.contract_id = s.contract_id
WHERE c.status IN ('pending', 'signed');


CREATE OR REPLACE VIEW user_contract_summary AS
SELECT 
    u.user_id,
    MIN(u.full_name) AS full_name,
    MIN(u.email) AS email,
    COUNT(DISTINCT c.contract_id) AS total_contracts,
    SUM(CASE WHEN c.status = 'completed' THEN 1 ELSE 0 END) AS completed_contracts,
    SUM(CASE WHEN c.status = 'pending' THEN 1 ELSE 0 END) AS pending_contracts
FROM users u
LEFT JOIN contracts c ON u.user_id = c.created_by
GROUP BY u.user_id;

