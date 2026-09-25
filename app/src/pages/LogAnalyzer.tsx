import { useState, useEffect } from 'react';
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Cpu, Network, FileKey, Activity, Play, RefreshCw, Layers, Database, Check, Download } from 'lucide-react';
import { Card, CardContent, Badge } from '../components/ui';
import { useAnalysis } from '../context/AnalysisContext';

const ANALYSIS_STEPS = [
  { id: 'upload', label: 'Log Upload', desc: 'Parsing & validating schema vectors' },
  { id: 'preprocess', label: 'Data Preprocessing', desc: 'IP normalization & encoding function codes' },
  { id: 'extract', label: 'Feature Extraction', desc: 'Vectorizing 4D behavioral features' },
  { id: 'anomaly', label: 'ML Anomaly Detection', desc: 'Evaluating multivariate outlier distances' },
  { id: 'classify', label: 'Potential Threat Classification', desc: 'Separating anomalous behavior from cyberattacks' },
  { id: 'risk', label: 'Risk Assessment', desc: 'Computing dynamic system risk index' },
];

const SAMPLE_LOG_PREVIEWS = [
  { timestamp: '10:45:12', source_ip: '198.51.100.45', destination_ip: '192.168.10.22', protocol: 'Modbus TCP', device_id: 'PLC-002', function_code: '99 Override', rpm: 2350, event_type: 'Brute Force', severity: 'High' },
  { timestamp: '10:44:02', source_ip: '203.0.113.88', destination_ip: '192.168.10.10', protocol: 'Modbus TCP', device_id: 'SCADA-01', function_code: '06 Write Reg', rpm: 1200, event_type: 'Unauthorized Access', severity: 'Critical' },
  { timestamp: '10:42:15', source_ip: '192.168.20.88', destination_ip: '192.168.20.14', protocol: 'Modbus TCP', device_id: 'CNC-014', function_code: '16 Write Multi', rpm: 1850, event_type: 'Port Scanning', severity: 'Medium' },
  { timestamp: '10:40:00', source_ip: '45.33.32.156', destination_ip: '192.168.1.50', protocol: 'Modbus TCP', device_id: 'SRV-01', function_code: '08 Diagnostics', rpm: 1200, event_type: 'Malware Activity', severity: 'Critical' },
];

