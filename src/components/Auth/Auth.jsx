import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const initialLogin = {
  email: '',
  password: '',
}

const initialRegister = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState(initialLogin);
  const [registerData, setRegisterData] = useState(initialRegister);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    if (!loginData.email || !loginData.password) {
      setMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token to localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        setMessage('Đăng nhập thành công! Đang chuyển hướng...');
        setLoginData(initialLogin);
        
        // Redirect to home after successful login
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMessage(data.message || 'Email hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    if (!registerData.fullName || !registerData.email || !registerData.phone || !registerData.password) {
      setMessage('Vui lòng điền đầy đủ thông tin bắt buộc.');
      setIsLoading(false);
      return;
    }
    
    if (registerData.password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      setIsLoading(false);
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: registerData.fullName,
          company: registerData.company,
          email: registerData.email,
          phone: registerData.phone,
          password: registerData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất.');
        setRegisterData(initialRegister);
        
        // Switch to login tab after successful registration
        setTimeout(() => {
          setActiveTab('login');
          setMessage('Vui lòng đăng nhập với tài khoản vừa tạo.');
        }, 2000);
      } else {
        setMessage(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Register error:', error);
      setMessage('Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">
              {activeTab === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
            </h1>
            <p className="auth-subtitle">
              {activeTab === 'login' 
                ? 'Đăng nhập để tiếp tục sử dụng dịch vụ'
                : 'Điền thông tin để tạo tài khoản'
              }
            </p>
          </div>

          {message && (
            <div className={`auth-message ${message.includes('thành công') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {activeTab === 'login' ? (
            <form className="auth-form login-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email *</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="example@company.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="login-password">Mật khẩu *</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="forgot-password">Quên mật khẩu?</a>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          ) : (
            <form className="auth-form register-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="register-fullName">Họ và tên *</label>
                <input
                  id="register-fullName"
                  name="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-email">Email *</label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="example@company.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-phone">Số điện thoại *</label>
                <input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  placeholder="0901 234 567"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-company">Tên công ty</label>
                <input
                  id="register-company"
                  name="company"
                  type="text"
                  placeholder="Tên công ty (tùy chọn)"
                  value={registerData.company}
                  onChange={handleRegisterChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-password">Mật khẩu *</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-confirmPassword">Xác nhận mật khẩu *</label>
                <input
                  id="register-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>Tôi đồng ý với <a href="#" className="terms-link">Điều khoản</a> và <a href="#" className="terms-link">Chính sách</a></span>
                </label>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>
              {activeTab === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button 
                type="button" 
                className="switch-btn" 
                onClick={() => handleTabChange(activeTab === 'login' ? 'register' : 'login')}
              >
                {activeTab === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

