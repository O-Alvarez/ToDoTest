import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.js'; // tu función de login
import { saveToken } from '../utils/auth.js'; // para guardar el token

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(mail, password);
      saveToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
            placeholder="tuemail@ejemplo.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
