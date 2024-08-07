import React, { useState } from 'react';
import { useAuth } from '../../supabase/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/'); // Redirigir al layout principal, que redirige a /home
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {  
        setError('Ocurrió un error desconocido.');
      } 
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={() => navigate('/register')}>Registrarse</button>
    </div>
  );
};

export default LoginPage;
