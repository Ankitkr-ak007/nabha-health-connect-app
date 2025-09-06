import React, { useState, useEffect, useRef } from 'react';
import type { Appointment } from '../types';
import { MicOnIcon, MicOffIcon, VideoOnIcon, VideoOffIcon, PhoneHangupIcon, UserCircleIcon } from './icons/Icons';

interface VideoCallModalProps {
  appointment: Appointment;
  callType: 'video' | 'audio';
  onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ appointment, callType, onClose }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(callType === 'audio');
  const [error, setError] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Initially disable video track if it's an audio call
        if (callType === 'audio') {
            stream.getVideoTracks().forEach(track => track.enabled = false);
        }

        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // In a real app, you'd get the remote stream via WebRTC.
        // For this demo, we'll mirror the local stream to simulate a call.
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Could not access camera or microphone. Please check your browser permissions.");
      }
    };

    startMedia();

    return () => {
      // Cleanup: stop all tracks when the component unmounts
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  const ControlButton: React.FC<{ onClick: () => void; className: string; children: React.ReactNode; title: string; }> = ({ onClick, className, children, title }) => (
    <button onClick={onClick} className={`p-3 rounded-full transition-colors duration-200 ${className}`} title={title}>
      {children}
    </button>
  );

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4">
        <div className="bg-card rounded-lg shadow-2xl p-8 text-center max-w-sm">
          <h3 className="text-xl font-bold text-red-600">Permission Error</h3>
          <p className="text-text-light mt-2 mb-6">{error}</p>
          <button onClick={onClose} className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-[100] flex flex-col">
      <div className="flex-grow relative flex flex-col md:flex-row items-center justify-center p-4 gap-4">
        {/* Remote Video (Doctor) */}
        <div className="relative w-full h-full max-h-[calc(100vh-200px)] md:max-h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
          <video ref={remoteVideoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity ${isCameraOff ? 'opacity-0' : 'opacity-100'}`} />
          {isCameraOff && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400">
                <UserCircleIcon className="w-24 h-24 sm:w-32 sm:h-32"/>
                <span className="text-xl font-bold">Dr. {appointment.doctor.name}</span>
                <span className="text-lg">Camera is off</span>
            </div>
          )}
        </div>

        {/* Local Video (Patient) */}
        <div className="absolute bottom-20 right-4 md:bottom-6 md:right-6 w-32 h-48 sm:w-40 sm:h-56 rounded-lg overflow-hidden bg-black border-2 border-gray-600 shadow-lg">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* Call Info and Controls */}
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/50 to-transparent">
        <p className="text-lg font-semibold">Consultation with Dr. {appointment.doctor.name}</p>
        <p className="text-sm text-gray-300">{appointment.doctor.specialization}</p>
      </div>

      <div className="w-full py-4 flex justify-center items-center gap-4 bg-black bg-opacity-50">
        <ControlButton onClick={toggleMute} className={isMuted ? "bg-red-500" : "bg-gray-600 hover:bg-gray-500"} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <MicOffIcon className="w-6 h-6"/> : <MicOnIcon className="w-6 h-6"/>}
        </ControlButton>
        <ControlButton onClick={toggleCamera} className={isCameraOff ? "bg-gray-600" : "bg-primary hover:bg-primary-dark"} title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}>
            {isCameraOff ? <VideoOffIcon className="w-6 h-6"/> : <VideoOnIcon className="w-6 h-6"/>}
        </ControlButton>
        <ControlButton onClick={handleEndCall} className="bg-red-600 hover:bg-red-500" title="End Call">
            <PhoneHangupIcon className="w-6 h-6"/>
        </ControlButton>
      </div>
    </div>
  );
};

export default VideoCallModal;
