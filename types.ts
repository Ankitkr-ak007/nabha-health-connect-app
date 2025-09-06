
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  qualification: string;
  image: string;
  availability: {
    [day: string]: string[];
  };
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  patientName: string;
  patientAge: number;
  patientGender: string;
  contact: string;
  problem: string;
  slot: string;
  day: string;
  meetLink?: string;
}

export interface HealthRecord {
  id: string;
  date: string;
  title: string;
  details: string;
  doctor: string;
  attachment?: {
    name: string;
    type: string;
    data: string; // base64 data URL
  };
}
