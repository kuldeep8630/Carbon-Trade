import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Globe, TrendingUp, Users, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const { user, role } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Verified Projects',
      description: 'All carbon projects are verified by certified third-party validators ensuring authenticity and impact.',
    },
    {
      icon: Globe,
      title: 'Global Marketplace',
      description: 'Access carbon credits from projects worldwide, from renewable energy to forest conservation.',
    },
    {
      icon: TrendingUp,
      title: 'Transparent Pricing',
      description: 'Real-time market pricing with complete transparency on project costs and environmental impact.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with project developers, verifiers, and other buyers in our growing ecosystem.',
    },
  ];

  const stats = [
    { label: 'CO₂ Tons Offset', value: '2.5M+' },
    { label: 'Active Projects', value: '150+' },
    { label: 'Verified Credits', value: '1.2M+' },
    { label: 'Global Users', value: '5,000+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Trade Carbon Credits
                <span className="block text-green-200">On The Blockchain</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
                Join the world's first decentralized carbon credit marketplace. 
                Verify, trade, and retire carbon credits with complete transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <>
                    <Link
                      to="/marketplace"
                      className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                    >
                      Explore Marketplace
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    {role === 'user' && (
                      <Link
                        to="/projects"
                        className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors"
                      >
                        Submit Project
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/login?role=user"
                        className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                      >
                        Login as User
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                      <Link
                        to="/login?role=verifier"
                        className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors"
                      >
                        Login as Verifier
                      </Link>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-green-200">Don't have an account? </span>
                      <Link to="/register" className="text-white underline hover:text-green-200">
                        Register here
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose CarbonTrade?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our blockchain-powered platform ensures transparency, security, and efficiency 
                in every carbon credit transaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple steps to participate in the carbon credit ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit & Verify</h3>
                <p className="text-gray-600">
                  Project developers submit carbon reduction projects for third-party verification
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mint & Trade</h3>
                <p className="text-gray-600">
                  Verified projects mint carbon credit tokens that can be traded on our marketplace
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Retire & Impact</h3>
                <p className="text-gray-600">
                  Buyers retire credits to offset their carbon footprint and receive certificates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {user ? 'Ready to Make an Impact?' : 'Join the Movement'}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {user 
                ? 'Continue trading carbon credits and fighting climate change'
                : 'Join thousands of users already trading carbon credits and fighting climate change'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link
                    to="/marketplace"
                    className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Start Trading
                  </Link>
                  {role === 'user' && (
                    <Link
                      to="/projects"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors"
                    >
                      <Leaf className="mr-2 h-5 w-5" />
                      Submit Project
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}