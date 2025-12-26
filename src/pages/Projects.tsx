import React, { useState, useEffect } from 'react';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectForm from '../components/ProjectForm';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const testProjectInsert = async () => {
    if (!user) return;

    console.log('Testing project insert...');
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: 'Test Project',
          description: 'Test description',
          location: 'Test location',
          project_type: 'Test type',
          estimated_co2: 100,
          start_date: '2025-01-01',
          end_date: '2025-01-02',
          methodology: 'Test methodology',
        })
        .select();

      console.log('Test insert result:', { data, error });

      if (error) {
        console.error('Test insert failed:', error);
        alert(`Insert failed: ${error.message}`);
      } else {
        alert('Test insert successful!');
        // Clean up
        if (data && data[0]) {
          await supabase.from('projects').delete().eq('id', data[0].id);
        }
      }
    } catch (err) {
      console.error('Test error:', err);
      alert(`Test error: ${err}`);
    }
  };

  const fetchProjects = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (data: any) => {
    console.log('handleSubmit called with data:', data);
    console.log('Current user:', user);

    if (!user) {
      console.log('No user found, cannot submit');
      toast.error('Please log in to submit a project');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Submitting project to Supabase...');

      // First check if user profile exists
      console.log('Checking if user profile exists...');
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .single();

      console.log('Profile check result:', { profileData, profileError });

      if (profileError || !profileData) {
        console.error('Profile check failed:', profileError);
        
        // Try to create profile if it doesn't exist
        console.log('Attempting to create missing profile...');
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            role: 'user' // Default to user, can be updated later
          });

        if (createError) {
          console.error('Failed to create profile:', createError);
          throw new Error('Your user profile is missing and could not be created. Please try logging out and back in, or contact support.');
        }

        console.log('Profile created successfully');
        // Continue with submission
      }

      console.log('Profile exists with role:', profileData.role);
      console.log('Data being inserted:', {
        user_id: user.id,
        name: data.projectName,
        description: data.description,
        location: data.location,
        project_type: data.projectType,
        estimated_co2: data.estimatedCO2,
        start_date: data.startDate,
        end_date: data.endDate,
        methodology: data.methodology,
        documents_ipfs_hash: data.documents,
      });

      // Add timeout to catch hanging inserts
      const insertPromise = supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: data.projectName,
          description: data.description,
          location: data.location,
          project_type: data.projectType,
          estimated_co2: data.estimatedCO2,
          start_date: data.startDate,
          end_date: data.endDate,
          methodology: data.methodology,
          documents_ipfs_hash: data.documents,
        })
        .select();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Insert timeout after 8 seconds')), 8000)
      );

      console.log('Starting insert with timeout...');
      const { data: result, error } = await Promise.race([insertPromise, timeoutPromise]) as any;

      console.log('Insert completed!');
      console.log('Insert result:', { result, error });

      if (error) {
        console.error('Insert failed with error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        throw error;
      }

      if (!result || result.length === 0) {
        throw new Error('Insert succeeded but no data returned');
      }

      console.log('Project submitted successfully!');
      toast.success('Project submitted successfully! It will be reviewed by our verification team.');
      setShowForm(false);
      fetchProjects(); // Refresh projects
    } catch (error: any) {
      console.error('Submission error:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      toast.error(`Failed to submit project: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Projects</h1>
            <p className="text-lg text-gray-600">
              Submit and track your carbon reduction projects
            </p>
          </div>
          <div className="flex space-x-4">
            {/* <button
              onClick={testProjectInsert}
              className="flex items-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Insert
            </button> */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </button>
          </div>
        </div>

        {showForm ? (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit New Project</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <ProjectForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          </div>
        ) : (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">Loading projects...</div>
            ) : (
              <>
                {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600">{project.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Submitted Date</p>
                    <p className="font-medium text-gray-900">{new Date(project.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated CO₂ Reduction</p>
                    <p className="font-medium text-gray-900">{project.estimated_co2?.toLocaleString()} tons/year</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Methodology</p>
                    <p className="font-medium text-gray-900">{project.methodology}</p>
                  </div>
                </div>

                {project.status === 'rejected' && project.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-red-800">
                      <strong>Rejection Reason:</strong> {project.rejectionReason}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  {project.status === 'approved' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      View Credits
                    </button>
                  )}
                  {project.status === 'rejected' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Resubmit
                    </button>
                  )}
                </div>
              </div>
            ))}
              </>
            )}

            {projects.length === 0 && !loading && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-6">Submit your first carbon reduction project to get started</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Submit Project
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}