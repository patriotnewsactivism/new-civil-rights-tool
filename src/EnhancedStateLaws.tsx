import React, { useState } from 'react';
import { STATE_LEGAL_DATABASE, type StateLegalInfo } from './legalDatabase';
import InteractiveMap from './InteractiveMap';

interface EnhancedStateLawsProps {
  theme: string;
}

const EnhancedStateLaws: React.FC<EnhancedStateLawsProps> = ({ theme }) => {
  const [selectedState, setSelectedState] = useState<string>('California');
  const [activeCategory, setActiveCategory] = useState<string>('public-records');

  const cardBg = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const cardColor = theme === 'dark' ? 'bg-card-dark' : 'bg-card-light';
  const borderColor = theme === 'dark' ? 'border-dark' : 'border-light';

  const stateInfo: StateLegalInfo = STATE_LEGAL_DATABASE[selectedState];

  return (
    <div className={`${cardBg} ${cardColor} ${borderColor} p-6 rounded-lg shadow-lg mb-8`} style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="text-3xl font-bold mb-6 text-center">State Laws</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Select a State</h3>
            <select 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-gray-800"
            >
              {Object.keys(STATE_LEGAL_DATABASE).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Legal Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === 'public-records' 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory('public-records')}
              >
                Public Records
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === 'stop-and-id' 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory('stop-and-id')}
              >
                Stop and ID
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === 'cannabis' 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory('cannabis')}
              >
                Cannabis Laws
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === 'recording' 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory('recording')}
              >
                Recording Laws
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === 'case-law' 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory('case-law')}
              >
                Case Law
              </button>
            </div>
          </div>

          <div className="legal-info">
            {activeCategory === 'public-records' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Public Records Laws</h3>
                <p><strong>Statute:</strong> {stateInfo.publicRecords.statute}</p>
                <p><strong>Timeframe:</strong> {stateInfo.publicRecords.timeframe}</p>
                <p><strong>Type:</strong> {stateInfo.publicRecords.type}</p>
                {stateInfo.publicRecords.types && (
                  <p><strong>Types:</strong> {stateInfo.publicRecords.types.join(', ')}</p>
                )}
                {stateInfo.publicRecords.notes && (
                  <p><strong>Notes:</strong> {stateInfo.publicRecords.notes}</p>
                )}
              </div>
            )}

            {activeCategory === 'stop-and-id' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Stop and ID Laws</h3>
                <p><strong>Has Stop ID:</strong> {stateInfo.stopAndID.hasStopID ? 'Yes' : 'No'}</p>
                <p><strong>Requires ID:</strong> {stateInfo.stopAndID.requiresID}</p>
                {stateInfo.stopAndID.requirement && (
                  <p><strong>Requirement:</strong> {stateInfo.stopAndID.requirement}</p>
                )}
                <p><strong>Statute:</strong> {stateInfo.stopAndID.statute}</p>
                <p><strong>Recording Consent:</strong> {stateInfo.stopAndID.recordingConsent}</p>
                {stateInfo.stopAndID.notes && (
                  <p><strong>Notes:</strong> {stateInfo.stopAndID.notes}</p>
                )}
              </div>
            )}

            {activeCategory === 'cannabis' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Cannabis Laws</h3>
                <p><strong>Status:</strong> {stateInfo.cannabis.status}</p>
                <p><strong>Possession:</strong> {stateInfo.cannabis.possession}</p>
                {stateInfo.cannabis.possessionLimit && (
                  <p><strong>Possession Limit:</strong> {stateInfo.cannabis.possessionLimit}</p>
                )}
                <p><strong>Enacted:</strong> {stateInfo.cannabis.enacted}</p>
                {stateInfo.cannabis.penalties && (
                  <p><strong>Penalties:</strong> {stateInfo.cannabis.penalties}</p>
                )}
                {stateInfo.cannabis.medicalOnlyInfo && (
                  <p><strong>Medical Info:</strong> {stateInfo.cannabis.medicalOnlyInfo}</p>
                )}
                {stateInfo.cannabis.notes && (
                  <p><strong>Notes:</strong> {stateInfo.cannabis.notes}</p>
                )}
                {stateInfo.cannabis.medicalCardInfo && (
                  <div className="mt-4">
                    <h4 className="text-xl font-semibold">Medical Card Information</h4>
                    <p><strong>Application Process:</strong> {stateInfo.cannabis.medicalCardInfo.applicationProcess}</p>
                    <p><strong>Qualifying Conditions:</strong> {stateInfo.cannabis.medicalCardInfo.qualifyingConditions.join(', ')}</p>
                    <p><strong>Renewal:</strong> {stateInfo.cannabis.medicalCardInfo.renewal}</p>
                  </div>
                )}
              </div>
            )}

            {activeCategory === 'recording' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Recording Laws</h3>
                <p><strong>One-Party Consent:</strong> {stateInfo.recordingLaws.onePartyConsent ? 'Yes' : 'No'}</p>
                <p><strong>All-Party Consent:</strong> {stateInfo.recordingLaws.allPartyConsent ? 'Yes' : 'No'}</p>
                <p><strong>Video Recording Legal:</strong> {stateInfo.recordingLaws.videoLegal ? 'Yes' : 'No'}</p>
                <p><strong>Audio Recording Legal:</strong> {stateInfo.recordingLaws.audioLegal ? 'Yes' : 'No'}</p>
                {stateInfo.recordingLaws.videoRecording && (
                  <p><strong>Video Recording:</strong> {stateInfo.recordingLaws.videoRecording}</p>
                )}
                {stateInfo.recordingLaws.exceptions && stateInfo.recordingLaws.exceptions.length > 0 && (
                  <p><strong>Exceptions:</strong> {stateInfo.recordingLaws.exceptions.join(', ')}</p>
                )}
                {stateInfo.recordingLaws.notes && (
                  <p><strong>Notes:</strong> {stateInfo.recordingLaws.notes}</p>
                )}
              </div>
            )}

            {activeCategory === 'case-law' && stateInfo.caseLaw.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Important Case Law</h3>
                {stateInfo.caseLaw.map((caseItem, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="text-xl font-semibold">{caseItem.name}</h4>
                    <p><strong>Year:</strong> {caseItem.year}</p>
                    <p><strong>Description:</strong> {caseItem.description}</p>
                    <p><strong>Significance:</strong> {caseItem.significance}</p>
                    <p><strong>Citation:</strong> {caseItem.citation}</p>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'case-law' && stateInfo.caseLaw.length === 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Case Law</h3>
                <p>No significant case law found for this state.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Interactive State Map</h3>
            <p className="text-sm text-gray-600 mb-4">
              Color-coded by recording consent laws: Green = One-party consent, Red = All-party consent
            </p>
          </div>

          <div className="map-container">
            <InteractiveMap 
              onStateSelect={setSelectedState} 
              selectedState={selectedState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStateLaws;