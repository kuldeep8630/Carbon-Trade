import React from 'react';
import { MapPin, Calendar, CheckCircle, DollarSign } from 'lucide-react';

interface CreditCardProps {
  id: string;
  projectName: string;
  location: string;
  co2Saved: number;
  price: number;
  verifier: string;
  projectType: string;
  issuedDate: string;
  imageUrl: string;
  onBuy: (id: string) => void;
}

const CreditCard: React.FC<CreditCardProps> = ({
  id,
  projectName,
  location,
  co2Saved,
  price,
  verifier,
  projectType,
  issuedDate,
  imageUrl,
  onBuy,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={projectName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {projectType}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{projectName}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">Issued {issuedDate}</span>
        </div>

        <div className="flex items-center text-green-600 mb-4">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span className="text-sm">Verified by {verifier}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
            <p className="text-lg font-semibold text-gray-900">{co2Saved.toLocaleString()} tons</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Price</p>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">{price} MATIC</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onBuy(id)}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Buy Credits
        </button>
      </div>
    </div>
  );
};

export default CreditCard;