import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useEcommerce();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              isSuccess
                ? 'bg-white/95 text-[#254653] border-[#B8DED0]'
                : isError
                ? 'bg-red-50 text-red-900 border-red-200'
                : 'bg-white/95 text-[#254653] border-[#CFE6F3]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#477C82] flex-shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-[#477C82] flex-shrink-0" />}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 hover:bg-black/5 rounded-full transition-colors text-gray-400 hover:text-gray-600 ml-2"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
