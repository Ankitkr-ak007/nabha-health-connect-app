import React from 'react';
import type { Appointment } from '../types';
import type { View } from '../App';
import { VideoCameraIcon, PhoneIcon } from './icons/Icons';

interface OnlineConsultationsProps {
    appointments: Appointment[];
    setView: (view: View) => void;
    onStartCall: (appointment: Appointment, type: 'video' | 'audio') => void;
}

const OnlineConsultations: React.FC<OnlineConsultationsProps> = ({ appointments, setView, onStartCall }) => {
    const onlineAppointments = appointments.filter(apt => apt.meetLink);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-primary-dark">Your Online Consultations</h2>
                <p className="text-text-light mt-1">Here are your scheduled video appointments.</p>
            </div>

            <div className="space-y-4">
                {onlineAppointments.length > 0 ? (
                    onlineAppointments.map(apt => (
                        <div key={apt.id} className="bg-card p-5 rounded-lg shadow-md border border-gray-200 transition-shadow hover:shadow-lg">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <div className="flex-grow">
                                    <p className="text-sm text-text-light">{apt.slot}</p>
                                    <h3 className="text-xl font-bold text-primary-dark">Dr. {apt.doctor.name}</h3>
                                    <p className="text-secondary font-semibold">{apt.doctor.specialization}</p>
                                    <p className="text-sm text-text-light mt-1">Patient: {apt.patientName}</p>
                                </div>
                                <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-3">
                                     <a
                                        href={apt.meetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md text-center w-full sm:w-auto text-sm"
                                    >
                                        Join via Google Meet
                                    </a>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => onStartCall(apt, 'video')}
                                            className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                                            title="Start In-App Video Call"
                                        >
                                            <VideoCameraIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => onStartCall(apt, 'audio')}
                                            className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                                            title="Start In-App Audio Call"
                                        >
                                            <PhoneIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-card rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-4 text-xl text-text-light">You have no online consultations scheduled.</p>
                        <p className="text-sm text-gray-400 mt-1">Book an appointment to get started.</p>
                        <button
                            onClick={() => setView('doctors')}
                            className="mt-6 bg-primary text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                        >
                            Find a Doctor
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnlineConsultations;
