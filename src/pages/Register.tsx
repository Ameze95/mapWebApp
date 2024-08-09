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
      alert('Congratulations register success! Now you can login and start to Contribute');
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
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-sky-200 to-fuchsia-300 ">
      <h1 className="text-4xl text-gray-900 font-bold mb-4">Welcome to LocalAid!</h1>
      <h2 className="text-2xl text-gray-900 font-bold mb-4">Create here your profile</h2>
      <form onSubmit={handleSubmit} className="bg-gradient-to-b from-fuchsia-100 to-white p-6 rounded-md shadow-lg w-full max-w-md">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
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
        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl mb-4 px-4 py-2 rounded-md w-full focus: background-primary">
          Register
        </button>
        <button  className="  text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-l transition-colors duration-1000 justify-center ml-24 px-4 py-2 rounded-md w-1/2 focus: background-primary" onClick={() => navigate('/login')}> 
          Sign In
          </button>
      </form>
    </div>
  );
};

export default RegisterPage;
