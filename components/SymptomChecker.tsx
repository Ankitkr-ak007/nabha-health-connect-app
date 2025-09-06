import React, { useState } from 'react';
import { analyzeSymptoms } from '../services/geminiService';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please describe your symptoms.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');
    try {
      const analysis = await analyzeSymptoms(symptoms);
      setResult(analysis);
    } catch (err) {
      setError('Failed to get analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatResult = (text: string) => {
    return text
      .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-primary-dark mt-4 mb-2">$1</h3>')
      .replace(/\*\*IMPORTANT\*\*:/g, '<strong class="text-red-600">IMPORTANT:</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-primary-dark">AI-Powered Symptom Checker</h2>
        <p className="text-text-light mt-2 mb-6">Describe your symptoms to get a preliminary analysis. This is not a medical diagnosis.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition bg-white text-text placeholder-gray-500"
            placeholder="For example: 'I have a headache, fever, and a sore throat...'"
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-pink-500 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLoading ? 'Analyzing...' : 'Analyze My Symptoms'}
          </button>
        </form>

        {isLoading && (
            <div className="mt-8 flex justify-center items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
                <span className="ml-2 text-text-light">Our AI is thinking...</span>
            </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-background rounded-lg border border-gray-200 text-left">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">Analysis Result</h3>
             <div className="prose max-w-none text-text" dangerouslySetInnerHTML={{ __html: formatResult(result) }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
