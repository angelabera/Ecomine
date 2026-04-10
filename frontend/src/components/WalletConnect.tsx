'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Polygon Mainnet chain ID is 137
  const POLYGON_CHAIN_ID = '0x89'; // 137 in hex
  const POLYGON_RPC = 'https://polygon-rpc.com';

  const addPolygonNetwork = async () => {
    try {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: POLYGON_CHAIN_ID,
              chainName: 'Polygon Mainnet',
              rpcUrls: [POLYGON_RPC],
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              blockExplorerUrls: ['https://polygonscan.com'],
            },
          ],
        });
      }
    } catch (err) {
      console.error('Failed to add Polygon network:', err);
    }
  };

  const switchToPolygon = async () => {
    try {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: POLYGON_CHAIN_ID }],
        });
      }
    } catch (err: any) {
      // If Polygon network doesn't exist, add it
      if (err.code === 4902) {
        await addPolygonNetwork();
      } else {
        console.error('Failed to switch to Polygon:', err);
      }
    }
  };

  const connectWallet = async () => {
    setErrorMsg(null);
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          
          // Ensure user is on Polygon network
          try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== POLYGON_CHAIN_ID) {
              await switchToPolygon();
            }
          } catch (err) {
            console.error('Failed to check/switch network:', err);
          }
        }
      } catch (err: any) {
        console.error("Wallet connection failed:", err);
        setErrorMsg(err.message || 'Connection failed');
        setTimeout(() => setErrorMsg(null), 3000);
      }
    } else {
      setErrorMsg('MetaMask not found!');
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className={`px-6 py-2 rounded-full font-semibold transition-all shadow-lg text-white ${
        errorMsg 
          ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50'
          : 'bg-green-500 hover:bg-green-600 shadow-green-500/50'
      }`}
    >
      {errorMsg ? errorMsg : address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect MetaMask'}
    </button>
  );
}
