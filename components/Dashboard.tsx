
import React, { useRef, useEffect } from 'react';
import type { CrewMember } from '../types';
import { Panel } from './Panel';
import { HeartIcon, BatteryIcon, UserIcon, AlertIcon } from './IconComponents';

interface DashboardProps {
  user: CrewMember;
}

const EmotionIndicator: React.FC<{ emotion: string }> = ({ emotion }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
        }
      }
    };
    startCamera();
  }, []);

  const emotionColor: { [key: string]: string } = {
    Calm: 'text-green-400',
    Stressed: 'text-red-400',
    Fatigued: 'text-yellow-400',
    Anxious: 'text-orange-400',
    Neutral: 'text-blue-400',
  };

  return (
    <Panel title="Real-time Emotion Detection">
      <div className="relative aspect-video bg-black rounded-md overflow-hidden border border-purple-400/30">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-2 left-4">
          <p className="text-sm text-gray-400">STATUS</p>
          <p className={`text-2xl font-bold ${emotionColor[emotion] || 'text-gray-300'}`}>{emotion}</p>
        </div>
      </div>
    </Panel>
  );
};

const VitalsPanel: React.FC<{ vitals: CrewMember['vitals'] }> = ({ vitals }) => (
  <Panel title="Physical Vitals">
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <HeartIcon className="w-8 h-8 mx-auto text-red-400" />
        <p className="mt-2 text-2xl font-semibold">{vitals?.heartRate}</p>
        <p className="text-sm text-gray-400">BPM</p>
      </div>
      <div>
        <BatteryIcon className="w-8 h-8 mx-auto text-blue-400" />
        <p className="mt-2 text-2xl font-semibold">{(100 - (vitals?.fatigueIndex || 0) * 100).toFixed(0)}%</p>
        <p className="text-sm text-gray-400">Energy</p>
      </div>
      <div>
        <UserIcon className="w-8 h-8 mx-auto text-green-400" />
        <p className="mt-2 text-2xl font-semibold">{vitals?.posture}</p>
        <p className="text-sm text-gray-400">Posture</p>
      </div>
    </div>
  </Panel>
);

const AlertsPanel: React.FC = () => (
    <Panel title="Alerts & Recommendations">
        <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg">
                <AlertIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                    <p className="font-semibold text-yellow-300">Fatigue Alert</p>
                    <p className="text-sm text-gray-300">Fatigue index rising. Consider a 10-minute rest period.</p>
                </div>
            </div>
             <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg">
                <AlertIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                    <p className="font-semibold text-orange-300">Group Morale</p>
                    <p className="text-sm text-gray-300">Crew emotion desynchronized. Suggestion: Shared meal break.</p>
                </div>
            </div>
        </div>
    </Panel>
);


export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div className="lg:col-span-2 xl:col-span-2">
        <EmotionIndicator emotion={user.emotion} />
      </div>
      <VitalsPanel vitals={user.vitals} />
      <div className="lg:col-span-2 xl:col-span-3">
        <AlertsPanel />
      </div>
    </div>
  );
};
