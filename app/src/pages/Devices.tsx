import React from 'react';
import { Server, Activity, AlertTriangle, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, Badge } from '../components/ui';
import { deviceData } from '../data/mockData';

export default function Devices() {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Industrial Devices</h2>
          <p className="text-muted text-sm mt-1">Status and risk levels of all connected industrial assets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Devices" value="42" icon={Server} color="text-primary" />
        <StatCard title="Online" value="38" icon={Activity} color="text-success" />
        <StatCard title="Warning State" value="3" icon={AlertTriangle} color="text-warning" />
        <StatCard title="Offline" value="1" icon={Cpu} color="text-muted" />
      </div>

      <Card>
        <CardHeader title="Device Inventory" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 border-b border-border text-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Device ID</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">IP Address</th>
                <th className="px-6 py-3 font-medium">Last Activity</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {deviceData.map(dev => (
                <tr key={dev.id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{dev.id}</td>
                  <td className="px-6 py-4 text-muted">{dev.type}</td>
                  <td className="px-6 py-4 text-muted">{dev.location}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted">{dev.ip}</td>
                  <td className="px-6 py-4 text-muted text-xs">{dev.lastActivity}</td>
                  <td className="px-6 py-4">
                    <Badge variant={dev.status === 'Online' ? 'success' : dev.status === 'Warning' ? 'warning' : 'danger'}>
                      {dev.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={dev.risk === 'Critical' ? 'critical' : dev.risk === 'High' ? 'danger' : dev.risk === 'Medium' ? 'warning' : 'success'}>
                      {dev.risk}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) {
  return (
    <Card className="p-4 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-surface/80 border border-border ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted font-medium">{title}</p>
        <p className="text-2xl font-bold text-text">{value}</p>
      </div>
    </Card>
  );
}
