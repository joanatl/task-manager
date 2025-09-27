import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //redireciona o usuário
import { useAuth } from './AuthProvider';
import axios from 'axios';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit")
    try { //tenta logar, se der certo ele redireciona pro dash e se der erro ele devolve o erro pro usuario
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.log("Erro no login:", err);

      if (axios.isAxiosError(err)) {
        const backendError = err.response?.data?.error;

        if (backendError === 'USER_NOT_FOUND') {
          setError('Email não cadastrado.');
        } else if (backendError === 'INVALID_PASSWORD') {
          setError('Senha incorreta.');
        } else {
          setError('Erro ao entrar. Verifique seus dados.');
        }
      } else {
        setError('Erro inesperado. Tente novamente.');
      }
    }
  };

  return ( //usando tailwind pra estilizar e mostrando o erro (se tiver)
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Task Manager</h1>

        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-950 transition"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Não tem uma conta?{' '}
          <a href="/register" className="text-white hover:underline">
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}
