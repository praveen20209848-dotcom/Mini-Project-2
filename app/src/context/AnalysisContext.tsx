import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateSyntheticDataset, parseAndAnalyzeCSV, type AnalyzedDatasetResult, type LogRecord } from '../utils/mlEngine';

export type { LogRecord, AnalyzedDatasetResult };

interface AnalysisContextType {
  analysis: AnalyzedDatasetResult | null;
  setAnalysis: React.Dispatch<React.SetStateAction<AnalyzedDatasetResult | null>>;
  clearAnalysis: () => void;
  runSyntheticAnalysis: (fileName?: string, fileSizeStr?: string) => void;
  runCSVAnalysis: (csvText: string, fileName: string, fileSizeStr: string) => void;
  lastAnalysisTime: string;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

const STORAGE_KEY = 'industrial_threat_analysis_v2';

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analysis, setAnalysis] = useState<AnalyzedDatasetResult | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved analysis state', e);
      }
    }
    // Default to genuine synthetic dataset analysis generated via ML engine
    return generateSyntheticDataset();
  });

  useEffect(() => {
    if (analysis) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [analysis]);

  const clearAnalysis = () => {
    setAnalysis(null);
  };

  const runSyntheticAnalysis = (fileName = 'synthetic_modbus_logs.csv', fileSizeStr = '1.45 MB') => {
    const result = generateSyntheticDataset(fileName, fileSizeStr);
    setAnalysis(result);
  };

  const runCSVAnalysis = (csvText: string, fileName: string, fileSizeStr: string) => {
    const result = parseAndAnalyzeCSV(csvText, fileName, fileSizeStr);
    setAnalysis(result);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysis,
        setAnalysis,
        clearAnalysis,
        runSyntheticAnalysis,
        runCSVAnalysis,
        lastAnalysisTime: analysis ? analysis.timestamp : 'No analysis performed',
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
