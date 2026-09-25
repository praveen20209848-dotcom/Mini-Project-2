import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, Server, AlertTriangle, ShieldCheck, ArrowRight, ArrowDown, Cpu, FileUp, Filter, Binary, Search, FileKey, Shield } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, Badge } from '../components/ui';
import { deviceData, liveEvents } from '../data/mockData';
import { cn } from '../lib/utils';
import { useAnalysis, type LogRecord } from '../context/AnalysisContext';

const PIPELINE_STAGES = [
  {
    step: 1,
    title: 'Log Upload',
    desc: 'Collect industrial security logs',
    icon: FileUp,
    badge: 'Ingress',
  },
  {
    step: 2,
    title: 'Data Preprocessing',
    desc: 'Clean and prepare log data',
    icon: Filter,
    badge: 'ETL',
  },
  {
    step: 3,
    title: 'Feature Extraction',
    desc: 'Extract network and device behavior',
    icon: Binary,
    badge: 'Vectors',
  },
  {
    step: 4,
    title: 'ML Anomaly Detection',
    desc: 'Identify unusual activity',
    icon: Search,
    badge: 'ML Score',
  },
  {
    step: 5,
    title: 'Potential Threat Classification',
    desc: 'Classify potential threats',
    icon: FileKey,
    badge: 'Classification',
  },
  {
    step: 6,
    title: 'Risk Assessment',
    desc: 'Estimate severity and risk',
    icon: Shield,
    badge: 'Scoring',
  },
];

export default function Dashboard() {
  const { analysis } = useAnalysis();
  const [timeFilter, setTimeFilter] = useState('24h');

  const stats = analysis ? analysis.stats : null;
  const recentThreatsList = analysis ? analysis.threats : [];
  const threatDistributionData = analysis ? analysis.threatDistribution : [];
  const threatActivityTrend = analysis ? analysis.threatActivityData : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Project Wording */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface/60 border border-border p-4 rounded-xl gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text">Industrial Cyber Threat Log Analyzer</h3>
            <p className="text-xs text-muted">
              AI-powered analysis of synthetic industrial cybersecurity logs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info" className="font-mono text-[11px]">
            Synthetic Industrial Security Logs
          </Badge>
          <span className="text-xs text-muted font-mono bg-background px-2.5 py-1 rounded border border-border">
            Model: {analysis ? analysis.modelName : 'Multivariate Outlier ML Model'}
          </span>
        </div>
      </div>

      {/* Empty State Banner if no analysis */}
      {!stats ? (
        <Card className="p-8 text-center bg-surface/40 border-warning/30 space-y-4">
          <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-text">No log analysis available</h3>
          <p className="text-sm text-muted max-w-md mx-auto">
            Run an analysis using synthetic or uploaded industrial security CSV logs to populate the dynamic dashboard.
          </p>
          <Link
            to="/analyzer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
          >
            Go to Log Analyzer <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
      ) : (
        /* KPI Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard title="Total Logs" value={stats.totalLogs.toLocaleString()} icon={Activity} trend="+12%" color="text-primary" />
          <KPICard title="Threats Detected" value={stats.threatsDetected} icon={ShieldAlert} trend="-5%" color="text-warning" />
          <KPICard title="Critical Threats" value={stats.criticalThreats} icon={AlertTriangle} trend="+2" color="text-critical" glow />
          <KPICard title="Devices Monitored" value={stats.devicesMonitored} icon={Server} trend="Stable" color="text-accent" />
          <KPICard title="Suspicious Events" value={stats.suspiciousEvents} icon={Activity} trend="+18%" color="text-warning" />
          <div className="glass-card p-4 flex flex-col justify-center relative overflow-hidden border-warning/30">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-warning/10 rounded-full blur-xl"></div>
            <p className="text-sm text-muted font-medium mb-1">System Risk Score</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-warning">{stats.riskScore}</h3>
              <span className="text-sm text-muted mb-1">/100</span>
            </div>
            <p className="text-[10px] text-muted/80 mt-1">Calculated dynamically from ML threat density</p>
          </div>
        </div>
      )}

      {/* AI THREAT DETECTION PIPELINE SECTION */}
      <Card className="border-primary/20 bg-surface/60">
        <CardHeader
          title="AI Threat Detection Pipeline"
          subtitle="Sequential log ingestion, behavioral feature extraction, and ML anomaly scoring"
          action={
            <Badge variant="info" className="font-mono text-xs">
              6 Automated Stages
            </Badge>
          }
        />
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {PIPELINE_STAGES.map((stage, idx) => {
              const IconComponent = stage.icon;
              return (
                <div key={stage.step} className="relative group">
                  <div className="bg-background/70 border border-border hover:border-primary/50 transition-all p-4 rounded-xl flex flex-col h-full space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold font-mono">
                        0{stage.step}
                      </span>
                      <span className="text-[10px] text-muted font-mono bg-surface px-2 py-0.5 rounded border border-border">
                        {stage.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-text">
                      <div className="p-2 bg-surface rounded-lg text-primary shrink-0 border border-border/50">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold leading-snug">{stage.title}</h4>
                    </div>

                    <p className="text-[11px] text-muted leading-relaxed flex-1">
                      "{stage.desc}"
                    </p>
                  </div>

                  {/* Horizontal Arrow Indicator for Desktop */}
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted/40">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                  {/* Down Arrow for Mobile */}
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="flex lg:hidden justify-center my-1 text-muted/40">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Trend */}
        <Card className="lg:col-span-2">
          <CardHeader 
            title="Threat Activity Over Time" 
            action={
              <select 
                className="bg-surface border border-border rounded-md px-2 py-1 text-sm outline-none text-text"
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
              <AreaChart data={threatActivityTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                <Area type="monotone" dataKey="suspicious" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSuspicious)" name="Anomalous Activity" />
                <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" name="Potential Threats" />
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
                  data={threatDistributionData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatDistributionData.map((entry: { name: string; value: number; color: string }, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#121a2f', borderColor: '#1e293b', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full grid grid-cols-2 gap-2 mt-4">
              {threatDistributionData.slice(0, 4).map((item: { name: string; value: number; color: string }) => (
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
          <CardHeader title="Industrial Device Monitoring" subtitle="Purdue Model Level 1 & Level 2 Controllers" />
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
        <CardHeader 
          title="Recent Security Threats" 
          action={
            <Link to="/threats" className="text-primary text-sm hover:underline font-medium">
              View All Threats →
            </Link>
          } 
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 border-b border-border text-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Threat ID</th>
                <th className="px-6 py-3 font-medium">Threat Type</th>
                <th className="px-6 py-3 font-medium">Target Device</th>
                <th className="px-6 py-3 font-medium">Anomaly Score</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {recentThreatsList.slice(0, 5).map((threat: LogRecord) => (
                <tr key={threat.id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4 text-muted">{threat.timestamp}</td>
                  <td className="px-6 py-4 font-mono text-xs text-primary">{threat.id}</td>
                  <td className="px-6 py-4 text-text font-medium">{threat.eventType}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted">{threat.deviceId}</td>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-danger">
                    {threat.anomalyScore.toFixed(2)}
                  </td>
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
        <span className={trend.startsWith('+') && !glow ? 'text-success' : trend.startsWith('+') && glow ? 'text-danger' : 'text-muted'}>{trend}</span> from baseline
      </p>
    </Card>
  );
}
