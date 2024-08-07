import React, { useState } from 'react';
import { useAuth } from '../../supabase/AuthContext';

const RegisterPage: React.FC = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert('Registro exitoso. Por favor, verifica tu correo electrónico.');
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          // Maneja el caso donde el error no es una instancia de Error
          setError('Ocurrió un error desconocido.');
        }
      }
  };

  return (
    <div>
      <h1>Registro</h1>
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
