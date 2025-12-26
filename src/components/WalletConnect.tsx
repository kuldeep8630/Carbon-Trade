import React, { useState } from 'react'
import { connectWallet } from '../lib/ethers'
import { toast } from 'react-toastify'

interface WalletConnectProps {
  onConnect: (address: string) => void
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const walletAddress = await connectWallet()
      setAddress(walletAddress)
      onConnect(walletAddress)
      toast.success('Wallet connected successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet')
    } finally {
      setConnecting(false)
    }
  }

  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      {connecting ? 'Connecting...' : address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  )
}

export default WalletConnect