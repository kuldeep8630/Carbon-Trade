import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CarbonTrade</h1>
          <p className="text-xl text-gray-600">
            Work On Progress...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}