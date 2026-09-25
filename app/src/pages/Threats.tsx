import { useState } from 'react';
import { Search, Filter, ShieldAlert, CheckCircle, AlertTriangle, X, Cpu, Info } from 'lucide-react';
import { Card, CardHeader, Badge } from '../components/ui';
import { cn } from '../lib/utils';
import { useAnalysis, type LogRecord } from '../context/AnalysisContext';

export default function Threats() {
  const { analysis } = useAnalysis();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<LogRecord | null>(null);

  const threatsList = analysis ? analysis.threats : [];

  const filteredThreats = threatsList.filter(threat => 
    threat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.sourceIp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalCount = threatsList.filter(t => t.severity === 'Critical').length;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-text">Threat Management</h2>
            <Badge variant="info" className="text-[10px] font-mono">
              Synthetic Industrial Logs • ML Anomaly Scores
            </Badge>
          </div>
          <p className="text-muted text-sm mt-1">Review ML anomaly scores, parameter deviations, and threat vectors across OT controllers.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-critical/10 text-danger px-4 py-2 rounded-lg border border-critical/20">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-semibold">{criticalCount} Critical Threats</span>
          </div>
        </div>
      </div>

      {/* Threats Table Card */}
      <Card>
        <CardHeader 
          title="All Detected Threats & Outlier Events" 
          subtitle="ML Anomaly Scores generated from multivariate outlier feature vector model"
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
                <th className="px-5 py-3 font-medium">Timestamp</th>
                <th className="px-5 py-3 font-medium">Threat ID</th>
                <th className="px-5 py-3 font-medium">Event Type</th>
                <th className="px-5 py-3 font-medium">Source IP</th>
                <th className="px-5 py-3 font-medium">Target Asset</th>
                <th className="px-5 py-3 font-medium">Anomaly Score</th>
                <th className="px-5 py-3 font-medium">Severity</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredThreats.map(threat => (
                <tr key={threat.id} className="hover:bg-surface/30 transition-colors group">
                  <td className="px-5 py-4 text-muted whitespace-nowrap">{threat.timestamp}</td>
                  <td className="px-5 py-4 font-mono text-xs text-primary font-semibold">{threat.id}</td>
                  <td className="px-5 py-4 text-text font-medium">{threat.eventType}</td>
                  <td className="px-5 py-4 font-mono text-xs text-muted">{threat.sourceIp}</td>
                  <td className="px-5 py-4 font-mono text-xs text-muted">{threat.deviceId}</td>
                  
                  {/* Anomaly Score Column */}
                  <td className="px-5 py-4 font-mono text-xs">
                    <span className={cn(
                      "px-2.5 py-1 rounded font-bold",
                      threat.anomalyScore >= 0.85 ? "bg-danger/20 text-danger border border-danger/30" :
                      threat.anomalyScore >= 0.65 ? "bg-warning/20 text-warning border border-warning/30" :
                      "bg-primary/20 text-primary border border-primary/30"
                    )}>
                      {threat.anomalyScore.toFixed(2)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={threat.severity === 'Critical' ? 'critical' : threat.severity === 'High' ? 'danger' : threat.severity === 'Medium' ? 'warning' : 'success'}>
                      {threat.severity}
                    </Badge>
                  </td>

                  <td className="px-5 py-4">
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

                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => setSelectedThreat(threat)}
                      className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* THREAT DETAILS MODAL */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text">THREAT DETAILS</h3>
                  <p className="text-xs text-muted font-mono">{selectedThreat.id} • {selectedThreat.eventType}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedThreat(null)}
                className="text-muted hover:text-text p-1.5 rounded-lg hover:bg-surface/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-background/60 p-4 rounded-xl border border-border">
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Threat ID</p>
                <p className="text-xs font-semibold text-primary font-mono">{selectedThreat.id}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Event Type</p>
                <p className="text-xs font-semibold text-text">{selectedThreat.eventType}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Timestamp</p>
                <p className="text-xs font-semibold text-muted font-mono">{selectedThreat.timestamp}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Protocol</p>
                <p className="text-xs font-semibold text-accent font-mono">{selectedThreat.protocol}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Source IP</p>
                <p className="text-xs font-mono text-text">{selectedThreat.sourceIp}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Target Asset</p>
                <p className="text-xs font-mono text-primary">{selectedThreat.deviceId}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Severity</p>
                <Badge variant={selectedThreat.severity === 'Critical' ? 'critical' : selectedThreat.severity === 'High' ? 'danger' : selectedThreat.severity === 'Medium' ? 'warning' : 'success'}>
                  {selectedThreat.severity}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase font-mono">Status</p>
                <p className="text-xs font-semibold text-warning">{selectedThreat.status}</p>
              </div>
            </div>

            {/* Detection Information Box */}
            <div className="bg-surface/80 border border-primary/30 p-4 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" /> Detection Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-background rounded-lg border border-border">
                  <p className="text-[10px] text-muted">Detection Method</p>
                  <p className="font-semibold text-text mt-0.5">Multivariate Outlier ML Model</p>
                </div>
                <div className="p-2.5 bg-background rounded-lg border border-border">
                  <p className="text-[10px] text-muted">Anomaly Score</p>
                  <p className="font-bold text-danger font-mono text-base mt-0.5">{selectedThreat.anomalyScore.toFixed(2)}</p>
                </div>
                <div className="p-2.5 bg-background rounded-lg border border-border">
                  <p className="text-[10px] text-muted">Visual Severity</p>
                  <div className="mt-1">
                    <SeverityPill severity={selectedThreat.severity} />
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Explanation Box */}
            <div className="bg-surface/80 border border-border p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-accent" /> ML Feature Vector Explanation
              </h4>
              <p className="text-xs text-muted leading-relaxed bg-background/50 p-3 rounded-lg border border-border/50">
                "{selectedThreat.explanation}"
              </p>
              <p className="text-[11px] text-muted italic">
                Note: ML Anomaly Score is computed using a 4D feature vector [External IP Ingress, Modbus Function Risk, Operating Speed RPM Deviation, Asset Criticality].
              </p>
            </div>

            {/* Prototype Disclaimer */}
            <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
              <span className="text-muted font-mono text-[11px]">
                Synthetic Industrial Logs • Representative ML Detection
              </span>
              <button 
                onClick={() => setSelectedThreat(null)}
                className="bg-surface hover:bg-surface/80 border border-border text-text px-4 py-1.5 rounded-lg text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SeverityPill({ severity }: { severity: 'Critical' | 'High' | 'Medium' | 'Low' }) {
  const colors = {
    Critical: 'bg-critical/20 text-danger border-critical/50 font-bold',
    High: 'bg-danger/20 text-danger border-danger/40 font-semibold',
    Medium: 'bg-warning/20 text-warning border-warning/40 font-medium',
    Low: 'bg-success/20 text-success border-success/40 font-normal',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] border ${colors[severity]}`}>
      {severity} Indicator
    </span>
  );
}
