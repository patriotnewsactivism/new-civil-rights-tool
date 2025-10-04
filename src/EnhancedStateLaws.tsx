import React, { useState } from 'react';
import { STATE_LEGAL_DATABASE, StateLegalInfo } from './legalDatabase';
import InteractiveMap from './InteractiveMap';

interface EnhancedStateLawsProps {
  theme: string;
}

const EnhancedStateLaws: React.FC<EnhancedStateLawsProps> = ({ theme }) => {
  const [selectedState, setSelectedState] = useState<string>('California');
  const [activeCategory, setActiveCategory] = useState<string>('public-records');
  const [mapCategory, setMapCategory] = useState<string>('recording');

  const cardBg = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const cardColor = theme === 'dark' ? 'bg-card-dark' : 'bg-card-light';
  const borderColor = theme === 'dark' ? 'border-dark' : 'border-light';
  const textColor = theme === 'dark' ? 'text-blue-500' : 'text-blue-500';

  const stateInfo: StateLegalInfo = STATE_LEGAL_DATABASE[selectedState];

  // Get all states sorted alphabetically
  const sortedStates = Object.keys(STATE_LEGAL_DATABASE).sort();

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">State Civil Rights Laws</h1>
        <p className="text-xl">Comprehensive database of public records, recording, and cannabis laws by state</p>
      </div>

      {/* Interactive Map Section */}
      <div className={`${cardColor} card mb-8`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Interactive State Map</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <button 
              className={`px-4 py-2 rounded-lg ${mapCategory === 'recording' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMapCategory('recording')}
            >
              Recording Laws
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${mapCategory === 'cannabis' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMapCategory('cannabis')}
            >
              Cannabis Laws
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${mapCategory === 'public-records' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMapCategory('public-records')}
            >
              Public Records Laws
            </button>
          </div>
          <p className="mb-4">
            {mapCategory === 'recording' && 'Color-coded by recording consent laws: Green = One-party consent, Red = All-party consent'}
            {mapCategory === 'cannabis' && 'Color-coded by cannabis legality: Green = Recreational, Yellow = Medical only, Red = Illegal'}
            {mapCategory === 'public-records' && 'Color-coded by public records response timeframes'}
          </p>
        </div>
        
        <InteractiveMap 
          onStateSelect={setSelectedState} 
          selectedState={selectedState}
          theme={theme}
        />
      </div>

      {/* State Selector */}
      <div className={`${cardColor} card mb-8`}>
        <h2 className="text-2xl font-bold mb-4">Select a State</h2>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-4 border rounded-lg text-lg"
        >
          {sortedStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* State Information Display */}
      <div className={`${cardColor} card mb-8`}>
        <h2 className="text-3xl font-bold mb-2">{selectedState}</h2>
        <p className="text-lg mb-6">Comprehensive Legal Information</p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'public-records', label: 'Public Records Laws' },
            { id: 'stop-id', label: 'Stop & ID Laws' },
            { id: 'recording', label: 'Recording Laws' },
            { id: 'cannabis', label: 'Cannabis Laws' },
            { id: 'case-law', label: 'Important Case Law' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === cat.id 
                  ? 'btn-primary' 
                  : 'btn-secondary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Public Records Laws */}
        {activeCategory === 'public-records' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Public Records Laws</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                <p className="text-sm font-semibold mb-2">Statute</p>
                <p className="text-lg">{stateInfo.publicRecords.statute}</p>
              </div>
              <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                <p className="text-sm font-semibold mb-2">Response Timeframe</p>
                <p className="text-lg">{stateInfo.publicRecords.timeframe}</p>
              </div>
              <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                <p className="text-sm font-semibold mb-2">Timeframe Type</p>
                <p className="text-lg capitalize">{stateInfo.publicRecords.type}</p>
              </div>
            </div>
            <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
              <h4 className="text-xl font-bold mb-3">Key Information</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Agencies must respond within the statutory timeframe</li>
                <li>Exemptions must be specifically cited</li>
                <li>Fee estimates should be provided if costs exceed limits</li>
                <li>Denials must include appeal procedures</li>
                <li>Electronic format production reduces costs</li>
              </ul>
            </div>
          </div>
        )}

        {/* Stop & ID Laws */}
        {activeCategory === 'stop-id' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Stop & Identify Laws</h3>
            <div className={`${cardBg} p-6 rounded-lg border ${borderColor} mb-6`}>
              <div className="flex items-center space-x-4 mb-4">
                {stateInfo.stopAndID.hasStopID ? (
                  <>
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">⚠️</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-red-500">Stop & ID State</p>
                      <p>You must identify yourself when lawfully detained</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-500">No Stop & ID Law</p>
                      <p>No requirement to identify unless arrested</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold mb-1">Statute</p>
                  <p>{stateInfo.stopAndID.statute}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">ID Requirement</p>
                  <p>{stateInfo.stopAndID.requiresID}</p>
                </div>
              </div>
            </div>
            
            <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
              <h4 className="text-xl font-bold mb-3">What "Lawful Detention" Means</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Officer must have reasonable suspicion you committed, are committing, or are about to commit a crime</li>
                <li>General "suspicious behavior" is not sufficient for detention</li>
                <li>You have the right to ask "Am I being detained?" and "What crime do you suspect?"</li>
                <li>If not detained, you are free to leave</li>
                <li>Refusal to ID when lawfully detained can result in additional charges</li>
              </ul>
            </div>
          </div>
        )}

        {/* Recording Laws */}
        {activeCategory === 'recording' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Recording Laws</h3>
            <div className={`${cardBg} p-6 rounded-lg border ${borderColor} mb-6`}>
              <div className="flex items-center space-x-4 mb-4">
                {stateInfo.recordingLaws.onePartyConsent ? (
                  <>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-500">One-Party Consent</p>
                      <p>You may record conversations you're part of without other parties' consent</p>
                    </div>
                  </>
                ) : stateInfo.recordingLaws.allPartyConsent ? (
                  <>
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">⚠️</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-red-500">All-Party Consent Required</p>
                      <p>All parties must consent to recording private conversations</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">?</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-yellow-500">Unknown Recording Status</p>
                      <p>Recording laws require further research</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                  <p className="text-sm font-semibold mb-1">Video Recording</p>
                  <p className={stateInfo.recordingLaws.videoLegal ? "text-green-500" : "text-red-500"}>
                    {stateInfo.recordingLaws.videoLegal ? "Legal in public spaces" : "May have restrictions"}
                  </p>
                </div>
                <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                  <p className="text-sm font-semibold mb-1">Audio Recording</p>
                  <p className={stateInfo.recordingLaws.audioLegal ? "text-green-500" : "text-red-500"}>
                    {stateInfo.recordingLaws.audioLegal ? "Legal with consent" : "Requires all-party consent"}
                  </p>
                </div>
              </div>
              
              {stateInfo.recordingLaws.exceptions && stateInfo.recordingLaws.exceptions.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Exceptions:</p>
                  <ul className="list-disc pl-6">
                    {stateInfo.recordingLaws.exceptions.map((exception, idx) => (
                      <li key={idx}>{exception}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
              <h4 className="text-xl font-bold mb-3">First Amendment Protection</h4>
              <p>
                The right to record police officers performing their duties in public is protected by the First Amendment 
                in all states, regardless of state recording consent laws. This has been affirmed by multiple federal 
                circuit courts. However, you may not interfere with police operations while recording.
              </p>
            </div>
          </div>
        )}

        {/* Cannabis Laws */}
        {activeCategory === 'cannabis' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Cannabis Laws</h3>
            <div className={`${cardBg} p-6 rounded-lg border ${borderColor} mb-6`}>
              <div className="flex items-center space-x-4 mb-4">
                {stateInfo.cannabis.status === 'Recreational' ? (
                  <>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-500">Recreational Legal</p>
                      <p>Adults 21+ may possess up to {stateInfo.cannabis.possession}</p>
                    </div>
                  </>
                ) : stateInfo.cannabis.status === 'Medical only' ? (
                  <>
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">⚕️</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-yellow-500">Medical Only</p>
                      <p>Requires valid medical card</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">⚠️</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-red-500">Illegal</p>
                      <p>Possession prohibited under state law</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold mb-1">Possession Limit</p>
                  <p>{stateInfo.cannabis.possession}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Law Enacted</p>
                  <p>{stateInfo.cannabis.enacted}</p>
                </div>
              </div>
              
              {stateInfo.cannabis.medicalOnlyInfo && (
                <div className={`${cardBg} p-4 rounded-lg border ${borderColor} mb-4`}>
                  <p className="font-semibold mb-2">How to Obtain Medical Card:</p>
                  <p>{stateInfo.cannabis.medicalOnlyInfo}</p>
                </div>
              )}
              
              <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                <p className="font-semibold mb-2">Penalties:</p>
                <p>{stateInfo.cannabis.penalties}</p>
              </div>
            </div>
            
            <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
              <h4 className="text-xl font-bold mb-3">Federal Law Reminder</h4>
              <p>
                Cannabis remains illegal under federal law (Schedule I controlled substance). This creates complications 
                for banking, employment, federal benefits, immigration, and possession on federal property. Even in states 
                where cannabis is legal, federal law enforcement can technically prosecute, though this is rare for 
                state-compliant activities.
              </p>
            </div>
          </div>
        )}

        {/* Case Law */}
        {activeCategory === 'case-law' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Important Case Law</h3>
            <div className="mb-6">
              {stateInfo.caseLaw.length > 0 ? (
                stateInfo.caseLaw.map((caseItem, idx) => (
                  <div 
                    key={idx} 
                    className={`${cardBg} p-6 rounded-lg border ${borderColor} mb-4 case-law-item`}
                  >
                    <h4 className="text-xl font-bold mb-2">{caseItem.name} ({caseItem.year})</h4>
                    <p className="mb-3">{caseItem.description}</p>
                    <div className="mb-3">
                      <p className="font-semibold">Significance:</p>
                      <p>{caseItem.significance}</p>
                    </div>
                    <p className="font-mono text-sm">Citation: {caseItem.citation}</p>
                  </div>
                ))
              ) : (
                <div className={`${cardBg} p-6 rounded-lg border ${borderColor} text-center`}>
                  <p>No significant case law found for this state</p>
                </div>
              )}
            </div>
            
            <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
              <h4 className="text-xl font-bold mb-3">Federal Circuit Information</h4>
              <p>
                This state falls under the jurisdiction of the {selectedState === 'California' ? 'Ninth Circuit' : 
                  selectedState === 'New York' ? 'Second Circuit' : 
                  selectedState === 'Texas' ? 'Fifth Circuit' : 
                  'appropriate federal circuit court'}. Federal circuit decisions apply to all states within that circuit.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedStateLaws;