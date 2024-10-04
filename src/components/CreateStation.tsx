import React, { useState } from 'react';
import { PublicKey, Keypair } from '@solana/web3.js';
import { createStation } from '../utils/solana';

interface CreateStationProps {
  onStationCreated: () => void;
}

const CreateStation: React.FC<CreateStationProps> = ({ onStationCreated }) => {
  const [location, setLocation] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const stationPublicKey = Keypair.generate().publicKey;
      const userPublicKey = Keypair.generate().publicKey;
      const payer = Keypair.generate();

      await createStation(
        stationPublicKey,
        userPublicKey,
        Buffer.from(location),
        parseInt(pricePerHour),
        parseInt(capacity),
        payer
      );

      onStationCreated();
      setLocation('');
      setPricePerHour('');
      setCapacity('');
    } catch (error) {
      console.error('İstasyon oluşturulurken hata oluştu:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Konum
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
          Saatlik Ücret (token)
        </label>
        <input
          type="number"
          id="pricePerHour"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
          Kapasite
        </label>
        <input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        İstasyon Oluştur
      </button>
    </form>
  );
};

export default CreateStation;