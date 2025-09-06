
import React, { useState } from 'react';
import { PaperClipIcon } from './icons/Icons';
import { useAuth } from '../contexts/AuthContext';

const mockPharmacies = [
    { id: 1, name: 'Punjab Medical Store, Nabha' },
    { id: 2, name: 'A-One Chemists, Circular Road' },
    { id: 3, name: 'Janta Pharmacy, Patiala Gate' },
    { id: 4, name: 'Royal Medical Hall' },
];

interface OrderMedicineModalProps {
    onClose: () => void;
}

const OrderMedicineModal: React.FC<OrderMedicineModalProps> = ({ onClose }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<{ name: string, data: string } | null>(null);
    const [fileError, setFileError] = useState('');
    const [patientDetails, setPatientDetails] = useState({ name: user?.name || '', contact: '' });
    const [selectedPharmacies, setSelectedPharmacies] = useState<number[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFileError('');
        setFile(null);

        if (selectedFile) {
            if (selectedFile.size > 2 * 1024 * 1024) { // 2MB limit
                setFileError('File is too large. Max size is 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setFile({
                    name: selectedFile.name,
                    data: loadEvent.target?.result as string,
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handlePharmacyToggle = (id: number) => {
        setSelectedPharmacies(prev => 
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatientDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Mock submission
        console.log("--- MOCK MEDICINE ORDER ---");
        console.log("Patient Details:", patientDetails);
        console.log("Selected Pharmacies:", selectedPharmacies.map(id => mockPharmacies.find(p => p.id === id)?.name));
        console.log("Prescription File:", file?.name);
        console.log("--------------------------");

        setStep(2);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-dark">Order Medicines with Prescription</h2>
                        <p className="text-text-light">Upload your prescription to get started.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl">&times;</button>
                </div>
                
                <div className="p-6">
                {step === 1 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* File Upload */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">1. Upload Prescription</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*,application/pdf"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                required
                            />
                            {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
                            {file && !fileError && (
                                <div className="mt-2 text-sm text-green-600 flex items-center bg-green-50 p-2 rounded-md">
                                    <PaperClipIcon className="h-4 w-4 mr-2" />
                                    <span>{file.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Patient Details */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">2. Patient Details</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <input type="text" name="name" value={patientDetails.name} onChange={handleDetailsChange} placeholder="Full Name" className="block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                               <input type="tel" name="contact" value={patientDetails.contact} onChange={handleDetailsChange} placeholder="Contact Number" className="block w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                            </div>
                        </div>

                        {/* Select Pharmacies */}
                        <div>
                             <label className="block text-lg font-semibold text-gray-700 mb-2">3. Select Pharmacies</label>
                             <p className="text-sm text-text-light mb-2">Your order will be sent to the selected pharmacies.</p>
                             <div className="space-y-2">
                                {mockPharmacies.map(pharmacy => (
                                    <label key={pharmacy.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedPharmacies.includes(pharmacy.id)}
                                            onChange={() => handlePharmacyToggle(pharmacy.id)}
                                            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="ml-3 text-text">{pharmacy.name}</span>
                                    </label>
                                ))}
                             </div>
                             {selectedPharmacies.length === 0 && step === 1 && (
                                <p className="text-red-500 text-xs mt-1">Please select at least one pharmacy.</p>
                             )}
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                           <button 
                             type="submit" 
                             disabled={!file || selectedPharmacies.length === 0 || !patientDetails.name || !patientDetails.contact}
                             className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark disabled:bg-gray-400"
                           >
                             Place Order
                           </button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <div className="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-green-600 mt-4 mb-2">Order Sent!</h3>
                        <p className="text-text-light">Your prescription has been sent to the selected pharmacies.</p>
                        <p className="text-text-light mt-1">They will contact you shortly to confirm your order.</p>
                        <button onClick={onClose} className="mt-6 bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark">Close</button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default OrderMedicineModal;
