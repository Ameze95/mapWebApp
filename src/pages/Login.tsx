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
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to LocalAid</h1>
      <form onSubmit={handleSubmit} className=" bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-secondary"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-secondary"
        />
        <button 
        type="submit" 
        className=" text-accent px-4 py-2 rounded-md w-full">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
