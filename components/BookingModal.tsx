
import React, { useState } from 'react';
import type { Doctor, Appointment } from '../types';
import { sendAppointmentConfirmation } from '../services/emailService';
import { useAuth } from '../contexts/AuthContext';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
  onBookingComplete: (appointment: Appointment) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose, onBookingComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Select slot, 2: Patient details, 3: Confirmation
  const [selectedDay, setSelectedDay] = useState(Object.keys(doctor.availability)[0] || '');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: user?.name || '',
    age: '',
    gender: 'Male',
    contact: '',
    problem: ''
  });
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
    setSelectedSlot('');
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep(2);
  };
  
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a mock Google Meet link for the online consultation
    const meetLink = `https://meet.google.com/mock-${Math.random().toString(36).substring(2, 12)}`;

    const newAppointment: Appointment = {
      id: new Date().toISOString(),
      doctor,
      patientName: patientDetails.name,
      patientAge: Number(patientDetails.age),
      patientGender: patientDetails.gender,
      contact: patientDetails.contact,
      problem: patientDetails.problem,
      slot: `${selectedDay}, ${selectedSlot}`,
      day: selectedDay,
      meetLink,
    };
    
    setConfirmedAppointment(newAppointment);

    try {
        await sendAppointmentConfirmation(newAppointment);
    } catch (error) {
        console.error("Failed to send confirmation email", error);
        // Not showing error to user for this mock
    }

    onBookingComplete(newAppointment);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-primary-dark">Book Appointment</h2>
                <p className="text-text-light">with Dr. {doctor.name} ({doctor.specialization})</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl">&times;</button>
        </div>
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">1. Select a Day and Time Slot</h3>
              <div>
                <label htmlFor="day-select" className="block text-sm font-medium text-gray-700">Available Days</label>
                <select id="day-select" value={selectedDay} onChange={handleDayChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none transition">
                  {Object.keys(doctor.availability).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Available Slots for {selectedDay}</label>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {doctor.availability[selectedDay]?.map(slot => (
                    <button key={slot} onClick={() => handleSlotSelect(slot)} className="p-2 border rounded-md text-center text-sm font-medium bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-text">2. Enter Patient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" value={patientDetails.name} onChange={handleDetailsChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" name="age" value={patientDetails.age} onChange={handleDetailsChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text focus:ring-2 focus:ring-primary focus:outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" value={patientDetails.gender} onChange={handleDetailsChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text focus:ring-2 focus:ring-primary focus:outline-none transition" required>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input type="tel" name="contact" value={patientDetails.contact} onChange={handleDetailsChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text focus:ring-2 focus:ring-primary focus:outline-none transition" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Briefly describe the health problem</label>
                <textarea name="problem" value={patientDetails.problem} onChange={handleDetailsChange} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-text focus:ring-2 focus:ring-primary focus:outline-none transition" required />
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-primary hover:underline">Back to Slots</button>
                <button type="submit" className="bg-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-500">Confirm Booking</button>
              </div>
            </form>
          )}

          {step === 3 && confirmedAppointment && (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-green-600 mt-4 mb-2">Appointment Confirmed!</h3>
              <p className="text-text-light">Your appointment with <strong>Dr. {confirmedAppointment.doctor.name}</strong> on <strong>{confirmedAppointment.slot}</strong> is confirmed.</p>
              <p className="text-text-light mt-1">A confirmation has been sent to your registered email.</p>
              <button onClick={onClose} className="mt-6 bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
