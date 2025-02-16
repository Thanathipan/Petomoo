import { useState } from 'react';
import { useRouter } from 'next/router';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrorMessage('');
    setSuccessMessage('');

    const data = { email, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        setSuccessMessage(result.message);
        const { user } = result;

        console.log("User role received:", user.role); // Debugging log

        // // Store user data in localStorage
        // localStorage.setItem('user', JSON.stringify(user));

        // ✅ Redirect based on user role
        switch (user.role) {
          case 'user':
            router.push('/landingpage');
            break;
          case 'clinicadmin':
            router.push('/dashboard/clinicadmin');
            break;
          case 'superadmin':
            router.push('/dashboard/superadmin');
            break;
          default:
            console.error("Invalid user role:", user.role);
            setErrorMessage("Invalid user role. Please contact support.");
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (error: any) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };
  

  return (
    <section>
      <div className="login-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit">Log In</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
