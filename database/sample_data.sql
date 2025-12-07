-- Sample Data for Testing TDT eContract & eSign
USE tdt_econtract;

-- Insert sample users
INSERT INTO users (full_name, email, phone, company, password_hash, role, plan_type, email_verified) VALUES
('Nguyễn Văn Admin', 'admin@tdt.edu.vn', '0901234567', 'TDT University', '$2b$10$hash1', 'admin', 'enterprise', TRUE),
('Trần Thị Mai', 'mai.tran@company.vn', '0912345678', 'ABC Corporation', '$2b$10$hash2', 'user', 'pro', TRUE),
('Lê Văn Bình', 'binh.le@startup.vn', '0923456789', 'Tech Startup', '$2b$10$hash3', 'user', 'pro', TRUE),
('Phạm Thị Lan', 'lan.pham@gmail.com', '0934567890', NULL, '$2b$10$hash4', 'user', 'free', TRUE),
('Hoàng Văn Nam', 'nam.hoang@enterprise.vn', '0945678901', 'Enterprise Corp', '$2b$10$hash5', 'enterprise', 'enterprise', TRUE);

-- Insert sample companies
INSERT INTO companies (company_name, tax_code, address, phone, email, plan_type, contract_limit, storage_limit_gb) VALUES
('TDT University', '0123456789', '19 Nguyen Huu Tho, Tan Phong, District 7, HCMC', '028-12345678', 'info@tdt.edu.vn', 'enterprise', NULL, 100),
('ABC Corporation', '9876543210', '123 Le Loi, District 1, HCMC', '028-87654321', 'contact@abc.vn', 'pro', NULL, 50),
('Tech Startup', '1122334455', '456 Nguyen Trai, District 5, HCMC', '028-11223344', 'info@techstartup.vn', 'pro', NULL, 50);

-- Link users to companies
INSERT INTO user_companies (user_id, company_id, role_in_company) VALUES
(1, 1, 'owner'),
(2, 2, 'admin'),
(3, 3, 'owner'),
(5, 2, 'member');

-- Insert sample contracts
INSERT INTO contracts (contract_number, title, description, contract_type, status, created_by, company_id, file_url, total_signers, signed_count, start_date, end_date) VALUES
('CT-2024-001', 'Hợp đồng thuê văn phòng 2024', 'Hợp đồng thuê văn phòng tầng 5, tòa nhà ABC', 'service', 'completed', 1, 1, '/files/contract-001.pdf', 2, 2, '2024-01-01', '2024-12-31'),
('CT-2024-002', 'Hợp đồng cung cấp dịch vụ IT', 'Hợp đồng cung cấp dịch vụ IT và bảo trì hệ thống', 'service', 'signed', 2, 2, '/files/contract-002.pdf', 3, 2, '2024-03-01', '2025-02-28'),
('CT-2024-003', 'Hợp đồng mua bán phần mềm', 'Hợp đồng mua bán license phần mềm quản lý', 'sale', 'pending', 3, 3, '/files/contract-003.pdf', 2, 0, '2024-06-01', '2024-12-31'),
('CT-2024-004', 'Thỏa thuận bảo mật NDA', 'Non-disclosure agreement cho dự án mới', 'nda', 'draft', 2, 2, '/files/contract-004.pdf', 4, 0, NULL, NULL),
('CT-2024-005', 'Hợp đồng lao động nhân viên', 'Hợp đồng lao động full-time', 'employment', 'completed', 1, 1, '/files/contract-005.pdf', 2, 2, '2024-02-01', '2025-01-31');

-- Insert contract signers
INSERT INTO contract_signers (contract_id, user_id, signer_name, signer_email, signer_role, signing_order, status, signed_at) VALUES
-- Contract 1 signers (completed)
(1, 1, 'Nguyễn Văn Admin', 'admin@tdt.edu.vn', 'creator', 1, 'signed', '2024-01-05 10:30:00'),
(1, 2, 'Trần Thị Mai', 'mai.tran@company.vn', 'signer', 2, 'signed', '2024-01-06 14:20:00'),

