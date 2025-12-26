import React from 'react';
import { Wallet, TrendingUp, Award, Recycle } from 'lucide-react';

interface WalletStatsProps {
  balance: number;
  totalCredits: number;
  retiredCredits: number;
  portfolioValue: number;
}

const WalletStats: React.FC<WalletStatsProps> = ({
  balance,
  totalCredits,
  retiredCredits,
  portfolioValue,
}) => {
  const stats = [
    {
      name: 'MATIC Balance',
      value: balance.toFixed(4),
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Credits',
      value: totalCredits.toLocaleString(),
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Retired Credits',
      value: retiredCredits.toLocaleString(),
      icon: Recycle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Portfolio Value',
      value: `$${portfolioValue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletStats;