import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../supabase/AuthContext';

const RegisterPage: React.FC = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert('Register success. Now you can login');
      navigate('/login');
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error('Error al registrar:', error);
        } else {
          // Maneja el caso donde el error no es una instancia de Error
          setError('Ocurrió un error desconocido.');
        }
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-primary mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-black focus:border-secondary"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
        />
        <button type="submit" className="bg-primary text-accent px-4 py-2 rounded-md w-full focus: background-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
