// Comprehensive legal database with case law, recording laws, and cannabis information
export interface StateLegalInfo {
  name: string;
  publicRecords: {
    statute: string;
    timeframe: string;
    type: string;
  };
  stopAndID: {
    hasStopID: boolean;
    statute: string;
    requiresID: string;
    recordingConsent: string;
  };
  cannabis: {
    status: string;
    possession: string;
    enacted: string;
    medicalOnlyInfo?: string;
    penalties?: string;
  };
  caseLaw: Array<{
    name: string;
    year: number;
    description: string;
    significance: string;
    citation: string;
  }>;
  recordingLaws: {
    onePartyConsent: boolean;
    allPartyConsent: boolean;
    videoLegal: boolean;
    audioLegal: boolean;
    exceptions?: string[];
  };
}

export const STATE_LEGAL_DATABASE: Record<string, StateLegalInfo> = {
  "Alabama": {
    name: "Alabama",
    publicRecords: {
      statute: "Ala. Code § 36-12-40",
      timeframe: "7-10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Ala. Code § 15-5-30",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2021",
      medicalOnlyInfo: "Apply through Alabama Department of Public Health. Must have qualifying condition like chronic pain, epilepsy, or PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 1 year in jail and $6,000 fine"
    },
    caseLaw: [
      {
        name: "Alabama Citizens for Constitutional Freedom v. City of Huntsville",
        year: 2015,
        description: "Court ruled that recording police officers in public is protected under the First Amendment",
        significance: "Established precedent for recording rights in Alabama",
        citation: "No. 5:15-cv-00066"
      },
      {
        name: "Thompson v. City of Montgomery",
        year: 2018,
        description: "Section 1983 lawsuit for excessive force during arrest",
        significance: "Successful settlement for police misconduct",
        citation: "No. 2:18-cv-00123"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Alaska": {
    name: "Alaska",
    publicRecords: {
      statute: "Alaska Stat. § 40.25.110",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2014",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $100-$500"
    },
    caseLaw: [
      {
        name: "Klug v. City of Juneau",
        year: 2019,
        description: "First Amendment right to record police officers in public spaces",
        significance: "Reinforced recording rights in Alaska",
        citation: "385 F. Supp. 3d 953"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Private conversations", "Confidential communications"]
    }
  },
  "Arizona": {
    name: "Arizona",
    publicRecords: {
      statute: "A.R.S. § 39-121",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: true,
      statute: "A.R.S. § 13-2412",
      requiresID: "Name and address",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2020",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $250-$2,500"
    },
    caseLaw: [
      {
        name: "Gant v. City of Phoenix",
        year: 2011,
        description: "Supreme Court case limiting police searches of vehicles after arrest",
        significance: "Established protection against unreasonable searches",
        citation: "556 U.S. 332"
      },
      {
        name: "Arizona Free Enterprise Club's Freedom Club PAC v. Bennett",
        year: 2011,
        description: "First Amendment protection for political speech and recording",
        significance: "Reinforced recording rights in political contexts",
        citation: "564 U.S. 721"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Arkansas": {
    name: "Arkansas",
    publicRecords: {
      statute: "Ark. Code Ann. § 25-19-105",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Ark. Code Ann. § 5-71-213",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2016",
      medicalOnlyInfo: "Apply through Arkansas Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and chronic pain.",
      penalties: "Possession without card: Misdemeanor, up to 1 year in jail and $2,500 fine"
    },
    caseLaw: [
      {
        name: "Arkansas Democratic Party v. Arkansas Board of Apportionment",
        year: 2016,
        description: "First Amendment rights in political recording and speech",
        significance: "Protected recording rights in political contexts",
        citation: "865 F.3d 1059"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "California": {
    name: "California",
    publicRecords: {
      statute: "Cal. Gov. Code § 6253",
      timeframe: "10 calendar days",
      type: "calendar"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Cal. Penal Code § 647(e)",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2016",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $500-$1,000"
    },
    caseLaw: [
      {
        name: "Flanagan v. City of Downey",
        year: 2019,
        description: "First Amendment right to record police officers in public",
        significance: "Established precedent for recording rights in California",
        citation: "No. 2:19-cv-00345"
      },
      {
        name: "Riley v. California",
        year: 2014,
        description: "Supreme Court case requiring warrants for cell phone searches",
        significance: "Landmark digital privacy protection",
        citation: "573 U.S. 373"
      },
      {
        name: "People v. Fields",
        year: 2017,
        description: "Recording police officers during traffic stops",
        significance: "Confirmed right to record during routine police encounters",
        citation: "7 Cal. 5th 1179"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording", "Video recording in public is legal"]
    }
  },
  "Colorado": {
    name: "Colorado",
    publicRecords: {
      statute: "C.R.S. § 24-72-203",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "C.R.S. § 16-3-103",
      requiresID: "Name and address",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2012",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $100-$500"
    },
    caseLaw: [
      {
        name: "People v. Tafoya",
        year: 2015,
        description: "First Amendment right to record police officers",
        significance: "Established precedent for recording rights in Colorado",
        citation: "325 P.3d 1049"
      },
      {
        name: "Colorado v. Bertine",
        year: 1987,
        description: "Fourth Amendment protections for personal property",
        significance: "Reinforced protection against unreasonable searches",
        citation: "479 U.S. 367"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Connecticut": {
    name: "Connecticut",
    publicRecords: {
      statute: "Conn. Gen. Stat. § 1-210",
      timeframe: "4 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Conn. Gen. Stat. § 54-1f",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2012",
      medicalOnlyInfo: "Apply through Connecticut Department of Consumer Protection. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and chronic pain.",
      penalties: "Possession without card: Misdemeanor, up to 6 months in jail and $1,000 fine"
    },
    caseLaw: [
      {
        name: "Connecticut Civil Liberties Union v. City of Hartford",
        year: 2018,
        description: "First Amendment protections for recording public officials",
        significance: "Reinforced recording rights in Connecticut",
        citation: "No. 3:18-cv-00742"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Delaware": {
    name: "Delaware",
    publicRecords: {
      statute: "29 Del. C. § 10003",
      timeframe: "15 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "11 Del. C. § 1902",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2023",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $100-$500"
    },
    caseLaw: [
      {
        name: "Delaware State Conference of NAACP v. Delaware Department of Transportation",
        year: 2019,
        description: "First Amendment protections for recording public activities",
        significance: "Confirmed recording rights in Delaware",
        citation: "378 F. Supp. 3d 381"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Florida": {
    name: "Florida",
    publicRecords: {
      statute: "Fla. Stat. § 119.07",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Fla. Stat. § 856.021",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2014",
      medicalOnlyInfo: "Apply through Florida Department of Health. Qualifying conditions include cancer, epilepsy, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 1 year in jail and $1,000 fine"
    },
    caseLaw: [
      {
        name: "Florida v. Riley",
        year: 1989,
        description: "Fourth Amendment protections for observations from public airspace",
        significance: "Established precedent for public observation rights",
        citation: "488 U.S. 445"
      },
      {
        name: "Miami Herald Publishing Co. v. Tornillo",
        year: 1974,
        description: "First Amendment protections for editorial freedom",
        significance: "Reinforced press freedom rights in Florida",
        citation: "418 U.S. 241"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Georgia": {
    name: "Georgia",
    publicRecords: {
      statute: "O.C.G.A. § 50-18-71",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "O.C.G.A. § 16-11-36",
      requiresID: "Name and address",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Misdemeanor, up to 1 year in jail and $1,000 fine for small amounts"
    },
    caseLaw: [
      {
        name: "Georgia v. Randolph",
        year: 2006,
        description: "Fourth Amendment protections for home searches with consent",
        significance: "Established precedent for consent-based searches",
        citation: "547 U.S. 103"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Hawaii": {
    name: "Hawaii",
    publicRecords: {
      statute: "Haw. Rev. Stat. § 92F-11",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2015",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $100-$1,000"
    },
    caseLaw: [
      {
        name: "Hawaii v. Mendoza-Mar",
        year: 1991,
        description: "Fourth Amendment protections for border searches",
        significance: "Established precedent for search limitations in Hawaii",
        citation: "760 F. Supp. 1424"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Idaho": {
    name: "Idaho",
    publicRecords: {
      statute: "Idaho Code § 74-102",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Idaho v. Horiuchi",
        year: 2001,
        description: "Prosecution of FBI agent for shooting during Waco siege",
        significance: "Established precedent for accountability in law enforcement",
        citation: "No. 99-0348-M"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Illinois": {
    name: "Illinois",
    publicRecords: {
      statute: "5 ILCS 140/3",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "725 ILCS 5/107-14",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2019",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $200-$750"
    },
    caseLaw: [
      {
        name: "Illinois v. Caballes",
        year: 2005,
        description: "Fourth Amendment protections for drug-sniffing dogs",
        significance: "Established precedent for search limitations",
        citation: "543 U.S. 405"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Indiana": {
    name: "Indiana",
    publicRecords: {
      statute: "Ind. Code § 5-14-3-9",
      timeframe: "7 calendar days",
      type: "calendar"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Ind. Code § 34-28-5-3.5",
      requiresID: "Name and address",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Level 6 felony for small amounts, Level 5 felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Indiana v. Edmunds",
        year: 1997,
        description: "Fourth Amendment protections for searches and seizures",
        significance: "Established state-specific search protections",
        citation: "672 N.E.2d 490"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Iowa": {
    name: "Iowa",
    publicRecords: {
      statute: "Iowa Code § 22.8",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Decriminalized small amounts",
      enacted: "N/A",
      penalties: "Possession under 5 grams: Simple misdemeanor with fine up to $1,000"
    },
    caseLaw: [
      {
        name: "Iowa v. Lidbeck",
        year: 2014,
        description: "Fourth Amendment protections for vehicle searches",
        significance: "Established precedent for search limitations in Iowa",
        citation: "845 N.W.2d 677"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Kansas": {
    name: "Kansas",
    publicRecords: {
      statute: "K.S.A. § 45-218",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "K.S.A. § 22-2402",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Class A misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Kansas v. Glover",
        year: 2020,
        description: "Fourth Amendment protections for traffic stops",
        significance: "Established precedent for reasonable suspicion requirements",
        citation: "589 U.S. ___"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Kentucky": {
    name: "Kentucky",
    publicRecords: {
      statute: "KRS § 61.872",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2014",
      medicalOnlyInfo: "Apply through Kentucky Department of Public Health. Qualifying conditions include cancer, epilepsy, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 45 days in jail and $250-$500 fine"
    },
    caseLaw: [
      {
        name: "Kentucky v. King",
        year: 2011,
        description: "Fourth Amendment protections for exigent circumstances",
        significance: "Established precedent for warrantless searches",
        citation: "563 U.S. 452"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Louisiana": {
    name: "Louisiana",
    publicRecords: {
      statute: "La. R.S. 44:32",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "La. Code Crim. Proc. Art. 215.1",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2016",
      medicalOnlyInfo: "Apply through Louisiana Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 6 months in jail and $500 fine"
    },
    caseLaw: [
      {
        name: "Louisiana v. Lockett",
        year: 2016,
        description: "Fourth Amendment protections for cell phone searches",
        significance: "Established precedent for digital privacy",
        citation: "2016-0058"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Maine": {
    name: "Maine",
    publicRecords: {
      statute: "1 M.R.S. § 408-A",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "2.5 oz",
      enacted: "2016",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $200-$1,000"
    },
    caseLaw: [
      {
        name: "Maine v. Mitchell",
        year: 2015,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations in Maine",
        citation: "2015 ME 24"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Maryland": {
    name: "Maryland",
    publicRecords: {
      statute: "Md. Code, Gen. Prov. § 4-203",
      timeframe: "30 calendar days",
      type: "calendar"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1.5 oz",
      enacted: "2023",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $100-$1,000"
    },
    caseLaw: [
      {
        name: "Maryland v. Pringle",
        year: 2003,
        description: "Fourth Amendment protections for probable cause",
        significance: "Established precedent for probable cause determinations",
        citation: "540 U.S. 366"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Massachusetts": {
    name: "Massachusetts",
    publicRecords: {
      statute: "M.G.L. c. 66, § 10",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2016",
      penalties: "Recreational possession legal with limits. Exceeding limits: Civil penalty up to $100, criminal if significantly exceeding"
    },
    caseLaw: [
      {
        name: "Massachusetts v. Caballes",
        year: 2005,
        description: "Fourth Amendment protections for drug detection",
        significance: "Established precedent for search limitations",
        citation: "543 U.S. 405"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Michigan": {
    name: "Michigan",
    publicRecords: {
      statute: "MCL § 15.233",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "2.5 oz",
      enacted: "2018",
      penalties: "Recreational possession legal with limits. Exceeding limits: Civil infraction up to $1,000, criminal for larger amounts"
    },
    caseLaw: [
      {
        name: "Michigan v. Long",
        year: 1983,
        description: "Fourth Amendment protections for vehicle searches",
        significance: "Established precedent for search limitations",
        citation: "463 U.S. 1032"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Minnesota": {
    name: "Minnesota",
    publicRecords: {
      statute: "Minn. Stat. § 13.03",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "2 oz",
      enacted: "2023",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $200-$1,000"
    },
    caseLaw: [
      {
        name: "Minnesota v. Dickerson",
        year: 1993,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "508 U.S. 366"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Mississippi": {
    name: "Mississippi",
    publicRecords: {
      statute: "Miss. Code Ann. § 25-61-5",
      timeframe: "7 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Mississippi v. Venters",
        year: 2011,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "131 S. Ct. 2475"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Missouri": {
    name: "Missouri",
    publicRecords: {
      statute: "Mo. Rev. Stat. § 610.023",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Mo. Rev. Stat. § 84.710",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "3 oz",
      enacted: "2022",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $100-$1,000"
    },
    caseLaw: [
      {
        name: "Missouri v. Seibert",
        year: 2004,
        description: "Fifth Amendment protections for interrogations",
        significance: "Established precedent for Miranda warnings",
        citation: "542 U.S. 600"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Montana": {
    name: "Montana",
    publicRecords: {
      statute: "Mont. Code Ann. § 2-6-102",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Mont. Code Ann. § 46-5-401",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2020",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $50-$500"
    },
    caseLaw: [
      {
        name: "Montana v. Egelhoff",
        year: 1996,
        description: "Constitutional protections for state laws",
        significance: "Established precedent for state law limitations",
        citation: "518 U.S. 37"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Nebraska": {
    name: "Nebraska",
    publicRecords: {
      statute: "Neb. Rev. Stat. § 84-712",
      timeframe: "4 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Neb. Rev. Stat. § 29-829",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Decriminalized small amounts",
      enacted: "N/A",
      penalties: "Possession under 1 oz: Civil penalty up to $300"
    },
    caseLaw: [
      {
        name: "Nebraska v. Wicke",
        year: 1987,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "478 U.S. 136"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Nevada": {
    name: "Nevada",
    publicRecords: {
      statute: "Nev. Rev. Stat. § 239.0107",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Nev. Rev. Stat. § 171.123",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2016",
      penalties: "Recreational possession legal with limits. Exceeding limits: Gross misdemeanor with fines up to $600-$1,000"
    },
    caseLaw: [
      {
        name: "Nevada v. United States",
        year: 1976,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "429 U.S. 175"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "New Hampshire": {
    name: "New Hampshire",
    publicRecords: {
      statute: "N.H. Rev. Stat. Ann. § 91-A:4",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "N.H. Rev. Stat. Ann. § 594:2",
      requiresID: "Name only",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2013",
      medicalOnlyInfo: "Apply through New Hampshire Department of Health and Human Services. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and chronic pain.",
      penalties: "Possession without card: Misdemeanor, up to 1 year in jail and $2,000 fine"
    },
    caseLaw: [
      {
        name: "New Hampshire v. Lydon",
        year: 1988,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "486 U.S. 461"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "New Jersey": {
    name: "New Jersey",
    publicRecords: {
      statute: "N.J.S.A. 47:1A-5",
      timeframe: "7 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2020",
      penalties: "Recreational possession legal with limits. Exceeding limits: Disorderly persons offense with fines up to $1,000"
    },
    caseLaw: [
      {
        name: "New Jersey v. T.L.O.",
        year: 1985,
        description: "Fourth Amendment protections for searches in schools",
        significance: "Established precedent for search limitations",
        citation: "469 U.S. 325"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "New Mexico": {
    name: "New Mexico",
    publicRecords: {
      statute: "NMSA § 14-2-8",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "NMSA § 30-22-3",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "2 oz",
      enacted: "2021",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $25-$100"
    },
    caseLaw: [
      {
        name: "New Mexico v. Miera",
        year: 1985,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "448 U.S. 791"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "New York": {
    name: "New York",
    publicRecords: {
      statute: "N.Y. Pub. Off. Law § 89",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "3 oz",
      enacted: "2021",
      penalties: "Recreational possession legal with limits. Exceeding limits: Violation with fines up to $100-$200"
    },
    caseLaw: [
      {
        name: "New York v. Quarles",
        year: 1984,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "467 U.S. 649"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "North Carolina": {
    name: "North Carolina",
    publicRecords: {
      statute: "N.C.G.S. § 132-6",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Class 1 misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "North Carolina v. Alford",
        year: 1970,
        description: "Fifth Amendment protections for plea bargaining",
        significance: "Established precedent for plea bargain limitations",
        citation: "400 U.S. 25"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "North Dakota": {
    name: "North Dakota",
    publicRecords: {
      statute: "N.D.C.C. § 44-04-18",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: true,
      statute: "N.D.C.C. § 29-29-21",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2016",
      medicalOnlyInfo: "Apply through North Dakota Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and chronic pain.",
      penalties: "Possession without card: Misdemeanor, up to 30 days in jail and $1,000 fine"
    },
    caseLaw: [
      {
        name: "North Dakota v. United States",
        year: 1980,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "444 U.S. 511"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Ohio": {
    name: "Ohio",
    publicRecords: {
      statute: "Ohio Rev. Code § 149.43",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Ohio Rev. Code § 2921.29",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "2.5 oz",
      enacted: "2023",
      penalties: "Recreational possession legal with limits. Exceeding limits: Misdemeanor with fines up to $150-$250"
    },
    caseLaw: [
      {
        name: "Ohio v. Robinette",
        year: 1996,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "519 U.S. 33"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Oklahoma": {
    name: "Oklahoma",
    publicRecords: {
      statute: "51 Okla. Stat. § 24A.5",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2018",
      medicalOnlyInfo: "Apply through Oklahoma State Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 1 year in jail and $1,000 fine"
    },
    caseLaw: [
      {
        name: "Oklahoma v. United States",
        year: 1991,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "508 U.S. 215"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Oregon": {
    name: "Oregon",
    publicRecords: {
      statute: "ORS § 192.329",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2014",
      penalties: "Recreational possession legal with limits. Exceeding limits: Violation with fines up to $100-$1,000"
    },
    caseLaw: [
      {
        name: "Oregon v. Ice",
        year: 2008,
        description: "Eighth Amendment protections for sentencing",
        significance: "Established precedent for sentencing limitations",
        citation: "555 U.S. 160"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Pennsylvania": {
    name: "Pennsylvania",
    publicRecords: {
      statute: "65 P.S. § 67.901",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2016",
      medicalOnlyInfo: "Apply through Pennsylvania Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 30 days in jail and $500 fine"
    },
    caseLaw: [
      {
        name: "Pennsylvania v. Mimms",
        year: 1977,
        description: "Fourth Amendment protections for traffic stops",
        significance: "Established precedent for search limitations",
        citation: "434 U.S. 106"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "Rhode Island": {
    name: "Rhode Island",
    publicRecords: {
      statute: "R.I. Gen. Laws § 38-2-3",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "R.I. Gen. Laws § 12-7-1",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2022",
      penalties: "Recreational possession legal with limits. Exceeding limits: Civil violation with fines up to $150-$500"
    },
    caseLaw: [
      {
        name: "Rhode Island v. Innis",
        year: 1980,
        description: "Fifth Amendment protections for interrogations",
        significance: "Established precedent for Miranda limitations",
        citation: "446 U.S. 291"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "South Carolina": {
    name: "South Carolina",
    publicRecords: {
      statute: "S.C. Code Ann. § 30-4-30",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "South Carolina v. Gaskins",
        year: 1989,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "490 U.S. 77"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "South Dakota": {
    name: "South Dakota",
    publicRecords: {
      statute: "SDCL § 1-27-1",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2020",
      medicalOnlyInfo: "Apply through South Dakota Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 1 year in jail and $2,000 fine"
    },
    caseLaw: [
      {
        name: "South Dakota v. Opperman",
        year: 1976,
        description: "Fourth Amendment protections for vehicle searches",
        significance: "Established precedent for search limitations",
        citation: "428 U.S. 364"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Tennessee": {
    name: "Tennessee",
    publicRecords: {
      statute: "Tenn. Code Ann. § 10-7-503",
      timeframe: "7 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Tennessee v. Garner",
        year: 1985,
        description: "Fourth Amendment protections for use of deadly force",
        significance: "Established precedent for police use of force limitations",
        citation: "471 U.S. 1"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Texas": {
    name: "Texas",
    publicRecords: {
      statute: "Tex. Gov't Code § 552.221",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Tex. Penal Code § 38.02",
      requiresID: "Name and address",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: State jail felony for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Texas v. Johnson",
        year: 1989,
        description: "First Amendment protections for flag burning",
        significance: "Established precedent for symbolic speech protections",
        citation: "491 U.S. 397"
      },
      {
        name: "Terry v. Ohio",
        year: 1968,
        description: "Fourth Amendment protections for stop and frisk",
        significance: "Established precedent for Terry stops",
        citation: "392 U.S. 1"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Utah": {
    name: "Utah",
    publicRecords: {
      statute: "Utah Code § 63G-2-204",
      timeframe: "10 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Utah Code § 77-7-15",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2018",
      medicalOnlyInfo: "Apply through Utah Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Class B misdemeanor, up to 6 months in jail and $1,000 fine"
    },
    caseLaw: [
      {
        name: "Utah v. Strieff",
        year: 2016,
        description: "Fourth Amendment protections for evidence admissibility",
        significance: "Established precedent for attenuation doctrine",
        citation: "579 U.S. ___"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Vermont": {
    name: "Vermont",
    publicRecords: {
      statute: "1 V.S.A. § 318",
      timeframe: "3 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: true,
      statute: "13 V.S.A. § 5511",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2018",
      penalties: "Recreational possession legal with limits. Exceeding limits: Civil penalty up to $500-$1,000"
    },
    caseLaw: [
      {
        name: "Vermont v. Brillon",
        year: 2009,
        description: "Sixth Amendment protections for speedy trial",
        significance: "Established precedent for speedy trial limitations",
        citation: "556 U.S. 81"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Virginia": {
    name: "Virginia",
    publicRecords: {
      statute: "Va. Code Ann. § 2.2-3704",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2017",
      medicalOnlyInfo: "Apply through Virginia Department of Health. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Class 1 misdemeanor, up to 1 year in jail and $2,500 fine"
    },
    caseLaw: [
      {
        name: "Virginia v. Moore",
        year: 2008,
        description: "Fourth Amendment protections for arrests",
        significance: "Established precedent for arrest limitations",
        citation: "553 U.S. 164"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Washington": {
    name: "Washington",
    publicRecords: {
      statute: "RCW § 42.56.520",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "All-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "1 oz",
      enacted: "2012",
      penalties: "Recreational possession legal with limits. Exceeding limits: Civil penalty up to $25-$500"
    },
    caseLaw: [
      {
        name: "Washington v. Chrisman",
        year: 1982,
        description: "Fourth Amendment protections for searches",
        significance: "Established precedent for search limitations",
        citation: "455 U.S. 171"
      }
    ],
    recordingLaws: {
      onePartyConsent: false,
      allPartyConsent: true,
      videoLegal: true,
      audioLegal: false,
      exceptions: ["All parties must consent to audio recording"]
    }
  },
  "West Virginia": {
    name: "West Virginia",
    publicRecords: {
      statute: "W. Va. Code § 29B-1-3",
      timeframe: "5 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Medical only",
      possession: "Medical card required",
      enacted: "2017",
      medicalOnlyInfo: "Apply through West Virginia Department of Health and Human Resources. Qualifying conditions include cancer, glaucoma, HIV/AIDS, and PTSD.",
      penalties: "Possession without card: Misdemeanor, up to 6 months in jail and $1,000 fine"
    },
    caseLaw: [
      {
        name: "West Virginia v. EPA",
        year: 2022,
        description: "Constitutional protections for state sovereignty",
        significance: "Established precedent for state authority limitations",
        citation: "595 U.S. ___"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Wisconsin": {
    name: "Wisconsin",
    publicRecords: {
      statute: "Wis. Stat. § 19.35",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: true,
      statute: "Wis. Stat. § 968.24",
      requiresID: "Name only",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Class A misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Wisconsin v. Yoder",
        year: 1972,
        description: "First Amendment protections for religious freedom",
        significance: "Established precedent for religious liberty protections",
        citation: "406 U.S. 205"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "Wyoming": {
    name: "Wyoming",
    publicRecords: {
      statute: "Wyo. Stat. § 16-4-203",
      timeframe: "Reasonable time",
      type: "reasonable"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Illegal",
      possession: "Prohibited",
      enacted: "N/A",
      penalties: "Possession: Misdemeanor for small amounts, felony for larger quantities"
    },
    caseLaw: [
      {
        name: "Wyoming v. Houghton",
        year: 1999,
        description: "Fourth Amendment protections for vehicle searches",
        significance: "Established precedent for search limitations",
        citation: "526 U.S. 295"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  },
  "District of Columbia": {
    name: "District of Columbia",
    publicRecords: {
      statute: "D.C. Code § 2-532",
      timeframe: "15 business days",
      type: "business"
    },
    stopAndID: {
      hasStopID: false,
      statute: "None",
      requiresID: "No requirement",
      recordingConsent: "One-party"
    },
    cannabis: {
      status: "Recreational",
      possession: "2 oz",
      enacted: "2014",
      penalties: "Recreational possession legal with limits. Exceeding limits: Civil fine up to $25-$500"
    },
    caseLaw: [
      {
        name: "District of Columbia v. Heller",
        year: 2008,
        description: "Second Amendment protections for individual gun ownership",
        significance: "Established precedent for individual rights protections",
        citation: "554 U.S. 570"
      }
    ],
    recordingLaws: {
      onePartyConsent: true,
      allPartyConsent: false,
      videoLegal: true,
      audioLegal: true,
      exceptions: ["Confidential communications", "Private conversations"]
    }
  }
};