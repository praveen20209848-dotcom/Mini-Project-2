import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, ShieldAlert, Cpu, Network, FileKey, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, Badge } from '../components/ui';

export default function LogAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setAnalysisComplete(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalysisComplete(false);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-text mb-4">Upload Industrial Security Logs</h2>

      <Card>
        <CardContent className="p-8">
          {!file ? (
            <div 
              onDragOver={handleDragOver} 
              onDrop={handleDrop}
              className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center bg-surface/30 cursor-pointer"
            >
              <UploadCloud className="w-16 h-16 text-muted mb-4" />
              <h3 className="text-lg font-medium text-text mb-2">Drag & Drop your log file here</h3>
              <p className="text-sm text-muted mb-6">Supported formats: CSV, JSON, TXT, LOG</p>
              <label className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer">
                Browse Files
                <input type="file" className="hidden" accept=".csv,.json,.txt,.log" onChange={handleFileChange} />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="w-10 h-10 text-primary" />
                  <div>
                    <h4 className="font-medium text-text">{file.name}</h4>
                    <p className="text-xs text-muted">{(file.size / 1024).toFixed(2)} KB • 8,421 records</p>
                  </div>
                </div>
                {!isAnalyzing && !analysisComplete && (
                  <button onClick={handleAnalyze} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Analyze Logs
                  </button>
                )}
                <button onClick={() => { setFile(null); setAnalysisComplete(false); }} className="text-sm text-muted hover:text-text">
                  Remove
                </button>
              </div>

              {isAnalyzing && (
                <div className="p-8 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-surface rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    <Cpu className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-lg font-medium animate-pulse text-primary">AI Log Analysis in Progress...</h3>
                  <p className="text-sm text-muted">Parsing vectors, correlating IPs, checking anomaly patterns...</p>
                </div>
              )}

              {analysisComplete && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-3 text-success">
                    <CheckCircle className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Analysis Complete</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox label="Total Events" value="8,421" />
                    <StatBox label="Normal Events" value="8,304" color="text-success" />
                    <StatBox label="Suspicious Events" value="105" color="text-warning" />
                    <StatBox label="Threats Detected" value="12" color="text-critical" />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-accent" /> AI Threat Detection Pipeline
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <RuleCard icon={FileKey} title="Multiple failed login attempts" result="Brute Force Attack" confidence="94%" />
                      <RuleCard icon={ShieldAlert} title="Unknown user accessing SCADA" result="Unauthorized Access" confidence="98%" />
                      <RuleCard icon={Network} title="Unusual port connection patterns" result="Port Scanning" confidence="87%" />
                      <RuleCard icon={Activity} title="Abnormal network traffic volume" result="Possible DoS Attack" confidence="76%" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-surface hover:bg-surface/80 border border-border text-text px-6 py-2 rounded-md font-medium transition-colors">
                      View Detailed Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatBox({ label, value, color = "text-text" }: { label: string, value: string, color?: string }) {
  return (
    <div className="bg-surface p-4 rounded-lg border border-border">
      <p className="text-xs text-muted font-medium mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function RuleCard({ icon: Icon, title, result, confidence }: { icon: any, title: string, result: string, confidence: string }) {
  return (
    <div className="bg-surface/50 border border-border p-4 rounded-lg flex items-start gap-4">
      <div className="p-2 bg-background rounded-md text-muted border border-border/50">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-text font-medium">{title}</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="danger">{result}</Badge>
          <span className="text-xs text-accent font-mono ml-auto bg-accent/10 px-2 py-0.5 rounded">AI Confidence: {confidence}</span>
        </div>
      </div>
    </div>
  );
}
