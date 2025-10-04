import React, { useState, useEffect } from 'react';
import { STATE_LEGAL_DATABASE, type StateLegalInfo } from './legalDatabase';
import { useAuth } from './AuthContext';
import { Sun, Moon, User, LogIn, LogOut, Map, BookOpen, Shield, Check, X } from 'lucide-react';

const ModernCivilRightsTool: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'state-laws' | 'resources' | 'map'>('state-laws');
  const [selectedState, setSelectedState] = useState<string>('California');
  const [activeCategory, setActiveCategory] = useState<string>('public-records');

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  }, []);

  // Get state info
  const stateInfo: StateLegalInfo = STATE_LEGAL_DATABASE[selectedState];

  const handleLogout = () => {
    logout();
    setActiveTab('state-laws');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <Shield size={20} />
            </div>
            <span>Civil Rights Tool</span>
          </div>
          
          <nav>
            <ul className="nav-links">
              <li>
                <a 
                  href="#" 
                  className={`nav-link ${activeTab === 'state-laws' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('state-laws');
                  }}
                >
                  <Shield size={16} style={{ marginRight: 'var(--spacing-xs)' }} />
                  State Laws
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('map');
                  }}
                >
                  <Map size={16} style={{ marginRight: 'var(--spacing-xs)' }} />
                  Interactive Map
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`nav-link ${activeTab === 'resources' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('resources');
                  }}
                >
                  <BookOpen size={16} style={{ marginRight: 'var(--spacing-xs)' }} />
                  Resources
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <button className="btn btn-outline" onClick={handleLogout}>
                  <LogOut size={16} style={{ marginRight: 'var(--spacing-xs)' }} />
                  Logout
                </button>
                <button className="theme-toggle" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-outline"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <LogIn size={16} style={{ marginRight: 'var(--spacing-xs)' }} />
                  Login
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <User size={16} style={{ marginRight: 'var(--spacing-xs)' }} />
                  Sign Up
                </button>
                <button className="theme-toggle" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="card">
            <h2 className="card-title">Premium Subscription</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              Sign up for a 10-day no obligation free trial of our upgraded platform
            </p>
            
            <div className="subscription-plans">
              <div className="plan-card">
                <h3 className="plan-name">Basic</h3>
                <div className="plan-price">$0/month</div>
                <p className="plan-description">Essential civil rights information</p>
                <ul className="plan-features">
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Public Records Laws
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Stop and ID Laws
                  </li>
                  <li className="plan-feature not-included">
                    <span className="feature-icon"><X size={20} /></span>
                    Cannabis Laws
                  </li>
                  <li className="plan-feature not-included">
                    <span className="feature-icon"><X size={20} /></span>
                    Recording Laws
                  </li>
                  <li className="plan-feature not-included">
                    <span className="feature-icon"><X size={20} /></span>
                    Case Law Database
                  </li>
                  <li className="plan-feature not-included">
                    <span className="feature-icon"><X size={20} /></span>
                    Interactive Map
                  </li>
                </ul>
                <button className="btn btn-outline" disabled style={{ opacity: 0.7 }}>
                  Current Plan
                </button>
              </div>
              
              <div className="plan-card featured">
                <h3 className="plan-name">Premium</h3>
                <div className="plan-price">$29/month</div>
                <p className="plan-description">Complete civil rights information with interactive tools</p>
                <ul className="plan-features">
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Public Records Laws
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Stop and ID Laws
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Cannabis Laws
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Recording Laws
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Case Law Database
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Interactive Map
                  </li>
                  <li className="plan-feature included">
                    <span className="feature-icon"><Check size={20} /></span>
                    Resource Library
                  </li>
                </ul>
                <button className="btn btn-primary">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'state-laws' && (
          <div className="card">
            <h2 className="card-title">State Laws</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
              <div>
                <label className="form-label">Select a State</label>
                <select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="state-selector"
                >
                  {Object.keys(STATE_LEGAL_DATABASE).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="form-label">Legal Category</label>
                <div className="law-categories">
                  <button 
                    className={`category-btn ${activeCategory === 'public-records' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('public-records')}
                  >
                    Public Records
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'stop-and-id' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('stop-and-id')}
                  >
                    Stop and ID
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'cannabis' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('cannabis')}
                  >
                    Cannabis
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'recording' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('recording')}
                  >
                    Recording
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'case-law' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('case-law')}
                  >
                    Case Law
                  </button>
                </div>
              </div>
            </div>
            
            <div className="law-info">
              {activeCategory === 'public-records' && (
                <div className="law-section">
                  <h3 className="card-subtitle">Public Records Laws</h3>
                  <div className="law-details">
                    <div className="law-detail">
                      <strong>Statute</strong>
                      <span>{stateInfo.publicRecords.statute}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Timeframe</strong>
                      <span>{stateInfo.publicRecords.timeframe}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Type</strong>
                      <span>{stateInfo.publicRecords.type}</span>
                    </div>
                    {stateInfo.publicRecords.types && (
                      <div className="law-detail">
                        <strong>Types</strong>
                        <span>{stateInfo.publicRecords.types.join(', ')}</span>
                      </div>
                    )}
                    {stateInfo.publicRecords.notes && (
                      <div className="law-detail">
                        <strong>Notes</strong>
                        <span>{stateInfo.publicRecords.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeCategory === 'stop-and-id' && (
                <div className="law-section">
                  <h3 className="card-subtitle">Stop and ID Laws</h3>
                  <div className="law-details">
                    <div className="law-detail">
                      <strong>Has Stop ID</strong>
                      <span>{stateInfo.stopAndID.hasStopID ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Requires ID</strong>
                      <span>{stateInfo.stopAndID.requiresID}</span>
                    </div>
                    {stateInfo.stopAndID.requirement && (
                      <div className="law-detail">
                        <strong>Requirement</strong>
                        <span>{stateInfo.stopAndID.requirement}</span>
                      </div>
                    )}
                    <div className="law-detail">
                      <strong>Statute</strong>
                      <span>{stateInfo.stopAndID.statute}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Recording Consent</strong>
                      <span>{stateInfo.stopAndID.recordingConsent}</span>
                    </div>
                    {stateInfo.stopAndID.notes && (
                      <div className="law-detail">
                        <strong>Notes</strong>
                        <span>{stateInfo.stopAndID.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeCategory === 'cannabis' && (
                <div className="law-section">
                  <h3 className="card-subtitle">Cannabis Laws</h3>
                  <div className="law-details">
                    <div className="law-detail">
                      <strong>Status</strong>
                      <span>{stateInfo.cannabis.status}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Possession</strong>
                      <span>{stateInfo.cannabis.possession}</span>
                    </div>
                    {stateInfo.cannabis.possessionLimit && (
                      <div className="law-detail">
                        <strong>Possession Limit</strong>
                        <span>{stateInfo.cannabis.possessionLimit}</span>
                      </div>
                    )}
                    <div className="law-detail">
                      <strong>Enacted</strong>
                      <span>{stateInfo.cannabis.enacted}</span>
                    </div>
                    {stateInfo.cannabis.penalties && (
                      <div className="law-detail">
                        <strong>Penalties</strong>
                        <span>{stateInfo.cannabis.penalties}</span>
                      </div>
                    )}
                    {stateInfo.cannabis.medicalOnlyInfo && (
                      <div className="law-detail">
                        <strong>Medical Info</strong>
                        <span>{stateInfo.cannabis.medicalOnlyInfo}</span>
                      </div>
                    )}
                    {stateInfo.cannabis.notes && (
                      <div className="law-detail">
                        <strong>Notes</strong>
                        <span>{stateInfo.cannabis.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  {stateInfo.cannabis.medicalCardInfo && (
                    <div className="law-section" style={{ marginTop: 'var(--spacing-lg)' }}>
                      <h4>Medical Card Information</h4>
                      <div className="law-details">
                        <div className="law-detail">
                          <strong>Application Process</strong>
                          <span>{stateInfo.cannabis.medicalCardInfo.applicationProcess}</span>
                        </div>
                        <div className="law-detail">
                          <strong>Qualifying Conditions</strong>
                          <span>{stateInfo.cannabis.medicalCardInfo.qualifyingConditions.join(', ')}</span>
                        </div>
                        <div className="law-detail">
                          <strong>Renewal</strong>
                          <span>{stateInfo.cannabis.medicalCardInfo.renewal}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeCategory === 'recording' && (
                <div className="law-section">
                  <h3 className="card-subtitle">Recording Laws</h3>
                  <div className="law-details">
                    <div className="law-detail">
                      <strong>One-Party Consent</strong>
                      <span>{stateInfo.recordingLaws.onePartyConsent ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="law-detail">
                      <strong>All-Party Consent</strong>
                      <span>{stateInfo.recordingLaws.allPartyConsent ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Video Recording Legal</strong>
                      <span>{stateInfo.recordingLaws.videoLegal ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="law-detail">
                      <strong>Audio Recording Legal</strong>
                      <span>{stateInfo.recordingLaws.audioLegal ? 'Yes' : 'No'}</span>
                    </div>
                    {stateInfo.recordingLaws.videoRecording && (
                      <div className="law-detail">
                        <strong>Video Recording</strong>
                        <span>{stateInfo.recordingLaws.videoRecording}</span>
                      </div>
                    )}
                    {stateInfo.recordingLaws.exceptions && stateInfo.recordingLaws.exceptions.length > 0 && (
                      <div className="law-detail">
                        <strong>Exceptions</strong>
                        <span>{stateInfo.recordingLaws.exceptions.join(', ')}</span>
                      </div>
                    )}
                    {stateInfo.recordingLaws.notes && (
                      <div className="law-detail">
                        <strong>Notes</strong>
                        <span>{stateInfo.recordingLaws.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeCategory === 'case-law' && (
                <div className="law-section">
                  <h3 className="card-subtitle">Important Case Law</h3>
                  <div>
                    {stateInfo.caseLaw.length > 0 ? (
                      stateInfo.caseLaw.map((caseItem, index) => (
                        <div 
                          key={index} 
                          className="law-section" 
                          style={{ 
                            border: '1px solid var(--border-color)', 
                            borderRadius: 'var(--border-radius-md)',
                            padding: 'var(--spacing-md)',
                            marginBottom: 'var(--spacing-md)'
                          }}
                        >
                          <h4>{caseItem.name}</h4>
                          <p><strong>Year:</strong> {caseItem.year}</p>
                          <p><strong>Description:</strong> {caseItem.description}</p>
                          <p><strong>Significance:</strong> {caseItem.significance}</p>
                          <p><strong>Citation:</strong> {caseItem.citation}</p>
                        </div>
                      ))
                    ) : (
                      <p>No significant case law found for this state.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="card">
            <h2 className="card-title">Civil Rights Resources</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              A collection of resources to help you understand and protect your civil rights
            </p>
            
            <div className="resource-grid">
              <div className="resource-card">
                <h3>ACLU</h3>
                <p>American Civil Liberties Union - protecting civil rights and liberties</p>
                <a href="https://www.aclu.org" className="resource-link">
                  <Shield size={16} />
                  Visit Website
                </a>
              </div>
              
              <div className="resource-card">
                <h3>EFF</h3>
                <p>Electronic Frontier Foundation - digital rights and privacy</p>
                <a href="https://www.eff.org" className="resource-link">
                  <BookOpen size={16} />
                  Visit Website
                </a>
              </div>
              
              <div className="resource-card">
                <h3>Legal Aid</h3>
                <p>Find free legal assistance in your area</p>
                <a href="https://www.lsc.gov/find-legal-aid" className="resource-link">
                  <BookOpen size={16} />
                  Visit Website
                </a>
              </div>
              
              <div className="resource-card">
                <h3>Civil Rights Hotline</h3>
                <p>Report civil rights violations</p>
                <a href="tel:1-855-281-0860" className="resource-link">
                  <BookOpen size={16} />
                  Call 1-855-281-0860
                </a>
              </div>
              
              <div className="resource-card">
                <h3>Know Your Rights</h3>
                <p>Educational materials on civil rights</p>
                <a href="#" className="resource-link">
                  <BookOpen size={16} />
                  Download Guide
                </a>
              </div>
              
              <div className="resource-card">
                <h3>State Bar Associations</h3>
                <p>Contact information for state bar associations</p>
                <a href="https://www.americanbar.org/groups/bar_services/resources/state-bar-associations/" className="resource-link">
                  <BookOpen size={16} />
                  View List
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="card">
            <h2 className="card-title">Interactive State Map</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
              Color-coded by recording consent laws: Green = One-party consent, Red = All-party consent
            </p>
            
            <div className="map-container">
              <div className="state-map">
                {/* Map visualization would go here */}
                <p>Interactive map visualization component</p>
                <p>States will be color-coded based on selected category</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Contact Us</a>
            <a href="#" className="footer-link">About</a>
          </div>
          <p className="footer-text">© 2025 Civil Rights Tool. All rights reserved.</p>
          <p className="footer-text">This tool is for informational purposes only and does not constitute legal advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default ModernCivilRightsTool;