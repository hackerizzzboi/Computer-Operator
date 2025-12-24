import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Loksewa Computer Operator Prep Hub • Designed for personal use by{' '}
            <span className="text-foreground font-medium">Dhiaj Shahi</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
            <span>Backup your notes and files regularly.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
