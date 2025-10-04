import React from 'react';
import { useAuth } from './AuthContext';
import { Check, X } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, logout, isTrialActive } = useAuth();

  // Subscription tiers data
  const subscriptionTiers = {
    basic: {
      name: 'Basic',
      price: 0,
      description: 'Essential civil rights information',
      features: [
        { name: 'Public Records Laws', included: true },
        { name: 'Stop and ID Laws', included: true },
        { name: 'Cannabis Laws', included: false },
        { name: 'Recording Laws', included: false },
        { name: 'Case Law Database', included: false },
        { name: 'Interactive Map', included: false },
        { name: 'Resource Library', included: false },
      ]
    },
    premium: {
      name: 'Premium',
      price: 29,
      description: 'Complete civil rights information with interactive tools',
      features: [
        { name: 'Public Records Laws', included: true },
        { name: 'Stop and ID Laws', included: true },
        { name: 'Cannabis Laws', included: true },
        { name: 'Recording Laws', included: true },
        { name: 'Case Law Database', included: true },
        { name: 'Interactive Map', included: true },
        { name: 'Resource Library', included: true },
      ]
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="main-content">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h2 className="card-title">Welcome, {user?.name}!</h2>
          <button 
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ padding: 'var(--spacing-xs) var(--spacing-md)' }}
          >
            Logout
          </button>
        </div>
        
        {isTrialActive && (
          <div className="card" style={{ 
            backgroundColor: 'rgba(52, 168, 83, 0.1)', 
            border: '1px solid var(--success)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <Check style={{ color: 'var(--success)' }} />
              <p>You're currently on a <strong>10-day free trial</strong> of our Premium platform. 
              Enjoy full access to all features until {user?.trialEndDate?.toLocaleDateString()}!</p>
            </div>
          </div>
        )}
        
        <div className="subscription-plans">
          <div className="plan-card">
            <h3 className="plan-name">{subscriptionTiers.basic.name}</h3>
            <div className="plan-price">${subscriptionTiers.basic.price}/month</div>
            <p className="plan-description">{subscriptionTiers.basic.description}</p>
            <ul className="plan-features">
              {subscriptionTiers.basic.features.map((feature, index) => (
                <li 
                  key={index} 
                  className={`plan-feature ${feature.included ? 'included' : 'not-included'}`}
                >
                  <span className="feature-icon">
                    {feature.included ? <Check size={20} /> : <X size={20} />}
                  </span>
                  {feature.name}
                </li>
              ))}
            </ul>
            <button className="btn btn-outline" disabled>
              Current Plan
            </button>
          </div>
          
          <div className="plan-card featured">
            <h3 className="plan-name">{subscriptionTiers.premium.name}</h3>
            <div className="plan-price">${subscriptionTiers.premium.price}/month</div>
            <p className="plan-description">{subscriptionTiers.premium.description}</p>
            <ul className="plan-features">
              {subscriptionTiers.premium.features.map((feature, index) => (
                <li 
                  key={index} 
                  className={`plan-feature ${feature.included ? 'included' : 'not-included'}`}
                >
                  <span className="feature-icon">
                    {feature.included ? <Check size={20} /> : <X size={20} />}
                  </span>
                  {feature.name}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary">
              {isTrialActive ? 'Upgrade Now' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;