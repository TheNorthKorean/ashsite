import React from 'react';
import { isSupabaseConfigured } from '../lib/supabase';

const SupabaseStatus = () => {
  const isConfigured = isSupabaseConfigured();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-xs text-white/70 z-50">
      <div className="font-semibold mb-2">Database Status</div>
      <div className="space-y-1">
        <div className={`flex items-center space-x-2 ${isConfigured ? 'text-green-400' : 'text-red-400'}`}>
          <div className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span>{isConfigured ? 'Connected' : 'Not Configured'}</span>
        </div>
        <div>URL: {supabaseUrl ? '✅ Set' : '❌ Missing'}</div>
        <div>Key: {supabaseKey ? '✅ Set' : '❌ Missing'}</div>
      </div>
    </div>
  );
};

export default SupabaseStatus; 