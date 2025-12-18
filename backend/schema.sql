-- TDT eContract - Hợp Đồng Điện Tử Database Schema
-- PostgreSQL Version
-- Created: December 2025
-- Giải pháp hợp đồng điện tử toàn diện cho doanh nghiệp

-- Database Creation (run separately as postgres superuser)
-- CREATE DATABASE tdt_econtract;
-- \c tdt_econtract;

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'enterprise');
CREATE TYPE plan_type AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE company_role AS ENUM ('owner', 'admin', 'member');
CREATE TYPE contract_type AS ENUM ('sale', 'service', 'employment', 'partnership', 'nda', 'other');
CREATE TYPE contract_status AS ENUM ('draft', 'pending', 'signed', 'completed', 'cancelled', 'expired');
CREATE TYPE signer_role AS ENUM ('creator', 'approver', 'signer', 'viewer');
CREATE TYPE signer_status AS ENUM ('pending', 'signed', 'rejected', 'expired');
CREATE TYPE signature_method AS ENUM ('draw', 'upload', 'type', 'digital_certificate');
CREATE TYPE action_type AS ENUM ('created', 'updated', 'signed', 'rejected', 'sent', 'viewed', 'downloaded', 'cancelled', 'completed');
CREATE TYPE notification_type AS ENUM ('contract_created', 'contract_signed', 'signature_request', 'contract_completed', 'reminder', 'system');
CREATE TYPE email_type AS ENUM ('invitation', 'reminder', 'completed', 'rejected', 'notification');
CREATE TYPE email_status AS ENUM ('sent', 'failed', 'bounced');
CREATE TYPE billing_cycle AS ENUM ('monthly', 'annual');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    plan_type plan_type DEFAULT 'free',
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company);

-- Companies Table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    industry VARCHAR(100),
    plan_type plan_type DEFAULT 'pro',
    contract_limit INT DEFAULT NULL, -- NULL = unlimited
    storage_limit_gb INT DEFAULT 50,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_companies_tax_code ON companies(tax_code);

-- User-Company Relationship
CREATE TABLE user_companies (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    role_in_company company_role DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    UNIQUE (user_id, company_id)
);

-- Contracts Table
CREATE TABLE contracts (
    contract_id SERIAL PRIMARY KEY,
    contract_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    contract_type contract_type DEFAULT 'other',
    status contract_status DEFAULT 'draft',
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
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL
);

CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_created_by ON contracts(created_by);
CREATE INDEX idx_contracts_company ON contracts(company_id);
CREATE INDEX idx_contracts_number ON contracts(contract_number);

