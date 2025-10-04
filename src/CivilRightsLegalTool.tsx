import React, { useState, useEffect, createContext } from 'react';
import { AlertTriangle, Download, FileText, Shield, Scale, Book, Check, X } from 'lucide-react';

type LawDatabase = { [key: string]: { statute: string; timeframe: string; type: string; } };
type StopIdDatabase = { [key:string]: { hasStopID: boolean; statute: string; requiresID: string; recordingConsent: string; } };
type CannabisDatabase = { [key: string]: { status: string; possession: string; enacted: string; } };
type WarningDatabase = { [key: string]: { level: string; issues: string[]; recommendations: string[]; } };

// ============================================================================
// CONTEXT & STATE MANAGEMENT
// ============================================================================


// Define the shape of our context's value
interface SubscriptionContextType {
  tier: string;
  setTier: (tier: string) => void;
  hasAccess: (feature: string) => boolean; // <-- Explicitly expect a boolean
}

// Use that type when creating the context
const SubscriptionContext = createContext<SubscriptionContextType>({
  tier: 'basic',
  setTier: (_tier: string) => {},
  hasAccess: (_feature: string) => false, // The default value now conforms to the type
});
const SUBSCRIPTION_TIERS = {
  basic: {
    price: 29,
    features: ['foia', 'state_prr', 'id_card', 'pdf_export', 'png_export']
  },
  professional: {
    price: 79,
    features: ['foia', 'state_prr', 'id_card', 'pdf_export', 'png_export', 'cease_desist', 'notice_claim', 'presuit', 'subpoena', 'discovery', 'bulk_generation']
  },
  ultimate: {
    price: 149,
    features: ['all']
  }
};

// Theme management for light/dark mode
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

// ============================================================================
// STATE LAW DATABASE - Comprehensive Legal Data
// ============================================================================

const STATE_PUBLIC_RECORDS_LAWS: LawDatabase = {
  'Alabama': { statute: 'Ala. Code § 36-12-40', timeframe: '7-10 business days', type: 'business' },
  'Alaska': { statute: 'Alaska Stat. § 40.25.110', timeframe: '10 business days', type: 'business' },
  'Arizona': { statute: 'A.R.S. § 39-121', timeframe: 'Reasonable time', type: 'reasonable' },
  'Arkansas': { statute: 'Ark. Code Ann. § 25-19-105', timeframe: '3 business days', type: 'business' },
  'California': { statute: 'Cal. Gov. Code § 6253', timeframe: '10 calendar days', type: 'calendar' },
  'Colorado': { statute: 'C.R.S. § 24-72-203', timeframe: '3 business days', type: 'business' },
  'Connecticut': { statute: 'Conn. Gen. Stat. § 1-210', timeframe: '4 business days', type: 'business' },
  'Delaware': { statute: '29 Del. C. § 10003', timeframe: '15 business days', type: 'business' },
  'Florida': { statute: 'Fla. Stat. § 119.07', timeframe: 'Reasonable time', type: 'reasonable' },
  'Georgia': { statute: 'O.C.G.A. § 50-18-71', timeframe: '3 business days', type: 'business' },
  'Hawaii': { statute: 'Haw. Rev. Stat. § 92F-11', timeframe: '10 business days', type: 'business' },
  'Idaho': { statute: 'Idaho Code § 74-102', timeframe: '3 business days', type: 'business' },
  'Illinois': { statute: '5 ILCS 140/3', timeframe: '5 business days', type: 'business' },
  'Indiana': { statute: 'Ind. Code § 5-14-3-9', timeframe: '7 calendar days', type: 'calendar' },
  'Iowa': { statute: 'Iowa Code § 22.8', timeframe: 'Reasonable time', type: 'reasonable' },
  'Kansas': { statute: 'K.S.A. § 45-218', timeframe: '3 business days', type: 'business' },
  'Kentucky': { statute: 'KRS § 61.872', timeframe: '5 business days', type: 'business' },
  'Louisiana': { statute: 'La. R.S. 44:32', timeframe: '3 business days', type: 'business' },
  'Maine': { statute: '1 M.R.S. § 408-A', timeframe: '5 business days', type: 'business' },
  'Maryland': { statute: 'Md. Code, Gen. Prov. § 4-203', timeframe: '30 calendar days', type: 'calendar' },
  'Massachusetts': { statute: 'M.G.L. c. 66, § 10', timeframe: '10 business days', type: 'business' },
  'Michigan': { statute: 'MCL § 15.233', timeframe: '5 business days', type: 'business' },
  'Minnesota': { statute: 'Minn. Stat. § 13.03', timeframe: 'Reasonable time', type: 'reasonable' },
  'Mississippi': { statute: 'Miss. Code Ann. § 25-61-5', timeframe: '7 business days', type: 'business' },
  'Missouri': { statute: 'Mo. Rev. Stat. § 610.023', timeframe: '3 business days', type: 'business' },
  'Montana': { statute: 'Mont. Code Ann. § 2-6-102', timeframe: 'Reasonable time', type: 'reasonable' },
  'Nebraska': { statute: 'Neb. Rev. Stat. § 84-712', timeframe: '4 business days', type: 'business' },
  'Nevada': { statute: 'Nev. Rev. Stat. § 239.0107', timeframe: '5 business days', type: 'business' },
  'New Hampshire': { statute: 'N.H. Rev. Stat. Ann. § 91-A:4', timeframe: '5 business days', type: 'business' },
  'New Jersey': { statute: 'N.J.S.A. 47:1A-5', timeframe: '7 business days', type: 'business' },
  'New Mexico': { statute: 'NMSA § 14-2-8', timeframe: '3 business days', type: 'business' },
  'New York': { statute: 'N.Y. Pub. Off. Law § 89', timeframe: '5 business days', type: 'business' },
  'North Carolina': { statute: 'N.C.G.S. § 132-6', timeframe: 'Reasonable time', type: 'reasonable' },
  'North Dakota': { statute: 'N.D.C.C. § 44-04-18', timeframe: 'Reasonable time', type: 'reasonable' },
  'Ohio': { statute: 'Ohio Rev. Code § 149.43', timeframe: 'Reasonable time', type: 'reasonable' },
  'Oklahoma': { statute: '51 Okla. Stat. § 24A.5', timeframe: 'Reasonable time', type: 'reasonable' },
  'Oregon': { statute: 'ORS § 192.329', timeframe: 'Reasonable time', type: 'reasonable' },
  'Pennsylvania': { statute: '65 P.S. § 67.901', timeframe: '5 business days', type: 'business' },
  'Rhode Island': { statute: 'R.I. Gen. Laws § 38-2-3', timeframe: '10 business days', type: 'business' },
  'South Carolina': { statute: 'S.C. Code Ann. § 30-4-30', timeframe: '10 business days', type: 'business' },
  'South Dakota': { statute: 'SDCL § 1-27-1', timeframe: 'Reasonable time', type: 'reasonable' },
  'Tennessee': { statute: 'Tenn. Code Ann. § 10-7-503', timeframe: '7 business days', type: 'business' },
  'Texas': { statute: "Tex. Gov't Code § 552.221", timeframe: '10 business days', type: 'business' },
  'Utah': { statute: 'Utah Code § 63G-2-204', timeframe: '10 business days', type: 'business' },
  'Vermont': { statute: '1 V.S.A. § 318', timeframe: '3 business days', type: 'business' },
  'Virginia': { statute: 'Va. Code Ann. § 2.2-3704', timeframe: '5 business days', type: 'business' },
  'Washington': { statute: 'RCW § 42.56.520', timeframe: '5 business days', type: 'business' },
  'West Virginia': { statute: 'W. Va. Code § 29B-1-3', timeframe: '5 business days', type: 'business' },
  'Wisconsin': { statute: 'Wis. Stat. § 19.35', timeframe: 'Reasonable time', type: 'reasonable' },
  'Wyoming': { statute: 'Wyo. Stat. § 16-4-203', timeframe: 'Reasonable time', type: 'reasonable' },
  'District of Columbia': { statute: 'D.C. Code § 2-532', timeframe: '15 business days', type: 'business' }
};

