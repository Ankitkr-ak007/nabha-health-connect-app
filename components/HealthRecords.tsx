
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { HealthRecord } from '../types';
import { PaperClipIcon } from './icons/Icons';
import { useAuth } from '../contexts/AuthContext';

const HealthRecords: React.FC = () => {
  const { user } = useAuth();
  // Scope health records to the current user ID to ensure data privacy
  const [records, setRecords] = useLocalStorage<HealthRecord[]>(`healthRecords_${user?.id}`, []);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newRecord, setNewRecord] = useState({
    title: '',
    date: '',
    doctor: '',
    details: '',
    attachment: null as { name: string; type: string; data: string } | null
  });
  const [fileError, setFileError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    setNewRecord(prev => ({ ...prev, attachment: null }));
    e.target.value = ''; // Allow re-selecting the same file

    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setFileError('File is too large. Maximum size is 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setNewRecord(prev => ({ 
            ...prev, 
            attachment: {
                name: file.name,
                type: file.type,
                data: loadEvent.target?.result as string
            }
        }));
      };
      reader.onerror = () => {
        setFileError('Failed to read file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record: HealthRecord = {
      id: new Date().toISOString(),
      title: newRecord.title,
      date: newRecord.date,
      doctor: newRecord.doctor,
      details: newRecord.details,
      ...(newRecord.attachment && { attachment: newRecord.attachment }),
    };
    setRecords([record, ...records]);
    setNewRecord({ title: '', date: '', doctor: '', details: '', attachment: null });
    setFileError('');
    setIsFormVisible(false);
  };
  
  const deleteRecord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
        setRecords(records.filter(record => record.id !== id));
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary-dark">My Health Records</h2>
          <p className="text-text-light mt-1">A secure place for your medical history. Data is saved on your device.</p>
        </div>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300"
        >
          {isFormVisible ? 'Cancel' : '+ Add New Record'}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-card p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-text">New Health Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="title" value={newRecord.title} onChange={handleInputChange} placeholder="Record Title (e.g., Blood Test Report)" className="p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
              <input name="date" type="date" value={newRecord.date} onChange={handleInputChange} className="p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
            </div>
            <input name="doctor" value={newRecord.doctor} onChange={handleInputChange} placeholder="Consulting Doctor" className="w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
            <textarea name="details" value={newRecord.details} onChange={handleInputChange} placeholder="Details, notes, or prescription..." rows={4} className="w-full p-2 border border-gray-300 rounded-md bg-white text-text placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition" required />
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Attach Prescription/Report (Optional)</label>
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*,application/pdf"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
                {newRecord.attachment && (
                    <div className="mt-2 text-sm text-text-light flex items-center bg-gray-100 p-2 rounded-md">
                        <PaperClipIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{newRecord.attachment.name}</span>
                        <button 
                          type="button"
                          onClick={() => setNewRecord(prev => ({...prev, attachment: null}))}
                          className="ml-auto text-red-500 hover:text-red-700 font-bold text-lg"
                          aria-label="Remove attachment"
                        >&times;</button>
                    </div>
                )}
            </div>

            <div className="text-right">
              <button type="submit" className="bg-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-500">Save Record</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {records.length > 0 ? records.map(record => (
          <div key={record.id} className="bg-card p-5 rounded-lg shadow-sm border border-gray-200 relative group">
            <button 
              onClick={() => deleteRecord(record.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-100"
              title="Delete Record"
            >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold text-primary-dark">{record.title}</h4>
              <span className="text-sm text-text-light">{new Date(record.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-text-light">Dr. {record.doctor}</p>
            <p className="mt-2 text-text whitespace-pre-wrap">{record.details}</p>
             {record.attachment && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                <a 
                    href={record.attachment.data} 
                    download={record.attachment.name}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark hover:underline"
                >
                    <PaperClipIcon className="h-5 w-5 mr-2" />
                    View Attachment ({record.attachment.name})
                </a>
                </div>
            )}
          </div>
        )) : (
          <div className="text-center py-10 bg-card rounded-lg shadow-sm">
            <p className="text-text-light">You have no health records yet.</p>
            <p className="text-sm text-gray-400 mt-1">Click 'Add New Record' to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthRecords;
