import React from 'react';
import { ChargingStation } from '../utils/solana';

interface StationListProps {
  stations: ChargingStation[];
  onSelectStation: (station: ChargingStation) => void;
}

const StationList: React.FC<StationListProps> = ({ stations, onSelectStation }) => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-3">Mevcut İstasyonlar</h2>
      <ul className="space-y-2">
        {stations.map((station, index) => (
          <li
            key={index}
            className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectStation(station)}
          >
            <p>Konum: {station.location.toBase58()}</p>
            <p>Saatlik ücret: {station.pricePerHour.toString()} token</p>
            <p>Mevcut slot sayısı: {station.availableSlots.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationList;