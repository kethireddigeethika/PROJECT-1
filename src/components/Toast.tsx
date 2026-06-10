/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none" id="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => {
          let icon = <Info className="text-amber-500 w-5 h-5 flex-shrink-0" />;
          let borderClass = 'border-brand-gold';
          let bgClass = 'bg-brand-gold-soft';
          let textClass = 'text-brand-brown';

          if (toast.type === 'success') {
            icon = <CheckCircle2 className="text-emerald-600 w-5 h-5 flex-shrink-0" />;
            borderClass = 'border-emerald-200';
            bgClass = 'bg-emerald-50';
            textClass = 'text-emerald-900';
          } else if (toast.type === 'error') {
            icon = <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />;
            borderClass = 'border-red-200';
            bgClass = 'bg-red-50';
            textClass = 'text-red-900';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`flex items-start gap-3 p-4 rounded-xl border ${borderClass} ${bgClass} ${textClass} shadow-lg pointer-events-auto`}
              id={`toast-${toast.id}`}
            >
              {icon}
              <div className="flex-grow text-sm font-medium">{toast.message}</div>
              <button
                onClick={() => onRemove(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex-shrink-0 p-0.5 rounded-lg hover:bg-gray-100"
                aria-label="Close notification"
                id={`toast-close-${toast.id}`}
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
