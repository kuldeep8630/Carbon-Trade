import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Award, Recycle, Download } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WalletStats from '../components/WalletStats';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  const portfolioData = [
    { month: 'Jan', credits: 120, value: 2400 },
    { month: 'Feb', credits: 190, value: 3800 },
    { month: 'Mar', credits: 300, value: 6000 },
    { month: 'Apr', credits: 280, value: 5600 },
    { month: 'May', credits: 450, value: 9000 },
    { month: 'Jun', credits: 520, value: 10400 },
  ];

  const projectTypeData = [
    { name: 'Renewable Energy', value: 45, color: '#10B981' },
    { name: 'Forest Conservation', value: 30, color: '#059669' },
    { name: 'Waste Management', value: 15, color: '#047857' },
    { name: 'Agriculture', value: 10, color: '#065F46' },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'purchase',
      project: 'Solar Farm Initiative',
      amount: 50,
      price: 18.2,
      date: '2024-02-15',
      status: 'completed',
    },
    {
      id: '2',
      type: 'retirement',
      project: 'Amazon Rainforest Conservation',
      amount: 25,
      price: 25.5,
      date: '2024-02-14',
      status: 'completed',
    },
    {
      id: '3',
      type: 'purchase',
      project: 'Wind Energy Project',
      amount: 100,
      price: 22.8,
      date: '2024-02-13',
      status: 'pending',
    },
  ];

  const retiredCredits = [
    {
      id: '1',
      project: 'Amazon Rainforest Conservation',
      amount: 25,
      retiredDate: '2024-02-14',
      certificateId: 'CERT-2024-001',
    },
    {
      id: '2',
      project: 'Solar Farm Initiative',
      amount: 30,
      retiredDate: '2024-02-10',
      certificateId: 'CERT-2024-002',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-lg text-gray-600">
            Track your carbon credit portfolio and environmental impact
          </p>
        </div>

        {/* Wallet Stats */}
        <div className="mb-8">
          <WalletStats
            balance={125.4567}
            totalCredits={1250}
            retiredCredits={55}
            portfolioValue={28750}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Growth Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Portfolio Growth</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="7d">7 days</option>
                <option value="30d">30 days</option>
                <option value="90d">90 days</option>
                <option value="1y">1 year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="credits" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Project Types Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Credits by Project Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity and Retired Credits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${
                      transaction.type === 'purchase' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {transaction.type === 'purchase' ? (
                        <TrendingUp className={`h-5 w-5 ${
                          transaction.type === 'purchase' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      ) : (
                        <Recycle className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.project}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.type === 'purchase' ? 'Purchased' : 'Retired'} {transaction.amount} credits
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {transaction.price * transaction.amount} MATIC
                    </p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retired Credits */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Retired Credits</h2>
            <div className="space-y-4">
              {retiredCredits.map((credit) => (
                <div key={credit.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{credit.project}</p>
                      <p className="text-sm text-gray-600">{credit.amount} credits retired</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Retired
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      {credit.retiredDate}
                    </p>
                    <button className="flex items-center text-sm text-green-600 hover:text-green-700 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}