import * as anchor from '@project-serum/anchor';
import { PublicKey, Connection, Keypair } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Program ID ve Bağlantı Yapılandırması
const DEVNET_URL = 'https://api.devnet.solana.com';
// Geçici bir program ID kullanıyoruz. Gerçek uygulamada bunu kendi program ID'nizle değiştirin.
const programId = new PublicKey('11111111111111111111111111111111');
const connection = new Connection(DEVNET_URL, 'confirmed');

// ChargingStation interface'ini tanımlayalım ve export edelim
export interface ChargingStation {
  location: PublicKey;
  pricePerHour: anchor.BN;
  capacity: anchor.BN;
  availableSlots: anchor.BN;
  owner: PublicKey;
}

// createStation fonksiyonunu ekleyelim
export async function createStation(
  stationPublicKey: PublicKey,
  userPublicKey: PublicKey,
  location: Uint8Array,
  pricePerHour: number,
  capacity: number,
  payer: Keypair
): Promise<string> {
  // Bu fonksiyonun içeriğini daha sonra dolduracağız
  console.log('createStation called');
  return 'dummy-transaction-id';
}

// reserveSlot fonksiyonunu ekleyelim
export async function reserveSlot(
  stationPublicKey: PublicKey,
  userPublicKey: PublicKey,
  userTokenAccount: PublicKey,
  stationTokenAccount: PublicKey,
  hours: number,
  payer: Keypair
): Promise<{ tx: string; totalCost: anchor.BN }> {
  // Bu fonksiyonun içeriğini daha sonra dolduracağız
  console.log('reserveSlot called');
  return { tx: 'dummy-transaction-id', totalCost: new anchor.BN(0) };
}

// getAvailableStations fonksiyonunu ekleyelim
export async function getAvailableStations(): Promise<ChargingStation[]> {
  // Bu fonksiyonun içeriğini daha sonra dolduracağız
  console.log('getAvailableStations called');
  return [];
}

// Dummy ChargingStation oluşturan yardımcı fonksiyon
export function createDummyChargingStation(): ChargingStation {
  return {
    location: new PublicKey('11111111111111111111111111111111'),
    pricePerHour: new anchor.BN(10),
    capacity: new anchor.BN(5),
    availableSlots: new anchor.BN(3),
    owner: new PublicKey('11111111111111111111111111111111'),
  };
}

// Lamport to SOL conversion helper function
export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000;
}

// SOL to Lamports conversion helper function
export function solToLamports(sol: number): number {
  return sol * 1_000_000_000;
}
