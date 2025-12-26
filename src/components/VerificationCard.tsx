import React from 'react';
import { Calendar, MapPin, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

interface VerificationCardProps {
  id: string;
  projectName: string;
  developer: string;
  location: string;
  projectType: string;
  estimatedCO2: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const VerificationCard: React.FC<VerificationCardProps> = ({
  id,
  projectName,
  developer,
  location,
  projectType,
  estimatedCO2,
  submittedDate,
  status,
  documents,
  onApprove,
  onReject,
  onViewDetails,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{projectName}</h3>
          <p className="text-sm text-gray-600">Developer: {developer}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">Submitted {submittedDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Project Type</p>
          <p className="font-medium text-gray-900">{projectType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Estimated CO₂ Reduction</p>
          <p className="font-medium text-gray-900">{estimatedCO2.toLocaleString()} tons/year</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FileText className="h-4 w-4 mr-2 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Documents ({documents.length})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {documents.slice(0, 3).map((doc, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {doc}
            </span>
          ))}
          {documents.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{documents.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onViewDetails(id)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          View Details
        </button>
        {status === 'pending' && (
          <>
            <button
              onClick={() => onReject(id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Approve
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationCard;