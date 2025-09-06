import type { Appointment } from '../types';

/**
 * Mocks sending an appointment confirmation email.
 * In a real application, this would use a backend service to send emails.
 * For this demo, it logs the email content to the console.
 */
export const sendAppointmentConfirmation = async (appointment: Appointment): Promise<void> => {
  const recipient = "ankitkr.ak007@gmail.com";
  const subject = `Appointment Confirmation with ${appointment.doctor.name}`;

  const body = `
    Dear ${appointment.patientName},

    Your appointment has been successfully booked.

    Details:
    - Doctor: ${appointment.doctor.name} (${appointment.doctor.specialization})
    - Date & Time: ${appointment.slot}
    - Patient: ${appointment.patientName}, Age ${appointment.patientAge}

    Consultation Link:
    ${appointment.meetLink ? `Join your video call here: ${appointment.meetLink}` : 'In-person consultation.'}

    Thank you for using Nabha Health Connect.
  `;

  console.log("--- MOCK EMAIL SENT ---");
  console.log(`To: ${recipient}`);
  console.log(`Subject: ${subject}`);
  console.log("Body:", body);
  console.log("-----------------------");
  
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));
};