-- Contract 2 signers (partially signed)
(2, 2, 'Trần Thị Mai', 'mai.tran@company.vn', 'creator', 1, 'signed', '2024-03-10 09:15:00'),
(2, 3, 'Lê Văn Bình', 'binh.le@startup.vn', 'approver', 2, 'signed', '2024-03-12 11:45:00'),
(2, NULL, 'Nguyễn Văn Khách', 'khach@client.vn', 'signer', 3, 'pending', NULL),

-- Contract 3 signers (pending)
(3, 3, 'Lê Văn Bình', 'binh.le@startup.vn', 'creator', 1, 'pending', NULL),
(3, NULL, 'Võ Thị Dung', 'dung.vo@partner.vn', 'signer', 2, 'pending', NULL),

-- Contract 4 signers (draft)
(4, 2, 'Trần Thị Mai', 'mai.tran@company.vn', 'creator', 1, 'pending', NULL),
(4, NULL, 'Partner A', 'partnera@external.com', 'signer', 2, 'pending', NULL),
(4, NULL, 'Partner B', 'partnerb@external.com', 'signer', 3, 'pending', NULL),
(4, NULL, 'Partner C', 'partnerc@external.com', 'viewer', 4, 'pending', NULL),

-- Contract 5 signers (completed)
(5, 1, 'Nguyễn Văn Admin', 'admin@tdt.edu.vn', 'creator', 1, 'signed', '2024-02-01 08:00:00'),
(5, 4, 'Phạm Thị Lan', 'lan.pham@gmail.com', 'signer', 2, 'signed', '2024-02-01 16:30:00');

