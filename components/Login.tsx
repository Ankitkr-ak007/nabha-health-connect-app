
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (!success) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-primary-dark mb-1">Welcome Back!</h2>
            <p className="text-center text-text-light mb-6">Sign in to continue.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                >
                    Login
                </button>
            </form>
            <p className="text-center text-sm text-text-light mt-6">
                Don't have an account?{' '}
                <button onClick={onSwitchToRegister} className="font-semibold text-primary hover:underline">
                    Register here
                </button>
            </p>
        </div>
    );
};

export default Login;
