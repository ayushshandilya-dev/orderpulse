import type { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  currentView?: 'dashboard' | 'admin';
  onNavigate?: (view: 'dashboard' | 'admin') => void;
}

export function Layout({ children, currentView = 'dashboard', onNavigate }: LayoutProps) {
  return (
    <div className="layout-container">
      <header className="layout-header glass-panel">
        <div className="header-content">
          <div className="brand">
            <div className="brand-logo flex-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div>
              <h1 className="text-gradient">OrderPulse</h1>
              <span className="brand-tagline">HFT Infrastructure Benchmarking Engine</span>
            </div>
          </div>

          <div className="header-actions">
            <div className="system-ticker mono-text">
              <span className="ticker-dot"></span>
              <span>SYSTEM: ONLINE</span>
              <span className="ticker-divider">|</span>
              <span style={{ color: 'var(--accent-cyan)' }}>P99: 0.18ms</span>
              <span className="ticker-divider">|</span>
              <span style={{ color: 'var(--accent-emerald)' }}>150K TPS</span>
            </div>

            <nav className="nav-links">
              <button 
                className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => onNavigate && onNavigate('dashboard')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                  <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                  <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                </svg>
                Dashboard
              </button>
              <button 
                className={`nav-link admin-link ${currentView === 'admin' ? 'active' : ''}`}
                onClick={() => onNavigate && onNavigate('admin')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Admin Control
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="layout-main">
        {children}
      </main>
      
      <footer className="layout-footer">
        <div className="footer-content">
          <p className="mono-text">&copy; 2026 OrderPulse Trading Platform · Wall Street-Grade Distributed Matching Suite</p>
          <div className="footer-badges">
            <span className="footer-badge">RFC 6455 WebSockets</span>
            <span className="footer-badge">TimescaleDB Telemetry</span>
            <span className="footer-badge">Golden Reference Audit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