-- Contract Signers Table
CREATE TABLE contract_signers (
    signer_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL,
    user_id INT,
    signer_name VARCHAR(255) NOT NULL,
    signer_email VARCHAR(255) NOT NULL,
    signer_phone VARCHAR(20),
    signer_role signer_role DEFAULT 'signer',
    signing_order INT DEFAULT 1,
    status signer_status DEFAULT 'pending',
    signed_at TIMESTAMP NULL,
    signature_image_url VARCHAR(500),
    signature_method signature_method DEFAULT 'draw',
    ip_address VARCHAR(45),
    device_info TEXT,
    rejection_reason TEXT,
    notification_sent BOOLEAN DEFAULT FALSE,
    reminder_count INT DEFAULT 0,
    last_reminded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_contract_signers_contract ON contract_signers(contract_id);
CREATE INDEX idx_contract_signers_user ON contract_signers(user_id);
CREATE INDEX idx_contract_signers_email ON contract_signers(signer_email);
CREATE INDEX idx_contract_signers_status ON contract_signers(status);

-- Signatures Table (Audit Log)
CREATE TABLE signatures (
    signature_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL,
    signer_id INT NOT NULL,
    signature_data TEXT NOT NULL, -- Base64 encoded signature image
    signature_hash VARCHAR(255), -- Hash for verification
    timestamp TIMESTAMP DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT,
    geolocation VARCHAR(255),
    certificate_id VARCHAR(255), -- For digital certificates
    is_valid BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (signer_id) REFERENCES contract_signers(signer_id) ON DELETE CASCADE
);

CREATE INDEX idx_signatures_contract ON signatures(contract_id);
CREATE INDEX idx_signatures_timestamp ON signatures(timestamp);

-- Contract History/Audit Trail
CREATE TABLE contract_history (
    history_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL,
    user_id INT,
    action action_type NOT NULL,
    description TEXT,
    metadata JSONB, -- Additional data
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_contract_history_contract ON contract_history(contract_id);
CREATE INDEX idx_contract_history_action ON contract_history(action);
CREATE INDEX idx_contract_history_created_at ON contract_history(created_at);

-- Templates Table
CREATE TABLE templates (
    template_id SERIAL PRIMARY KEY,
    template_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    file_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    created_by INT,
    company_id INT,
    is_public BOOLEAN DEFAULT FALSE,
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL
);

CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_public ON templates(is_public);

-- Notifications Table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Email Logs Table
CREATE TABLE email_logs (
    log_id SERIAL PRIMARY KEY,
    contract_id INT,
    recipient_email VARCHAR(255) NOT NULL,
    email_type email_type NOT NULL,
    subject VARCHAR(255),
    status email_status DEFAULT 'sent',
    error_message TEXT,
    sent_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id) ON DELETE SET NULL
);

CREATE INDEX idx_email_logs_contract ON email_logs(contract_id);
CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);

-- Subscriptions/Billing Table
CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id INT,
    company_id INT,
    plan_type plan_type NOT NULL,
    billing_cycle billing_cycle DEFAULT 'monthly',
    price DECIMAL(10, 2),
    start_date DATE NOT NULL,
    end_date DATE,
    status subscription_status DEFAULT 'trial',
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_company ON subscriptions(company_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Payment History
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    subscription_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    status payment_status DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id) ON DELETE CASCADE
);

CREATE INDEX idx_payments_subscription ON payments(subscription_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);

-- API Keys Table (for integrations)
CREATE TABLE api_keys (
    api_key_id SERIAL PRIMARY KEY,
    user_id INT,
    company_id INT,
    key_name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    api_secret VARCHAR(255),
    permissions JSONB, -- Array of allowed endpoints
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE INDEX idx_api_keys_api_key ON api_keys(api_key);
CREATE INDEX idx_api_keys_active ON api_keys(is_active);

-- System Settings
CREATE TABLE system_settings (
    setting_id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('free_plan_contract_limit', '20', 'Monthly contract limit for free plan'),
('free_plan_storage_gb', '1', 'Storage limit in GB for free plan'),
('pro_plan_storage_gb', '50', 'Storage limit in GB for pro plan'),
('reminder_interval_days', '3', 'Days between signature reminders'),
('max_reminder_count', '5', 'Maximum number of reminders to send'),
('contract_expiry_days', '30', 'Default contract expiry in days'),
('session_timeout_minutes', '60', 'User session timeout in minutes');

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create Views for common queries
CREATE OR REPLACE VIEW active_contracts AS
SELECT 
    c.*,
    u.full_name AS creator_name,
    u.email AS creator_email,
    COALESCE(s.total_signers, 0) AS signer_total,
    COALESCE(s.signed_count, 0) AS signer_signed_total
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
    u.full_name,
    u.email,
    COUNT(DISTINCT c.contract_id) AS total_contracts,
    SUM(CASE WHEN c.status = 'completed' THEN 1 ELSE 0 END) AS completed_contracts,
    SUM(CASE WHEN c.status = 'pending' THEN 1 ELSE 0 END) AS pending_contracts
FROM users u
LEFT JOIN contracts c ON u.user_id = c.created_by
GROUP BY u.user_id, u.full_name, u.email;

