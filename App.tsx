import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import FindDoctor from './components/FindDoctor';
import SymptomChecker from './components/SymptomChecker';
import HealthRecords from './components/HealthRecords';
import PharmacyStock from './components/PharmacyStock';
import OnlineConsultations from './components/OnlineConsultations';
import type { Appointment, Doctor } from './types';
import BookingModal from './components/BookingModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AuthLayout from './components/AuthLayout';
import useLocalStorage from './hooks/useLocalStorage';
import VideoCallModal from './components/VideoCallModal';


export type View = 'home' | 'doctors' | 'symptom-checker' | 'records' | 'pharmacy' | 'online-consultations';

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Persist appointments in local storage, scoped by user ID
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(`appointments_${user?.id}`, []);
  
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [activeCall, setActiveCall] = useState<{ appointment: Appointment; type: 'video' | 'audio' } | null>(null);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };
  
  const handleBookingComplete = (appointment: Appointment) => {
    setBookedAppointment(appointment);
    setAppointments(prev => [appointment, ...prev]);
    setIsBookingModalOpen(false);
  };

  const handleStartInAppCall = (appointment: Appointment, type: 'video' | 'audio') => {
    setActiveCall({ appointment, type });
  };

  const renderView = () => {
    switch (currentView) {
      case 'doctors':
        return <FindDoctor onBookAppointment={handleBookAppointment} />;
      case 'symptom-checker':
        return <SymptomChecker />;
      case 'records':
        return <HealthRecords />;
      case 'pharmacy':
        return <PharmacyStock />;
       case 'online-consultations':
        return <OnlineConsultations appointments={appointments} setView={setCurrentView} onStartCall={handleStartInAppCall} />;
      case 'home':
      default:
        return <Home setView={setCurrentView} />;
    }
  };
  
  if (!user) {
    // This should not happen if AppContent logic is correct, but it's a safeguard.
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {bookedAppointment && !isBookingModalOpen && !activeCall && (
             <div className="bg-primary-light/20 border-l-4 border-primary text-primary-dark p-4 rounded-lg shadow-md mb-8" role="alert">
                <p className="font-bold">Appointment Confirmed!</p>
                <p>You have successfully booked an appointment with {bookedAppointment.doctor.name} on {bookedAppointment.slot}.</p>
                {bookedAppointment.meetLink && (
                    <p className="mt-2">
                        <strong>Meeting Link:</strong>{' '}
                        <a href={bookedAppointment.meetLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline break-all">
                            {bookedAppointment.meetLink}
                        </a>
                    </p>
                )}
             </div>
        )}
        {renderView()}
      </main>
      <Footer />

      {isBookingModalOpen && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {activeCall && (
        <VideoCallModal
          appointment={activeCall.appointment}
          callType={activeCall.type}
          onClose={() => setActiveCall(null)}
        />
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  if (!user) {
    return (
      <AuthLayout>
        {authView === 'login' ? (
          <Login onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setAuthView('login')} />
        )}
      </AuthLayout>
    );
  }

  return <AuthenticatedApp />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};


export default App;
