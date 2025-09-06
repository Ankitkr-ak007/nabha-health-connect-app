import React, { useState, useMemo } from 'react';
import { doctors } from '../data/doctors';
import DoctorCard from './DoctorCard';
import type { Doctor } from '../types';
import { ChevronDownIcon } from './icons/Icons';

interface FindDoctorProps {
  onBookAppointment: (doctor: Doctor) => void;
}

const FindDoctor: React.FC<FindDoctorProps> = ({ onBookAppointment }) => {
  const [filter, setFilter] = useState<string>('All');

  const specializations = useMemo(() => {
    const specs = new Set(doctors.map(doc => doc.specialization));
    return ['All', ...Array.from(specs).sort()];
  }, []);

  const filteredDoctors = useMemo(() => {
    if (filter === 'All') {
      return doctors;
    }
    return doctors.filter(doc => doc.specialization === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-dark">Find Your Specialist</h2>
        <p className="text-text-light mt-2">Choose from our panel of experienced doctors.</p>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md flex items-center justify-center space-x-4 sticky top-20 z-40">
        <label htmlFor="specialization-filter" className="font-semibold text-text">Filter by Specialization:</label>
        <div className="relative">
          <select
            id="specialization-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon className="h-5 w-5"/>
          </div>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} onBookAppointment={onBookAppointment} />
            ))}
         </div>
      ) : (
        <div className="text-center py-12">
            <p className="text-text-light text-lg">No doctors found for the selected specialization.</p>
        </div>
      )}
    </div>
  );
};

export default FindDoctor;