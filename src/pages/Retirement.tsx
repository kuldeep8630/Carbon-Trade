import React, { useState } from 'react';
import { Award, Download, Calendar, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

export default function Retirement() {
  const [selectedCredits, setSelectedCredits] = useState<string[]>([]);
  const [retirementReason, setRetirementReason] = useState('');

  const ownedCredits = [
    {
      id: '1',
      projectName: 'Solar Farm Initiative',
      amount: 50,
      purchaseDate: '2024-02-15',
      price: 18.2,
      location: 'California, USA',
      projectType: 'Renewable Energy',
    },
    {
      id: '2',
      projectName: 'Amazon Rainforest Conservation',
      amount: 75,
      purchaseDate: '2024-02-10',
      price: 25.5,
      location: 'Brazil',
      projectType: 'Forest Conservation',
    },
    {
      id: '3',
      projectName: 'Wind Energy Project',
      amount: 100,
      purchaseDate: '2024-02-05',
      price: 22.8,
      location: 'Texas, USA',
      projectType: 'Renewable Energy',
    },
  ];

  const retiredCredits = [
    {
      id: 'ret-1',
      projectName: 'Mangrove Restoration',
      amount: 25,
      retiredDate: '2024-02-14',
      certificateId: 'CERT-2024-001',
      reason: 'Corporate carbon neutrality initiative',
    },
    {
      id: 'ret-2',
      projectName: 'Waste-to-Energy Plant',
      amount: 30,
      retiredDate: '2024-02-10',
      certificateId: 'CERT-2024-002',
      reason: 'Annual carbon footprint offset',
    },
  ];

  const handleCreditSelection = (creditId: string) => {
    setSelectedCredits(prev => 
      prev.includes(creditId) 
        ? prev.filter(id => id !== creditId)
        : [...prev, creditId]
    );
  };

  const handleRetirement = () => {
    if (selectedCredits.length === 0) {
      toast.error('Please select credits to retire');
      return;
    }
    if (!retirementReason.trim()) {
      toast.error('Please provide a reason for retirement');
      return;
    }

    toast.success('Credits retired successfully! Certificate will be generated.');
    setSelectedCredits([]);
    setRetirementReason('');
  };

  const totalSelectedCredits = selectedCredits.reduce((total, creditId) => {
    const credit = ownedCredits.find(c => c.id === creditId);
    return total + (credit?.amount || 0);
  }, 0);

  const downloadCertificate = (certificateId: string) => {
    toast.info(`Downloading certificate ${certificateId}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Credit Retirement</h1>
          <p className="text-lg text-gray-600">
            Retire your carbon credits to offset your carbon footprint and receive certificates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Credits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Credits</h2>
              <div className="space-y-4">
                {ownedCredits.map((credit) => (
                  <div
                    key={credit.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCredits.includes(credit.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handleCreditSelection(credit.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{credit.projectName}</h3>
                      <div className="flex items-center">
                        {selectedCredits.includes(credit.id) && (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        )}
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                          {credit.amount} credits
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p>Location: {credit.location}</p>
                        <p>Type: {credit.projectType}</p>
                      </div>
                      <div>
                        <p>Purchased: {credit.purchaseDate}</p>
                        <p>Price: {credit.price} MATIC each</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Retirement Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Retire Credits</h2>
              
              <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Selected Credits</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{totalSelectedCredits}</p>
                  <p className="text-sm text-green-700">credits to retire</p>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Retirement Reason *
                </label>
                <textarea
                  id="reason"
                  value={retirementReason}
                  onChange={(e) => setRetirementReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Corporate carbon neutrality initiative, Annual carbon footprint offset..."
                />
              </div>

              <button
                onClick={handleRetirement}
                disabled={selectedCredits.length === 0 || !retirementReason.trim()}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Retire {totalSelectedCredits} Credits
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Retired credits cannot be traded or transferred. You will receive a retirement certificate.
              </p>
            </div>
          </div>
        </div>

        {/* Retired Credits History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Retirement History</h2>
          <div className="space-y-4">
            {retiredCredits.map((credit) => (
              <div key={credit.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{credit.projectName}</h3>
                    <p className="text-sm text-gray-600">{credit.amount} credits retired</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Retired
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Reason:</p>
                  <p className="text-sm text-gray-900">{credit.reason}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {credit.retiredDate}
                  </div>
                  <button
                    onClick={() => downloadCertificate(credit.certificateId)}
                    className="flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Certificate
                  </button>
                </div>
              </div>
            ))}

            {retiredCredits.length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No retired credits yet</h3>
                <p className="text-gray-600">Retire your first credits to start making an environmental impact</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}