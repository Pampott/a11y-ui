import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ToastProvider, useToast, type ToastOptions } from './Toast';

function Harness({ options }: { options?: Partial<ToastOptions> }) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        toast({ title: 'Saved', description: 'Your changes are saved.', ...options })
      }
    >
      notify
    </button>
  );
}

function setup(options?: Partial<ToastOptions>) {
  const result = render(
    <ToastProvider>
      <Harness options={options} />
    </ToastProvider>
  );
  fireEvent.click(screen.getByText('notify'));
  return result;
}

afterEach(() => {
  vi.useRealTimers();
});

describe('Toast', () => {
  it('announces info/success toasts via role="status"', () => {
    setup({ tone: 'success', duration: 0 });
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('announces danger toasts via role="alert"', () => {
    setup({ tone: 'danger', duration: 0 });
    expect(screen.getByRole('alert')).toHaveTextContent('Saved');
  });

  it('has no axe violations', async () => {
    const { baseElement } = setup({ duration: 0 });
    expect(await axe(baseElement)).toHaveNoViolations();
  });

  it('removes the toast when the dismiss button is pressed', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Harness options={{ duration: 0 }} />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('notify'));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    act(() => {
      vi.advanceTimersByTime(300); // let the exit animation window elapse
    });
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('auto-dismisses after its duration', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Harness options={{ duration: 3000 }} />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('notify'));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000); // timer fires -> begins leaving
      vi.advanceTimersByTime(300); // removal window
    });
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('pauses the auto-dismiss timer on hover', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Harness options={{ duration: 3000 }} />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('notify'));
    const toast = screen.getByRole('status');
    fireEvent.mouseEnter(toast);
    act(() => {
      vi.advanceTimersByTime(10000); // well past the duration
    });
    // Still present because the timer was paused while hovered.
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