-- Insert signature audit logs
INSERT INTO signatures (contract_id, signer_id, signature_data, signature_hash, ip_address, user_agent) VALUES
(1, 1, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', 'sha256_hash_1', '192.168.1.100', 'Mozilla/5.0...'),
(1, 2, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', 'sha256_hash_2', '192.168.1.101', 'Mozilla/5.0...'),
(2, 3, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', 'sha256_hash_3', '192.168.1.102', 'Mozilla/5.0...'),
(2, 4, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', 'sha256_hash_4', '192.168.1.103', 'Mozilla/5.0...'),
(5, 9, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', 'sha256_hash_5', '192.168.1.104', 'Mozilla/5.0...'),
(5, 10, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', 'sha256_hash_6', '192.168.1.105', 'Mozilla/5.0...');

-- Insert contract history
INSERT INTO contract_history (contract_id, user_id, action, description, ip_address) VALUES
(1, 1, 'created', 'Contract created', '192.168.1.100'),
(1, 1, 'sent', 'Contract sent to signers', '192.168.1.100'),
(1, 1, 'signed', 'Contract signed by creator', '192.168.1.100'),
(1, 2, 'signed', 'Contract signed by Trần Thị Mai', '192.168.1.101'),
(1, 1, 'completed', 'All parties signed, contract completed', '192.168.1.100'),
(2, 2, 'created', 'Contract created', '192.168.1.102'),
(2, 2, 'sent', 'Contract sent to signers', '192.168.1.102'),
(2, 2, 'signed', 'Contract signed by creator', '192.168.1.102'),
(2, 3, 'signed', 'Contract signed by Lê Văn Bình', '192.168.1.103'),
(3, 3, 'created', 'Contract created', '192.168.1.104'),
(3, 3, 'sent', 'Contract sent to signers', '192.168.1.104');

-- Insert templates
INSERT INTO templates (template_name, description, category, file_url, created_by, is_public, usage_count) VALUES
('Hợp đồng thuê văn phòng', 'Mẫu hợp đồng thuê văn phòng chuẩn', 'Real Estate', '/templates/office-lease.pdf', 1, TRUE, 15),
('Hợp đồng lao động', 'Mẫu hợp đồng lao động theo luật lao động VN', 'Employment', '/templates/employment.pdf', 1, TRUE, 32),
('Thỏa thuận NDA', 'Thỏa thuận bảo mật thông tin', 'Legal', '/templates/nda.pdf', 2, TRUE, 8),
('Hợp đồng cung cấp dịch vụ', 'Mẫu hợp đồng cung cấp dịch vụ IT', 'Services', '/templates/service.pdf', 2, FALSE, 5),
('Hợp đồng mua bán', 'Mẫu hợp đồng mua bán hàng hóa', 'Sales', '/templates/sales.pdf', 1, TRUE, 20);

-- Insert notifications
INSERT INTO notifications (user_id, type, title, message, link, is_read) VALUES
(2, 'signature_request', 'Yêu cầu ký hợp đồng mới', 'Bạn có một hợp đồng mới cần ký: Hợp đồng thuê văn phòng 2024', '/contracts/1', TRUE),
(3, 'signature_request', 'Yêu cầu ký hợp đồng', 'Hợp đồng cung cấp dịch vụ IT đang chờ chữ ký của bạn', '/contracts/2', FALSE),
(2, 'contract_completed', 'Hợp đồng hoàn tất', 'Hợp đồng thuê văn phòng 2024 đã được ký đầy đủ', '/contracts/1', TRUE),
(4, 'signature_request', 'Yêu cầu ký hợp đồng lao động', 'Hợp đồng lao động nhân viên cần chữ ký của bạn', '/contracts/5', TRUE),
(1, 'system', 'Chào mừng đến với TDT eSign', 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi', '/', TRUE);

-- Insert subscriptions
INSERT INTO subscriptions (user_id, company_id, plan_type, billing_cycle, price, start_date, end_date, status) VALUES
(1, 1, 'enterprise', 'annual', 0.00, '2024-01-01', '2024-12-31', 'active'),
(2, 2, 'pro', 'monthly', 249000.00, '2024-01-01', '2024-12-31', 'active'),
(3, 3, 'pro', 'annual', 199000.00, '2024-03-01', '2025-02-28', 'active'),
(4, NULL, 'free', 'monthly', 0.00, '2024-06-01', NULL, 'active');

-- Insert payment history
INSERT INTO payments (subscription_id, amount, currency, payment_method, transaction_id, status, payment_date) VALUES
(2, 249000.00, 'VND', 'Credit Card', 'TXN-2024-001', 'completed', '2024-01-01 10:00:00'),
(2, 249000.00, 'VND', 'Credit Card', 'TXN-2024-002', 'completed', '2024-02-01 10:00:00'),
(2, 249000.00, 'VND', 'Credit Card', 'TXN-2024-003', 'completed', '2024-03-01 10:00:00'),
(3, 2388000.00, 'VND', 'Bank Transfer', 'TXN-2024-004', 'completed', '2024-03-01 14:30:00');

-- Insert API keys
INSERT INTO api_keys (user_id, company_id, key_name, api_key, api_secret, permissions, is_active) VALUES
(1, 1, 'Production API Key', 'pk_live_abc123xyz789', 'sk_live_secret456', '["contracts:read", "contracts:create", "signatures:read"]', TRUE),
(2, 2, 'Development API Key', 'pk_test_dev111222', 'sk_test_secret333', '["contracts:read"]', TRUE),
(3, 3, 'Integration Key', 'pk_live_int999888', 'sk_live_int777', '["contracts:read", "contracts:create", "contracts:update", "signatures:create"]', TRUE);

-- Insert email logs
INSERT INTO email_logs (contract_id, recipient_email, email_type, subject, status, sent_at) VALUES
(1, 'mai.tran@company.vn', 'invitation', 'Yêu cầu ký hợp đồng: Hợp đồng thuê văn phòng 2024', 'sent', '2024-01-05 10:35:00'),
(2, 'binh.le@startup.vn', 'invitation', 'Yêu cầu phê duyệt hợp đồng: Hợp đồng cung cấp dịch vụ IT', 'sent', '2024-03-10 09:20:00'),
(2, 'khach@client.vn', 'reminder', 'Nhắc nhở: Hợp đồng đang chờ chữ ký của bạn', 'sent', '2024-03-15 10:00:00'),
(3, 'dung.vo@partner.vn', 'invitation', 'Yêu cầu ký hợp đồng: Hợp đồng mua bán phần mềm', 'sent', '2024-06-01 14:00:00'),
(1, 'admin@tdt.edu.vn', 'completed', 'Hợp đồng đã hoàn tất: Hợp đồng thuê văn phòng 2024', 'sent', '2024-01-06 14:25:00');