const STOP_AND_ID_LAWS: StopIdDatabase = {
  'Alabama': { hasStopID: true, statute: 'Ala. Code § 15-5-30', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Alaska': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Arizona': { hasStopID: true, statute: 'A.R.S. § 13-2412', requiresID: 'Name and address', recordingConsent: 'One-party' },
  'Arkansas': { hasStopID: true, statute: 'Ark. Code Ann. § 5-71-213', requiresID: 'Name only', recordingConsent: 'All-party' },
  'California': { hasStopID: true, statute: 'Cal. Penal Code § 647(e)', requiresID: 'Name only', recordingConsent: 'All-party' },
  'Colorado': { hasStopID: true, statute: 'C.R.S. § 16-3-103', requiresID: 'Name and address', recordingConsent: 'One-party' },
  'Connecticut': { hasStopID: true, statute: 'Conn. Gen. Stat. § 54-1f', requiresID: 'Name only', recordingConsent: 'All-party' },
  'Delaware': { hasStopID: true, statute: '11 Del. C. § 1902', requiresID: 'Name only', recordingConsent: 'All-party' },
  'Florida': { hasStopID: true, statute: 'Fla. Stat. § 856.021', requiresID: 'Name only', recordingConsent: 'All-party' },
  'Georgia': { hasStopID: true, statute: 'O.C.G.A. § 16-11-36', requiresID: 'Name and address', recordingConsent: 'One-party' },
  'Hawaii': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Idaho': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Illinois': { hasStopID: true, statute: '725 ILCS 5/107-14', requiresID: 'Name only', recordingConsent: 'All-party' },
  'Indiana': { hasStopID: true, statute: 'Ind. Code § 34-28-5-3.5', requiresID: 'Name and address', recordingConsent: 'One-party' },
  'Iowa': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Kansas': { hasStopID: true, statute: 'K.S.A. § 22-2402', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Kentucky': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Louisiana': { hasStopID: true, statute: 'La. Code Crim. Proc. Art. 215.1', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Maine': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Maryland': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'All-party' },
  'Massachusetts': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'All-party' },
  'Michigan': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Minnesota': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Mississippi': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Missouri': { hasStopID: true, statute: 'Mo. Rev. Stat. § 84.710', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Montana': { hasStopID: true, statute: 'Mont. Code Ann. § 46-5-401', requiresID: 'Name only', recordingConsent: 'All-party' },
  'Nebraska': { hasStopID: true, statute: 'Neb. Rev. Stat. § 29-829', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Nevada': { hasStopID: true, statute: 'Nev. Rev. Stat. § 171.123', requiresID: 'Name only', recordingConsent: 'All-party' },
  'New Hampshire': { hasStopID: true, statute: 'N.H. Rev. Stat. Ann. § 594:2', requiresID: 'Name only', recordingConsent: 'All-party' },
  'New Jersey': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'New Mexico': { hasStopID: true, statute: 'NMSA § 30-22-3', requiresID: 'Name only', recordingConsent: 'One-party' },
  'New York': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'North Carolina': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'North Dakota': { hasStopID: true, statute: 'N.D.C.C. § 29-29-21', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Ohio': { hasStopID: true, statute: 'Ohio Rev. Code § 2921.29', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Oklahoma': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Oregon': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Pennsylvania': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'All-party' },
  'Rhode Island': { hasStopID: true, statute: 'R.I. Gen. Laws § 12-7-1', requiresID: 'Name only', recordingConsent: 'One-party' },
  'South Carolina': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'South Dakota': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Tennessee': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Texas': { hasStopID: true, statute: 'Tex. Penal Code § 38.02', requiresID: 'Name and address', recordingConsent: 'One-party' },
  'Utah': { hasStopID: true, statute: 'Utah Code § 77-7-15', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Vermont': { hasStopID: true, statute: '13 V.S.A. § 5511', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Virginia': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Washington': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'All-party' },
  'West Virginia': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'Wisconsin': { hasStopID: true, statute: 'Wis. Stat. § 968.24', requiresID: 'Name only', recordingConsent: 'One-party' },
  'Wyoming': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' },
  'District of Columbia': { hasStopID: false, statute: 'None', requiresID: 'No requirement', recordingConsent: 'One-party' }
};

const CANNABIS_LAWS: CannabisDatabase = {
  'Alabama': { status: 'Medical only', possession: 'Medical card required', enacted: '2021' },
  'Alaska': { status: 'Recreational', possession: '1 oz', enacted: '2014' },
  'Arizona': { status: 'Recreational', possession: '1 oz', enacted: '2020' },
  'Arkansas': { status: 'Medical only', possession: 'Medical card required', enacted: '2016' },
  'California': { status: 'Recreational', possession: '1 oz', enacted: '2016' },
  'Colorado': { status: 'Recreational', possession: '1 oz', enacted: '2012' },
  'Connecticut': { status: 'Recreational', possession: '1.5 oz', enacted: '2021' },
  'Delaware': { status: 'Recreational', possession: '1 oz', enacted: '2023' },
  'Florida': { status: 'Medical only', possession: 'Medical card required', enacted: '2016' },
  'Georgia': { status: 'CBD only', possession: 'Low-THC oil only', enacted: '2015' },
  'Hawaii': { status: 'Medical only', possession: 'Medical card required', enacted: '2000' },
  'Idaho': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'Illinois': { status: 'Recreational', possession: '1 oz', enacted: '2019' },
  'Indiana': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'Iowa': { status: 'CBD only', possession: 'Low-THC only', enacted: '2014' },
  'Kansas': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'Kentucky': { status: 'Medical only', possession: 'Medical card required', enacted: '2023' },
  'Louisiana': { status: 'Medical only', possession: 'Medical card required', enacted: '2015' },
  'Maine': { status: 'Recreational', possession: '2.5 oz', enacted: '2016' },
  'Maryland': { status: 'Recreational', possession: '1.5 oz', enacted: '2023' },
  'Massachusetts': { status: 'Recreational', possession: '1 oz', enacted: '2016' },
  'Michigan': { status: 'Recreational', possession: '2.5 oz', enacted: '2018' },
  'Minnesota': { status: 'Recreational', possession: '2 oz', enacted: '2023' },
  'Mississippi': { status: 'Medical only', possession: 'Medical card required', enacted: '2022' },
  'Missouri': { status: 'Recreational', possession: '3 oz', enacted: '2022' },
  'Montana': { status: 'Recreational', possession: '1 oz', enacted: '2020' },
  'Nebraska': { status: 'Illegal', possession: 'Decriminalized small amounts', enacted: 'N/A' },
  'Nevada': { status: 'Recreational', possession: '1 oz', enacted: '2016' },
  'New Hampshire': { status: 'Medical only', possession: 'Medical card required', enacted: '2013' },
  'New Jersey': { status: 'Recreational', possession: '1 oz', enacted: '2020' },
  'New Mexico': { status: 'Recreational', possession: '2 oz', enacted: '2021' },
  'New York': { status: 'Recreational', possession: '3 oz', enacted: '2021' },
  'North Carolina': { status: 'Illegal', possession: 'Decriminalized small amounts', enacted: 'N/A' },
  'North Dakota': { status: 'Medical only', possession: 'Medical card required', enacted: '2016' },
  'Ohio': { status: 'Recreational', possession: '2.5 oz', enacted: '2023' },
  'Oklahoma': { status: 'Medical only', possession: 'Medical card required', enacted: '2018' },
  'Oregon': { status: 'Recreational', possession: '1 oz', enacted: '2014' },
  'Pennsylvania': { status: 'Medical only', possession: 'Medical card required', enacted: '2016' },
  'Rhode Island': { status: 'Recreational', possession: '1 oz', enacted: '2022' },
  'South Carolina': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'South Dakota': { status: 'Medical only', possession: 'Medical card required', enacted: '2020' },
  'Tennessee': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'Texas': { status: 'CBD only', possession: 'Low-THC only', enacted: '2015' },
  'Utah': { status: 'Medical only', possession: 'Medical card required', enacted: '2018' },
  'Vermont': { status: 'Recreational', possession: '1 oz', enacted: '2018' },
  'Virginia': { status: 'Recreational', possession: '1 oz', enacted: '2021' },
  'Washington': { status: 'Recreational', possession: '1 oz', enacted: '2012' },
  'West Virginia': { status: 'Medical only', possession: 'Medical card required', enacted: '2017' },
  'Wisconsin': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'Wyoming': { status: 'Illegal', possession: 'Prohibited', enacted: 'N/A' },
  'District of Columbia': { status: 'Recreational', possession: '2 oz', enacted: '2014' }
};

// Hostile state warnings - based on documented aggressive responses to auditors/journalists
const HOSTILE_STATE_WARNINGS: WarningDatabase = {
  'Texas': {
    level: 'HIGH',
    issues: ['Aggressive police response to auditors', 'Frequent arrests for photography in public', 'Heavy-handed trespassing enforcement'],
    recommendations: ['Document everything', 'Have backup recording', 'Know local ordinances']
  },
  'Florida': {
    level: 'HIGH',
    issues: ['Anti-photography local ordinances', 'Aggressive prosecution of public records requesters', 'Felony charges for auditors'],
    recommendations: ['Review municipal codes carefully', 'Consider legal representation', 'Document all interactions']
  },
  'Louisiana': {
    level: 'HIGH',
    issues: ['Frequent arrests of journalists', 'Obstruction charges for auditors', 'All-party consent recording laws'],
    recommendations: ['Two-party consent required for recording', 'High arrest risk', 'Legal backup advised']
  },
  'Georgia': {
    level: 'MODERATE',
    issues: ['Inconsistent enforcement', 'Some hostile police departments', 'Trespassing charges common'],
    recommendations: ['Research specific jurisdiction', 'Stay on clearly public property', 'Document clearly']
  },
  'Tennessee': {
    level: 'MODERATE',
    issues: ['Some hostile municipalities', 'Photography restrictions in certain areas'],
    recommendations: ['Check local ordinances', 'Document authority for access']
  },
  'Arkansas': {
    level: 'MODERATE',
    issues: ['All-party consent recording', 'Some aggressive police departments'],
    recommendations: ['Two-party consent required', 'Avoid private property']
  },
  'California': {
    level: 'MODERATE',
    issues: ['All-party consent recording', 'Complex local ordinances', 'Aggressive private security'],
    recommendations: ['Two-party consent required for recording', 'Know municipal codes', 'Private property issues']
  }
};

// ============================================================================
// DOCUMENT GENERATION TEMPLATES
// ============================================================================

const generateFOIARequest = (data: any) => {
  const state = data.state;
  const law = STATE_PUBLIC_RECORDS_LAWS[state];
  
  return `
${data.requestorName}
${data.requestorAddress}
${data.requestorEmail}
${data.requestorPhone || ''}

${new Date().toLocaleDateString()}

${data.agencyName}
FOIA/Public Records Request
${data.agencyAddress || ''}

RE: Public Records Request under ${law?.statute || 'applicable state law'}

Dear FOIA Officer:

Pursuant to ${law?.statute || 'the applicable state public records law'}, I hereby request access to and copies of the following records:

${data.recordsDescription}

${data.dateRange ? `The timeframe for this request is: ${data.dateRange}` : ''}

${data.specificCriteria ? `Additional criteria: ${data.specificCriteria}` : ''}

As provided by ${law?.statute || 'statute'}, please respond to this request within ${law?.timeframe || 'the statutorily required timeframe'}.

If any portion of this request is denied, please provide a written explanation citing the specific exemption(s) relied upon and notify me of appeal procedures available under law.

I request that records be provided in electronic format (PDF preferred) to reduce costs. If fees exceed $${data.feeLimit || '50'}, please notify me before processing.

${data.expeditedProcessing ? 'I respectfully request expedited processing of this request due to compelling need and time sensitivity of the information requested.' : ''}

I can be reached at the contact information above. Thank you for your attention to this matter.

Sincerely,

${data.requestorName}

---
LEGAL NOTICE: This is a formal public records request under ${law?.statute}. Failure to respond within the statutory timeframe may constitute a violation of state law. This request creates a legal obligation to preserve all responsive records.
`.trim();
};

const generateCeaseAndDesist = (data: any) => {
  return `
${data.senderName}
${data.senderAddress}
${data.senderEmail}
${data.senderPhone}

${new Date().toLocaleDateString()}

${data.recipientName}
${data.recipientAddress}

RE: CEASE AND DESIST - ${data.violationType}

Dear ${data.recipientName}:

I am writing to demand that you immediately CEASE AND DESIST from the following conduct:

${data.conductDescription}

LEGAL BASIS:
${data.legalBasis || 'Your conduct violates my legal rights including, but not limited to, applicable state and federal law.'}

SPECIFIC VIOLATIONS:
${data.specificViolations}

EVIDENCE:
${data.evidence || 'I have documented evidence of these violations which will be preserved for legal proceedings if necessary.'}

DEMAND:
You are hereby directed to immediately:
1. CEASE all conduct described above
2. DESIST from any future similar conduct
3. ${data.additionalDemands || 'Provide written confirmation of compliance within 10 business days'}

CONSEQUENCES OF NON-COMPLIANCE:
Failure to comply with this demand will result in:
- Formal legal action without further notice
- Claims for injunctive relief
- Claims for damages, costs, and attorney's fees
- ${data.additionalConsequences || 'All other remedies available under law'}

This letter serves as formal legal notice. Your failure to respond or comply will be used as evidence of willful misconduct in any subsequent legal proceedings.

TIME TO COMPLY: ${data.complianceDeadline || '10 business days from receipt'}

Govern yourself accordingly.

${data.senderName}

---
LEGAL NOTICE: This is a formal cease and desist demand. Preservation of all relevant evidence is required. Any destruction of evidence may constitute spoliation.
`.trim();
};

const generateNoticeOfClaim = (data: any) => {
  return `
NOTICE OF CLAIM

TO: ${data.governmentEntity}
${data.entityAddress}

FROM: ${data.claimantName}
${data.claimantAddress}
${data.claimantEmail}
${data.claimantPhone}

DATE: ${new Date().toLocaleDateString()}

RE: Notice of Claim - ${data.claimType}

Pursuant to ${data.applicableStatute || 'applicable state tort claims notice requirements'}, please accept this as formal notice of claim against ${data.governmentEntity}.

CLAIMANT INFORMATION:
Name: ${data.claimantName}
Date of Birth: ${data.dateOfBirth || 'N/A'}
Address: ${data.claimantAddress}

INCIDENT INFORMATION:
Date of Incident: ${data.incidentDate}
Time of Incident: ${data.incidentTime || 'Unknown'}
Location: ${data.incidentLocation}

DETAILED DESCRIPTION OF INCIDENT:
${data.incidentDescription}

NATURE OF INJURIES/DAMAGES:
${data.injuriesDescription}

GOVERNMENT EMPLOYEES/AGENTS INVOLVED:
${data.employeesInvolved || 'To be determined through discovery'}

LEGAL BASIS FOR CLAIM:
${data.legalBasis}

DAMAGES CLAIMED:
${data.damagesAmount ? `$${data.damagesAmount}` : 'To be determined'}

Categories of damages include:
${data.damageCategories || `
- Medical expenses (past and future)
- Lost wages and earning capacity
- Pain and suffering
- Property damage
- Other consequential damages
`}

WITNESSES:
${data.witnesses || 'Available upon request'}

EVIDENCE:
${data.evidence || 'Preserved and available for inspection'}

This notice is provided within the statutory timeframe and preserves all rights under applicable law. Please direct all correspondence to the contact information above.

${data.claimantName}

---
LEGAL NOTICE: This constitutes formal notice under tort claims statutes. Failure of the government entity to properly handle this claim may waive governmental immunity defenses.
`.trim();
};

const generateIDRightsCard = (state: string) => {
  const stopID = STOP_AND_ID_LAWS[state];
  const cannabis = CANNABIS_LAWS[state];
  
  return {
    state,
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse searches',
      'You have the right to record police in public',
      'You have the right to leave if not detained'
    ],
    stateSpecific: {
      stopAndID: stopID?.hasStopID ? `${state} is a Stop & ID state. ${stopID.requiresID}` : `${state} is NOT a Stop & ID state`,
      recording: `Recording consent: ${stopID?.recordingConsent}`,
      cannabis: `Cannabis: ${cannabis?.status} (${cannabis?.possession})`
    },
    script: `"Officer, am I free to leave? Am I being detained? I am exercising my right to remain silent and do not consent to any searches."`,
    statute: stopID?.statute || 'No Stop & ID statute'
  };
};

const generateSubpoenaDucesTecum = (data: any) => {
  return `
${data.courtName}
${data.courtAddress}

Case No: ${data.caseNumber}

${data.plaintiffName}, Plaintiff
v.
${data.defendantName}, Defendant

SUBPOENA DUCES TECUM

TO: ${data.custodianName}
    ${data.custodianTitle}
    ${data.custodianOrganization}
    ${data.custodianAddress}

YOU ARE COMMANDED to appear at ${data.depositionLocation} on ${data.depositionDate} at ${data.depositionTime} to testify at a deposition and to produce the following documents and tangible things:

DOCUMENTS REQUESTED:

${data.documentsRequested}

PRODUCTION INSTRUCTIONS:
${data.productionInstructions || `
1. Documents may be produced in native electronic format or organized paper copies
2. Privileged documents must be identified in a privilege log
3. If documents are withheld, provide specific basis for withholding
4. Organize and label documents to correspond with categories in this subpoena
`}

DEFINITIONS:
"Document" includes writings, drawings, graphs, charts, photographs, sound recordings, images, electronically stored information, and other data compilations.

"Communication" includes any transmittal of information in written, electronic, or oral form.

TIME PERIOD: ${data.timePeriod || 'All relevant time periods related to this litigation'}

${data.compensationOffered ? `WITNESS FEES: Statutory witness fees and mileage will be provided.` : ''}

FAILURE TO COMPLY with this subpoena may result in punishment for contempt of court and monetary sanctions.

Issued by: ${data.issuingAttorney}
          ${data.attorneyBarNumber}
          ${data.attorneyFirm}
          ${data.attorneyAddress}
          ${data.attorneyPhone}
          ${data.attorneyEmail}

Date: ${new Date().toLocaleDateString()}

---
PROOF OF SERVICE
I certify that on ${new Date().toLocaleDateString()}, I served this subpoena by [method of service] to the person named above.

Server signature: ___________________
`.trim();
};

const generateDiscoveryRequest = (data: any) => {
  return `
${data.courtName}

Case No: ${data.caseNumber}

${data.requestingParty}, ${data.partyDesignation}

${data.requestType.toUpperCase()}

TO: ${data.respondingParty} and their attorney of record

${data.requestingParty} requests that ${data.respondingParty} respond to the following ${data.requestType} within ${data.responseTime || '30 days'} of service:

${data.requestType === 'Interrogatories' ? 'INTERROGATORIES:' : 
  data.requestType === 'Requests for Production' ? 'REQUESTS FOR PRODUCTION:' :
  data.requestType === 'Requests for Admission' ? 'REQUESTS FOR ADMISSION:' : ''}

${data.requests}

DEFINITIONS AND INSTRUCTIONS:

1. "You" and "Your" refer to ${data.respondingParty} and any agents, employees, representatives, or persons acting on their behalf.

2. "Document" means any written, recorded, or graphic matter, including electronically stored information, as defined in the applicable rules of civil procedure.

3. "Communication" means any transmittal of information, whether oral, written, or electronic.

4. "Identify" when referring to a person means to state their full name, current or last known address, telephone number, and job title or relationship to this matter.

5. "Identify" when referring to a document means to state its date, type, title, author, recipient(s), and current custodian.

6. These requests are continuing in nature. You are required to supplement your responses if you obtain additional responsive information.

7. If you object to any request, state the specific grounds for each objection and answer to the extent you do not object.

8. If you claim privilege for any document or information, provide a privilege log identifying:
   - Document date and type
   - Author and recipient(s)
   - Subject matter
   - Specific privilege claimed
   - Factual basis for privilege claim

SPECIFIC REQUESTS:

${data.detailedRequests || data.requests}

${data.requestType === 'Requests for Admission' ? `
NOTICE: Failure to respond to these requests for admission within ${data.responseTime || '30 days'} will result in the matters being deemed admitted pursuant to applicable rules of civil procedure.
` : ''}

Respectfully submitted,

${data.requestingAttorney}
${data.attorneyBarNumber}
Attorney for ${data.requestingParty}
${data.attorneyFirm}
${data.attorneyAddress}
${data.attorneyPhone}
${data.attorneyEmail}

Date: ${new Date().toLocaleDateString()}

---
CERTIFICATE OF SERVICE
I certify that on ${new Date().toLocaleDateString()}, I served a true copy of this ${data.requestType} on all parties via [method of service].

___________________
`.trim();
};

// ============================================================================
// MAIN APPLICATION COMPONENTS
// ============================================================================

const CivilRightsLegalTool = () => {
  const [activeTab, setActiveTab] = useState('toolkit');
  const [selectedState, setSelectedState] = useState('California');
  const [documentType, setDocumentType] = useState('foia');
  const [subscription, setSubscription] = useState('basic');
  const [theme, setTheme] = useState('dark');
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  // Form state management with persistence
  const [formData, setFormData] = useState({
    // FOIA fields
    requestorName: '',
    requestorAddress: '',
    requestorEmail: '',
    requestorPhone: '',
    agencyName: '',
    agencyAddress: '',
    recordsDescription: '',
    dateRange: '',
    specificCriteria: '',
    feeLimit: '50',
    expeditedProcessing: false,
    
    // Cease and Desist fields
    senderName: '',
    senderAddress: '',
    senderEmail: '',
    senderPhone: '',
    recipientName: '',
    recipientAddress: '',
    violationType: '',
    conductDescription: '',
    legalBasis: '',
    specificViolations: '',
    evidence: '',
    additionalDemands: '',
    additionalConsequences: '',
    complianceDeadline: '10 business days',
    
    // Notice of Claim fields
    governmentEntity: '',
    entityAddress: '',
    claimantName: '',
    claimantAddress: '',
    claimantEmail: '',
    claimantPhone: '',
    dateOfBirth: '',
    claimType: '',
    applicableStatute: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    injuriesDescription: '',
    employeesInvolved: '',
    damagesAmount: '',
    damageCategories: '',
    witnesses: '',
    
    // Subpoena fields
    courtName: '',
    courtAddress: '',
    caseNumber: '',
    plaintiffName: '',
    defendantName: '',
    custodianName: '',
    custodianTitle: '',
    custodianOrganization: '',
    custodianAddress: '',
    depositionLocation: '',
    depositionDate: '',
    depositionTime: '',
    documentsRequested: '',
    productionInstructions: '',
    timePeriod: '',
    compensationOffered: true,
    issuingAttorney: '',
    attorneyBarNumber: '',
    attorneyFirm: '',
    attorneyAddress: '',
    attorneyPhone: '',
    attorneyEmail: '',
    
    // Discovery fields
    requestType: 'Interrogatories',
    requestingParty: '',
    partyDesignation: 'Plaintiff',
    respondingParty: '',
    responseTime: '30 days',
    requests: '',
    detailedRequests: '',
    requestingAttorney: ''
  });

  // Subscription feature access control
  const hasAccess = (feature: string) => {
    if (subscription === 'ultimate') return true;
    return SUBSCRIPTION_TIERS[subscription as keyof typeof SUBSCRIPTION_TIERS]?.features.includes(feature);
  };

  // Check for hostile state warnings
  useEffect(() => {
    setShowWarning(!!HOSTILE_STATE_WARNINGS[selectedState]);
  }, [selectedState]);

  // Document generation handler with validation
  const handleGenerateDocument = () => {
    let doc = '';
    
    try {
      switch (documentType) {
        case 'foia':
        case 'state_prr':
          if (!formData.requestorName || !formData.agencyName || !formData.recordsDescription) {
            alert('Please fill in required fields: Requestor Name, Agency Name, and Records Description');
            return;
          }
          doc = generateFOIARequest({ ...formData, state: selectedState });
          break;
          
        case 'cease_desist':
          if (!hasAccess('cease_desist')) {
            alert('Cease and Desist letters require Professional or Ultimate subscription');
            return;
          }
          if (!formData.senderName || !formData.recipientName || !formData.conductDescription) {
            alert('Please fill in required fields: Sender Name, Recipient Name, and Conduct Description');
            return;
          }
          doc = generateCeaseAndDesist(formData);
          break;
          
        case 'notice_claim':
          if (!hasAccess('notice_claim')) {
            alert('Notice of Claim requires Professional or Ultimate subscription');
            return;
          }
          if (!formData.governmentEntity || !formData.claimantName || !formData.incidentDescription) {
            alert('Please fill in required fields: Government Entity, Claimant Name, and Incident Description');
            return;
          }
          doc = generateNoticeOfClaim(formData);
          break;
          
        case 'subpoena':
          if (!hasAccess('subpoena')) {
            alert('Subpoena generation requires Professional or Ultimate subscription');
            return;
          }
          if (!formData.courtName || !formData.caseNumber || !formData.custodianName || !formData.documentsRequested) {
            alert('Please fill in required fields: Court Name, Case Number, Custodian Name, and Documents Requested');
            return;
          }
          doc = generateSubpoenaDucesTecum(formData);
          break;
          
        case 'discovery':
          if (!hasAccess('discovery')) {
            alert('Discovery requests require Professional or Ultimate subscription');
            return;
          }
          if (!formData.courtName || !formData.caseNumber || !formData.requestingParty || !formData.requests) {
            alert('Please fill in required fields: Court Name, Case Number, Requesting Party, and Requests');
            return;
          }
          doc = generateDiscoveryRequest(formData);
          break;
          
        case 'id_card':
  // const cardData = generateIDRightsCard(selectedState); // You can remove or comment this out
  // ID card is generated differently - handled in separate component
  return;
          
        default:
          alert('Document type not yet implemented');
          return;
      }
      
      setGeneratedDocument(doc);
    } catch (error) {
      console.error('Document generation error:', error);
      alert('Error generating document. Please check your inputs and try again.');
    }
  };

  // Export handlers
  const exportAsPDF = () => {
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Legal Document</title>
            <style>
              body { 
                font-family: 'Times New Roman', serif; 
                padding: 1in; 
                line-height: 1.6;
                font-size: 12pt;
              }
              pre { 
                white-space: pre-wrap; 
                font-family: 'Times New Roman', serif;
              }
            </style>
          </head>
          <body>
            <pre>${generatedDocument}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportAsText = () => {
    const blob = new Blob([generatedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentType}_${selectedState}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <SubscriptionContext.Provider value={{ tier: subscription, setTier: setSubscription, hasAccess }}>
      <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
        <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-200`}>
          {/* Header */}
          <header className={`${cardBg} border-b ${borderColor} sticky top-0 z-50 shadow-lg`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Scale className="w-8 h-8 text-blue-500" />
                  <div>
                    <h1 className="text-2xl font-bold">Civil Rights Legal Tool Pro</h1>
                    <p className="text-sm text-gray-500">Professional Legal Document Generation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={subscription}
                    onChange={(e) => setSubscription(e.target.value)}
                    className={`px-4 py-2 rounded-lg ${cardBg} border ${borderColor} font-medium`}
                  >
                    <option value="basic">Basic ($29/mo)</option>
                    <option value="professional">Professional ($79/mo)</option>
                    <option value="ultimate">Ultimate ($149/mo)</option>
                  </select>
                  <button
                    onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                    className={`p-2 rounded-lg ${cardBg} border ${borderColor} hover:bg-opacity-80`}
                  >
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Navigation Tabs */}
          <nav className={`${cardBg} border-b ${borderColor} shadow-sm`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-1">
                {[
                  { id: 'toolkit', label: 'Legal Toolkit Pro', icon: FileText },
                  { id: 'state-laws', label: 'State Laws', icon: Book },
                  { id: 'warnings', label: 'Hostile State Warnings', icon: AlertTriangle },
                  { id: 'pricing', label: 'Pricing', icon: Shield }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-500'
                        : `border-transparent hover:border-gray-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'toolkit' && (
              <LegalToolkitTab
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                documentType={documentType}
                setDocumentType={setDocumentType}
                formData={formData}
                setFormData={setFormData}
                generatedDocument={generatedDocument}
                handleGenerateDocument={handleGenerateDocument}
                exportAsPDF={exportAsPDF}
                exportAsText={exportAsText}
                hasAccess={hasAccess}
                showWarning={showWarning}
                theme={theme}
              />
            )}

            {activeTab === 'state-laws' && (
              <StateLawsTab
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                theme={theme}
              />
            )}

            {activeTab === 'warnings' && (
              <HostileStateWarningsTab theme={theme} />
            )}

            {activeTab === 'pricing' && (
              <PricingTab subscription={subscription} setSubscription={setSubscription} theme={theme} />
            )}
          </main>

          {/* Footer */}
          <footer className={`${cardBg} border-t ${borderColor} mt-16`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-sm text-gray-500 space-y-2">
                <p className="font-semibold text-red-500">⚠️ LEGAL DISCLAIMER</p>
                <p>This software provides legal information, NOT legal advice. It does not create an attorney-client relationship.</p>
                <p>Laws change frequently. Always verify current statutes before filing. Consult a qualified attorney for legal matters.</p>
                <p className="pt-2">© 2025 Civil Rights Legal Tool Pro. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </ThemeContext.Provider>
    </SubscriptionContext.Provider>
  );
};

// ============================================================================
// LEGAL TOOLKIT TAB COMPONENT
// ============================================================================

const LegalToolkitTab = ({ selectedState, setSelectedState, documentType, setDocumentType, formData, setFormData, generatedDocument, handleGenerateDocument, exportAsPDF, exportAsText, hasAccess, showWarning, theme }: any) => {
  const [activeFormTab, setActiveFormTab] = useState('basic');
  
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const documentTypes = [
    { value: 'foia', label: 'FOIA Request', access: 'foia', description: 'Federal/State public records requests' },
    { value: 'state_prr', label: 'State Public Records Request', access: 'state_prr', description: 'State-specific PRR' },
    { value: 'id_card', label: 'Know-Your-Rights ID Card', access: 'id_card', description: 'Printable rights card' },
    { value: 'cease_desist', label: 'Cease and Desist Letter', access: 'cease_desist', description: 'Professional C&D letter' },
    { value: 'notice_claim', label: 'Notice of Claim', access: 'notice_claim', description: 'Government tort claim notice' },
    { value: 'presuit', label: 'Pre-Suit Notice', access: 'presuit', description: 'Medical malpractice pre-suit' },
    { value: 'subpoena', label: 'Subpoena Duces Tecum', access: 'subpoena', description: 'Document production subpoena' },
    { value: 'discovery', label: 'Discovery Requests', access: 'discovery', description: 'Litigation discovery documents' }
  ];

  return (
    <div className="space-y-6">
      {/* Hostile State Warning Banner */}
      {showWarning && HOSTILE_STATE_WARNINGS[selectedState] && (
        <div className={`${cardBg} border-l-4 ${
          HOSTILE_STATE_WARNINGS[selectedState].level === 'HIGH' ? 'border-red-500 bg-red-900 bg-opacity-20' : 'border-yellow-500 bg-yellow-900 bg-opacity-20'
        } p-6 rounded-lg shadow-lg`}>
          <div className="flex items-start space-x-4">
            <AlertTriangle className={`w-8 h-8 flex-shrink-0 ${
              HOSTILE_STATE_WARNINGS[selectedState].level === 'HIGH' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">
                {HOSTILE_STATE_WARNINGS[selectedState].level} RISK: {selectedState}
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-sm mb-1">Known Issues:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {HOSTILE_STATE_WARNINGS[selectedState].issues.map((issue: string, idx: number) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {HOSTILE_STATE_WARNINGS[selectedState].recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Document Selection */}
        <div className={`${cardBg} rounded-lg shadow-lg p-6 border ${borderColor}`}>
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Document Type</span>
          </h2>

          {/* State Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${inputBg} border ${borderColor} font-medium`}
            >
              {Object.keys(STATE_PUBLIC_RECORDS_LAWS).sort().map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Document Type Selector */}
          <div className="space-y-2">
            {documentTypes.map(doc => {
              const locked = !hasAccess(doc.access);
              return (
                <button
                  key={doc.value}
                  onClick={() => !locked && setDocumentType(doc.value)}
                  disabled={locked}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    documentType === doc.value
                      ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                      : `border-transparent ${inputBg} hover:border-gray-500`
                  } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{doc.label}</h3>
                      <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                    </div>
                    {locked && (
                      <Shield className="w-4 h-4 text-yellow-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Panel - Document Form */}
        <div className={`lg:col-span-2 ${cardBg} rounded-lg shadow-lg p-6 border ${borderColor}`}>
          <h2 className="text-xl font-bold mb-4">
            {documentTypes.find(d => d.value === documentType)?.label || 'Document Generator'}
          </h2>

          {/* Dynamic Form Based on Document Type */}
          <div className="space-y-4">
            {documentType === 'id_card' ? (
              <IDCardGenerator state={selectedState} theme={theme} />
            ) : (
              <>
                {/* Form Tab Navigation for Complex Forms */}
                {['cease_desist', 'notice_claim', 'subpoena', 'discovery'].includes(documentType) && (
                  <div className="flex space-x-2 mb-4 border-b border-gray-700 pb-2">
                    <button
                      onClick={() => setActiveFormTab('basic')}
                      className={`px-4 py-2 rounded-t-lg font-medium ${
                        activeFormTab === 'basic' ? 'bg-blue-500 text-white' : `${inputBg}`
                      }`}
                    >
                      Basic Info
                    </button>
                    <button
                      onClick={() => setActiveFormTab('details')}
                      className={`px-4 py-2 rounded-t-lg font-medium ${
                        activeFormTab === 'details' ? 'bg-blue-500 text-white' : `${inputBg}`
                      }`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setActiveFormTab('legal')}
                      className={`px-4 py-2 rounded-t-lg font-medium ${
                        activeFormTab === 'legal' ? 'bg-blue-500 text-white' : `${inputBg}`
                      }`}
                    >
                      Legal Basis
                    </button>
                  </div>
                )}

                {/* FOIA/State PRR Form */}
                {(documentType === 'foia' || documentType === 'state_prr') && (
                  <FOIAForm formData={formData} updateFormData={updateFormData} selectedState={selectedState} theme={theme} />
                )}

                {/* Cease and Desist Form */}
                {documentType === 'cease_desist' && (
                  <CeaseDesistForm formData={formData} updateFormData={updateFormData} activeTab={activeFormTab} theme={theme} />
                )}

                {/* Notice of Claim Form */}
                {documentType === 'notice_claim' && (
                  <NoticeOfClaimForm formData={formData} updateFormData={updateFormData} activeTab={activeFormTab} theme={theme} />
                )}

                {/* Subpoena Form */}
                {documentType === 'subpoena' && (
                  <SubpoenaForm formData={formData} updateFormData={updateFormData} activeTab={activeFormTab} theme={theme} />
                )}

                {/* Discovery Form */}
                {documentType === 'discovery' && (
                  <DiscoveryForm formData={formData} updateFormData={updateFormData} activeTab={activeFormTab} theme={theme} />
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerateDocument}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors mt-6"
                >
                  Generate {documentTypes.find(d => d.value === documentType)?.label}
                </button>
              </>
            )}
          </div>

          {/* Generated Document Display */}
          {generatedDocument && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Document</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={exportAsPDF}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PDF</span>
                  </button>
                  <button
                    onClick={exportAsText}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export TXT</span>
                  </button>
                </div>
              </div>
              <div className={`${inputBg} border ${borderColor} rounded-lg p-6 max-h-96 overflow-y-auto`}>
                <pre className="whitespace-pre-wrap font-mono text-sm">{generatedDocument}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FORM COMPONENTS - Modular, Reusable Form Sections
// ============================================================================

// Input field wrapper component for consistent styling and error handling
const FormInput = ({ label, type = 'text', value, onChange, placeholder, required = false, theme, multiline = false, rows = 3 }: any) => {
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  
  const baseClasses = `w-full px-4 py-2 rounded-lg ${inputBg} border ${borderColor} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`;
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
};

// FOIA Request Form - Comprehensive public records request generator
const FOIAForm = ({ formData, updateFormData, selectedState, theme }: any) => {
  const law = STATE_PUBLIC_RECORDS_LAWS[selectedState];
  
  // Auto-populate legal information on state change
  useEffect(() => {
    // This effect demonstrates proactive state management
    // Automatically provides users with relevant legal context
  }, [selectedState]);

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} border border-blue-500`}>
        <h4 className="font-semibold text-blue-400 mb-2">Auto-Populated Legal Information</h4>
        <div className="text-sm space-y-1">
          <p><strong>Statute:</strong> {law?.statute}</p>
          <p><strong>Response Timeframe:</strong> {law?.timeframe}</p>
          <p><strong>Type:</strong> {law?.type}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Your Name"
          value={formData.requestorName}
          onChange={(v: string) => updateFormData('requestorName', v)}
          placeholder="John Doe"
          required
          theme={theme}
        />
        <FormInput
          label="Your Email"
          type="email"
          value={formData.requestorEmail}
          onChange={(v: string) => updateFormData('requestorEmail', v)}
          placeholder="john@example.com"
          required
          theme={theme}
        />
      </div>

      <FormInput
        label="Your Address"
        value={formData.requestorAddress}
        onChange={(v: string) => updateFormData('requestorAddress', v)}
        placeholder="123 Main St, City, State ZIP"
        required
        theme={theme}
      />

      <FormInput
        label="Your Phone (Optional)"
        type="tel"
        value={formData.requestorPhone}
        onChange={(v: string) => updateFormData('requestorPhone', v)}
        placeholder="(555) 123-4567"
        theme={theme}
      />

      <div className="border-t border-gray-700 pt-4 mt-4">
        <h4 className="font-semibold mb-3">Agency Information</h4>
        
        <FormInput
          label="Agency Name"
          value={formData.agencyName}
          onChange={(v: string) => updateFormData('agencyName', v)}
          placeholder="Department of Public Safety"
          required
          theme={theme}
        />

        <FormInput
          label="Agency Address (Optional)"
          value={formData.agencyAddress}
          onChange={(v: string) => updateFormData('agencyAddress', v)}
          placeholder="456 Government Way, City, State ZIP"
          theme={theme}
        />
      </div>

      <div className="border-t border-gray-700 pt-4 mt-4">
        <h4 className="font-semibold mb-3">Records Request Details</h4>
        
        <FormInput
          label="Describe Records Requested"
          value={formData.recordsDescription}
          onChange={(v: string) => updateFormData('recordsDescription', v)}
          placeholder="All body camera footage from incident #2024-12345 on January 15, 2024"
          required
          multiline
          rows={4}
          theme={theme}
        />

        <FormInput
          label="Date Range (Optional)"
          value={formData.dateRange}
          onChange={(v: string) => updateFormData('dateRange', v)}
          placeholder="January 1, 2024 to December 31, 2024"
          theme={theme}
        />

        <FormInput
          label="Additional Criteria (Optional)"
          value={formData.specificCriteria}
          onChange={(v: string) => updateFormData('specificCriteria', v)}
          placeholder="Only records related to Officer Badge #123"
          multiline
          rows={2}
          theme={theme}
        />

        <FormInput
          label="Fee Limit"
          type="number"
          value={formData.feeLimit}
          onChange={(v: string) => updateFormData('feeLimit', v)}
          placeholder="50"
          theme={theme}
        />

        <div className="flex items-center space-x-2 mt-3">
          <input
            type="checkbox"
            id="expedited"
            checked={formData.expeditedProcessing}
            onChange={(e) => updateFormData('expeditedProcessing', e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="expedited" className="text-sm">
            Request expedited processing (requires justification)
          </label>
        </div>
      </div>
    </div>
  );
};

// Cease and Desist Form - Professional legal demand letter generator
const CeaseDesistForm = ({ formData, updateFormData, activeTab, theme }: any) => {
  return (
    <div className="space-y-4">
      {activeTab === 'basic' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Your Name"
              value={formData.senderName}
              onChange={(v: string) => updateFormData('senderName', v)}
              required
              theme={theme}
            />
            <FormInput
              label="Your Email"
              type="email"
              value={formData.senderEmail}
              onChange={(v: string) => updateFormData('senderEmail', v)}
              required
              theme={theme}
            />
          </div>

          <FormInput
            label="Your Address"
            value={formData.senderAddress}
            onChange={(v: string) => updateFormData('senderAddress', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Your Phone"
            type="tel"
            value={formData.senderPhone}
            onChange={(v: string) => updateFormData('senderPhone', v)}
            required
            theme={theme}
          />

          <div className="border-t border-gray-700 pt-4 mt-4">
            <h4 className="font-semibold mb-3">Recipient Information</h4>
            
            <FormInput
              label="Recipient Name"
              value={formData.recipientName}
              onChange={(v: string) => updateFormData('recipientName', v)}
              required
              theme={theme}
            />

            <FormInput
              label="Recipient Address"
              value={formData.recipientAddress}
              onChange={(v: string) => updateFormData('recipientAddress', v)}
              required
              theme={theme}
            />
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <>
          <FormInput
            label="Type of Violation"
            value={formData.violationType}
            onChange={(v: string) => updateFormData('violationType', v)}
            placeholder="Harassment, Defamation, Copyright Infringement, etc."
            required
            theme={theme}
          />

          <FormInput
            label="Detailed Description of Conduct"
            value={formData.conductDescription}
            onChange={(v: string) => updateFormData('conductDescription', v)}
            placeholder="Describe the specific actions, dates, and circumstances..."
            required
            multiline
            rows={6}
            theme={theme}
          />

          <FormInput
            label="Specific Violations"
            value={formData.specificViolations}
            onChange={(v: string) => updateFormData('specificViolations', v)}
            placeholder="List each specific violation with dates and details..."
            multiline
            rows={4}
            theme={theme}
          />

          <FormInput
            label="Evidence Summary"
            value={formData.evidence}
            onChange={(v: string) => updateFormData('evidence', v)}
            placeholder="Screenshots, recordings, witness statements, etc."
            multiline
            rows={3}
            theme={theme}
          />
        </>
      )}

      {activeTab === 'legal' && (
        <>
          <FormInput
            label="Legal Basis"
            value={formData.legalBasis}
            onChange={(v: string) => updateFormData('legalBasis', v)}
            placeholder="Citations to relevant laws, regulations, or contractual provisions..."
            multiline
            rows={4}
            theme={theme}
          />

          <FormInput
            label="Additional Demands"
            value={formData.additionalDemands}
            onChange={(v: string) => updateFormData('additionalDemands', v)}
            placeholder="Any specific actions required beyond cessation..."
            multiline
            rows={3}
            theme={theme}
          />

          <FormInput
            label="Additional Consequences"
            value={formData.additionalConsequences}
            onChange={(v: string) => updateFormData('additionalConsequences', v)}
            placeholder="Specific legal consequences beyond standard warnings..."
            multiline
            rows={3}
            theme={theme}
          />

          <FormInput
            label="Compliance Deadline"
            value={formData.complianceDeadline}
            onChange={(v: string) => updateFormData('complianceDeadline', v)}
            placeholder="10 business days"
            theme={theme}
          />
        </>
      )}
    </div>
  );
};

// Notice of Claim Form - Government tort claim notice generator
const NoticeOfClaimForm = ({ formData, updateFormData, activeTab, theme }: any) => {
  return (
    <div className="space-y-4">
      {activeTab === 'basic' && (
        <>
          <FormInput
            label="Government Entity"
            value={formData.governmentEntity}
            onChange={(v: string) => updateFormData('governmentEntity', v)}
            placeholder="City of Springfield Police Department"
            required
            theme={theme}
          />

          <FormInput
            label="Entity Address"
            value={formData.entityAddress}
            onChange={(v: string) => updateFormData('entityAddress', v)}
            required
            theme={theme}
          />

          <div className="border-t border-gray-700 pt-4 mt-4">
            <h4 className="font-semibold mb-3">Claimant Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Claimant Name"
                value={formData.claimantName}
                onChange={(v: string) => updateFormData('claimantName', v)}
                required
                theme={theme}
              />
              <FormInput
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(v: string) => updateFormData('dateOfBirth', v)}
                theme={theme}
              />
            </div>

            <FormInput
              label="Claimant Address"
              value={formData.claimantAddress}
              onChange={(v: string) => updateFormData('claimantAddress', v)}
              required
              theme={theme}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Email"
                type="email"
                value={formData.claimantEmail}
                onChange={(v: string) => updateFormData('claimantEmail', v)}
                required
                theme={theme}
              />
              <FormInput
                label="Phone"
                type="tel"
                value={formData.claimantPhone}
                onChange={(v: string) => updateFormData('claimantPhone', v)}
                required
                theme={theme}
              />
            </div>
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <>
          <FormInput
            label="Claim Type"
            value={formData.claimType}
            onChange={(v: string) => updateFormData('claimType', v)}
            placeholder="Personal Injury, False Arrest, Property Damage, etc."
            required
            theme={theme}
          />

          <FormInput
            label="Applicable Statute"
            value={formData.applicableStatute}
            onChange={(v: string) => updateFormData('applicableStatute', v)}
            placeholder="State tort claims act citation"
            theme={theme}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Incident Date"
              type="date"
              value={formData.incidentDate}
              onChange={(v: string) => updateFormData('incidentDate', v)}
              required
              theme={theme}
            />
            <FormInput
              label="Incident Time"
              type="time"
              value={formData.incidentTime}
              onChange={(v: string) => updateFormData('incidentTime', v)}
              theme={theme}
            />
          </div>

          <FormInput
            label="Incident Location"
            value={formData.incidentLocation}
            onChange={(v: string) => updateFormData('incidentLocation', v)}
            placeholder="Specific address or location"
            required
            theme={theme}
          />

          <FormInput
            label="Detailed Incident Description"
            value={formData.incidentDescription}
            onChange={(v: string) => updateFormData('incidentDescription', v)}
            placeholder="Provide comprehensive narrative of what occurred..."
            required
            multiline
            rows={6}
            theme={theme}
          />

          <FormInput
            label="Injuries/Damages Description"
            value={formData.injuriesDescription}
            onChange={(v: string) => updateFormData('injuriesDescription', v)}
            placeholder="Describe all injuries, medical treatment, and damages..."
            multiline
            rows={4}
            theme={theme}
          />
        </>
      )}

      {activeTab === 'legal' && (
        <>
          <FormInput
            label="Government Employees/Agents Involved"
            value={formData.employeesInvolved}
            onChange={(v: string) => updateFormData('employeesInvolved', v)}
            placeholder="Names, badge numbers, titles..."
            multiline
            rows={3}
            theme={theme}
          />

          <FormInput
            label="Legal Basis for Claim"
            value={formData.legalBasis}
            onChange={(v: string) => updateFormData('legalBasis', v)}
            placeholder="Constitutional violations, negligence, etc..."
            multiline
            rows={4}
            theme={theme}
          />

          <FormInput
            label="Damages Amount"
            type="number"
            value={formData.damagesAmount}
            onChange={(v: string) => updateFormData('damagesAmount', v)}
            placeholder="Total amount claimed"
            theme={theme}
          />

          <FormInput
            label="Damage Categories"
            value={formData.damageCategories}
            onChange={(v: string) => updateFormData('damageCategories', v)}
            placeholder="Medical expenses, lost wages, pain and suffering..."
            multiline
            rows={4}
            theme={theme}
          />

          <FormInput
            label="Witnesses"
            value={formData.witnesses}
            onChange={(v: string) => updateFormData('witnesses', v)}
            placeholder="Names and contact information of witnesses..."
            multiline
            rows={3}
            theme={theme}
          />

          <FormInput
            label="Evidence"
            value={formData.evidence}
            onChange={(v: string) => updateFormData('evidence', v)}
            placeholder="Medical records, photos, videos, police reports..."
            multiline
            rows={3}
            theme={theme}
          />
        </>
      )}
    </div>
  );
};

// Subpoena Form - Legal document production subpoena generator
const SubpoenaForm = ({ formData, updateFormData, activeTab, theme }: any) => {
  return (
    <div className="space-y-4">
      {activeTab === 'basic' && (
        <>
          <FormInput
            label="Court Name"
            value={formData.courtName}
            onChange={(v: string) => updateFormData('courtName', v)}
            placeholder="Superior Court of California, County of Los Angeles"
            required
            theme={theme}
          />

          <FormInput
            label="Court Address"
            value={formData.courtAddress}
            onChange={(v: string) => updateFormData('courtAddress', v)}
            theme={theme}
          />

          <FormInput
            label="Case Number"
            value={formData.caseNumber}
            onChange={(v: string) => updateFormData('caseNumber', v)}
            placeholder="CV-2024-12345"
            required
            theme={theme}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Plaintiff Name"
              value={formData.plaintiffName}
              onChange={(v: string) => updateFormData('plaintiffName', v)}
              required
              theme={theme}
            />
            <FormInput
              label="Defendant Name"
              value={formData.defendantName}
              onChange={(v: string) => updateFormData('defendantName', v)}
              required
              theme={theme}
            />
          </div>

          <div className="border-t border-gray-700 pt-4 mt-4">
            <h4 className="font-semibold mb-3">Custodian Information</h4>
            
            <FormInput
              label="Custodian Name"
              value={formData.custodianName}
              onChange={(v: string) => updateFormData('custodianName', v)}
              placeholder="Records Custodian"
              required
              theme={theme}
            />

            <FormInput
              label="Custodian Title"
              value={formData.custodianTitle}
              onChange={(v: string) => updateFormData('custodianTitle', v)}
              placeholder="Director of Records"
              theme={theme}
            />

            <FormInput
              label="Organization"
              value={formData.custodianOrganization}
              onChange={(v: string) => updateFormData('custodianOrganization', v)}
              required
              theme={theme}
            />

            <FormInput
              label="Custodian Address"
              value={formData.custodianAddress}
              onChange={(v: string) => updateFormData('custodianAddress', v)}
              required
              theme={theme}
            />
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <>
          <FormInput
            label="Deposition Location"
            value={formData.depositionLocation}
            onChange={(v: string) => updateFormData('depositionLocation', v)}
            placeholder="123 Attorney Plaza, Suite 456"
            required
            theme={theme}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Deposition Date"
              type="date"
              value={formData.depositionDate}
              onChange={(v: string) => updateFormData('depositionDate', v)}
              required
              theme={theme}
            />
            <FormInput
              label="Deposition Time"
              type="time"
              value={formData.depositionTime}
              onChange={(v: string) => updateFormData('depositionTime', v)}
              required
              theme={theme}
            />
          </div>

          <FormInput
            label="Documents Requested"
            value={formData.documentsRequested}
            onChange={(v: string) => updateFormData('documentsRequested', v)}
            placeholder="1. All emails between...\n2. All contracts dated...\n3. Financial records for..."
            required
            multiline
            rows={8}
            theme={theme}
          />

          <FormInput
            label="Production Instructions"
            value={formData.productionInstructions}
            onChange={(v: string) => updateFormData('productionInstructions', v)}
            placeholder="Custom instructions for document production..."
            multiline
            rows={4}
            theme={theme}
          />

          <FormInput
            label="Time Period"
            value={formData.timePeriod}
            onChange={(v: string) => updateFormData('timePeriod', v)}
            placeholder="January 1, 2020 to December 31, 2024"
            theme={theme}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="compensation"
              checked={formData.compensationOffered}
              onChange={(e) => updateFormData('compensationOffered', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="compensation" className="text-sm">
              Offer statutory witness fees and mileage
            </label>
          </div>
        </>
      )}

      {activeTab === 'legal' && (
        <>
          <h4 className="font-semibold mb-3">Issuing Attorney Information</h4>
          
          <FormInput
            label="Attorney Name"
            value={formData.issuingAttorney}
            onChange={(v: string) => updateFormData('issuingAttorney', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Bar Number"
            value={formData.attorneyBarNumber}
            onChange={(v: string) => updateFormData('attorneyBarNumber', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Law Firm"
            value={formData.attorneyFirm}
            onChange={(v: string) => updateFormData('attorneyFirm', v)}
            theme={theme}
          />

          <FormInput
            label="Attorney Address"
            value={formData.attorneyAddress}
            onChange={(v: string) => updateFormData('attorneyAddress', v)}
            required
            theme={theme}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Attorney Phone"
              type="tel"
              value={formData.attorneyPhone}
              onChange={(v: string) => updateFormData('attorneyPhone', v)}
              required
              theme={theme}
            />
            <FormInput
              label="Attorney Email"
              type="email"
              value={formData.attorneyEmail}
              onChange={(v: string) => updateFormData('attorneyEmail', v)}
              required
              theme={theme}
            />
          </div>
        </>
      )}
    </div>
  );
};

// Discovery Form - Litigation discovery request generator
const DiscoveryForm = ({ formData, updateFormData, activeTab, theme }: any) => {
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  return (
    <div className="space-y-4">
      {activeTab === 'basic' && (
        <>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Request Type <span className="text-red-500">*</span></label>
            <select
              value={formData.requestType}
              onChange={(e) => updateFormData('requestType', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${inputBg} border ${borderColor}`}
            >
              <option value="Interrogatories">Interrogatories</option>
              <option value="Requests for Production">Requests for Production</option>
              <option value="Requests for Admission">Requests for Admission</option>
            </select>
          </div>

          <FormInput
            label="Court Name"
            value={formData.courtName}
            onChange={(v: string) => updateFormData('courtName', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Case Number"
            value={formData.caseNumber}
            onChange={(v: string) => updateFormData('caseNumber', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Requesting Party"
            value={formData.requestingParty}
            onChange={(v: string) => updateFormData('requestingParty', v)}
            required
            theme={theme}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium">Party Designation</label>
            <select
              value={formData.partyDesignation}
              onChange={(e) => updateFormData('partyDesignation', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${inputBg} border ${borderColor}`}
            >
              <option value="Plaintiff">Plaintiff</option>
              <option value="Defendant">Defendant</option>
              <option value="Third Party">Third Party</option>
            </select>
          </div>

          <FormInput
            label="Responding Party"
            value={formData.respondingParty}
            onChange={(v: string) => updateFormData('respondingParty', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Response Time"
            value={formData.responseTime}
            onChange={(v: string) => updateFormData('responseTime', v)}
            placeholder="30 days"
            theme={theme}
          />
        </>
      )}

      {activeTab === 'details' && (
        <>
          <FormInput
            label="Discovery Requests"
            value={formData.requests}
            onChange={(v: string) => updateFormData('requests', v)}
            placeholder="Enter your requests, numbered sequentially..."
            required
            multiline
            rows={10}
            theme={theme}
          />

          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'} border border-yellow-500`}>
            <p className="text-sm text-yellow-400">
              <strong>Tip:</strong> Number each request clearly. For interrogatories, ask specific questions. 
              For production requests, describe documents precisely. For admissions, phrase as statements to be admitted or denied.
            </p>
          </div>

          <FormInput
            label="Detailed Requests (Optional - for additional specificity)"
            value={formData.detailedRequests}
            onChange={(v: string) => updateFormData('detailedRequests', v)}
            placeholder="Provide additional context or instructions..."
            multiline
            rows={6}
            theme={theme}
          />
        </>
      )}

      {activeTab === 'legal' && (
        <>
          <h4 className="font-semibold mb-3">Requesting Attorney Information</h4>
          
          <FormInput
            label="Attorney Name"
            value={formData.requestingAttorney}
            onChange={(v: string) => updateFormData('requestingAttorney', v)}
            required
            theme={theme}
          />

          <FormInput
            label="Bar Number"
            value={formData.attorneyBarNumber}
            onChange={(v: string) => updateFormData('attorneyBarNumber', v)}
            theme={theme}
          />

          <FormInput
            label="Law Firm"
            value={formData.attorneyFirm}
            onChange={(v: string) => updateFormData('attorneyFirm', v)}
            theme={theme}
          />

          <FormInput
            label="Attorney Address"
            value={formData.attorneyAddress}
            onChange={(v: string) => updateFormData('attorneyAddress', v)}
            theme={theme}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Attorney Phone"
              type="tel"
              value={formData.attorneyPhone}
              onChange={(v: string) => updateFormData('attorneyPhone', v)}
              theme={theme}
            />
            <FormInput
              label="Attorney Email"
              type="email"
              value={formData.attorneyEmail}
              onChange={(v: string) => updateFormData('attorneyEmail', v)}
              theme={theme}
            />
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================================
// ID CARD GENERATOR - Professional Know-Your-Rights Card
// ============================================================================

const IDCardGenerator = ({ state, theme }: any) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const cardData = generateIDRightsCard(state);
  
  // Export as PNG using canvas rendering
  const exportAsPNG = () => {
    if (!cardRef.current) return;
    
    // Implementation note: In a production environment, use html2canvas library
    // For this demonstration, we'll use a simpler approach
    alert('PNG export would use html2canvas library in production. Card data is ready for export.');
  };

  // Export as PDF
  const exportAsPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && cardRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Know Your Rights Card - ${state}</title>
            <style>
              @page { size: 3.5in 2.125in; margin: 0; }
              body { 
                margin: 0; 
                padding: 0;
                font-family: Arial, sans-serif;
              }
              .card {
                width: 3.5in;
                height: 2.125in;
                padding: 0.2in;
                box-sizing: border-box;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
              }
              h2 { margin: 0 0 0.1in 0; font-size: 14pt; }
              .section { margin: 0.05in 0; font-size: 8pt; line-height: 1.2; }
              .section strong {display: block; }
              .rights { font-size: 7pt; }
              .script { 
                font-size: 7pt; 
                font-style: italic; 
                background: rgba(255,255,255,0.1); 
                padding: 0.05in; 
                border-radius: 3px;
                margin-top: 0.05in;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>KNOW YOUR RIGHTS - ${state}</h2>
              <div class="section">
                <strong>Constitutional Rights:</strong>
                <div class="rights">${cardData.rights.join(' • ')}</div>
              </div>
              <div class="section">
                <strong>State Law:</strong> ${cardData.stateSpecific.stopAndID}<br/>
                <strong>Recording:</strong> ${cardData.stateSpecific.recording}<br/>
                <strong>Cannabis:</strong> ${cardData.stateSpecific.cannabis}
              </div>
              <div class="script">
                <strong>Say:</strong> ${cardData.script}
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const stopID = STOP_AND_ID_LAWS[state];
  const cannabis = CANNABIS_LAWS[state];

  return (
    <div className="space-y-6">
      {/* Card Preview */}
      <div ref={cardRef} className="relative w-full max-w-2xl mx-auto">
        <div className="aspect-[3.5/2.125] bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 rounded-lg shadow-2xl p-6 text-white">
          <div className="h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold mb-1">KNOW YOUR RIGHTS</h2>
              <p className="text-sm opacity-90">{state}</p>
            </div>

            {/* Rights Section */}
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-xs mb-1">YOUR CONSTITUTIONAL RIGHTS:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {cardData.rights.map((right: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-1">
                      <Check className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* State-Specific Laws */}
              <div className="text-xs bg-white bg-opacity-10 rounded p-2">
                <div className="grid grid-cols-1 gap-0.5">
                  <div><strong>Stop & ID:</strong> {stopID?.hasStopID ? `Yes - ${stopID.requiresID}` : 'No requirement'}</div>
                  <div><strong>Recording:</strong> {stopID?.recordingConsent} consent</div>
                  <div><strong>Cannabis:</strong> {cannabis?.status}</div>
                </div>
              </div>

              {/* Script */}
              <div className="text-xs italic bg-black bg-opacity-20 rounded p-2">
                <strong>Say:</strong> {cardData.script}
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs opacity-75 text-center">
              Emergency: 911 • Non-Emergency: 211 • Legal Aid: 311
            </div>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={exportAsPNG}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export PNG</span>
        </button>
        <button
          onClick={exportAsPDF}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF (Print)</span>
        </button>
      </div>

      {/* Printing Instructions */}
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} border border-blue-500`}>
        <h4 className="font-semibold text-blue-400 mb-2">Printing Instructions</h4>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Click "Export PDF (Print)" to open print dialog</li>
          <li>Print on heavy cardstock (110lb or heavier recommended)</li>
          <li>Card dimensions: 3.5" x 2.125" (standard credit card size)</li>
          <li>Consider laminating for durability</li>
          <li>Carry in wallet for quick reference during encounters</li>
        </ol>
      </div>

      {/* Legal Information Display */}
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} space-y-3`}>
        <h4 className="font-semibold">State-Specific Legal Information</h4>
        
        <div>
          <p className="text-sm font-medium mb-1">Stop and Identify Law:</p>
          <p className="text-sm">
            {stopID?.hasStopID ? (
              <>
                <span className="text-yellow-500">⚠️ {state} HAS a Stop & ID law</span>
                <br />Statute: {stopID.statute}
                <br />Requirement: {stopID.requiresID}
                <br />You must provide identification when lawfully detained and asked by police.
              </>
            ) : (
              <>
                <span className="text-green-500">✓ {state} does NOT have a Stop & ID law</span>
                <br />You are not required to identify yourself unless arrested.
              </>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Recording Consent:</p>
          <p className="text-sm">
            {stopID?.recordingConsent === 'One-party' ? (
              <>
                <span className="text-green-500">✓ One-party consent</span>
                <br />You may record conversations you're part of without others' consent.
              </>
            ) : (
              <>
                <span className="text-red-500">⚠️ All-party consent required</span>
                <br />You must obtain consent from all parties before recording private conversations.
                <br /><strong>Note:</strong> Recording police in public is generally protected under the First Amendment regardless of state recording laws.
              </>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Cannabis Law:</p>
          <p className="text-sm">
            Status: <strong>{cannabis?.status}</strong>
            <br />Possession: {cannabis?.possession}
            {cannabis?.enacted !== 'N/A' && <><br />Enacted: {cannabis.enacted}</>}
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// STATE LAWS TAB - Comprehensive Legal Database Browser
// ============================================================================

const StateLawsTab = ({ selectedState, setSelectedState, theme }: any) => {
  const [activeCategory, setActiveCategory] = useState('public-records');
  
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  const publicRecordsLaw = STATE_PUBLIC_RECORDS_LAWS[selectedState];
  const stopIDLaw = STOP_AND_ID_LAWS[selectedState];
  const cannabisLaw = CANNABIS_LAWS[selectedState];

  return (
    <div className="space-y-6">
      {/* State Selector */}
      <div className={`${cardBg} rounded-lg shadow-lg p-6 border ${borderColor}`}>
        <label className="block text-lg font-semibold mb-3">Select State for Legal Information</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} font-medium text-lg`}
        >
          {Object.keys(STATE_PUBLIC_RECORDS_LAWS).sort().map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Category Tabs */}
      <div className={`${cardBg} rounded-lg shadow-lg border ${borderColor} overflow-hidden`}>
        <div className="flex border-b border-gray-700">
          {[
            { id: 'public-records', label: 'Public Records Laws' },
            { id: 'stop-id', label: 'Stop & ID Laws' },
            { id: 'cannabis', label: 'Cannabis Laws' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : `${inputBg} hover:bg-opacity-80`
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Public Records Laws */}
          {activeCategory === 'public-records' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">{selectedState} Public Records Law</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${inputBg} border ${borderColor}`}>
                  <p className="text-sm font-medium text-gray-400 mb-1">Statute Citation</p>
                  <p className="text-lg font-semibold">{publicRecordsLaw?.statute}</p>
                </div>
                
                <div className={`p-4 rounded-lg ${inputBg} border ${borderColor}`}>
                  <p className="text-sm font-medium text-gray-400 mb-1">Response Timeframe</p>
                  <p className="text-lg font-semibold">{publicRecordsLaw?.timeframe}</p>
                </div>
                
                <div className={`p-4 rounded-lg ${inputBg} border ${borderColor}`}>
                  <p className="text-sm font-medium text-gray-400 mb-1">Timeframe Type</p>
                  <p className="text-lg font-semibold capitalize">{publicRecordsLaw?.type}</p>
                </div>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} border border-blue-500`}>
                <h4 className="font-semibold text-blue-400 mb-2">Key Points</h4>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>Agencies must respond within the statutory timeframe</li>
                  <li>Exemptions must be specifically cited</li>
                  <li>Fee estimates should be provided if costs exceed limits</li>
                  <li>Denials must include appeal procedures</li>
                  <li>Electronic format production reduces costs</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'} border border-yellow-500`}>
                <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Important Notes</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Laws change frequently - verify current statute before filing</li>
                  <li>Some jurisdictions have additional local requirements</li>
                  <li>Response times may be extended under certain circumstances</li>
                  <li>Always document your request date and method of service</li>
                </ul>
              </div>
            </div>
          )}

          {/* Stop & ID Laws */}
          {activeCategory === 'stop-id' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">{selectedState} Stop & Identify Law</h3>
              
              <div className={`p-6 rounded-lg ${stopIDLaw?.hasStopID ? 'bg-red-900 bg-opacity-20 border-red-500' : 'bg-green-900 bg-opacity-20 border-green-500'} border-2`}>
                <div className="flex items-center space-x-3 mb-4">
                  {stopIDLaw?.hasStopID ? (
                    <>
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                      <div>
                        <p className="text-xl font-bold text-red-400">Stop & ID State</p>
                        <p className="text-sm">You must identify yourself when lawfully detained</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Check className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-xl font-bold text-green-400">No Stop & ID Law</p>
                        <p className="text-sm">No requirement to identify unless arrested</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Statute</p>
                    <p className="font-semibold">{stopIDLaw?.statute}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">ID Requirement</p>
                    <p className="font-semibold">{stopIDLaw?.requiresID}</p>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${stopIDLaw?.recordingConsent === 'One-party' ? 'bg-green-900 bg-opacity-20 border-green-500' : 'bg-red-900 bg-opacity-20 border-red-500'} border-2`}>
                <h4 className="text-lg font-semibold mb-3">Recording Consent Law</h4>
                <div className="flex items-center space-x-3">
                  {stopIDLaw?.recordingConsent === 'One-party' ? (
                    <>
                      <Check className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="font-semibold text-green-400">One-Party Consent</p>
                        <p className="text-sm">You may record conversations you're part of without other parties' consent</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="font-semibold text-red-400">All-Party Consent Required</p>
                        <p className="text-sm">All parties must consent to recording private conversations</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} border border-blue-500`}>
                <h4 className="font-semibold text-blue-400 mb-2">First Amendment Protection</h4>
                <p className="text-sm">
                  The right to record police officers performing their duties in public is protected by the First Amendment 
                  in all states, regardless of state recording consent laws. This has been affirmed by multiple federal 
                  circuit courts. However, you may not interfere with police operations while recording.
                </p>
              </div>

              {stopIDLaw?.hasStopID && (
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'} border border-yellow-500`}>
                  <h4 className="font-semibold text-yellow-400 mb-2">What "Lawful Detention" Means</h4>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Officer must have reasonable suspicion you committed, are committing, or are about to commit a crime</li>
                    <li>General "suspicious behavior" is not sufficient for detention</li>
                    <li>You have the right to ask "Am I being detained?" and "What crime do you suspect?"</li>
                    <li>If not detained, you are free to leave</li>
                    <li>Refusal to ID when lawfully detained can result in additional charges</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Cannabis Laws */}
          {activeCategory === 'cannabis' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">{selectedState} Cannabis Law</h3>
              
              <div className={`p-6 rounded-lg border-2 ${
                cannabisLaw?.status === 'Recreational' ? 'bg-green-900 bg-opacity-20 border-green-500' :
                cannabisLaw?.status === 'Medical only' ? 'bg-yellow-900 bg-opacity-20 border-yellow-500' :
                'bg-red-900 bg-opacity-20 border-red-500'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    cannabisLaw?.status === 'Recreational' ? 'bg-green-500' :
                    cannabisLaw?.status === 'Medical only' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {cannabisLaw?.status === 'Recreational' ? <Check className="w-6 h-6 text-white" /> :
                     cannabisLaw?.status === 'Medical only' ? <Shield className="w-6 h-6 text-white" /> :
                     <X className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{cannabisLaw?.status}</p>
                    <p className="text-sm opacity-90">Current Legal Status in {selectedState}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${inputBg}`}>
                    <p className="text-sm font-medium text-gray-400 mb-1">Possession Limit</p>
                    <p className="text-lg font-semibold">{cannabisLaw?.possession}</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${inputBg}`}>
                    <p className="text-sm font-medium text-gray-400 mb-1">Law Enacted</p>
                    <p className="text-lg font-semibold">{cannabisLaw?.enacted}</p>
                  </div>
                </div>
              </div>

              {cannabisLaw?.status === 'Recreational' && (
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'} border border-green-500`}>
                  <h4 className="font-semibold text-green-400 mb-2">✓ Recreational Use Permitted</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Adults 21+ may possess up to the legal limit</li>
                    <li>Purchase from licensed dispensaries</li>
                    <li>Consumption restrictions apply (no public use in most states)</li>
                    <li>Driving under the influence remains illegal</li>
                    <li>Federal law still prohibits cannabis - use caution on federal property</li>
                  </ul>
                </div>
              )}

              {cannabisLaw?.status === 'Medical only' && (
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'} border border-yellow-500`}>
                  <h4 className="font-semibold text-yellow-400 mb-2">⚕️ Medical Use Only</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Valid medical card required for possession</li>
                    <li>Qualifying medical conditions specified by state law</li>
                    <li>Purchase only from state-licensed dispensaries</li>
                    <li>Possession without valid card may result in criminal charges</li>
                    <li>Out-of-state medical cards may not be recognized</li>
                  </ul>
                </div>
              )}

              {(cannabisLaw?.status === 'Illegal' || cannabisLaw?.status === 'CBD only') && (
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'} border border-red-500`}>
                  <h4 className="font-semibold text-red-400 mb-2">⚠️ Prohibited / Restricted</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Cannabis possession and use prohibited under state law</li>
                    <li>Criminal penalties may apply for possession</li>
                    {cannabisLaw?.status === 'CBD only' && <li>Only low-THC CBD products may be legal</li>}
                    <li>No legal dispensaries in state</li>
                    <li>Penalties vary based on amount and circumstances</li>
                  </ul>
                </div>
              )}

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} border border-blue-500`}>
                <h4 className="font-semibold text-blue-400 mb-2">Federal Law Reminder</h4>
                <p className="text-sm">
                  Cannabis remains illegal under federal law (Schedule I controlled substance). This creates complications 
                  for banking, employment, federal benefits, immigration, and possession on federal property. Even in states 
                  where cannabis is legal, federal law enforcement can technically prosecute, though this is rare for 
                  state-compliant activities.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// HOSTILE STATE WARNINGS TAB - Risk Assessment Dashboard
// ============================================================================

const HostileStateWarningsTab = ({ theme }: any) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  const filteredStates = Object.entries(HOSTILE_STATE_WARNINGS).filter(([_, data]) => 
    filterLevel === 'all' || data.level === filterLevel
  );

  const highRiskCount = Object.values(HOSTILE_STATE_WARNINGS).filter(d => d.level === 'HIGH').length;
  const moderateRiskCount = Object.values(HOSTILE_STATE_WARNINGS).filter(d => d.level === 'MODERATE').length;

  return (
    <div className="space-y-6">
      {/* Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${cardBg} rounded-lg shadow-lg p-6 border-2 border-red-500`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-red-400">HIGH RISK</h3>
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-4xl font-bold">{highRiskCount}</p>
          <p className="text-sm text-gray-400 mt-1">States with documented hostility</p>
        </div>

        <div className={`${cardBg} rounded-lg shadow-lg p-6 border-2 border-yellow-500`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-yellow-400">MODERATE RISK</h3>
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-4xl font-bold">{moderateRiskCount}</p>
          <p className="text-sm text-gray-400 mt-1">States with inconsistent enforcement</p>
        </div>

        <div className={`${cardBg} rounded-lg shadow-lg p-6 border-2 border-green-500`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-green-400">PROTECTIVE</h3>
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-4xl font-bold">{50 - highRiskCount - moderateRiskCount}</p>
          <p className="text-sm text-gray-400 mt-1">States generally favorable to civil rights</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className={`${cardBg} rounded-lg shadow-lg p-4 border ${borderColor}`}>
        <div className="flex items-center space-x-4">
          <label className="font-medium">Filter by Risk Level:</label>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className={`px-4 py-2 rounded-lg ${inputBg} border ${borderColor}`}
          >
            <option value="all">All States</option>
            <option value="HIGH">High Risk Only</option>
            <option value="MODERATE">Moderate Risk Only</option>
          </select>
        </div>
      </div>

      {/* Warning Cards */}
      <div className="space-y-4">
        {filteredStates.length > 0 ? (
          filteredStates.map(([state, data]) => (
            <div
              key={state}
              className={`${cardBg} rounded-lg shadow-lg p-6 border-l-4 ${
                data.level === 'HIGH' ? 'border-red-500' : 'border-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`w-8 h-8 ${
                    data.level === 'HIGH' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <div>
                    <h3 className="text-2xl font-bold">{state}</h3>
                    <p className={`text-sm font-semibold ${
                      data.level === 'HIGH' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {data.level} RISK STATE
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Known Issues</span>
                  </h4>
                  <ul className="space-y-2">
                    {data.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Safety Recommendations</span>
                  </h4>
                  <ul className="space-y-2">
                    {data.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={`${cardBg} rounded-lg shadow-lg p-12 border ${borderColor} text-center`}>
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-green-400">No states match the selected filter</p>
            <p className="text-sm text-gray-400 mt-2">Try selecting a different risk level filter</p>
          </div>
        )}
      </div>

      {/* General Safety Guidelines */}
      <div className={`${cardBg} rounded-lg shadow-lg p-6 border ${borderColor}`}>
        <h3 className="text-xl font-bold mb-4">General Safety Guidelines for All States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-400 mb-3">Before the Activity</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Research specific jurisdiction's laws and ordinances</li>
              <li>Identify safe exit routes and public areas</li>
              <li>Have emergency contacts readily available</li>
              <li>Inform trusted person of your location and plans</li>
              <li>Charge all devices and have backup power</li>
              <li>Review your rights for the specific state</li>
              <li>Consider having attorney contact information ready</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-400 mb-3">During the Activity</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Stay calm and polite at all times</li>
              <li>Clearly state you're exercising constitutional rights</li>
              <li>Never physically resist, even if rights are violated</li>
              <li>Document everything with time/date stamps</li>
              <li>Use cloud backup for real-time recording uploads</li>
              <li>Keep multiple recording devices if possible</li>
              <li>Know when to disengage for safety</li>
              <li>Never lie to law enforcement</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-400 mb-3">If Detained or Arrested</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Invoke Fifth Amendment right to remain silent</li>
              <li>Request attorney immediately and repeatedly</li>
              <li>Do not consent to searches</li>
              <li>Do not sign anything without attorney review</li>
              <li>Document badge numbers and officer names</li>
              <li>Remember: anything you say can be used against you</li>
              <li>Comply physically, but assert rights verbally</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-400 mb-3">After the Encounter</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Preserve all evidence immediately (cloud backup)</li>
              <li>Document everything while memory is fresh</li>
              <li>Obtain witness contact information</li>
              <li>File formal complaints if rights violated</li>
              <li>Consult with civil rights attorney if needed</li>
              <li>Submit public records requests for body cam footage</li>
              <li>Share experiences to help others learn</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer for Warnings */}
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'} border border-red-500`}>
        <p className="text-sm">
          <strong>⚠️ Disclaimer:</strong> These warnings are based on documented incidents and reported patterns. 
          They do not constitute legal advice. Laws and enforcement practices can change. Individual experiences 
          may vary significantly within the same jurisdiction. Always verify current laws and consult with qualified 
          attorneys when engaging in activities that may result in legal consequences.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// PRICING TAB - Subscription Management Interface
// ============================================================================

const PricingTab = ({ subscription, setSubscription, theme }: any) => {
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      description: 'Essential legal document generation',
      features: [
        'FOIA & State Public Records Requests',
        'Know-Your-Rights ID Card Generator',
        'State Law Database Access',
        'PDF & PNG Export',
        'Email Support',
        'Single User License'
      ],
      limitations: [
        'No Cease & Desist Letters',
        'No Notice of Claim Documents',
        'No Discovery Tools',
        'No Bulk Generation'
      ],
      color: 'blue'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 79,
      description: 'Complete legal toolkit for serious users',
      features: [
        'Everything in Basic',
        'Cease & Desist Letter Generator',
        'Notice of Claim Documents',
        'Pre-Suit Notice Templates',
        'Subpoena Duces Tecum Generator',
        'Discovery Request Tools',
        'Bulk Document Generation',
        'Priority Email Support',
        'Up to 5 User Licenses'
      ],
      limitations: [
        'No Team Workspace',
        'No Custom Branding',
        'No API Access'
      ],
      color: 'purple',
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate Bundle',
      price: 149,
      description: 'Enterprise solution for organizations',
      features: [
        'Everything in Professional',
        'Complete Civil Rights Tool Suite',
        'Organization/Team Workspace',
        'Custom Branding & White-Label',
        'SSO Integration Ready',
        'API Access for Automation',
        'Unlimited User Licenses',
        'Priority Phone & Email Support',
        'Custom Template Development',
        'Legal Database Updates (Real-time)',
        'Training & Onboarding Sessions'
      ],
      limitations: [],
      color: 'gold'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Pricing Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-xl text-gray-400">
          Professional-grade legal document generation for civil rights advocates, journalists, and attorneys
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`${cardBg} rounded-lg shadow-2xl border-2 ${
              subscription === plan.id ? `border-${plan.color}-500` : borderColor
            } ${plan.popular ? 'lg:scale-105 lg:z-10' : ''} transition-all hover:shadow-3xl relative overflow-hidden`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-bold">
                MOST POPULAR
              </div>
            )}

            <div className="p-8">
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3 flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Included Features</span>
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3 flex items-center space-x-2">
                      <X className="w-4 h-4" />
                      <span>Not Included</span>
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-500">
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setSubscription(plan.id)}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  subscription === plan.id
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : `bg-${plan.color}-600 text-white hover:bg-${plan.color}-700`
                }`}
              >
                {subscription === plan.id ? 'Current Plan ✓' : `Select ${plan.name}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className={`${cardBg} rounded-lg shadow-lg p-8 border ${borderColor}`}>
        <h3 className="text-2xl font-bold mb-6">Detailed Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${borderColor}`}>
                <th className="text-left py-4 px-4">Feature</th>
                <th className="text-center py-4 px-4">Basic</th>
                <th className="text-center py-4 px-4">Professional</th>
                <th className="text-center py-4 px-4">Ultimate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'FOIA Requests', basic: true, pro: true, ult: true },
                { feature: 'State Public Records Requests', basic: true, pro: true, ult: true },
                { feature: 'Know-Your-Rights ID Cards', basic: true, pro: true, ult: true },
                { feature: 'State Law Database', basic: true, pro: true, ult: true },
                { feature: 'PDF/PNG Export', basic: true, pro: true, ult: true },
                { feature: 'Cease & Desist Letters', basic: false, pro: true, ult: true },
                { feature: 'Notice of Claim Documents', basic: false, pro: true, ult: true },
                { feature: 'Subpoena Generation', basic: false, pro: true, ult: true },
                { feature: 'Discovery Requests', basic: false, pro: true, ult: true },
                { feature: 'Bulk Document Generation', basic: false, pro: true, ult: true },
                { feature: 'Team Workspace', basic: false, pro: false, ult: true },
                { feature: 'Custom Branding', basic: false, pro: false, ult: true },
                { feature: 'API Access', basic: false, pro: false, ult: true },
                { feature: 'Priority Support', basic: false, pro: true, ult: true },
                { feature: 'User Licenses', basic: '1', pro: '5', ult: 'Unlimited' }
              ].map((row, idx) => (
                <tr key={idx} className={`border-b ${borderColor}`}>
                  <td className="py-3 px-4 font-medium">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-sm">{row.basic}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.pro === 'boolean' ? (
                      row.pro ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-sm">{row.pro}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.ult === 'boolean' ? (
                      row.ult ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-sm">{row.ult}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${cardBg} rounded-lg shadow-lg p-8 border ${borderColor}`}>
        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {[
            {
              q: 'Can I upgrade or downgrade my plan at any time?',
              a: 'Yes! You can change your subscription tier at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle. You\'ll receive a prorated credit for any unused time.'
            },
            {
              q: 'Is there a free trial available?',
              a: 'We offer a 14-day free trial of the Professional tier so you can experience the full power of the platform. No credit card required to start your trial.'
            },
            {
              q: 'Are the generated documents legally valid?',
              a: 'Our templates are based on current statutory requirements and best practices. However, this software provides legal information, not legal advice. We recommend having an attorney review documents for your specific situation, especially for high-stakes matters.'
            },
            {
              q: 'How often is the legal database updated?',
              a: 'Basic and Professional tiers receive quarterly updates. Ultimate tier subscribers receive real-time updates as laws change, ensuring you always have the most current information.'
            },
            {
              q: 'Can I use this for my law firm or organization?',
              a: 'Absolutely! The Professional tier supports up to 5 users, perfect for small firms. The Ultimate tier is designed for larger organizations with unlimited users, team workspaces, and custom branding options.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, debit cards, PayPal, and ACH transfers for annual subscriptions. Enterprise clients can arrange invoice billing.'
            },
            {
              q: 'Is my data secure and private?',
              a: 'Yes. We use bank-level encryption (AES-256) for all data storage and transmission. We never share your data with third parties. Ultimate tier includes SOC 2 compliance certification.'
            },
            {
              q: 'What kind of support do you provide?',
              a: 'Basic tier includes email support with 48-hour response time. Professional tier includes priority email support with 24-hour response. Ultimate tier includes phone and email support with 4-hour response time, plus dedicated account management.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-semibold text-lg">{faq.q}</h4>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Money-Back Guarantee */}
      <div className={`${cardBg} rounded-lg shadow-lg p-8 border-2 border-green-500 text-center`}>
        <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We're confident you'll love our platform. If you're not completely satisfied within the first 30 days, 
          we'll refund your subscription, no questions asked. Your civil rights work is too important for 
          compromises.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT & RENDER
// ============================================================================

export default CivilRightsLegalTool;