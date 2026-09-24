import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Search, FileText, Server, PieChart, Settings, Bell, User, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Log Analyzer', path: '/analyzer', icon: Search },
    { name: 'Threats', path: '/threats', icon: ShieldAlert },
    { name: 'Industrial Devices', path: '/devices', icon: Server },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden text-text font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="font-bold text-lg leading-tight tracking-wide">
              Industrial Threat<br />Analyzer
            </h1>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted hover:text-text hover:bg-surface/80'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 bg-success/10 rounded-lg text-success border border-success/20">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">System Secure</span>
          </div>
          <div className="mt-3 text-xs text-muted text-center">
            Monitoring 42 Industrial Assets
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-surface/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="text-xl font-semibold tracking-wide">
              Industrial Cyber Threat Analyzer
            </h2>
            <div className="text-sm text-muted flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Last log analysis: 2 minutes ago
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-5 h-5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-background border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64 transition-all"
              />
            </div>
            <div className="text-sm text-muted">
              {new Date().toLocaleString()}
            </div>
            <button className="relative text-muted hover:text-text transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-danger w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold text-white border-2 border-surface">
                3
              </span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center border-2 border-border cursor-pointer">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8 relative scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
