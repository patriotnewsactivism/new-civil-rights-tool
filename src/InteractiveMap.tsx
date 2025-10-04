import React, { useState, useRef } from 'react';
import { STATE_LEGAL_DATABASE, type StateLegalInfo } from './legalDatabase';

interface InteractiveMapProps {
  onStateSelect: (state: string) => void;
  selectedState: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onStateSelect, selectedState }) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState<StateLegalInfo | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleStateClick = (stateName: string) => {
    onStateSelect(stateName);
  };

  const handleStateHover = (stateName: string, event: React.MouseEvent) => {
    setHoveredState(stateName);
    setTooltipContent(STATE_LEGAL_DATABASE[stateName]);
    
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  const handleStateLeave = () => {
    setHoveredState(null);
    setTooltipContent(null);
  };

  // Function to determine state color based on recording laws
  const getStateRecordingColor = (stateName: string) => {
    const state = STATE_LEGAL_DATABASE[stateName];
    if (state.recordingLaws.allPartyConsent) {
      return 'state-recording-all-party';
    } else if (state.recordingLaws.onePartyConsent) {
      return 'state-recording-one-party';
    }
    return 'state-default';
  };

  // Function to determine state color based on cannabis laws
  const getStateCannabisColor = (stateName: string) => {
    const state = STATE_LEGAL_DATABASE[stateName];
    if (state.cannabis.status === 'Recreational') {
      return 'state-cannabis-recreational';
    } else if (state.cannabis.status === 'Medical only') {
      return 'state-cannabis-medical';
    } else if (state.cannabis.status === 'Illegal') {
      return 'state-cannabis-illegal';
    }
    return 'state-default';
  };

  return (
    <div className="map-container" ref={mapRef}>
      <svg viewBox="0 0 960 600" className="w-full h-full">
        {/* Alabama */}
        <path
          d="M610,370 L620,380 L630,390 L640,400 L650,410 L660,420 L670,430 L680,440 L690,450 L700,460 L710,470 L720,480 L730,490 L740,500 L750,510 L760,520 L770,530 L780,540 L790,550 L800,560 L810,570 L820,580 L830,590 L840,600 L610,600 Z"
          className={`state ${hoveredState === 'Alabama' ? 'state-hover' : ''} ${selectedState === 'Alabama' ? 'state-active' : ''} ${getStateRecordingColor('Alabama')}`}
          onClick={() => handleStateClick('Alabama')}
          onMouseEnter={(e) => handleStateHover('Alabama', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Alaska */}
        <path
          d="M100,100 L150,100 L150,150 L100,150 Z"
          className={`state ${hoveredState === 'Alaska' ? 'state-hover' : ''} ${selectedState === 'Alaska' ? 'state-active' : ''} ${getStateCannabisColor('Alaska')}`}
          onClick={() => handleStateClick('Alaska')}
          onMouseEnter={(e) => handleStateHover('Alaska', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Arizona */}
        <path
          d="M200,300 L250,300 L250,350 L200,350 Z"
          className={`state ${hoveredState === 'Arizona' ? 'state-hover' : ''} ${selectedState === 'Arizona' ? 'state-active' : ''} ${getStateCannabisColor('Arizona')}`}
          onClick={() => handleStateClick('Arizona')}
          onMouseEnter={(e) => handleStateHover('Arizona', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Arkansas */}
        <path
          d="M550,350 L600,350 L600,400 L550,400 Z"
          className={`state ${hoveredState === 'Arkansas' ? 'state-hover' : ''} ${selectedState === 'Arkansas' ? 'state-active' : ''} ${getStateRecordingColor('Arkansas')}`}
          onClick={() => handleStateClick('Arkansas')}
          onMouseEnter={(e) => handleStateHover('Arkansas', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* California */}
        <path
          d="M100,300 L200,300 L200,400 L100,400 Z"
          className={`state ${hoveredState === 'California' ? 'state-hover' : ''} ${selectedState === 'California' ? 'state-active' : ''} ${getStateCannabisColor('California')}`}
          onClick={() => handleStateClick('California')}
          onMouseEnter={(e) => handleStateHover('California', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Colorado */}
        <path
          d="M300,300 L350,300 L350,350 L300,350 Z"
          className={`state ${hoveredState === 'Colorado' ? 'state-hover' : ''} ${selectedState === 'Colorado' ? 'state-active' : ''} ${getStateCannabisColor('Colorado')}`}
          onClick={() => handleStateClick('Colorado')}
          onMouseEnter={(e) => handleStateHover('Colorado', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Connecticut */}
        <path
          d="M850,150 L900,150 L900,200 L850,200 Z"
          className={`state ${hoveredState === 'Connecticut' ? 'state-hover' : ''} ${selectedState === 'Connecticut' ? 'state-active' : ''} ${getStateRecordingColor('Connecticut')}`}
          onClick={() => handleStateClick('Connecticut')}
          onMouseEnter={(e) => handleStateHover('Connecticut', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Delaware */}
        <path
          d="M850,250 L900,250 L900,300 L850,300 Z"
          className={`state ${hoveredState === 'Delaware' ? 'state-hover' : ''} ${selectedState === 'Delaware' ? 'state-active' : ''} ${getStateCannabisColor('Delaware')}`}
          onClick={() => handleStateClick('Delaware')}
          onMouseEnter={(e) => handleStateHover('Delaware', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Florida */}
        <path
          d="M700,450 L750,450 L750,500 L700,500 Z"
          className={`state ${hoveredState === 'Florida' ? 'state-hover' : ''} ${selectedState === 'Florida' ? 'state-active' : ''} ${getStateRecordingColor('Florida')}`}
          onClick={() => handleStateClick('Florida')}
          onMouseEnter={(e) => handleStateHover('Florida', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Georgia */}
        <path
          d="M750,350 L800,350 L800,400 L750,400 Z"
          className={`state ${hoveredState === 'Georgia' ? 'state-hover' : ''} ${selectedState === 'Georgia' ? 'state-active' : ''} ${getStateCannabisColor('Georgia')}`}
          onClick={() => handleStateClick('Georgia')}
          onMouseEnter={(e) => handleStateHover('Georgia', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Hawaii */}
        <path
          d="M250,500 L300,500 L300,550 L250,550 Z"
          className={`state ${hoveredState === 'Hawaii' ? 'state-hover' : ''} ${selectedState === 'Hawaii' ? 'state-active' : ''} ${getStateCannabisColor('Hawaii')}`}
          onClick={() => handleStateClick('Hawaii')}
          onMouseEnter={(e) => handleStateHover('Hawaii', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Idaho */}
        <path
          d="M200,200 L250,200 L250,250 L200,250 Z"
          className={`state ${hoveredState === 'Idaho' ? 'state-hover' : ''} ${selectedState === 'Idaho' ? 'state-active' : ''} ${getStateCannabisColor('Idaho')}`}
          onClick={() => handleStateClick('Idaho')}
          onMouseEnter={(e) => handleStateHover('Idaho', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Illinois */}
        <path
          d="M600,250 L650,250 L650,300 L600,300 Z"
          className={`state ${hoveredState === 'Illinois' ? 'state-hover' : ''} ${selectedState === 'Illinois' ? 'state-active' : ''} ${getStateCannabisColor('Illinois')}`}
          onClick={() => handleStateClick('Illinois')}
          onMouseEnter={(e) => handleStateHover('Illinois', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Indiana */}
        <path
          d="M650,250 L700,250 L700,300 L650,300 Z"
          className={`state ${hoveredState === 'Indiana' ? 'state-hover' : ''} ${selectedState === 'Indiana' ? 'state-active' : ''} ${getStateCannabisColor('Indiana')}`}
          onClick={() => handleStateClick('Indiana')}
          onMouseEnter={(e) => handleStateHover('Indiana', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Iowa */}
        <path
          d="M550,250 L600,250 L600,300 L550,300 Z"
          className={`state ${hoveredState === 'Iowa' ? 'state-hover' : ''} ${selectedState === 'Iowa' ? 'state-active' : ''} ${getStateCannabisColor('Iowa')}`}
          onClick={() => handleStateClick('Iowa')}
          onMouseEnter={(e) => handleStateHover('Iowa', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Kansas */}
        <path
          d="M450,300 L500,300 L500,350 L450,350 Z"
          className={`state ${hoveredState === 'Kansas' ? 'state-hover' : ''} ${selectedState === 'Kansas' ? 'state-active' : ''} ${getStateCannabisColor('Kansas')}`}
          onClick={() => handleStateClick('Kansas')}
          onMouseEnter={(e) => handleStateHover('Kansas', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Kentucky */}
        <path
          d="M650,300 L700,300 L700,350 L650,350 Z"
          className={`state ${hoveredState === 'Kentucky' ? 'state-hover' : ''} ${selectedState === 'Kentucky' ? 'state-active' : ''} ${getStateCannabisColor('Kentucky')}`}
          onClick={() => handleStateClick('Kentucky')}
          onMouseEnter={(e) => handleStateHover('Kentucky', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Louisiana */}
        <path
          d="M550,450 L600,450 L600,500 L550,500 Z"
          className={`state ${hoveredState === 'Louisiana' ? 'state-hover' : ''} ${selectedState === 'Louisiana' ? 'state-active' : ''} ${getStateCannabisColor('Louisiana')}`}
          onClick={() => handleStateClick('Louisiana')}
          onMouseEnter={(e) => handleStateHover('Louisiana', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Maine */}
        <path
          d="M850,50 L900,50 L900,100 L850,100 Z"
          className={`state ${hoveredState === 'Maine' ? 'state-hover' : ''} ${selectedState === 'Maine' ? 'state-active' : ''} ${getStateCannabisColor('Maine')}`}
          onClick={() => handleStateClick('Maine')}
          onMouseEnter={(e) => handleStateHover('Maine', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Maryland */}
        <path
          d="M800,250 L850,250 L850,300 L800,300 Z"
          className={`state ${hoveredState === 'Maryland' ? 'state-hover' : ''} ${selectedState === 'Maryland' ? 'state-active' : ''} ${getStateCannabisColor('Maryland')}`}
          onClick={() => handleStateClick('Maryland')}
          onMouseEnter={(e) => handleStateHover('Maryland', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Massachusetts */}
        <path
          d="M850,100 L900,100 L900,150 L850,150 Z"
          className={`state ${hoveredState === 'Massachusetts' ? 'state-hover' : ''} ${selectedState === 'Massachusetts' ? 'state-active' : ''} ${getStateRecordingColor('Massachusetts')}`}
          onClick={() => handleStateClick('Massachusetts')}
          onMouseEnter={(e) => handleStateHover('Massachusetts', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Michigan */}
        <path
          d="M700,200 L750,200 L750,250 L700,250 Z"
          className={`state ${hoveredState === 'Michigan' ? 'state-hover' : ''} ${selectedState === 'Michigan' ? 'state-active' : ''} ${getStateCannabisColor('Michigan')}`}
          onClick={() => handleStateClick('Michigan')}
          onMouseEnter={(e) => handleStateHover('Michigan', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Minnesota */}
        <path
          d="M500,200 L550,200 L550,250 L500,250 Z"
          className={`state ${hoveredState === 'Minnesota' ? 'state-hover' : ''} ${selectedState === 'Minnesota' ? 'state-active' : ''} ${getStateCannabisColor('Minnesota')}`}
          onClick={() => handleStateClick('Minnesota')}
          onMouseEnter={(e) => handleStateHover('Minnesota', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Mississippi */}
        <path
          d="M600,400 L650,400 L650,450 L600,450 Z"
          className={`state ${hoveredState === 'Mississippi' ? 'state-hover' : ''} ${selectedState === 'Mississippi' ? 'state-active' : ''} ${getStateCannabisColor('Mississippi')}`}
          onClick={() => handleStateClick('Mississippi')}
          onMouseEnter={(e) => handleStateHover('Mississippi', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Missouri */}
        <path
          d="M550,300 L600,300 L600,350 L550,350 Z"
          className={`state ${hoveredState === 'Missouri' ? 'state-hover' : ''} ${selectedState === 'Missouri' ? 'state-active' : ''} ${getStateCannabisColor('Missouri')}`}
          onClick={() => handleStateClick('Missouri')}
          onMouseEnter={(e) => handleStateHover('Missouri', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Montana */}
        <path
          d="M300,150 L350,150 L350,200 L300,200 Z"
          className={`state ${hoveredState === 'Montana' ? 'state-hover' : ''} ${selectedState === 'Montana' ? 'state-active' : ''} ${getStateRecordingColor('Montana')}`}
          onClick={() => handleStateClick('Montana')}
          onMouseEnter={(e) => handleStateHover('Montana', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Nebraska */}
        <path
          d="M450,250 L500,250 L500,300 L450,300 Z"
          className={`state ${hoveredState === 'Nebraska' ? 'state-hover' : ''} ${selectedState === 'Nebraska' ? 'state-active' : ''} ${getStateCannabisColor('Nebraska')}`}
          onClick={() => handleStateClick('Nebraska')}
          onMouseEnter={(e) => handleStateHover('Nebraska', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Nevada */}
        <path
          d="M200,250 L250,250 L250,300 L200,300 Z"
          className={`state ${hoveredState === 'Nevada' ? 'state-hover' : ''} ${selectedState === 'Nevada' ? 'state-active' : ''} ${getStateRecordingColor('Nevada')}`}
          onClick={() => handleStateClick('Nevada')}
          onMouseEnter={(e) => handleStateHover('Nevada', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* New Hampshire */}
        <path
          d="M850,50 L900,50 L900,100 L850,100 Z"
          className={`state ${hoveredState === 'New Hampshire' ? 'state-hover' : ''} ${selectedState === 'New Hampshire' ? 'state-active' : ''} ${getStateRecordingColor('New Hampshire')}`}
          onClick={() => handleStateClick('New Hampshire')}
          onMouseEnter={(e) => handleStateHover('New Hampshire', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* New Jersey */}
        <path
          d="M800,200 L850,200 L850,250 L800,250 Z"
          className={`state ${hoveredState === 'New Jersey' ? 'state-hover' : ''} ${selectedState === 'New Jersey' ? 'state-active' : ''} ${getStateCannabisColor('New Jersey')}`}
          onClick={() => handleStateClick('New Jersey')}
          onMouseEnter={(e) => handleStateHover('New Jersey', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* New Mexico */}
        <path
          d="M300,350 L350,350 L350,400 L300,400 Z"
          className={`state ${hoveredState === 'New Mexico' ? 'state-hover' : ''} ${selectedState === 'New Mexico' ? 'state-active' : ''} ${getStateCannabisColor('New Mexico')}`}
          onClick={() => handleStateClick('New Mexico')}
          onMouseEnter={(e) => handleStateHover('New Mexico', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* New York */}
        <path
          d="M750,150 L800,150 L800,200 L750,200 Z"
          className={`state ${hoveredState === 'New York' ? 'state-hover' : ''} ${selectedState === 'New York' ? 'state-active' : ''} ${getStateCannabisColor('New York')}`}
          onClick={() => handleStateClick('New York')}
          onMouseEnter={(e) => handleStateHover('New York', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* North Carolina */}
        <path
          d="M750,300 L800,300 L800,350 L750,350 Z"
          className={`state ${hoveredState === 'North Carolina' ? 'state-hover' : ''} ${selectedState === 'North Carolina' ? 'state-active' : ''} ${getStateCannabisColor('North Carolina')}`}
          onClick={() => handleStateClick('North Carolina')}
          onMouseEnter={(e) => handleStateHover('North Carolina', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* North Dakota */}
        <path
          d="M400,150 L450,150 L450,200 L400,200 Z"
          className={`state ${hoveredState === 'North Dakota' ? 'state-hover' : ''} ${selectedState === 'North Dakota' ? 'state-active' : ''} ${getStateCannabisColor('North Dakota')}`}
          onClick={() => handleStateClick('North Dakota')}
          onMouseEnter={(e) => handleStateHover('North Dakota', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Ohio */}
        <path
          d="M700,250 L750,250 L750,300 L700,300 Z"
          className={`state ${hoveredState === 'Ohio' ? 'state-hover' : ''} ${selectedState === 'Ohio' ? 'state-active' : ''} ${getStateCannabisColor('Ohio')}`}
          onClick={() => handleStateClick('Ohio')}
          onMouseEnter={(e) => handleStateHover('Ohio', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Oklahoma */}
        <path
          d="M450,350 L500,350 L500,400 L450,400 Z"
          className={`state ${hoveredState === 'Oklahoma' ? 'state-hover' : ''} ${selectedState === 'Oklahoma' ? 'state-active' : ''} ${getStateCannabisColor('Oklahoma')}`}
          onClick={() => handleStateClick('Oklahoma')}
          onMouseEnter={(e) => handleStateHover('Oklahoma', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Oregon */}
        <path
          d="M100,200 L150,200 L150,250 L100,250 Z"
          className={`state ${hoveredState === 'Oregon' ? 'state-hover' : ''} ${selectedState === 'Oregon' ? 'state-active' : ''} ${getStateCannabisColor('Oregon')}`}
          onClick={() => handleStateClick('Oregon')}
          onMouseEnter={(e) => handleStateHover('Oregon', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Pennsylvania */}
        <path
          d="M750,200 L800,200 L800,250 L750,250 Z"
          className={`state ${hoveredState === 'Pennsylvania' ? 'state-hover' : ''} ${selectedState === 'Pennsylvania' ? 'state-active' : ''} ${getStateRecordingColor('Pennsylvania')}`}
          onClick={() => handleStateClick('Pennsylvania')}
          onMouseEnter={(e) => handleStateHover('Pennsylvania', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Rhode Island */}
        <path
          d="M875,175 L900,175 L900,200 L875,200 Z"
          className={`state ${hoveredState === 'Rhode Island' ? 'state-hover' : ''} ${selectedState === 'Rhode Island' ? 'state-active' : ''} ${getStateCannabisColor('Rhode Island')}`}
          onClick={() => handleStateClick('Rhode Island')}
          onMouseEnter={(e) => handleStateHover('Rhode Island', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* South Carolina */}
        <path
          d="M750,350 L800,350 L800,400 L750,400 Z"
          className={`state ${hoveredState === 'South Carolina' ? 'state-hover' : ''} ${selectedState === 'South Carolina' ? 'state-active' : ''} ${getStateCannabisColor('South Carolina')}`}
          onClick={() => handleStateClick('South Carolina')}
          onMouseEnter={(e) => handleStateHover('South Carolina', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* South Dakota */}
        <path
          d="M450,200 L500,200 L500,250 L450,250 Z"
          className={`state ${hoveredState === 'South Dakota' ? 'state-hover' : ''} ${selectedState === 'South Dakota' ? 'state-active' : ''} ${getStateCannabisColor('South Dakota')}`}
          onClick={() => handleStateClick('South Dakota')}
          onMouseEnter={(e) => handleStateHover('South Dakota', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Tennessee */}
        <path
          d="M650,350 L700,350 L700,400 L650,400 Z"
          className={`state ${hoveredState === 'Tennessee' ? 'state-hover' : ''} ${selectedState === 'Tennessee' ? 'state-active' : ''} ${getStateCannabisColor('Tennessee')}`}
          onClick={() => handleStateClick('Tennessee')}
          onMouseEnter={(e) => handleStateHover('Tennessee', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Texas */}
        <path
          d="M400,400 L500,400 L500,500 L400,500 Z"
          className={`state ${hoveredState === 'Texas' ? 'state-hover' : ''} ${selectedState === 'Texas' ? 'state-active' : ''} ${getStateRecordingColor('Texas')}`}
          onClick={() => handleStateClick('Texas')}
          onMouseEnter={(e) => handleStateHover('Texas', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Utah */}
        <path
          d="M250,250 L300,250 L300,300 L250,300 Z"
          className={`state ${hoveredState === 'Utah' ? 'state-hover' : ''} ${selectedState === 'Utah' ? 'state-active' : ''} ${getStateCannabisColor('Utah')}`}
          onClick={() => handleStateClick('Utah')}
          onMouseEnter={(e) => handleStateHover('Utah', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Vermont */}
        <path
          d="M825,125 L850,125 L850,150 L825,150 Z"
          className={`state ${hoveredState === 'Vermont' ? 'state-hover' : ''} ${selectedState === 'Vermont' ? 'state-active' : ''} ${getStateCannabisColor('Vermont')}`}
          onClick={() => handleStateClick('Vermont')}
          onMouseEnter={(e) => handleStateHover('Vermont', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Virginia */}
        <path
          d="M775,275 L825,275 L825,325 L775,325 Z"
          className={`state ${hoveredState === 'Virginia' ? 'state-hover' : ''} ${selectedState === 'Virginia' ? 'state-active' : ''} ${getStateCannabisColor('Virginia')}`}
          onClick={() => handleStateClick('Virginia')}
          onMouseEnter={(e) => handleStateHover('Virginia', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Washington */}
        <path
          d="M150,150 L200,150 L200,200 L150,200 Z"
          className={`state ${hoveredState === 'Washington' ? 'state-hover' : ''} ${selectedState === 'Washington' ? 'state-active' : ''} ${getStateRecordingColor('Washington')}`}
          onClick={() => handleStateClick('Washington')}
          onMouseEnter={(e) => handleStateHover('Washington', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* West Virginia */}
        <path
          d="M750,250 L775,250 L775,275 L750,275 Z"
          className={`state ${hoveredState === 'West Virginia' ? 'state-hover' : ''} ${selectedState === 'West Virginia' ? 'state-active' : ''} ${getStateCannabisColor('West Virginia')}`}
          onClick={() => handleStateClick('West Virginia')}
          onMouseEnter={(e) => handleStateHover('West Virginia', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Wisconsin */}
        <path
          d="M600,200 L650,200 L650,250 L600,250 Z"
          className={`state ${hoveredState === 'Wisconsin' ? 'state-hover' : ''} ${selectedState === 'Wisconsin' ? 'state-active' : ''} ${getStateCannabisColor('Wisconsin')}`}
          onClick={() => handleStateClick('Wisconsin')}
          onMouseEnter={(e) => handleStateHover('Wisconsin', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* Wyoming */}
        <path
          d="M300,200 L350,200 L350,250 L300,250 Z"
          className={`state ${hoveredState === 'Wyoming' ? 'state-hover' : ''} ${selectedState === 'Wyoming' ? 'state-active' : ''} ${getStateCannabisColor('Wyoming')}`}
          onClick={() => handleStateClick('Wyoming')}
          onMouseEnter={(e) => handleStateHover('Wyoming', e)}
          onMouseLeave={handleStateLeave}
        />
        
        {/* District of Columbia */}
        <path
          d="M825,225 L850,225 L850,250 L825,250 Z"
          className={`state ${hoveredState === 'District of Columbia' ? 'state-hover' : ''} ${selectedState === 'District of Columbia' ? 'state-active' : ''} ${getStateCannabisColor('District of Columbia')}`}
          onClick={() => handleStateClick('District of Columbia')}
          onMouseEnter={(e) => handleStateHover('District of Columbia', e)}
          onMouseLeave={handleStateLeave}
        />
      </svg>
      
      {/* Tooltip */}
      {tooltipContent && (
        <div 
          className="tooltip visible"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10
          }}
        >
          <h4>{tooltipContent.name}</h4>
          <p><strong>Recording:</strong> {tooltipContent.recordingLaws.onePartyConsent ? 'One-party consent' : tooltipContent.recordingLaws.allPartyConsent ? 'All-party consent' : 'Unknown'}</p>
          <p><strong>Cannabis:</strong> {tooltipContent.cannabis.status}</p>
          <p><strong>Public Records:</strong> {tooltipContent.publicRecords.timeframe}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;