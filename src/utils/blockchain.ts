import { ethers } from 'ethers';
import CarbonCreditABI from './CarbonCreditABI.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const polygonRpcUrl = import.meta.env.VITE_POLYGON_RPC_URL || 'https://polygon-rpc.com/';

if (!contractAddress) {
  throw new Error('Missing contract address');
}

export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return new ethers.providers.JsonRpcProvider(polygonRpcUrl);
};

export const getSigner = async () => {
  const provider = getProvider();
  if (provider instanceof ethers.providers.Web3Provider) {
    await provider.send('eth_requestAccounts', []);
    return provider.getSigner();
  }
  throw new Error('MetaMask not available');
};

export const getContract = (signer?: ethers.Signer) => {
  const provider = getProvider();
  return new ethers.Contract(
    contractAddress,
    CarbonCreditABI,
    signer || provider
  );
};

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};

export const mintCredit = async (
  projectId: number,
  amount: number,
  certificateURI: string,
  to: string
) => {
  const signer = await getSigner();
  const contract = getContract(signer);
  const tx = await contract.mintCredit(projectId, amount, certificateURI, to);
  await tx.wait();
  return tx;
};

export const retireCredit = async (tokenId: number) => {
  const signer = await getSigner();
  const contract = getContract(signer);
  const tx = await contract.retireCredit(tokenId);
  await tx.wait();
  return tx;
};

export const transferCredit = async (to: string, tokenId: number) => {
  const signer = await getSigner();
  const contract = getContract(signer);
  const tx = await contract.transferCredit(to, tokenId);
  await tx.wait();
  return tx;
};

export const getCredit = async (tokenId: number) => {
  const contract = getContract();
  return await contract.getCredit(tokenId);
};