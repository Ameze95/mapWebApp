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
        // Aquí puedes personalizar los mensajes basados en el error específico
      if (error.message.includes("Invalid login credentials")) {
        setError("Usuario o contraseña incorrecta.");
        console.log("Intento de inicio de sesión fallido: Usuario o contraseña incorrecta.");
      } else if (error.message.includes("User not found")) {
        setError("El usuario no existe.");
        console.log("Intento de inicio de sesión fallido: El usuario no existe.");
      } else {
        setError(error.message);
        console.log("Error de autenticación:", error.message);
      };
      } else {  
        setError('Ocurrió un error desconocido.');
      } 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-fuchsia-300 background-animate " onClick={() => setError(null)}>
      <h1 className="text-4xl text-slate-600 font-light mb-1">Welcome to LocalAid</h1>
      <h2 className="text-2xl text-slate-600 font-bold mb-6">Your contribution starts here!</h2>
      <form onSubmit={handleSubmit} className=" bg-slate-200 bg-opacity-20 border border-black/[.1] p-6 rounded-xl shadow-xl w-96 max-w-md">
        
        

        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 bg-white/[.4] bg-opacity-20 border border-black/[.3] rounded-xl focus:outline-none"
        />
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='password'
          placeholder="Password"
          className="w-full mb-2 px-4 py-2 bg-white/[.4] bg-opacity-20 border border-black/[.3] rounded-xl focus:outline-none focus:border-secondary"
        />
        
        {error && (
          <div className="text-red-500 mb-4 ml-4 text-bold  text-sm  rounded-md w-96">
            <button>{error}</button>
          </div>      
        )}
        
        <button 
          type="submit"
        className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl mb-4   px-4 py-2 rounded-md w-full">
          Sign In
        </button>
        <button type='button' className=" text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-l ml-24 px-4 py-2 rounded-md w-1/2 " onClick={() => navigate('/register')}> 
          Register
          </button>
      </form>
    </div>
  );
};

export default LoginPage;
