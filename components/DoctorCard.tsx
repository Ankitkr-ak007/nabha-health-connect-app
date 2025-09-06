
import React from 'react';
import type { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden">
      <div className="p-6 text-center">
        <img
          src={doctor.image}
          alt={`Dr. ${doctor.name}`}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-light"
        />
        <h3 className="text-xl font-bold text-primary-dark">{doctor.name}</h3>
        <p className="text-secondary font-semibold">{doctor.specialization}</p>
      </div>
      <div className="px-6 pb-6 flex-grow">
        <div className="text-sm space-y-2 text-text-light">
          <p><strong>Experience:</strong> {doctor.experience} years</p>
          <p><strong>Qualification:</strong> {doctor.qualification}</p>
        </div>
      </div>
       <div className="p-6 bg-gray-50 mt-auto">
        <button
          onClick={() => onBookAppointment(doctor)}
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
