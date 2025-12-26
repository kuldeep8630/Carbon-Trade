import { ethers } from 'ethers'

// Contract ABI - you'll need to replace this with your actual contract ABI
export const CONTRACT_ABI = [
  // Add your contract functions here
  "function mintCredits(address to, uint256 amount, string memory ipfsHash) public",
  "function transferCredits(address to, uint256 amount) public",
  "function balanceOf(address owner) public view returns (uint256)",
  // Add more functions as needed
]

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

export const getProvider = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed')
  }
  return new ethers.BrowserProvider(window.ethereum)
}

export const getSigner = async () => {
  const provider = await getProvider()
  return provider.getSigner()
}

export const getContract = async () => {
  const signer = await getSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed')
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return accounts[0]
}