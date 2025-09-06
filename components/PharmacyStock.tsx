
import React, { useState } from 'react';
import OrderMedicineModal from './OrderMedicineModal';

const mockPharmacies = [
    { id: 1, name: 'Punjab Medical Store, Nabha', stock: 'Available' },
    { id: 2, name: 'A-One Chemists, Circular Road', stock: 'Low Stock' },
    { id: 3, name: 'Janta Pharmacy, Patiala Gate', stock: 'Available' },
    { id: 4, name: 'Royal Medical Hall', stock: 'Out of Stock' },
];

const PharmacyStock: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<{ id: number; name: string; stock: string; }[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(!searchTerm.trim()) return;

        setHasSearched(true);
        // In a real app, this would be an API call.
        // Here we simulate results.
        const shuffledResults = mockPharmacies
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        
        setResults(shuffledResults);
    };

    const getStockColor = (stock: string) => {
        switch (stock) {
            case 'Available': return 'text-green-600 bg-green-100';
            case 'Low Stock': return 'text-yellow-600 bg-yellow-100';
            case 'Out of Stock': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-xl space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary-dark">Pharmacy Services</h2>
                    <p className="text-text-light mt-2 mb-6">Check medicine availability or place an order with your prescription.</p>
                </div>

                {/* Order with Prescription */}
                <div className="text-center bg-primary/5 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary-dark">Need to order with a prescription?</h3>
                    <p className="text-text-light mt-1 mb-4">Upload your prescription, and we'll send it to local pharmacies for you.</p>
                    <button
                        onClick={() => setIsOrderModalOpen(true)}
                        className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Order with Prescription
                    </button>
                </div>

                {/* Check Stock */}
                <div>
                     <h3 className="text-xl font-bold text-primary-dark text-center">Check Medicine Availability</h3>
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto mt-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition bg-white text-text placeholder-text-light"
                            placeholder="Enter medicine name (e.g., Paracetamol)"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-md"
                        >
                            Search
                        </button>
                    </form>
                    <div className="mt-8 text-left">
                        {hasSearched && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-text">
                                    Results for <span className="text-secondary">"{searchTerm}"</span>
                                </h3>
                                {results.length > 0 ? (
                                    <ul className="space-y-3">
                                        {results.map(pharmacy => (
                                            <li key={pharmacy.id} className="bg-background p-4 rounded-lg flex justify-between items-center border">
                                                <span className="font-medium text-text">{pharmacy.name}</span>
                                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${getStockColor(pharmacy.stock)}`}>
                                                    {pharmacy.stock}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-text-light text-center py-4">No results found for "{searchTerm}".</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isOrderModalOpen && <OrderMedicineModal onClose={() => setIsOrderModalOpen(false)} />}
        </div>
    );
};

export default PharmacyStock;
