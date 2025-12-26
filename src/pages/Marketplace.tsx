import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreditCard from '../components/CreditCard';
import { toast } from 'react-toastify';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const mockCredits = [
    {
      id: '1',
      projectName: 'Amazon Rainforest Conservation',
      location: 'Brazil',
      co2Saved: 50000,
      price: 25.5,
      verifier: 'Verra',
      projectType: 'Forest Conservation',
      issuedDate: '2024-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      projectName: 'Solar Farm Initiative',
      location: 'California, USA',
      co2Saved: 75000,
      price: 18.2,
      verifier: 'Gold Standard',
      projectType: 'Renewable Energy',
      issuedDate: '2024-02-01',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      projectName: 'Wind Energy Project',
      location: 'Texas, USA',
      co2Saved: 120000,
      price: 22.8,
      verifier: 'Climate Action Reserve',
      projectType: 'Renewable Energy',
      issuedDate: '2024-01-28',
      imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      projectName: 'Reforestation Program',
      location: 'Kenya',
      co2Saved: 35000,
      price: 15.0,
      verifier: 'Verra',
      projectType: 'Reforestation',
      issuedDate: '2024-02-10',
      imageUrl: 'https://placehold.co/400x300',
    },
    {
      id: '5',
      projectName: 'Waste-to-Energy Plant',
      location: 'Germany',
      co2Saved: 90000,
      price: 28.5,
      verifier: 'Gold Standard',
      projectType: 'Waste Management',
      issuedDate: '2024-01-20',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    },
    {
      id: '6',
      projectName: 'Mangrove Restoration',
      location: 'Philippines',
      co2Saved: 42000,
      price: 20.3,
      verifier: 'Verra',
      projectType: 'Forest Conservation',
      issuedDate: '2024-02-05',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    },
  ];

  const projectTypes = [
    'All Types',
    'Renewable Energy',
    'Forest Conservation',
    'Reforestation',
    'Waste Management',
    'Energy Efficiency',
    'Agriculture',
  ];

  const handleBuy = (creditId: string) => {
    toast.success('Credit purchase initiated! Please confirm in your wallet.');
  };

  const filteredCredits = mockCredits.filter((credit) => {
    const matchesSearch = credit.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || selectedType === 'All Types' || credit.projectType === selectedType;
    const matchesPrice = credit.price >= priceRange[0] && credit.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Carbon Credit Marketplace</h1>
          <p className="text-lg text-gray-600">
            Discover and purchase verified carbon credits from projects around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type === 'All Types' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (MATIC)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCredits.length} of {mockCredits.length} carbon credit projects
          </p>
        </div>

        {/* Credit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredits.map((credit) => (
            <CreditCard
              key={credit.id}
              {...credit}
              onBuy={handleBuy}
            />
          ))}
        </div>

        {filteredCredits.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No credits found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}