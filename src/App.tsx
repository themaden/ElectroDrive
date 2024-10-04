import React, { useState, useEffect } from 'react';
import { PublicKey, Keypair } from '@solana/web3.js';
import { getAvailableStations, ChargingStation, createDummyChargingStation } from './utils/solana';
import StationList from './components/StationList';
import CreateStation from './components/CreateStation';
import ReserveSlot from './components/ReserveSlot';

function App() {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const availableStations = await getAvailableStations();
      if (availableStations.length === 0) {
        // Eğer istasyon yoksa, dummy bir istasyon ekleyelim
        setStations([createDummyChargingStation()]);
      } else {
        setStations(availableStations);
      }
    } catch (error) {
      console.error('İstasyonları getirirken hata oluştu:', error);
      // Hata durumunda da dummy bir istasyon ekleyelim
      setStations([createDummyChargingStation()]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5">Solana Şarj İstasyonları</h1>
          <CreateStation onStationCreated={fetchStations} />
          <StationList stations={stations} onSelectStation={setSelectedStation} />
          {selectedStation && (
            <ReserveSlot station={selectedStation} onReservationComplete={fetchStations} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;