import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/cn';

export type ToastTone = 'info' | 'success' | 'danger';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Auto-dismiss delay in ms. 0 keeps the toast until dismissed. Default 5000. */
  duration?: number;
}

interface ToastRecord extends Required<Omit<ToastOptions, 'description'>> {
  id: string;
  description?: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** How long the exit animation runs before the toast is removed from the DOM. */
const EXIT_MS = 200;

/**
 * Toast notifications following accessible live-region practice.
 *
 * Accessibility notes:
 * - The viewport is a labelled role="region" landmark so users can find
 *   notifications. Each toast carries its own live semantics: role="status"
 *   (polite) for info/success, role="alert" (assertive) for danger — so the
 *   message is announced when inserted without stealing focus.
 * - aria-atomic groups title + description into a single announcement.
 * - The dismiss control is a real labelled button (WCAG 4.1.2).
 * - The auto-dismiss timer pauses on hover and on keyboard focus, so users who
 *   need more time are never rushed (WCAG 2.2.1 Timing Adjustable).
 * - Enter/exit slide+fade are neutralised by the global reduced-motion guard;
 *   removal is time-based (not animationend-based) so it stays reliable even
 *   when motion is disabled.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const idBase = useId();
  const counter = useRef(0);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = `${idBase}-${counter.current++}`;
      setToasts((prev) => [
        ...prev,
        {
          id,
          title: options.title,
          description: options.description,
          tone: options.tone ?? 'info',
          duration: options.duration ?? 5000,
        },
      ]);
      return id;
    },
    [idBase]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss: remove }}>
      {children}
      {createPortal(
        <div
          role="region"
          aria-label="Notifications"
          className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={remove} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

/** Imperative API: const { toast } = useToast(); toast({ title: '…' }). */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>.');
  return ctx;
}

const toneStyles: Record<ToastTone, string> = {
  info: 'border-l-brand',
  success: 'border-l-success',
  danger: 'border-l-danger',
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastRecord;
  onRemove: (id: string) => void;
}) {
  const [leaving, setLeaving] = useState(false);
  const remaining = useRef(toast.duration);
  const startedAt = useRef(0);
  const dismissTimer = useRef<number>();
  const removeTimer = useRef<number>();

  const beginLeave = useCallback(() => {
    window.clearTimeout(dismissTimer.current);
    setLeaving(true);
    removeTimer.current = window.setTimeout(() => onRemove(toast.id), EXIT_MS);
  }, [onRemove, toast.id]);

  const schedule = useCallback(() => {
    if (toast.duration <= 0) return;
    startedAt.current = Date.now();
    dismissTimer.current = window.setTimeout(beginLeave, remaining.current);
  }, [toast.duration, beginLeave]);

  const pause = useCallback(() => {
    if (toast.duration <= 0) return;
    window.clearTimeout(dismissTimer.current);
    remaining.current -= Date.now() - startedAt.current;
  }, [toast.duration]);

  useEffect(() => {
    schedule();
    return () => {
      window.clearTimeout(dismissTimer.current);
      window.clearTimeout(removeTimer.current);
    };
  }, [schedule]);

  const isAlert = toast.tone === 'danger';

  return (
    <div
      role={isAlert ? 'alert' : 'status'}
      aria-atomic="true"
      onMouseEnter={pause}
      onMouseLeave={schedule}
      onFocus={pause}
      onBlur={schedule}
      className={cn(
        'pointer-events-auto rounded-token border border-l-4 border-gray-200 bg-white p-4 shadow-lg',
        toneStyles[toast.tone],
        leaving ? 'animate-toast-out' : 'animate-toast-in'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-gray-900">{toast.title}</p>
          {toast.description && (
            <p className="mt-0.5 text-sm text-gray-700">{toast.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={beginLeave}
          aria-label="Dismiss notification"
          className={cn(
            'shrink-0 rounded p-1 text-gray-500 hover:text-gray-900',
            'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand'
          )}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
