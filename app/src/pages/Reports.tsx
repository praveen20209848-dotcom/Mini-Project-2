import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui';
import { systemStats } from '../data/mockData';

export default function Reports() {
  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">System Reports</h2>
          <p className="text-muted text-sm mt-1">Generate and export security analysis reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface hover:bg-surface/80 border border-border text-text px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <Card className="bg-surface/40">
        <CardHeader title="Industrial Cybersecurity Analysis Report" subtitle={`Generated on ${new Date().toLocaleDateString()}`} />
        <CardContent className="space-y-8 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted">Total Logs Analyzed</p>
              <p className="text-2xl font-bold text-text">{systemStats.totalLogsAnalyzed.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Threats Detected</p>
              <p className="text-2xl font-bold text-warning">{systemStats.threatsDetected}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Critical Threats</p>
              <p className="text-2xl font-bold text-critical">{systemStats.criticalThreats}</p>
            </div>
            <div>
              <p className="text-sm text-muted">Overall Risk Score</p>
              <p className="text-2xl font-bold text-danger">{systemStats.riskScore}/100</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-lg font-semibold text-text mb-4">Executive Summary</h4>
            <p className="text-muted leading-relaxed">
              During the analyzed period, the Industrial Security Log Analyzer processed {systemStats.totalLogsAnalyzed.toLocaleString()} log entries from {systemStats.devicesMonitored} monitored devices. The system detected {systemStats.threatsDetected} potential threats, of which {systemStats.criticalThreats} were classified as critical. The overall network risk score is currently at {systemStats.riskScore}/100. Immediate attention is required for the critical threats affecting the PLCs and Core SCADA servers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
