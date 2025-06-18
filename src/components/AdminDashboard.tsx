'use client';

import { useState } from 'react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CogIcon, 
  ShieldCheckIcon,
  BellIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Total Users', value: '2,543', change: '+12%', icon: UserGroupIcon },
    { name: 'Active Models', value: '12', change: '+3%', icon: ChartBarIcon },
    { name: 'System Health', value: '98%', change: '+2%', icon: ShieldCheckIcon },
    { name: 'API Requests', value: '1.2M', change: '+8%', icon: ChartPieIcon },
  ];

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-lg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <CogIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.name}</p>
                  <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <p className="text-green-500 text-sm mt-4">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">System Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <ChartBarIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white">Model Training #{i}</p>
                      <p className="text-sm text-gray-400">Completed successfully</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">2h ago</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-colors">
                Deploy New Model
              </button>
              <button className="w-full p-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 rounded-lg transition-colors">
                Update System
              </button>
              <button className="w-full p-3 bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 rounded-lg transition-colors">
                Backup Data
              </button>
              <button className="w-full p-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors">
                Monitor Performance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 