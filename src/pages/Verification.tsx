import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerificationCard from '../components/VerificationCard';
import { toast } from 'react-toastify';

export default function Verification() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const mockProjects = [
    {
      id: '1',
      projectName: 'Amazon Rainforest Conservation',
      developer: 'EcoForest Solutions',
      location: 'Brazil',
      projectType: 'Forest Conservation',
      estimatedCO2: 50000,
      submittedDate: '2024-02-01',
      status: 'pending' as const,
      documents: ['Project Design Document.pdf', 'Environmental Impact Assessment.pdf', 'Monitoring Plan.xlsx'],
    },
    {
      id: '2',
      projectName: 'Solar Farm Initiative',
      developer: 'SunPower Renewables',
      location: 'California, USA',
      projectType: 'Renewable Energy',
      estimatedCO2: 75000,
      submittedDate: '2024-01-28',
      status: 'approved' as const,
      documents: ['Technical Specifications.pdf', 'Financial Analysis.xlsx', 'Grid Connection Study.pdf'],
    },
    {
      id: '3',
      projectName: 'Waste-to-Energy Plant',
      developer: 'GreenTech Industries',
      location: 'Germany',
      projectType: 'Waste Management',
      estimatedCO2: 90000,
      submittedDate: '2024-01-25',
      status: 'pending' as const,
      documents: ['Process Flow Diagram.pdf', 'Emissions Calculations.xlsx', 'Regulatory Approvals.pdf', 'Site Survey.pdf'],
    },
    {
      id: '4',
      projectName: 'Wind Energy Project',
      developer: 'WindForce Energy',
      location: 'Texas, USA',
      projectType: 'Renewable Energy',
      estimatedCO2: 120000,
      submittedDate: '2024-01-20',
      status: 'rejected' as const,
      documents: ['Wind Resource Assessment.pdf', 'Turbine Specifications.pdf'],
    },
  ];

  const handleApprove = (projectId: string) => {
    toast.success('Project approved successfully! Carbon credits will be minted.');
  };

  const handleReject = (projectId: string) => {
    toast.error('Project rejected. Developer will be notified.');
  };

  const handleViewDetails = (projectId: string) => {
    toast.info('Opening project details...');
  };

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    pending: mockProjects.filter(p => p.status === 'pending').length,
    approved: mockProjects.filter(p => p.status === 'approved').length,
    rejected: mockProjects.filter(p => p.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Dashboard</h1>
          <p className="text-lg text-gray-600">
            Review and verify carbon reduction projects submitted by developers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Filter className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <Filter className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100">
                <Filter className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, developers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {mockProjects.length} projects
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <VerificationCard
              key={project.id}
              {...project}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}