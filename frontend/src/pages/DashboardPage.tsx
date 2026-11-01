
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { EnergyDashboard } from '../components/Dashboard/EnergyDashboard';
import { CostComparison } from '../components/Dashboard/CostComparison';
import { TraceDebugger } from '../components/Dashboard/TraceDebugger';

type DashboardMode = 'hud' | 'professional';

const MODE_KEY = 'openjarvis-dashboard-mode';

function readMode(): DashboardMode {
  try {
    return localStorage.getItem(MODE_KEY) === 'professional'
      ? 'professional'
      : 'hud';
  } catch {
    return 'hud';
  }
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: DashboardMode;
  onChange: (mode: DashboardMode) => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border p-1"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-bg-secondary)',
      }}
      aria-label="Dashboard appearance"
    >
      <button
        type="button"
        onClick={() => onChange('hud')}
        aria-pressed={mode === 'hud'}
        className="rounded-lg px-3 py-2 text-xs font-medium transition-colors"
        style={{
          background:
            mode === 'hud'
              ? 'var(--color-accent-subtle)'
              : 'transparent',
          color:
            mode === 'hud'
              ? 'var(--color-accent)'
              : 'var(--color-text-secondary)',
          border:
            mode === 'hud'
              ? '1px solid var(--color-accent)'
              : '1px solid transparent',
        }}
      >
        ◈ HUD
      </button>

      <button
        type="button"
        onClick={() => onChange('professional')}
        aria-pressed={mode === 'professional'}
        className="rounded-lg px-3 py-2 text-xs font-medium transition-colors"
        style={{
          background:
            mode === 'professional'
              ? 'var(--color-accent-subtle)'
              : 'transparent',
          color:
            mode === 'professional'
              ? 'var(--color-accent)'
              : 'var(--color-text-secondary)',
          border:
            mode === 'professional'
              ? '1px solid var(--color-accent)'
              : '1px solid transparent',
        }}
      >
        ▦ Professional
      </button>
    </div>
  );
}

function QuickLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-lg border px-3 py-2 text-xs transition-colors hover:border-[var(--color-accent)]"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface)',
        color: 'var(--color-text-secondary)',
      }}
    >
      {label} ↗
    </Link>
  );
}

export function DashboardPage() {
  const [mode, setMode] = useState<DashboardMode>(readMode);

  const now = new Date();

  const stamp = now.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  useEffect(() => {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      // Dashboard remains usable without browser storage.
    }
  }, [mode]);

  const hud = mode === 'hud';

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-8"
      style={{
        background: hud
          ? 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 58%)'
          : 'transparent',
      }}
    >
      <div className="mx-auto w-full max-w-6xl">

        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div
              className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: 'var(--color-accent)' }}
            >
              OpenJarvis · Personal AI workspace
            </div>

            <h1
              className="text-xl font-semibold tracking-tight sm:text-2xl"
              style={{
                color: 'var(--color-text)',
                fontFamily: hud ? 'var(--font-display)' : 'inherit',
              }}
            >
              {hud ? 'JARVIS Command Center' : 'System Overview'}
            </h1>

            <p
              className="mt-1 max-w-2xl text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {hud
                ? 'Your AI workspace, system telemetry and agent activity in one place.'
                : 'Live telemetry for the inference engine — power draw, token throughput and cost comparisons.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {stamp}
            </span>

            <ModeSwitch mode={mode} onChange={setMode} />
          </div>

        </header>

        {hud && (
          <section
            className="mb-5 rounded-2xl border p-4 sm:p-5"
            style={{
              borderColor:
                'color-mix(in srgb, var(--color-accent) 35%, var(--color-border))',
              background:
                'color-mix(in srgb, var(--color-surface) 88%, var(--color-accent) 12%)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xl"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                    background: 'var(--color-accent-subtle)',
                    boxShadow: '0 0 24px var(--color-accent-glow)',
                  }}
                  aria-hidden="true"
                >
                  ◈
                </div>

                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    JARVIS workspace
                  </div>

                  <div
                    className="text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Dashboard connected to the existing OpenJarvis interface
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <QuickLink to="/" label="Open AI Chat" />
                <QuickLink to="/agents" label="View Agents" />
                <QuickLink to="/data-sources" label="Data Sources" />
                <QuickLink to="/settings" label="Settings" />
              </div>

            </div>
          </section>
        )}

        <section
          className={
            hud
              ? 'grid grid-cols-1 gap-4 xl:grid-cols-2'
              : 'grid grid-cols-1 gap-4 lg:grid-cols-2'
          }
        >
          <EnergyDashboard />
          <CostComparison />
        </section>

        <section
          className="mt-4 overflow-hidden rounded-xl"
          style={{
            border: hud
              ? '1px solid color-mix(in srgb, var(--color-accent) 24%, var(--color-border))'
              : undefined,
          }}
        >
          {hud && (
            <div
              className="border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-accent)',
                background: 'var(--color-bg-secondary)',
              }}
            >
              Agent trace & activity
            </div>
          )}

          <TraceDebugger />
        </section>

      </div>
    </div>
  );
}
