import React, { useEffect } from 'react';

export default function Toast({ toasts, onRemove }) {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onRemove(toasts[0].id);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toasts, onRemove]);

  return (
    <div class="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} class="toast">
          <i class="fa-solid fa-circle-check text-cyan"></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
