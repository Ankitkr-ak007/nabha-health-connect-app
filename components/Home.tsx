
import React from 'react';
import type { View } from '../App';
import { StethoscopeIcon, ChatBubbleIcon, DocumentTextIcon, PillIcon, VideoCameraIcon } from './icons/Icons';

interface HomeProps {
  setView: (view: View) => void;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}> = ({ icon, title, description, buttonText, onClick }) => (
  <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center items-center">
    <div className="bg-primary/10 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-primary-dark mb-2">{title}</h3>
    <p className="text-text-light flex-grow mb-4">{description}</p>
    <button
      onClick={onClick}
      className="mt-auto bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-md"
    >
      {buttonText}
    </button>
  </div>
);

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative text-center bg-card p-12 rounded-2xl shadow-xl overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('https://picsum.photos/seed/healthbg/1200/400')" }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-primary-dark mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
            Connecting rural Nabha with trusted doctors and quality healthcare, right from your home.
          </p>
          <button
            onClick={() => setView('doctors')}
            className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-pink-500 transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Book a Consultation Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<ChatBubbleIcon className="h-10 w-10 text-primary" />}
          title="AI Symptom Checker"
          description="Get instant, preliminary analysis of your symptoms using our advanced AI."
          buttonText="Check Symptoms"
          onClick={() => setView('symptom-checker')}
        />
        <FeatureCard
          icon={<StethoscopeIcon className="h-10 w-10 text-primary" />}
          title="Book a Consultation"
          description="Browse profiles of experienced doctors and book online video consultations."
          buttonText="Find Doctors"
          onClick={() => setView('doctors')}
        />
         <FeatureCard
          icon={<VideoCameraIcon className="h-10 w-10 text-primary" />}
          title="My Consultations"
          description="View your upcoming online appointments and join video calls."
          buttonText="View Appointments"
          onClick={() => setView('online-consultations')}
        />
        <FeatureCard
          icon={<DocumentTextIcon className="h-10 w-10 text-primary" />}
          title="Health Records"
          description="Securely store and access your digital health records, even offline."
          buttonText="View Records"
          onClick={() => setView('records')}
        />
         <FeatureCard
          icon={<PillIcon className="h-10 w-10 text-primary" />}
          title="Pharmacy Stock"
          description="Check real-time availability of medicines at your local pharmacies."
          buttonText="Check Stock"
          onClick={() => setView('pharmacy')}
        />
      </div>
    </div>
  );
};

export default Home;
