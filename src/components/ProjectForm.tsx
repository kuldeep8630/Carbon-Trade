import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, FileText, MapPin, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const projectSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  projectType: z.string().min(1, 'Project type is required'),
  estimatedCO2: z.number().min(1, 'Estimated CO₂ reduction must be greater than 0'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  methodology: z.string().min(1, 'Methodology is required'),
  documents: z.any().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  isLoading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading = false }) => {
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const projectTypes = [
    'Renewable Energy',
    'Forest Conservation',
    'Reforestation',
    'Energy Efficiency',
    'Waste Management',
    'Agriculture',
    'Transportation',
    'Industrial Process',
  ];

  const methodologies = [
    'VCS (Verified Carbon Standard)',
    'CDM (Clean Development Mechanism)',
    'Gold Standard',
    'Climate Action Reserve',
    'American Carbon Registry',
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Starting file upload:', file.name, file.size, file.type);

    setUploading(true);
    try {
      // Use Pinata API directly for browser compatibility
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({
        name: file.name,
        keyvalues: {
          uploadedAt: new Date().toISOString(),
          fileSize: file.size.toString(),
          fileType: file.type
        }
      }));
      formData.append('pinataOptions', JSON.stringify({
        cidVersion: 1
      }));

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
          'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message || 'Upload failed'}`);
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      setIpfsHash(result.IpfsHash);
      toast.success(`File uploaded to IPFS: ${result.IpfsHash}`);
    } catch (error: any) {
      console.error('IPFS upload error details:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);

      let errorMessage = 'Failed to upload file to IPFS';
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        errorMessage = 'Invalid Pinata API credentials - check your keys';
      } else if (error.message?.includes('network') || error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error - check your internet connection';
      } else if (error.message?.includes('413')) {
        errorMessage = 'File too large for Pinata free tier';
      }

      toast.error(errorMessage + (error.message ? `: ${error.message}` : ''));
    } finally {
      setUploading(false);
    }
  };

  const onSubmitForm = (data: ProjectFormData) => {
    onSubmit({ ...data, documents: ipfsHash });
  };

  const testPinataConnection = async () => {
    try {
      console.log('Testing Pinata connection...');
      // Test with a simple JSON pin using direct API
      const testData = { test: 'connection', timestamp: Date.now() };

      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
          'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
        },
        body: JSON.stringify({
          pinataContent: testData,
          pinataMetadata: {
            name: 'connection-test'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Pinata test successful:', result);
      toast.success('Pinata connection successful!');
      return true;
    } catch (error: any) {
      console.error('Pinata test failed:', error);
      toast.error('Pinata connection failed: ' + error.message);
      return false;
    }
  };

  // Test connection on component mount
  React.useEffect(() => {
    // Temporarily disabled to prevent blank page
    // testPinataConnection();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            {...register('projectName')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Location *
          </label>
          <input
            {...register('location')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="City, Country"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Describe your carbon reduction project..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            Project Type *
          </label>
          <select
            {...register('projectType')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="estimatedCO2" className="block text-sm font-medium text-gray-700 mb-2">
            Estimated CO₂ Reduction (tons/year) *
          </label>
          <input
            {...register('estimatedCO2', { valueAsNumber: true })}
            type="number"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="1000"
          />
          {errors.estimatedCO2 && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedCO2.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Project Start Date *
          </label>
          <input
            {...register('startDate')}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Project End Date *
          </label>
          <input
            {...register('endDate')}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="methodology" className="block text-sm font-medium text-gray-700 mb-2">
          Methodology *
        </label>
        <select
          {...register('methodology')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select methodology</option>
          {methodologies.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
        {errors.methodology && (
          <p className="mt-1 text-sm text-red-600">{errors.methodology.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline h-4 w-4 mr-1" />
          Supporting Documents
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-400 transition-colors">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="documents"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>{uploading ? 'Uploading...' : 'Upload file'}</span>
                <input
                  id="documents"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, XLS up to 10MB</p>
            {ipfsHash && <p className="text-xs text-green-600">File uploaded: {ipfsHash.slice(0, 10)}...</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Submitting...' : 'Submit Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;