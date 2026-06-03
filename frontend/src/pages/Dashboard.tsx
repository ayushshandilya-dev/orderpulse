import { useState } from 'react';
import { UploadForm } from '../components/UploadForm';
import { Leaderboard } from '../components/Leaderboard';
import { TeamHistory } from '../components/TeamHistory';

type Tab = 'submit' | 'leaderboard' | 'history' | 'system';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'submit',      label: 'Submit Engine',  icon: '⬆' },
  { id: 'leaderboard', label: 'Live Rankings',  icon: '🏆' },
  { id: 'history',     label: 'Team History',   icon: '📊' },
  { id: 'system',      label: 'System Status',  icon: '⚡' },
];

export function Dashboard() {
  const getInitialTab = (): Tab => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (['submit', 'leaderboard', 'history', 'system'].includes(hash)) return hash;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as Tab;
    if (['submit', 'leaderboard', 'history', 'system'].includes(tab)) return tab;
    return 'submit';
  };

  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);
  const [teamName, setTeamName] = useState<string>('ApexQuant');
  const [teamInput, setTeamInput] = useState<string>('ApexQuant');
  const [activeContestId, setActiveContestId] = useState<string | null>(null);


  const handleTeamLookup = () => {
    const trimmed = teamInput.trim();
    if (trimmed) {
      setTeamName(trimmed);
      setActiveTab('history');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ── Performance Ribbon ────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>P99 Latency Target</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>&lt; 1.00 ms</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Sub-millisecond Precision</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Peak Throughput</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>150,000+ <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>TPS</span></div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>Concurrent Trading Fleet</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--accent-purple)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Golden Orderbook</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>100% Correctness</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', marginTop: '0.2rem' }}>Price-Time Priority Audit</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Volatility Profiles</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>3 Sequential</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', marginTop: '0.2rem' }}>Low / Medium / High Regimes</div>
        </div>
      </div>

      {/* ── Tab Bar ───────────────────────────────────────────────────── */}
      <div className="dash-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`dash-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Submit Engine ────────────────────────────────────────── */}
      {activeTab === 'submit' && (
        <div className="grid-layout">
          <aside>
            <UploadForm />
          </aside>
          <section>
            <Leaderboard onActiveContestId={setActiveContestId} />
          </section>
        </div>
      )}

      {/* ── Tab: Live Rankings (leaderboard full width) ───────────────── */}
      {activeTab === 'leaderboard' && (
        <div>
          <Leaderboard onActiveContestId={setActiveContestId} />
        </div>
      )}

      {/* ── Tab: Team History ─────────────────────────────────────────── */}
      {activeTab === 'history' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Team Submission History</h3>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input
              className="input-field"
              type="text"
              placeholder="Enter team name…"
              value={teamInput}
              onChange={e => setTeamInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTeamLookup()}
              style={{ flex: 1, padding: '0.6rem 0.875rem', fontSize: '0.875rem' }}
            />
            <button
              className="btn-secondary"
              style={{ whiteSpace: 'nowrap', padding: '0.6rem 1rem', fontSize: '0.875rem' }}
              onClick={handleTeamLookup}
            >
              Look up
            </button>
            {teamName && (
              <button
                className="btn-secondary"
                style={{ whiteSpace: 'nowrap', padding: '0.6rem 0.875rem', fontSize: '0.875rem', color: 'var(--accent-rose)' }}
                onClick={() => { setTeamName(''); setTeamInput(''); }}
              >
                ✕ Clear
              </button>
            )}
          </div>
          {teamName
            ? <TeamHistory teamName={teamName} activeContestId={activeContestId} />
            : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.4 }}>📊</div>
                <p style={{ fontSize: '0.9rem' }}>Enter your team name above to view submission history</p>
              </div>
            )
          }
        </div>
      )}

      {/* ── Tab: System Status ────────────────────────────────────────── */}
      {activeTab === 'system' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Benchmark Engine */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>Benchmark Engine</h4>
              <span className="status-badge active"><span className="pulse-dot" />ONLINE</span>
            </div>
            {[
              { label: 'Harness Version', value: 'v2.4.1' },
              { label: 'Scenario Count', value: '20 deterministic' },
              { label: 'Bot Fleet Size', value: '50 concurrent bots' },
              { label: 'Order Volume', value: '10M orders / run' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Volatility Profiles */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>Volatility Profiles</h4>
              <span className="status-badge active">3 ACTIVE</span>
            </div>
            {[
              { label: 'Low', color: 'var(--accent-emerald)', desc: 'Stable market · 2M orders', weight: '30%' },
              { label: 'Medium', color: 'var(--accent-amber)', desc: 'Moderate spikes · 4M orders', weight: '40%' },
              { label: 'High', color: 'var(--accent-purple)', desc: 'Flash crash · 4M orders', weight: '30%' },
            ].map(p => (
              <div key={p.label} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.82rem' }}>
                  <span style={{ color: p.color, fontWeight: 700 }}>{p.label}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{p.weight}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'JetBrains Mono, monospace' }}>{p.desc}</div>
                <div style={{ height: '4px', background: 'var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: p.weight, background: p.color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Scoring Formula */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>Scoring Formula</h4>
              <span className="status-badge pending">WEIGHTED</span>
            </div>
            {[
              { metric: 'Latency Score', formula: '50 × (1 − P99/1ms)', color: 'var(--accent-cyan)' },
              { metric: 'Throughput', formula: '30 × (TPS / 150k)', color: 'var(--accent-emerald)' },
              { metric: 'Correctness', formula: '20 × correct%', color: 'var(--accent-purple)' },
            ].map(row => (
              <div key={row.metric} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: row.color, fontWeight: 600 }}>{row.metric}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', marginTop: '0.2rem' }}>{row.formula}</div>
              </div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.6rem 0.875rem', background: 'rgba(0,242,254,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,242,254,0.15)', textAlign: 'center' }}>
              <span style={{ color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 700 }}>
                Final = Σ (profile_weight × run_score)
              </span>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}>Infrastructure</h4>
              <span className="status-badge active">HEALTHY</span>
            </div>
            {[
              { svc: 'Control Plane API', status: 'active', latency: '2ms' },
              { svc: 'SSE Stream', status: 'active', latency: '<1ms' },
              { svc: 'Worker Queue', status: 'active', latency: '5ms' },
              { svc: 'Bot Orchestrator', status: 'active', latency: '8ms' },
            ].map(svc => (
              <div key={svc.svc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{svc.svc}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem' }}>{svc.latency}</span>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block', boxShadow: '0 0 6px var(--accent-emerald)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
