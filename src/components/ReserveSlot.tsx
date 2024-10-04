import React, { useState } from 'react';
import { PublicKey, Keypair } from '@solana/web3.js';
import { ChargingStation, reserveSlot } from '../utils/solana';

interface ReserveSlotProps {
  station: ChargingStation;
  onReservationComplete: () => void;
}

const ReserveSlot: React.FC<ReserveSlotProps> = ({ station, onReservationComplete }) => {
  const [hours, setHours] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userPublicKey = Keypair.generate().publicKey;
      const userTokenAccount = Keypair.generate().publicKey;
      const stationTokenAccount = Keypair.generate().publicKey;
      const payer = Keypair.generate();

      await reserveSlot(
        station.location,
        userPublicKey,
        userTokenAccount,
        stationTokenAccount,
        parseInt(hours),
        payer
      );

      onReservationComplete();
      setHours('');
    } catch (error) {
      console.error('Slot rezervasyonu yapılırken hata oluştu:', error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-3">Slot Rezervasyonu</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
            Saat Sayısı
          </label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Slot Rezerve Et
        </button>
      </form>
    </div>
  );
};

export default ReserveSlot;