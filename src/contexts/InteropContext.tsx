
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import interopService, { InteropMessage, RadarEntity } from '../utils/interop';
import { useToast } from '@/hooks/use-toast';

interface InteropContextType {
  isConnected: boolean;
  sendMessage: (type: string, payload: any) => void;
  updateSettings: (category: string, settings: any) => void;
  toggleFeature: (feature: string, enabled: boolean) => void;
  radarEntities: RadarEntity[];
  forceConnect: () => void;
  forceDisconnect: () => void;
}

const InteropContext = createContext<InteropContextType | undefined>(undefined);

export const InteropProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [radarEntities, setRadarEntities] = useState<RadarEntity[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set up listeners for connection events
    const handleConnect = (message: InteropMessage) => {
      setIsConnected(true);
      toast({
        title: "Connection Established",
        description: "Connected to host application",
      });
    };

    const handleDisconnect = (message: InteropMessage) => {
      setIsConnected(false);
      toast({
        title: "Connection Lost",
        description: "Connection to host application lost",
        variant: "destructive",
      });
    };

    const handleStatus = (message: InteropMessage) => {
      if (message.payload?.status === "error") {
        toast({
          title: "System Error",
          description: message.payload.message || "An unknown error occurred",
          variant: "destructive",
        });
      }
    };
    
    const handleEntityUpdate = (message: InteropMessage) => {
      if (message.payload?.entities) {
        setRadarEntities(message.payload.entities);
      }
    };

    // Register event handlers
    interopService.on('CONNECT', handleConnect);
    interopService.on('DISCONNECT', handleDisconnect);
    interopService.on('SYSTEM_STATUS', handleStatus);
    interopService.on('ENTITY_UPDATE', handleEntityUpdate);

    // Try to check connection on mount
    const initialConnectionStatus = interopService.isHostConnected();
    setIsConnected(initialConnectionStatus);
    
    // If there's a connection, send a heartbeat
    if (initialConnectionStatus) {
      interopService.sendMessage('HEARTBEAT', { timestamp: Date.now() });
    }

    // Clean up event handlers on unmount
    return () => {
      interopService.off('CONNECT', handleConnect);
      interopService.off('DISCONNECT', handleDisconnect);
      interopService.off('SYSTEM_STATUS', handleStatus);
      interopService.off('ENTITY_UPDATE', handleEntityUpdate);
    };
  }, [toast]);

  const forceConnect = () => {
    interopService.forceConnectionStatus(true);
    setIsConnected(true);
  };
  
  const forceDisconnect = () => {
    interopService.forceConnectionStatus(false);
    setIsConnected(false);
  };

  const value = {
    isConnected,
    sendMessage: interopService.sendMessage.bind(interopService),
    updateSettings: interopService.updateSettings.bind(interopService),
    toggleFeature: interopService.toggleFeature.bind(interopService),
    radarEntities,
    forceConnect,
    forceDisconnect
  };

  return (
    <InteropContext.Provider value={value}>
      {children}
    </InteropContext.Provider>
  );
};

export const useInterop = (): InteropContextType => {
  const context = useContext(InteropContext);
  if (context === undefined) {
    throw new Error('useInterop must be used within an InteropProvider');
  }
  return context;
};
