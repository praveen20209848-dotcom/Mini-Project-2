import React, { useState } from 'react';
import { Activity, ShieldAlert, Server, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, Badge } from '../components/ui';
import { systemStats, threatActivityData, threatDistribution, deviceData, recentThreats, liveEvents } from '../data/mockData';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('24h');

  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Logs" value={systemStats.totalLogsAnalyzed.toLocaleString()} icon={Activity} trend="+12%" color="text-primary" />
        <KPICard title="Threats Detected" value={systemStats.threatsDetected} icon={ShieldAlert} trend="-5%" color="text-warning" />
        <KPICard title="Critical Threats" value={systemStats.criticalThreats} icon={AlertTriangle} trend="+2" color="text-critical" glow />
        <KPICard title="Devices Monitored" value={systemStats.devicesMonitored} icon={Server} trend="Stable" color="text-accent" />
        <KPICard title="Suspicious Events" value={systemStats.suspiciousEvents} icon={Activity} trend="+18%" color="text-warning" />
        <div className="glass-card p-4 flex flex-col justify-center relative overflow-hidden border-warning/30">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-warning/10 rounded-full blur-xl"></div>
          <p className="text-sm text-muted font-medium mb-1">System Risk Score</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-warning">{systemStats.riskScore}</h3>
            <span className="text-sm text-muted mb-1">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Trend */}
        <Card className="lg:col-span-2">
          <CardHeader 
            title="Threat Activity Over Time" 
            action={
              <select 
                className="bg-surface border border-border rounded-md px-2 py-1 text-sm outline-none"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            } 
          />
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#121a2f', borderColor: '#1e293b' }} />
                <Area type="monotone" dataKey="normal" stroke="#10b981" fillOpacity={1} fill="url(#colorNormal)" name="Normal Events" />
                <Area type="monotone" dataKey="suspicious" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSuspicious)" name="Suspicious" />
                <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" name="Threats" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card>
          <CardHeader title="Threat Classification" />
          <CardContent className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#121a2f', borderColor: '#1e293b', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full grid grid-cols-2 gap-2 mt-4">
              {threatDistribution.slice(0,4).map(item => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Status */}
        <Card className="lg:col-span-2">
          <CardHeader title="Industrial Device Monitoring" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/50 border-b border-border text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">Device ID</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">IP Address</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {deviceData.slice(0, 5).map(dev => (
                  <tr key={dev.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-text">{dev.id}</td>
                    <td className="px-6 py-3 text-muted">{dev.type}</td>
                    <td className="px-6 py-3 font-mono text-xs text-muted">{dev.ip}</td>
                    <td className="px-6 py-3">
                      <Badge variant={dev.status === 'Online' ? 'success' : dev.status === 'Warning' ? 'warning' : 'danger'}>
                        {dev.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3">
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

        {/* Live Event Feed */}
        <Card>
          <CardHeader title="Live Security Events" subtitle="Real-time log stream" />
          <CardContent className="space-y-4">
            {liveEvents.map(event => (
              <div key={event.id} className="flex gap-3 items-start border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div className="mt-0.5">
                  {event.severity === 'success' ? <ShieldCheck className="w-4 h-4 text-success" /> :
                   event.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-warning" /> :
                   event.severity === 'critical' ? <ShieldAlert className="w-4 h-4 text-danger" /> :
                   <Activity className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{event.event}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                    <span>{event.time}</span>
                    <span>•</span>
                    <span className="font-mono">{event.device}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Threats */}
      <Card>
        <CardHeader title="Recent Security Threats" action={<button className="text-primary text-sm hover:underline">View All Threats</button>} />
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/50 border-b border-border text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">Timestamp</th>
                  <th className="px-6 py-3 font-medium">Threat ID</th>
                  <th className="px-6 py-3 font-medium">Threat Type</th>
                  <th className="px-6 py-3 font-medium">Target Device</th>
                  <th className="px-6 py-3 font-medium">Severity</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentThreats.map(threat => (
                  <tr key={threat.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4 text-muted">{threat.time}</td>
                    <td className="px-6 py-4 font-mono text-xs text-primary">{threat.id}</td>
                    <td className="px-6 py-4 text-text font-medium">{threat.type}</td>
                    <td className="px-6 py-4 font-mono text-xs text-muted">{threat.targetDevice}</td>
                    <td className="px-6 py-4">
                      <Badge variant={threat.severity === 'Critical' ? 'critical' : threat.severity === 'High' ? 'danger' : threat.severity === 'Medium' ? 'warning' : 'success'}>
                        {threat.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("text-xs font-medium", threat.status === 'Investigating' ? 'text-warning' : threat.status === 'Detected' ? 'text-danger' : 'text-success')}>
                        {threat.status}
                      </span>
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

function KPICard({ title, value, icon: Icon, trend, color, glow = false }: { title: string, value: string | number, icon: any, trend: string, color: string, glow?: boolean }) {
  return (
    <Card className={cn("p-4 relative overflow-hidden", glow ? "border-critical/30 glow-red" : "")}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-muted font-medium">{title}</p>
        <div className={cn("p-1.5 rounded-lg bg-surface/50", color)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-text">{value}</h3>
      <p className="text-xs text-muted mt-2">
        <span className={trend.startsWith('+') && !glow ? 'text-success' : trend.startsWith('+') && glow ? 'text-danger' : 'text-muted'}>{trend}</span> from last week
      </p>
    </Card>
  );
}
