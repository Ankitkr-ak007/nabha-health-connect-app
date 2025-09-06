
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
    onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        const success = register(name, email, password);
        if (!success) {
            setError('An account with this email already exists.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-primary-dark mb-1">Create an Account</h2>
            <p className="text-center text-text-light mb-6">Get started with Nabha Health Connect.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300">
                    Register
                </button>
            </form>
            <p className="text-center text-sm text-text-light mt-6">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-semibold text-primary hover:underline">
                    Login here
                </button>
            </p>
        </div>
    );
};

export default Register;
