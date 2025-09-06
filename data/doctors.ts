import type { Doctor } from '../types';

const timeSlots = (start: number, end: number, interval: number = 30) => {
    const slots: string[] = [];
    for (let hour = start; hour < end; hour++) {
        slots.push(`${hour}:00`);
        if(interval === 30) slots.push(`${hour}:30`);
    }
    return slots;
}

const morningSlots = timeSlots(9, 12);
const afternoonSlots = timeSlots(14, 17);

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ramesh Kumar',
    specialization: 'General Physician',
    experience: 15,
    qualification: 'MBBS, MD',
    image: 'https://picsum.photos/seed/doc1/200/200',
    availability: { 'Monday': morningSlots, 'Wednesday': afternoonSlots, 'Friday': morningSlots }
  },
  {
    id: 2,
    name: 'Dr. Sunita Sharma',
    specialization: 'Pediatrician',
    experience: 12,
    qualification: 'MBBS, DCH',
    image: 'https://picsum.photos/seed/doc2/200/200',
    availability: { 'Tuesday': morningSlots, 'Thursday': afternoonSlots }
  },
  {
    id: 3,
    name: 'Dr. Anil Gupta',
    specialization: 'Cardiologist',
    experience: 20,
    qualification: 'MBBS, MD, DM (Cardiology)',
    image: 'https://picsum.photos/seed/doc3/200/200',
    availability: { 'Monday': afternoonSlots, 'Thursday': morningSlots }
  },
  {
    id: 4,
    name: 'Dr. Priya Singh',
    specialization: 'Dermatologist',
    experience: 8,
    qualification: 'MBBS, DDVL',
    image: 'https://picsum.photos/seed/doc4/200/200',
    availability: { 'Wednesday': morningSlots, 'Saturday': morningSlots }
  },
  {
    id: 5,
    name: 'Dr. Vikram Rathore',
    specialization: 'Orthopedic Surgeon',
    experience: 18,
    qualification: 'MBBS, MS (Ortho)',
    image: 'https://picsum.photos/seed/doc5/200/200',
    availability: { 'Tuesday': afternoonSlots, 'Friday': afternoonSlots }
  },
   {
    id: 6,
    name: 'Dr. Anjali Desai',
    specialization: 'Gynecologist',
    experience: 14,
    qualification: 'MBBS, MS (Obs & Gyn)',
    image: 'https://picsum.photos/seed/doc6/200/200',
    availability: { 'Monday': morningSlots, 'Thursday': morningSlots }
  },
  {
    id: 7,
    name: 'Dr. Sanjay Verma',
    specialization: 'Neurologist',
    experience: 22,
    qualification: 'MBBS, MD, DM (Neurology)',
    image: 'https://picsum.photos/seed/doc7/200/200',
    availability: { 'Wednesday': afternoonSlots, 'Saturday': morningSlots }
  },
  {
    id: 8,
    name: 'Dr. Meena Iyer',
    specialization: 'ENT Specialist',
    experience: 10,
    qualification: 'MBBS, MS (ENT)',
    image: 'https://picsum.photos/seed/doc8/200/200',
    availability: { 'Tuesday': morningSlots, 'Friday': morningSlots }
  },
  {
    id: 9,
    name: 'Dr. Rajesh Patel',
    specialization: 'Psychiatrist',
    experience: 16,
    qualification: 'MBBS, MD (Psychiatry)',
    image: 'https://picsum.photos/seed/doc9/200/200',
    availability: { 'Monday': afternoonSlots, 'Wednesday': morningSlots }
  },
  {
    id: 10,
    name: 'Dr. Kavita Reddy',
    specialization: 'Ophthalmologist',
    experience: 13,
    qualification: 'MBBS, MS (Ophthalmology)',
    image: 'https://picsum.photos/seed/doc10/200/200',
    availability: { 'Thursday': afternoonSlots, 'Saturday': morningSlots }
  },
  {
    id: 11,
    name: 'Dr. Alok Nath',
    specialization: 'General Physician',
    experience: 10,
    qualification: 'MBBS',
    image: 'https://picsum.photos/seed/doc11/200/200',
    availability: { 'Tuesday': morningSlots, 'Thursday': morningSlots, 'Saturday': afternoonSlots }
  },
  {
    id: 12,
    name: 'Dr. Bhawna Singh',
    specialization: 'Pediatrician',
    experience: 7,
    qualification: 'MBBS, MD (Pediatrics)',
    image: 'https://picsum.photos/seed/doc12/200/200',
    availability: { 'Monday': morningSlots, 'Friday': afternoonSlots }
  },
  {
    id: 13,
    name: 'Dr. Harpreet Kaur',
    specialization: 'Dermatologist',
    experience: 5,
    qualification: 'MBBS, MD (Dermatology)',
    image: 'https://picsum.photos/seed/doc13/200/200',
    availability: { 'Wednesday': afternoonSlots, 'Friday': morningSlots }
  },
  {
    id: 14,
    name: 'Dr. Manish Malhotra',
    specialization: 'General Surgeon',
    experience: 25,
    qualification: 'MBBS, MS (General Surgery)',
    image: 'https://picsum.photos/seed/doc14/200/200',
    availability: { 'Tuesday': afternoonSlots, 'Thursday': morningSlots }
  },
  {
    id: 15,
    name: 'Dr. Simranjeet Singh',
    specialization: 'Orthopedic Surgeon',
    experience: 9,
    qualification: 'MBBS, DNB (Ortho)',
    image: 'https://picsum.photos/seed/doc15/200/200',
    availability: { 'Monday': afternoonSlots, 'Saturday': morningSlots }
  },
  {
    id: 16,
    name: 'Dr. Sneha Pillai',
    specialization: 'General Physician',
    experience: 8,
    qualification: 'MBBS, DNB (Family Medicine)',
    image: 'https://picsum.photos/seed/doc16/200/200',
    availability: { 'Wednesday': morningSlots, 'Friday': morningSlots }
  },
  {
    id: 17,
    name: 'Dr. Arjun Das',
    specialization: 'Cardiologist',
    experience: 11,
    qualification: 'MBBS, MD, FACC',
    image: 'https://picsum.photos/seed/doc17/200/200',
    availability: { 'Tuesday': morningSlots, 'Thursday': afternoonSlots }
  },
  {
    id: 18,
    name: 'Dr. Fatima Khan',
    specialization: 'Gynecologist',
    experience: 19,
    qualification: 'MBBS, DGO',
    image: 'https://picsum.photos/seed/doc18/200/200',
    availability: { 'Monday': afternoonSlots, 'Wednesday': afternoonSlots }
  },
  {
    id: 19,
    name: 'Dr. Jaswinder Singh',
    specialization: 'ENT Specialist',
    experience: 6,
    qualification: 'MBBS, DLO',
    image: 'https://picsum.photos/seed/doc19/200/200',
    availability: { 'Friday': morningSlots, 'Saturday': afternoonSlots }
  },
  {
    id: 20,
    name: 'Dr. Ritu Beri',
    specialization: 'Dietitian/Nutritionist',
    experience: 10,
    qualification: 'B.Sc, M.Sc (Food & Nutrition)',
    image: 'https://picsum.photos/seed/doc20/200/200',
    availability: { 'Tuesday': afternoonSlots, 'Thursday': morningSlots }
  },
  {
    id: 21, name: 'Dr. Gurpreet Singh', specialization: 'Urologist', experience: 14, qualification: 'MBBS, MS, M.Ch (Urology)', image: 'https://picsum.photos/seed/doc21/200/200', availability: { 'Monday': morningSlots, 'Thursday': afternoonSlots }
  },
  {
    id: 22, name: 'Dr. Neha Sharma', specialization: 'Endocrinologist', experience: 9, qualification: 'MBBS, MD, DM (Endocrinology)', image: 'https://picsum.photos/seed/doc22/200/200', availability: { 'Tuesday': morningSlots, 'Friday': afternoonSlots }
  },
  {
    id: 23, name: 'Dr. Balwinder Singh', specialization: 'Pulmonologist', experience: 17, qualification: 'MBBS, MD (Chest Medicine)', image: 'https://picsum.photos/seed/doc23/200/200', availability: { 'Wednesday': morningSlots, 'Saturday': morningSlots }
  },
  {
    id: 24, name: 'Dr. Ishita Roy', specialization: 'Rheumatologist', experience: 11, qualification: 'MBBS, MD, DM (Rheumatology)', image: 'https://picsum.photos/seed/doc24/200/200', availability: { 'Monday': afternoonSlots, 'Friday': morningSlots }
  },
  {
    id: 25, name: 'Dr. Karnail Singh', specialization: 'Gastroenterologist', experience: 21, qualification: 'MBBS, MD, DM (Gastro)', image: 'https://picsum.photos/seed/doc25/200/200', availability: { 'Tuesday': afternoonSlots, 'Thursday': morningSlots }
  },
  {
    id: 26, name: 'Dr. Divya Aggarwal', specialization: 'General Physician', experience: 5, qualification: 'MBBS', image: 'https://picsum.photos/seed/doc26/200/200', availability: { 'Wednesday': afternoonSlots, 'Friday': afternoonSlots }
  },
  {
    id: 27, name: 'Dr. Mohanlal Prajapat', specialization: 'Nephrologist', experience: 18, qualification: 'MBBS, MD, DM (Nephrology)', image: 'https://picsum.photos/seed/doc27/200/200', availability: { 'Monday': morningSlots, 'Saturday': afternoonSlots }
  },
  {
    id: 28, name: 'Dr. Sukhmani Kaur', specialization: 'Dentist', experience: 9, qualification: 'BDS, MDS', image: 'https://picsum.photos/seed/doc28/200/200', availability: { 'Tuesday': morningSlots, 'Thursday': morningSlots }
  },
  {
    id: 29, name: 'Dr. Varun Joshi', specialization: 'Oncologist', experience: 24, qualification: 'MBBS, MD, DM (Oncology)', image: 'https://picsum.photos/seed/doc29/200/200', availability: { 'Wednesday': morningSlots, 'Friday': afternoonSlots }
  },
  {
    id: 30, name: 'Dr. Aishwarya Menon', specialization: 'Physiotherapist', experience: 7, qualification: 'BPT, MPT', image: 'https://picsum.photos/seed/doc30/200/200', availability: { 'Monday': afternoonSlots, 'Thursday': afternoonSlots }
  },
];