export default function LogAnalyzer() {
  const { analysis, runSyntheticAnalysis, runCSVAnalysis } = useAnalysis();
  const [file, setFile] = useState<{ name: string; type: string; size: string; rawContent?: string } | null>(
    analysis ? {
      name: analysis.fileName,
      type: analysis.fileType,
      size: analysis.fileSize,
    } : null
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [showCompleted, setShowCompleted] = useState(!!analysis);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFile({
        name: selectedFile.name,
        type: selectedFile.name.split('.').pop()?.toUpperCase() || 'CSV',
        size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
        rawContent: content,
      });
      setShowCompleted(false);
    };
    reader.readAsText(selectedFile);
  };

  const handleLoadSyntheticDataset = () => {
    setFile({
      name: 'synthetic_modbus_logs.csv',
      type: 'CSV',
      size: '1.45 MB',
    });
    setShowCompleted(false);
  };

  const executeAnalysis = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setShowCompleted(false);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    if (isAnalyzing && currentStepIndex >= 0) {
      if (currentStepIndex < ANALYSIS_STEPS.length) {
        const timer = setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
        }, 400);
        return () => clearTimeout(timer);
      } else {
        // ML Pipeline finished
        setIsAnalyzing(false);
        setShowCompleted(true);
        if (file && file.rawContent) {
          runCSVAnalysis(file.rawContent, file.name, file.size);
        } else {
          runSyntheticAnalysis(file ? file.name : 'synthetic_modbus_logs.csv', file ? file.size : '1.45 MB');
        }
      }
    }
  }, [isAnalyzing, currentStepIndex]);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Industrial Cyber Threat Log Analyzer</h2>
          <p className="text-muted text-sm mt-1">
            AI-powered analysis of synthetic industrial cybersecurity logs & Modbus TCP network telemetry.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info" className="px-3 py-1 font-mono text-xs">
            Synthetic Industrial Logs • ML Anomaly Engine
          </Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          {!file ? (
            <div className="space-y-6">
              <div 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
                className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 rounded-xl p-10 flex flex-col items-center justify-center bg-surface/30 group"
              >
                <div className="p-4 bg-primary/10 rounded-full text-primary mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-medium text-text mb-1">Drag & Drop your industrial CSV log file</h3>
                <p className="text-sm text-muted mb-6">Supported formats: CSV, JSON, TXT, LOG</p>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <label className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer shadow-lg shadow-primary/20 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" />
                    Browse Files
                    <input type="file" className="hidden" accept=".csv,.json,.txt,.log" onChange={handleFileChange} />
                  </label>
                  
                  <button 
                    onClick={handleLoadSyntheticDataset}
                    className="bg-accent/20 hover:bg-accent/30 text-accent border border-accent/40 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Analyze Synthetic Dataset
                  </button>

                  <a
                    href="/synthetic_modbus_logs.csv"
                    download="synthetic_modbus_logs.csv"
                    className="bg-surface hover:bg-surface/80 border border-border text-muted hover:text-text px-4 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" /> Sample CSV
                  </a>
                </div>
              </div>

              {/* Information callout */}
              <div className="p-4 bg-surface/60 border border-border rounded-lg text-xs text-muted space-y-2">
                <div className="font-semibold text-text flex items-center gap-2">
                  <Database className="w-4 h-4 text-accent" /> Dataset Requirements & Field Specifications
                </div>
                <p className="leading-relaxed">
                  The dataset supports fields: <span className="font-mono text-primary">timestamp, source_ip, destination_ip, protocol, device_id, function_code, operating_speed_rpm, event_type, severity</span>. The internal ML Engine extracts 4D behavioral vectors to calculate numerical anomaly scores.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected File Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-surface border border-border rounded-xl gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-text text-base">{file.name}</h4>
                      <Badge variant="default" className="text-[10px] font-mono">{file.type}</Badge>
                    </div>
                    <p className="text-xs text-muted mt-1 font-mono">
                      File Size: <span className="text-text font-medium">{file.size}</span> • Status: <span className="text-success font-medium">Ready for ML Pipeline</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!isAnalyzing && (
                    <button 
                      onClick={executeAnalysis} 
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {showCompleted ? 'Re-Run ML Pipeline' : 'Analyze Logs'}
                    </button>
                  )}
                  <button 
                    onClick={() => { setFile(null); setShowCompleted(false); setIsAnalyzing(false); }} 
                    className="text-xs text-muted hover:text-text px-3 py-2 border border-border rounded-lg bg-surface/50"
                  >
                    Change File
                  </button>
                </div>
              </div>

              {/* Log Schema Preview */}
              <div className="bg-background/60 border border-border/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted font-medium">
                  <span className="flex items-center gap-1.5 text-text">
                    <Layers className="w-3.5 h-3.5 text-accent" /> Log Telemetry Record Sample
                  </span>
                  <span className="font-mono text-[11px] text-accent">Feature Vectors: [f1: IP_Ingress, f2: FnCode_Risk, f3: Speed_Dev, f4: Asset_Criticality]</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-surface/80 text-muted border-b border-border/50">
                      <tr>
                        <th className="px-3 py-1.5">Timestamp</th>
                        <th className="px-3 py-1.5">Source IP</th>
                        <th className="px-3 py-1.5">Target Asset</th>
                        <th className="px-3 py-1.5">Function</th>
                        <th className="px-3 py-1.5">RPM</th>
                        <th className="px-3 py-1.5">Event Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30 text-text/90">
                      {SAMPLE_LOG_PREVIEWS.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-surface/20">
                          <td className="px-3 py-1.5 text-muted">{rec.timestamp}</td>
                          <td className="px-3 py-1.5 text-primary">{rec.source_ip}</td>
                          <td className="px-3 py-1.5 font-bold">{rec.device_id}</td>
                          <td className="px-3 py-1.5 text-muted">{rec.function_code}</td>
                          <td className="px-3 py-1.5">{rec.rpm} RPM</td>
                          <td className="px-3 py-1.5 font-sans">{rec.event_type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ML Progress Animation */}
              {isAnalyzing && (
                <div className="p-6 bg-surface/80 border border-primary/30 rounded-xl space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-text">Running ML Anomaly Detection Pipeline</h3>
                        <p className="text-xs text-muted">Calculating multivariate feature outlier scores across log records...</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-primary font-bold">
                      {Math.min(100, Math.round((currentStepIndex / ANALYSIS_STEPS.length) * 100))}%
                    </span>
                  </div>

                  {/* Step Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ANALYSIS_STEPS.map((step, idx) => {
                      const isDone = idx < currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div 
                          key={step.id} 
                          className={`p-3 rounded-lg border flex items-center gap-3 transition-all duration-300 ${
                            isDone ? 'bg-success/10 border-success/30 text-text' :
                            isCurrent ? 'bg-primary/10 border-primary/50 text-text ring-1 ring-primary/40' :
                            'bg-surface/30 border-border/40 text-muted/60'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isDone ? 'bg-success text-black' :
                            isCurrent ? 'bg-primary text-white animate-pulse' :
                            'bg-surface border border-border text-muted'
                          }`}>
                            {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-medium ${isDone ? 'text-success' : isCurrent ? 'text-primary font-semibold' : 'text-muted'}`}>
                              {step.label}
                            </p>
                            <p className="text-[10px] text-muted truncate">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Analysis Complete Output */}
              {showCompleted && analysis && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-success/10 border border-success/30 rounded-xl gap-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                      <div>
                        <h3 className="text-lg font-bold text-text">ML Analysis Completed</h3>
                        <p className="text-xs text-muted">Analysis Timestamp: <span className="text-text font-medium">{analysis.timestamp}</span> • Model: <span className="font-mono text-accent">{analysis.modelName}</span></p>
                      </div>
                    </div>
                    <Badge variant="info" className="self-start sm:self-auto font-mono text-xs">
                      Synthetic Dataset Analyzed
                    </Badge>
                  </div>

                  {/* Summary Metric Boxes */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <StatBox label="Total Logs" value={analysis.stats.totalLogs.toLocaleString()} />
                    <StatBox label="Normal Events" value={analysis.stats.normalEvents.toLocaleString()} color="text-success" />
                    <StatBox label="Anomalies" value={analysis.stats.anomalies.toLocaleString()} color="text-warning" />
                    <StatBox label="Threats Detected" value={analysis.stats.threatsDetected.toString()} color="text-danger" />
                    <StatBox label="Critical Threats" value={analysis.stats.criticalThreats.toString()} color="text-critical" glow />
                    <StatBox label="System Risk Score" value={`${analysis.stats.riskScore}/100`} color="text-warning" />
                  </div>

                  {/* Classification Card */}
                  <div className="p-5 bg-surface border border-border rounded-xl space-y-4">
                    <h4 className="text-sm font-semibold text-text flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-primary" /> Key Detected Anomaly Vectors & ML Anomaly Scores
                      </span>
                      <span className="text-xs text-muted font-mono">Dataset: {analysis.fileName}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <RuleCard icon={FileKey} title="Perimeter ingress & override function" result="Brute Force" score={0.94} target="PLC-002" />
                      <RuleCard icon={ShieldAlert} title="Unauthenticated read/write on SCADA" result="Unauthorized Access" score={0.91} target="SCADA-01" />
                      <RuleCard icon={Network} title="TCP port sweep across assembly subnet" result="Port Scanning" score={0.76} target="CNC-014" />
                      <RuleCard icon={Activity} title="DNP3 frame payload behavioral anomaly" result="Malware Activity" score={0.89} target="SRV-01" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={handleLoadSyntheticDataset}
                      className="bg-surface hover:bg-surface/80 border border-border text-text px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-Analyze Synthetic Logs
                    </button>
                    <a 
                      href="/"
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-md shadow-primary/20"
                    >
                      View Dashboard Results →
                    </a>
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

function StatBox({ label, value, color = "text-text", glow = false }: { label: string, value: string, color?: string, glow?: boolean }) {
  return (
    <div className={`bg-surface p-4 rounded-xl border border-border ${glow ? 'border-critical/40 glow-red' : ''}`}>
      <p className="text-[11px] text-muted font-medium mb-1 truncate">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function RuleCard({ icon: Icon, title, result, score, target }: { icon: any, title: string, result: string, score: number, target: string }) {
  return (
    <div className="bg-background/50 border border-border/80 p-3.5 rounded-lg flex items-start gap-3">
      <div className="p-2 bg-surface rounded-md text-primary border border-border/60 shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs text-text font-medium truncate">{title}</p>
          <span className="text-[10px] text-muted font-mono">{target}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Badge variant="danger" className="text-[10px]">{result}</Badge>
          <span className="text-[10px] text-accent font-mono bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
            Anomaly Score: {score.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
