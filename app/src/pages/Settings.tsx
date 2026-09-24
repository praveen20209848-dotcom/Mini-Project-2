import React from 'react';
import { Card, CardContent, CardHeader } from '../components/ui';

export default function Settings() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-text">System Settings</h2>
        <p className="text-muted text-sm mt-1">Configure detection sensitivity, notifications, and system preferences.</p>
      </div>

      <Card>
        <CardHeader title="Threat Detection Settings" />
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text">AI Detection Sensitivity</p>
              <p className="text-sm text-muted">Adjust how aggressive the AI flags suspicious activities.</p>
            </div>
            <select className="bg-background border border-border text-text text-sm rounded-md px-3 py-2 outline-none">
              <option>Low (Fewer False Positives)</option>
              <option selected>Medium (Balanced)</option>
              <option>High (Maximum Security)</option>
            </select>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-text">Auto-block Critical Threats</p>
              <p className="text-sm text-muted">Automatically isolate devices under critical attack.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-surface border border-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-muted peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader title="Alerts & Notifications" />
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text">Email Alerts</p>
              <p className="text-sm text-muted">Receive daily summary reports via email.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-surface border border-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-muted peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
