import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, Badge } from '../components/ui';
import { recentThreats, systemStats } from '../data/mockData';
import { cn } from '../lib/utils';

export default function Threats() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Threat Management</h2>
          <p className="text-muted text-sm mt-1">Monitor, investigate, and resolve detected security threats.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-critical/10 text-danger px-4 py-2 rounded-lg border border-critical/20">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-semibold">{systemStats.criticalThreats} Critical Threats</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader 
          title="All Detected Threats" 
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search threats..." 
                  className="bg-background border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 bg-surface hover:bg-surface/80 border border-border text-text px-3 py-1.5 rounded-md text-sm transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 border-b border-border text-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Threat ID</th>
                <th className="px-6 py-3 font-medium">Threat Type</th>
                <th className="px-6 py-3 font-medium">Source IP</th>
                <th className="px-6 py-3 font-medium">Target Device</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {recentThreats.map(threat => (
                <tr key={threat.id} className="hover:bg-surface/30 transition-colors group">
                  <td className="px-6 py-4 text-muted whitespace-nowrap">{threat.time}</td>
                  <td className="px-6 py-4 font-mono text-xs text-primary font-medium">{threat.id}</td>
                  <td className="px-6 py-4 text-text font-medium">{threat.type}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted">{threat.sourceIp}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted">{threat.targetDevice}</td>
                  <td className="px-6 py-4">
                    <Badge variant={threat.severity === 'Critical' ? 'critical' : threat.severity === 'High' ? 'danger' : threat.severity === 'Medium' ? 'warning' : 'success'}>
                      {threat.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-xs font-medium flex items-center gap-1.5", 
                      threat.status === 'Investigating' ? 'text-warning' : 
                      threat.status === 'Detected' ? 'text-danger' : 'text-success'
                    )}>
                      {threat.status === 'Resolved' && <CheckCircle className="w-3.5 h-3.5" />}
                      {threat.status === 'Investigating' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {threat.status === 'Detected' && <ShieldAlert className="w-3.5 h-3.5" />}
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">Details</button>
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
