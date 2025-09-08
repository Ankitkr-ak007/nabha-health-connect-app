
import React, { useState, useEffect, useRef } from 'react';
import type { Appointment } from '../types';
import { MicOnIcon, MicOffIcon, VideoOnIcon, VideoOffIcon, UserCircleIcon } from './icons/Icons';

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
  const [showControls, setShowControls] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<number | null>(null);

  // Effect to manage media devices
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (callType === 'audio') {
            stream.getVideoTracks().forEach(track => track.enabled = false);
        }

        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        if (remoteVideoRef.current) {
          // In a real app, this would be a remote stream. We simulate it with the local one.
          remoteVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Could not access camera or microphone. Please check your browser permissions.");
      }
    };

    startMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to hide controls after a delay
  useEffect(() => {
    if (showControls) {
      // Clear any existing timer before setting a new one
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      controlsTimerRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 4000); // Hide after 4 seconds of inactivity
    } else {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    }
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [showControls]);


  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (callType === 'audio') return; // Don't allow toggling camera in audio calls
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

  const handleScreenTap = () => {
    setShowControls(prev => !prev);
  }

  const ControlButton: React.FC<{ onClick: (e: React.MouseEvent) => void; className: string; children: React.ReactNode; title: string; disabled?: boolean; }> = ({ onClick, className, children, title, disabled }) => (
    <button onClick={(e) => { e.stopPropagation(); onClick(e); }} className={`p-3 rounded-full transition-colors duration-200 ${className}`} title={title} disabled={disabled}>
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
    <div className="fixed inset-0 bg-gray-900 text-white z-[100] flex flex-col" onClick={handleScreenTap} aria-label="Video call screen, tap to show controls">
      <div className="w-full h-full relative">
        {/* Remote Video (Doctor) */}
        <div className="w-full h-full bg-black flex items-center justify-center">
          <video ref={remoteVideoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity ${isCameraOff ? 'opacity-0' : 'opacity-100'}`} />
          {(isCameraOff || callType === 'audio') && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400">
                <UserCircleIcon className="w-24 h-24 sm:w-32 sm:h-32"/>
                <span className="text-xl font-bold">{appointment.doctor.name}</span>
                {callType === 'video' && <span className="text-lg">Camera is off</span>}
                {callType === 'audio' && <span className="text-lg">Audio Call</span>}
            </div>
          )}
        </div>

        {/* Local Video (Patient) */}
        <div className="absolute bottom-24 right-4 md:bottom-28 md:right-6 w-32 h-48 sm:w-40 sm:h-56 rounded-lg overflow-hidden bg-black border-2 border-gray-600 shadow-lg z-10">
          <video ref={localVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${callType === 'audio' ? 'hidden': ''}`} />
           {callType === 'audio' && (
             <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <MicOnIcon className={`w-12 h-12 ${isMuted ? 'text-red-500' : 'text-green-500'}`} />
             </div>
           )}
        </div>

        {/* Call Info and Controls Overlay */}
        <div className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Top Info Bar */}
          <div className="p-4 bg-gradient-to-b from-black/50 to-transparent">
            <p className="text-lg font-semibold">Consultation with {appointment.doctor.name}</p>
            <p className="text-sm text-gray-300">{appointment.doctor.specialization}</p>
          </div>

          {/* Bottom Controls Bar */}
          <div className="py-4 flex justify-center items-center gap-6 bg-gradient-to-t from-black/50 to-transparent">
            <ControlButton onClick={toggleMute} className={isMuted ? "bg-white text-black" : "bg-white/20 hover:bg-white/30 text-white"} title={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <MicOffIcon className="w-6 h-6"/> : <MicOnIcon className="w-6 h-6"/>}
            </ControlButton>
            <button onClick={(e) => { e.stopPropagation(); handleEndCall(); }} className="transition-transform transform hover:scale-110" title="End Call">
                <img src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/phone-circle-red-2-512.png" alt="End Call" className="w-16 h-16" />
            </button>
            <ControlButton onClick={toggleCamera} className={isCameraOff ? "bg-white text-black" : "bg-white/20 hover:bg-white/30 text-white disabled:bg-gray-600 disabled:text-gray-400"} title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"} disabled={callType === 'audio'}>
                {isCameraOff ? <VideoOffIcon className="w-6 h-6"/> : <VideoOnIcon className="w-6 h-6"/>}
            </ControlButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
