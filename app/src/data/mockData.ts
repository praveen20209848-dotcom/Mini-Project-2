export const systemStats = {
  totalLogsAnalyzed: 24860,
  threatsDetected: 127,
  criticalThreats: 8,
  devicesMonitored: 42,
  suspiciousEvents: 316,
  riskScore: 72,
};

export const deviceData = [
  { id: 'PLC-001', type: 'PLC', location: 'Production Line A', ip: '192.168.10.21', status: 'Online', lastActivity: '2 min ago', risk: 'Medium' },
  { id: 'PLC-002', type: 'PLC', location: 'Production Line B', ip: '192.168.10.22', status: 'Online', lastActivity: '1 min ago', risk: 'High' },
  { id: 'SCADA-01', type: 'SCADA', location: 'Control Room', ip: '192.168.10.10', status: 'Online', lastActivity: '30 sec ago', risk: 'Low' },
  { id: 'CNC-014', type: 'CNC Machine', location: 'Assembly Unit', ip: '192.168.20.14', status: 'Warning', lastActivity: '4 min ago', risk: 'High' },
  { id: 'SRV-01', type: 'Server', location: 'Data Center', ip: '192.168.1.50', status: 'Online', lastActivity: '1 min ago', risk: 'Critical' },
  { id: 'HMI-05', type: 'HMI', location: 'Production Line A', ip: '192.168.10.25', status: 'Online', lastActivity: '5 min ago', risk: 'Low' },
  { id: 'RTU-11', type: 'RTU', location: 'Remote Site 1', ip: '172.16.5.11', status: 'Offline', lastActivity: '2 hrs ago', risk: 'Medium' },
];

export const threatDistribution = [
  { name: 'Unauthorized Access', value: 35, color: '#ef4444' },
  { name: 'Brute Force', value: 25, color: '#f59e0b' },
  { name: 'Malware Activity', value: 15, color: '#b91c1c' },
  { name: 'Port Scanning', value: 20, color: '#3b82f6' },
  { name: 'Denial of Service', value: 10, color: '#8b5cf6' },
  { name: 'Abnormal Activity', value: 22, color: '#06b6d4' },
];

export const threatActivityData = [
  { time: '00:00', normal: 1200, suspicious: 40, threats: 5 },
  { time: '04:00', normal: 900, suspicious: 25, threats: 2 },
  { time: '08:00', normal: 2100, suspicious: 85, threats: 12 },
  { time: '12:00', normal: 2800, suspicious: 120, threats: 25 },
  { time: '16:00', normal: 2500, suspicious: 95, threats: 18 },
  { time: '20:00', normal: 1800, suspicious: 60, threats: 8 },
  { time: '24:00', normal: 1100, suspicious: 35, threats: 4 },
];

export const recentThreats = [
  { id: 'THR-1024', time: '10:42:15', sourceIp: '192.168.10.45', targetDevice: 'PLC-002', type: 'Brute Force', severity: 'High', status: 'Detected' },
  { id: 'THR-1023', time: '10:39:02', sourceIp: '10.0.0.45', targetDevice: 'SCADA-01', type: 'Unauthorized Access', severity: 'Critical', status: 'Investigating' },
  { id: 'THR-1022', time: '10:35:44', sourceIp: '192.168.20.88', targetDevice: 'CNC-014', type: 'Port Scanning', severity: 'Medium', status: 'Detected' },
  { id: 'THR-1021', time: '10:31:20', sourceIp: '172.16.0.12', targetDevice: 'SRV-01', type: 'Malware Activity', severity: 'Critical', status: 'Investigating' },
  { id: 'THR-1020', time: '10:15:05', sourceIp: '192.168.1.105', targetDevice: 'HMI-05', type: 'Abnormal Activity', severity: 'Low', status: 'Resolved' },
];

export const liveEvents = [
  { id: 1, time: '10:45:12', device: 'PLC-001', event: 'Normal login detected', severity: 'info' },
  { id: 2, time: '10:45:08', device: 'SRV-01', event: 'Multiple failed login attempts', severity: 'warning' },
  { id: 3, time: '10:44:55', device: 'PLC-002', event: 'Suspicious access detected', severity: 'critical' },
  { id: 4, time: '10:44:30', device: 'SCADA-01', event: 'Device health check completed', severity: 'success' },
  { id: 5, time: '10:44:12', device: 'CNC-014', event: 'Unusual network traffic detected', severity: 'warning' },
];

export const sampleLogs = `2026-09-24 10:42:15,PLC-002,192.168.10.45,LOGIN_FAILED,admin,Authentication Failure
2026-09-24 10:42:18,PLC-002,192.168.10.45,LOGIN_FAILED,admin,Authentication Failure
2026-09-24 10:42:21,PLC-002,192.168.10.45,LOGIN_FAILED,admin,Authentication Failure
2026-09-24 10:45:02,SCADA-01,10.0.0.45,UNAUTHORIZED_ACCESS,unknown,Access Denied
2026-09-24 10:48:10,CNC-014,192.168.20.88,PORT_SCAN,unknown,Network Anomaly
2026-09-24 10:50:00,SRV-01,172.16.0.12,MALWARE_SIGNATURE,system,Executable blocked
2026-09-24 10:52:15,HMI-05,192.168.10.25,LOGIN_SUCCESS,operator,Authentication Success`;
