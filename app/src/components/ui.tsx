import React from 'react';
import { cn } from '../lib/utils';

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("glass-card overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, className, action }: { title: string, subtitle?: string, className?: string, action?: React.ReactNode }) {
  return (
    <div className={cn("px-6 py-5 border-b border-border flex items-center justify-between", className)}>
      <div>
        <h3 className="font-semibold text-lg text-text tracking-wide">{title}</h3>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger' | 'critical' | 'info', className?: string }) {
  const variants = {
    default: 'bg-surface text-muted border-border',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20 glow-red',
    critical: 'bg-critical/20 text-danger border-critical/50 shadow-[0_0_10px_rgba(185,28,28,0.5)]',
    info: 'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", variants[variant], className)}>
      {children}
    </span>
  );
}
