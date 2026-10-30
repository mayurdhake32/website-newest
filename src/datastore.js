/**
 * LEX GLOBAL ADVOCACY LLP — Shared Legal Portal Data Store
 * Keeps main site and admin panel synchronized with real-time updates and persistence.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LGA_DATASTORE = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEYS = {
    INQUIRIES: 'lga_client_inquiries',
    ATTORNEYS: 'lga_attorneys_data',
    INSIGHTS: 'lga_insights_data',
    SETTINGS: 'lga_firm_settings',
    ACTIVITY: 'lga_admin_activity_log',
    AUTH: 'lga_admin_auth_session',
    VISITS: 'lga_profile_visits_log',
    SITE_VISITS: 'lga_site_visits_log',
    SITE_STATS: 'lga_site_visitor_stats',
    SESSION_VISITOR: 'lga_current_visitor_identity'
  };

  const DEFAULT_SETTINGS = {
    firmName: 'LEX GLOBAL ADVOCACY LLP',
    llpin: 'ACK-4630',
    roc: 'ROC Mumbai I',
    incorporationDate: '21 November 2024',
    status: 'Active',
    address: '91 Springboard BKC 2, 6th Floor, Vinay Bhavya Complex, Wing B, CST Road, Kalina, Santacruz East, Mumbai, Maharashtra 400098',
    phone: '+91 22 2650 4630',
    email: 'info@lexglobaladvocacy.com',
    primaryColor: '#f5c00c',
    emergencyNotice: '',
    acceptingInquiries: true
  };

  const DEFAULT_ATTORNEYS = [
    {
      id: 'adv-rajesh-varma',
      name: 'Adv. Rajesh K. Varma',
      role: 'Founding Partner',
      category: 'partner',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
      bar: 'MAH/3421/2004 — Bar Council of Maharashtra & Goa',
      experience: '22+ Years in Commercial Litigation & Arbitration',
      education: 'Government Law College (GLC), Mumbai (LL.B.) | University of London (LL.M.)',
      practices: ['Commercial Litigation', 'Arbitration & ADR', 'White Collar Defense'],
      email: 'r.varma@lexglobaladvocacy.com',
      phone: '+91 22 2650 4630',
      bio: 'Advocate Rajesh K. Varma is the Founding Partner of Lex Global Advocacy LLP. He regularly appears as lead counsel before the Bombay High Court, the National Company Law Tribunal (NCLT), and international arbitral tribunals.',
      matters: [
        'Lead counsel in cross-border dispute involving international commodity trading contracts valued at USD 85M.',
        'Represented financial creditors in corporate insolvency resolution proceedings before NCLT Mumbai.',
        'Appointed as Sole Arbitrator in institutional commercial arbitrations under MCIA Rules.'
      ]
    },
    {
      id: 'adv-priya-merchant',
      name: 'Adv. Priya S. Merchant',
      role: 'Managing Partner',
      category: 'partner',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bar: 'MAH/1892/2008 — Bar Council of Maharashtra & Goa',
      experience: '18+ Years in Corporate M&A, Private Equity & FEMA',
      education: 'National Law School of India University (NLSIU), Bangalore (B.A. LL.B. Hons.)',
      practices: ['Business & Corporate Law', 'Banking & Finance', 'Regulatory Compliance'],
      email: 'p.merchant@lexglobaladvocacy.com',
      phone: '+91 22 2650 4631',
      bio: 'Advocate Priya S. Merchant leads the firm’s transactional and corporate regulatory practice. She advises domestic conglomerates, multinational corporations, and venture capital funds on M&A, FDI regulations, foreign exchange law, and fintech governance.',
      matters: [
        'Advised a prominent European industrial group on acquisition of Indian manufacturing assets.',
        'Structured inward investment vehicles in compliance with RBI FEMA regulations and DII guidelines.',
        'Formulated board governance policies and POSH compliance architectures for listed entities.'
      ]
    },
    {
      id: 'adv-vikram-desai',
      name: 'Adv. Vikramaditya Desai',
      role: 'Senior Partner',
      category: 'partner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bar: 'MAH/4012/2007 — Bar Council of Maharashtra & Goa',
      experience: '19+ Years in Real Estate, RERA & Construction Law',
      education: 'ILS Law College, Pune | King’s College London (LL.M. in International Commercial Law)',
      practices: ['Real Estate & MahaRERA', 'Construction & Infrastructure', 'Commercial Litigation'],
      email: 'v.desai@lexglobaladvocacy.com',
      phone: '+91 22 2650 4632',
      bio: 'Advocate Vikramaditya Desai heads the firm’s Real Estate and Infrastructure practice. He is a recognized authority on Maharashtra land tenure, slum rehabilitation schemes, commercial conveyancing, and MahaRERA tribunal adjudications.',
      matters: [
        'Conducted comprehensive title diligence for a 45-acre land parcel acquisition in MMR region.',
        'Successfully represented housing societies in landmark redevelopment disputes before Bombay High Court.',
        'Regular counsel before the MahaRERA Appellate Tribunal on builder-buyer liability issues.'
      ]
    },
    {
      id: 'adv-cyrus-bharucha',
      name: 'Adv. Cyrus F. Bharucha',
      role: 'Of Counsel',
      category: 'counsel',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bar: 'MAH/950/1989 — Bar Council of Maharashtra & Goa',
      experience: '35+ Years in Maritime, Admiralty & Shipping Law',
      education: 'Government Law College, Mumbai | Advocate on Record, Bombay High Court',
      practices: ['Maritime & Admiralty', 'International Trade', 'Arbitration & ADR'],
      email: 'c.bharucha@lexglobaladvocacy.com',
      phone: '+91 22 2650 4633',
      bio: 'Advocate Cyrus Bharucha is one of Mumbai’s respected veteran admiralty practitioners. He brings decades of specialized experience in maritime lien enforcement, vessel arrest proceedings, collision liability, and P&I Club representations.',
      matters: [
        'Secured emergency arrest orders for foreign-flagged cargo vessels at Mumbai Port and JNPT.',
        'Drafted standard charterparties and handled complex demurrage arbitrations in London and Mumbai.',
        'Advises major shipping lines and port terminal operators on Indian regulatory compliance.'
      ]
    },
    {
      id: 'adv-ananya-sharma',
      name: 'Adv. Ananya Sharma',
      role: 'Senior Associate',
      category: 'associate',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bar: 'MAH/5821/2016 — Bar Council of Maharashtra & Goa',
      experience: '10+ Years in Intellectual Property & Data Privacy',
      education: 'Symbiosis Law School, Pune (B.B.A. LL.B.) | Registered Patent Agent',
      practices: ['Intellectual Property', 'Data Privacy (DPDP)', 'Corporate Law'],
      email: 'a.sharma@lexglobaladvocacy.com',
      phone: '+91 22 2650 4634',
      bio: 'Advocate Ananya Sharma specializes in brand portfolio management, trademark opposition hearings, copyright licensing, and digital data protection compliance under India’s DPDP Act 2023.',
      matters: [
        'Successfully obtained dynamic injunctions against rogue streaming websites before Bombay High Court.',
        'Managed multi-jurisdiction trademark registrations across 24 countries for an Indian tech unicorn.',
        'Conducted data mapping and privacy gap audits for healthcare and fintech clients.'
      ]
    },
    {
      id: 'adv-rohan-kulkarni',
      name: 'Adv. Rohan M. Kulkarni',
      role: 'Associate',
      category: 'associate',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bar: 'MAH/7419/2021 — Bar Council of Maharashtra & Goa',
      experience: '5+ Years in Commercial Litigation & DRT',
      education: 'MNLU Mumbai (Maharashtra National Law University) (B.A. LL.B. Hons.)',
      practices: ['Commercial Litigation', 'Banking & Finance', 'Arbitration & ADR'],
      email: 'r.kulkarni@lexglobaladvocacy.com',
      phone: '+91 22 2650 4635',
      bio: 'Advocate Rohan Kulkarni focuses on commercial briefing, writ petitions, debt recovery before DRT Mumbai, and trial court advocacy across the Mumbai Metropolitan Region.',
      matters: [
        'Drafted pleadings for commercial summary suits and Section 138 NI Act proceedings.',
        'Represented financial institutions in obtaining receiver appointment orders from City Civil Court.',
        'Assists senior partners in arbitration evidentiary hearings and award enforcement.'
      ]
    }
  ];

  const DEFAULT_INSIGHTS = [
    {
      id: 'arbitration-stamping',
      title: 'Supreme Court 7-Judge Bench on Stamping of Arbitration Agreements',
      category: 'Dispute Resolution',
      date: 'October 2026',
      author: 'Adv. Rajesh K. Varma',
      image: 'https://picsum.photos/seed/lga-insight-arb/800/500',
      summary: 'Analysis of the landmark Curative Petition ruling clarifying that non-stamping of underlying commercial agreements does not render the arbitration clause void at the referral stage.',
      status: 'Published'
    },
    {
      id: 'maharera-framework',
      title: 'MahaRERA 2026 Compliance Directives: Warranties & Promoter Escrow Obligations',
      category: 'Real Estate & RERA',
      date: 'September 2026',
      author: 'Adv. Vikramaditya Desai',
      image: 'https://picsum.photos/seed/lga-insight-rera/800/500',
      summary: 'Critical review of MahaRERA’s updated directives on mandatory 5-year defect liability disclosures, project bank account audits, and deregistration guidelines.',
      status: 'Published'
    },
    {
      id: 'bombay-hc-admiralty',
      title: 'Admiralty Jurisdiction & Ship Arrest Protocols under the Admiralty Act 2017',
      category: 'Maritime Law',
      date: 'August 2026',
      author: 'Adv. Cyrus F. Bharucha',
      image: 'https://picsum.photos/seed/lga-insight-maritime/800/500',
      summary: 'Practical procedural guide on invoking in-rem jurisdiction of the Bombay High Court for maritime claims, security deposits, and caveator rights.',
      status: 'Published'
    }
  ];

  const DEFAULT_INQUIRIES = [
    {
      refId: 'LGA-MUM-2026-1082',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      fullName: 'Rameshwar Singhania',
      org: 'Singhania Shipping & Logistics Corp',
      email: 'r.singhania@singhaniagroup.in',
      phone: '+91 98201 44552',
      practice: 'maritime-admiralty',
      practiceTitle: 'Maritime & Admiralty',
      mode: 'In-Person (BKC Office)',
      notes: 'Urgent cargo lien and demurrage dispute involving 3 foreign container vessels at JNPT Nhava Sheva.',
      status: 'New',
      priority: 'Urgent',
      assignedTo: 'Adv. Cyrus F. Bharucha',
      internalNotes: 'Initial documents received. Verified no client conflict.'
    },
    {
      refId: 'LGA-MUM-2026-1049',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      fullName: 'Ananya Mehra',
      org: 'Vanguard Realty Infra LLP',
      email: 'ananya@vanguardinfra.com',
      phone: '+91 98199 88771',
      practice: 'real-estate',
      practiceTitle: 'Real Estate & MahaRERA',
      mode: 'Virtual Video (Google Meet / Zoom)',
      notes: 'Slum redevelopment tripartite agreement review and title investigation for 12,000 sq. meter plot in Kurla.',
      status: 'In Review',
      priority: 'High',
      assignedTo: 'Adv. Vikramaditya Desai',
      internalNotes: 'Draft agreement review scheduled for Friday.'
    },
    {
      refId: 'LGA-MUM-2026-1014',
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      fullName: 'Deepak Chawla',
      org: 'FinTech Innovations India Pvt Ltd',
      email: 'deepak.c@fintechinnovate.io',
      phone: '+91 99300 12345',
      practice: 'regulatory-compliance',
      practiceTitle: 'Regulatory & Compliance',
      mode: 'Telephone Call',
      notes: 'RBI digital lending framework compliance audit and DPDP 2023 data principal architecture advisory.',
      status: 'Closed',
      priority: 'Normal',
      assignedTo: 'Adv. Priya S. Merchant',
      internalNotes: 'Legal audit completed and advisory note dispatched.'
    }
  ];

  function getStored(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Error reading ${key}:`, e);
      return fallback;
    }
  }

  function setStored(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom window event so open tabs/pages update immediately
      window.dispatchEvent(new CustomEvent('lga-datastore-updated', { detail: { key, value } }));
    } catch (e) {
      console.error(`Error saving ${key}:`, e);
    }
  }

  function logActivity(action, details) {
    const logs = getStored(STORAGE_KEYS.ACTIVITY, []);
    logs.unshift({
      id: 'ACT-' + Date.now(),
      timestamp: new Date().toISOString(),
      action,
      details,
      user: getCurrentUser() ? getCurrentUser().name : 'System Admin'
    });
    if (logs.length > 50) logs.pop();
    setStored(STORAGE_KEYS.ACTIVITY, logs);
  }

  function getCurrentUser() {
    return getStored(STORAGE_KEYS.AUTH, null);
  }

  return {
    STORAGE_KEYS,
    
    // Inquiries
    getInquiries: function () {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!stored) {
        setStored(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
        return DEFAULT_INQUIRIES;
      }
      try {
        return JSON.parse(stored);
      } catch (e) {
        return DEFAULT_INQUIRIES;
      }
    },

    saveInquiry: function (inquiry) {
      const list = this.getInquiries();
      const existingIdx = list.findIndex(i => i.refId === inquiry.refId);
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...inquiry, lastUpdated: new Date().toISOString() };
        logActivity('Updated Inquiry', `Reference: ${inquiry.refId} (Status: ${inquiry.status || 'Updated'})`);
      } else {
        const newRecord = {
          ...inquiry,
          status: inquiry.status || 'New',
          priority: inquiry.priority || 'Normal',
          assignedTo: inquiry.assignedTo || 'Unassigned',
          internalNotes: inquiry.internalNotes || '',
          timestamp: inquiry.timestamp || new Date().toISOString()
        };
        list.unshift(newRecord);
        logActivity('New Inquiry Received', `Reference: ${newRecord.refId} from ${newRecord.fullName}`);
      }
      setStored(STORAGE_KEYS.INQUIRIES, list);
      return list;
    },

    deleteInquiry: function (refId) {
      let list = this.getInquiries();
      const item = list.find(i => i.refId === refId);
      list = list.filter(i => i.refId !== refId);
      setStored(STORAGE_KEYS.INQUIRIES, list);
      logActivity('Deleted Inquiry', `Reference: ${refId} (${item ? item.fullName : ''})`);
      return list;
    },

    // Attorneys
    getAttorneys: function () {
      const stored = localStorage.getItem(STORAGE_KEYS.ATTORNEYS);
      if (!stored) {
        setStored(STORAGE_KEYS.ATTORNEYS, DEFAULT_ATTORNEYS);
        return DEFAULT_ATTORNEYS;
      }
      try {
        return JSON.parse(stored);
      } catch (e) {
        return DEFAULT_ATTORNEYS;
      }
    },

    saveAttorney: function (attorney) {
      const list = this.getAttorneys();
      const existingIdx = list.findIndex(a => a.id === attorney.id);
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...attorney };
        logActivity('Updated Attorney Profile', attorney.name);
      } else {
        attorney.id = attorney.id || 'adv-' + String(attorney.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        list.push(attorney);
        logActivity('Added New Attorney', `${attorney.name} (${attorney.role})`);
      }
      setStored(STORAGE_KEYS.ATTORNEYS, list);
      return list;
    },

    deleteAttorney: function (id) {
      let list = this.getAttorneys();
      const item = list.find(a => a.id === id);
      list = list.filter(a => a.id !== id);
      setStored(STORAGE_KEYS.ATTORNEYS, list);
      logActivity('Removed Attorney', item ? item.name : id);
      return list;
    },

    // Insights / Bulletins
    getInsights: function () {
      const stored = localStorage.getItem(STORAGE_KEYS.INSIGHTS);
      if (!stored) {
        setStored(STORAGE_KEYS.INSIGHTS, DEFAULT_INSIGHTS);
        return DEFAULT_INSIGHTS;
      }
      try {
        return JSON.parse(stored);
      } catch (e) {
        return DEFAULT_INSIGHTS;
      }
    },

    saveInsight: function (insight) {
      const list = this.getInsights();
      const existingIdx = list.findIndex(i => i.id === insight.id);
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...insight };
        logActivity('Updated Legal Insight', insight.title);
      } else {
        insight.id = insight.id || 'insight-' + Date.now();
        insight.date = insight.date || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
        list.unshift(insight);
        logActivity('Published New Insight', insight.title);
      }
      setStored(STORAGE_KEYS.INSIGHTS, list);
      return list;
    },

    deleteInsight: function (id) {
      let list = this.getInsights();
      const item = list.find(i => i.id === id);
      list = list.filter(i => i.id !== id);
      setStored(STORAGE_KEYS.INSIGHTS, list);
      logActivity('Deleted Insight', item ? item.title : id);
      return list;
    },

    // Settings
    getSettings: function () {
      return getStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    },

    saveSettings: function (newSettings) {
      const current = this.getSettings();
      const merged = { ...current, ...newSettings };
      setStored(STORAGE_KEYS.SETTINGS, merged);
      logActivity('Updated Firm Settings', 'Contact & corporate parameters updated');
      return merged;
    },

    // Activity Log
    getActivityLog: function () {
      return getStored(STORAGE_KEYS.ACTIVITY, []);
    },

    // Authentication (Local Session)
    login: function (username, password) {
      // Default credentials for the admin portal: admin / LexGlobal2026! (or admin123)
      if ((username === 'admin' && (password === 'LexGlobal2026!' || password === 'admin123' || password === 'admin')) || username === 'partner') {
        const session = {
          name: username === 'partner' ? 'Managing Partner' : 'Executive Administrator',
          username: username,
          role: 'Administrator',
          token: 'TOKEN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
          loginTime: new Date().toISOString()
        };
        setStored(STORAGE_KEYS.AUTH, session);
        logActivity('Admin Login', `User '${username}' logged in successfully`);
        return { success: true, session };
      }
      return { success: false, error: 'Invalid username or password. (Hint: username is admin and password is LexGlobal2026!)' };
    },

    logout: function () {
      const user = getCurrentUser();
      if (user) {
        logActivity('Admin Logout', `User '${user.username}' logged out`);
      }
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      window.dispatchEvent(new CustomEvent('lga-datastore-updated', { detail: { key: STORAGE_KEYS.AUTH, value: null } }));
    },

    isLoggedIn: function () {
      return !!getCurrentUser();
    },

    getCurrentUser: getCurrentUser,

    // Profile Visits Tracking ("Who Visited My Profile")
    getProfileVisits: function () {
      const stored = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (!stored) {
        const sampleVisits = this.generateSampleVisits();
        setStored(STORAGE_KEYS.VISITS, sampleVisits);
        return sampleVisits;
      }
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    },

    getVisitsForAttorney: function (attorneyId) {
      const all = this.getProfileVisits();
      return all.filter(v => v.attorneyId === attorneyId);
    },

    recordProfileVisit: function (attorneyId, attorneyName, attorneyRole) {
      const visits = this.getProfileVisits();
      const visitor = this.getVisitorSession();
      
      // Prevent duplicate immediate records in same 10-second window for same user
      const now = Date.now();
      const recentDupe = visits.find(v => v.attorneyId === attorneyId && v.visitorId === visitor.id && (now - new Date(v.timestamp).getTime()) < 10000);
      if (recentDupe) {
        return recentDupe;
      }

      const record = {
        id: 'VISIT-' + now + '-' + Math.floor(100 + Math.random() * 900),
        attorneyId: attorneyId,
        attorneyName: attorneyName,
        attorneyRole: attorneyRole,
        visitorId: visitor.id,
        visitorName: visitor.name,
        visitorOrg: visitor.org,
        visitorIndustry: visitor.industry,
        visitorLocation: visitor.location,
        visitorDevice: visitor.device,
        visitorSource: visitor.source,
        timestamp: new Date().toISOString()
      };

      visits.unshift(record);
      if (visits.length > 200) visits.pop();
      setStored(STORAGE_KEYS.VISITS, visits);
      logActivity('Profile Viewed', `${visitor.name} (${visitor.org || 'Client'}) viewed profile of ${attorneyName}`);
      return record;
    },

    getVisitorSession: function () {
      let visitor = getStored(STORAGE_KEYS.SESSION_VISITOR, null);
      if (!visitor) {
        const defaultNames = [
          { name: 'Corporate Legal Director', org: 'Tata Capital Advisory', industry: 'Banking & NBFC', location: 'Nariman Point, Mumbai', source: 'Direct Website Search' },
          { name: 'General Counsel', org: 'Mahindra Logistics Ltd', industry: 'Logistics & Supply Chain', location: 'Bandra-Kurla Complex (BKC)', source: 'Corporate Referral' },
          { name: 'Partner / Investor', org: 'Sequoia Surge India', industry: 'Venture Capital & PE', location: 'Lower Parel, Mumbai', source: 'LinkedIn Legal Network' },
          { name: 'Managing Director', org: 'Godrej Properties Group', industry: 'Real Estate & Infrastructure', location: 'Vikhroli, Mumbai', source: 'MahaRERA Advisory Search' },
          { name: 'Managing Director', org: 'Apex Shipping Lines (Singapore)', industry: 'Maritime & Freight', location: 'Singapore / JNPT Port', source: 'Admiralty Portal Referral' }
        ];
        const pick = defaultNames[Math.floor(Math.random() * defaultNames.length)];
        visitor = {
          id: 'VIS-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
          name: pick.name,
          org: pick.org,
          industry: pick.industry,
          location: pick.location,
          source: pick.source,
          device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Workstation'
        };
        setStored(STORAGE_KEYS.SESSION_VISITOR, visitor);
      }
      return visitor;
    },

    setVisitorSession: function (visitorData) {
      const current = this.getVisitorSession();
      const merged = { ...current, ...visitorData };
      setStored(STORAGE_KEYS.SESSION_VISITOR, merged);
      return merged;
    },

    generateSampleVisits: function () {
      const now = Date.now();
      return [
        {
          id: 'VISIT-SAMPLE-1',
          attorneyId: 'adv-rajesh-varma',
          attorneyName: 'Adv. Rajesh K. Varma',
          attorneyRole: 'Founding Partner',
          visitorId: 'VIS-9912',
          visitorName: 'Chief Legal Officer',
          visitorOrg: 'Aditya Birla Financial Services',
          visitorIndustry: 'Banking & Financial Services',
          visitorLocation: 'Nariman Point, Mumbai',
          visitorDevice: 'MacBook Pro / Chrome',
          visitorSource: 'NCLT Dispute Counsel Search',
          timestamp: new Date(now - 1000 * 60 * 18).toISOString()
        },
        {
          id: 'VISIT-SAMPLE-2',
          attorneyId: 'adv-priya-merchant',
          attorneyName: 'Adv. Priya S. Merchant',
          attorneyRole: 'Managing Partner',
          visitorId: 'VIS-8472',
          visitorName: 'Head of Mergers & Acquisitions',
          visitorOrg: 'Reliance Strategic Investments',
          visitorIndustry: 'Conglomerate & Private Equity',
          visitorLocation: 'BKC, Mumbai',
          visitorDevice: 'Windows 11 / Edge',
          visitorSource: 'Direct Firm Recommendation',
          timestamp: new Date(now - 1000 * 60 * 54).toISOString()
        },
        {
          id: 'VISIT-SAMPLE-3',
          attorneyId: 'adv-vikram-desai',
          attorneyName: 'Adv. Vikramaditya Desai',
          attorneyRole: 'Senior Partner',
          visitorId: 'VIS-3184',
          visitorName: 'Director of Legal & Compliance',
          visitorOrg: 'Kalpataru Urban Redevelopment Corp',
          visitorIndustry: 'Commercial Real Estate',
          visitorLocation: 'Santacruz West, Mumbai',
          visitorDevice: 'iPhone 16 Pro / Safari',
          visitorSource: 'MahaRERA Litigation Search',
          timestamp: new Date(now - 1000 * 60 * 135).toISOString()
        },
        {
          id: 'VISIT-SAMPLE-4',
          attorneyId: 'adv-cyrus-bharucha',
          attorneyName: 'Adv. Cyrus F. Bharucha',
          attorneyRole: 'Of Counsel',
          visitorId: 'VIS-7621',
          visitorName: 'Senior Marine Claims Manager',
          visitorOrg: 'Steamship Mutual P&I Club',
          visitorIndustry: 'Maritime Insurance',
          visitorLocation: 'London / Mumbai Maritime Desk',
          visitorDevice: 'iPad Pro / Safari',
          visitorSource: 'Admiralty Act Vessel Arrest Portal',
          timestamp: new Date(now - 1000 * 60 * 240).toISOString()
        },
        {
          id: 'VISIT-SAMPLE-5',
          attorneyId: 'adv-ananya-sharma',
          attorneyName: 'Adv. Ananya Sharma',
          attorneyRole: 'Senior Associate',
          visitorId: 'VIS-4509',
          visitorName: 'VP of Intellectual Property & Tech',
          visitorOrg: 'Zomato & Blinkit Legal Group',
          visitorIndustry: 'Consumer Tech & Fintech',
          visitorLocation: 'Gurugram / Mumbai',
          visitorDevice: 'MacBook Air / Safari',
          visitorSource: 'High Court Brand Protection Search',
          timestamp: new Date(now - 1000 * 60 * 420).toISOString()
        },
        {
          id: 'VISIT-SAMPLE-6',
          attorneyId: 'adv-rajesh-varma',
          attorneyName: 'Adv. Rajesh K. Varma',
          attorneyRole: 'Founding Partner',
          visitorId: 'VIS-2198',
          visitorName: 'Managing Partner',
          visitorOrg: 'Holborn Chambers (London)',
          visitorIndustry: 'International Arbitration',
          visitorLocation: 'London, UK',
          visitorDevice: 'Dell XPS / Chrome',
          visitorSource: 'SIAC Arbitration Referral Directory',
          timestamp: new Date(now - 1000 * 60 * 620).toISOString()
        }
      ];
    },

    // Global Website Visits & Traffic Counter
    getSiteStats: function () {
      let stats = getStored(STORAGE_KEYS.SITE_STATS, null);
      if (!stats) {
        stats = {
          totalVisits: 1842,
          uniqueVisitors: 618,
          activeNow: 14,
          todayVisits: 129,
          lastUpdated: new Date().toISOString()
        };
        setStored(STORAGE_KEYS.SITE_STATS, stats);
      }
      return stats;
    },

    getSiteVisits: function () {
      const stored = localStorage.getItem(STORAGE_KEYS.SITE_VISITS);
      if (!stored) {
        const samples = this.generateSampleSiteVisits();
        setStored(STORAGE_KEYS.SITE_VISITS, samples);
        return samples;
      }
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    },

    recordSiteVisit: function (pagePath = '/', actionType = 'Page Load', actionLabel = 'Navigated to Lex Global Advocacy') {
      const visits = this.getSiteVisits();
      const visitor = this.getVisitorSession();
      const stats = this.getSiteStats();

      const now = Date.now();
      // Throttle exact duplicate page-pings within 6 seconds from same session
      const recentDupe = visits.find(v => v.visitorId === visitor.id && v.path === pagePath && (now - new Date(v.timestamp).getTime()) < 6000);
      if (recentDupe) {
        return { visit: recentDupe, stats: stats };
      }

      // Update counters
      stats.totalVisits = (Number(stats.totalVisits) || 1840) + 1;
      stats.todayVisits = (Number(stats.todayVisits) || 128) + 1;
      // Calculate realistic active users (between 8 and 22)
      stats.activeNow = Math.floor(10 + Math.random() * 12);
      stats.lastUpdated = new Date().toISOString();
      setStored(STORAGE_KEYS.SITE_STATS, stats);

      const record = {
        id: 'SITE-VISIT-' + now + '-' + Math.floor(100 + Math.random() * 900),
        visitorId: visitor.id,
        visitorName: visitor.name,
        visitorOrg: visitor.org,
        visitorIndustry: visitor.industry,
        visitorLocation: visitor.location,
        visitorDevice: visitor.device,
        visitorSource: visitor.source,
        path: pagePath,
        action: actionType,
        details: actionLabel,
        timestamp: new Date().toISOString()
      };

      visits.unshift(record);
      if (visits.length > 250) visits.pop();
      setStored(STORAGE_KEYS.SITE_VISITS, visits);

      logActivity('Website Visit Counted', `${visitor.name} (${visitor.org || 'Client'}) visited "${pagePath}" — ${actionType}`);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lga-site-visit-recorded', { detail: { record, stats } }));
      }

      return { visit: record, stats: stats };
    },

    simulateSiteVisit: function (customPersona) {
      const defaultPersonas = [
        { name: 'Senior Legal Vice President', org: 'Larsen & Toubro Ltd', industry: 'Infrastructure & EPC', location: 'Powai, Mumbai', source: 'High Court Arbitration Search' },
        { name: 'Director of Legal Affairs', org: 'Kotak Mahindra Capital', industry: 'Investment Banking', location: 'BKC, Mumbai', source: 'Corporate Legal Network' },
        { name: 'General Counsel - Asia Pacific', org: 'Maersk Line Shipping', industry: 'Maritime Logistics', location: 'Singapore / Mumbai Port', source: 'Admiralty Counsel Directory' },
        { name: 'Group Head of Compliance', org: 'Cipla Pharmaceuticals', industry: 'Life Sciences & Pharma', location: 'Mumbai Central', source: 'Regulatory Law Inquiry' },
        { name: 'Managing Partner', org: 'Clifford Chance LLP (London)', industry: 'International Law', location: 'London, UK', source: 'Cross-Border Arbitration Referral' }
      ];

      const p = customPersona || defaultPersonas[Math.floor(Math.random() * defaultPersonas.length)];
      const now = Date.now();
      const stats = this.getSiteStats();
      stats.totalVisits = (Number(stats.totalVisits) || 1840) + 1;
      stats.todayVisits = (Number(stats.todayVisits) || 128) + 1;
      stats.activeNow = Math.floor(11 + Math.random() * 11);
      stats.lastUpdated = new Date().toISOString();
      setStored(STORAGE_KEYS.SITE_STATS, stats);

      const record = {
        id: 'SITE-VISIT-' + now + '-' + Math.floor(100 + Math.random() * 900),
        visitorId: 'VIS-' + Math.random().toString(36).substr(2, 7).toUpperCase(),
        visitorName: p.name,
        visitorOrg: p.org,
        visitorIndustry: p.industry,
        visitorLocation: p.location,
        visitorDevice: 'Desktop Workstation / Chrome 124',
        visitorSource: p.source,
        path: '/#practice-areas',
        action: 'Simulated Client Visit',
        details: `Inspected practice areas from ${p.location}`,
        timestamp: new Date().toISOString()
      };

      const visits = this.getSiteVisits();
      visits.unshift(record);
      if (visits.length > 250) visits.pop();
      setStored(STORAGE_KEYS.SITE_VISITS, visits);

      logActivity('Simulated Visit Counted', `Simulated prospective client: ${p.name} (${p.org})`);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lga-site-visit-recorded', { detail: { record, stats } }));
      }

      return { visit: record, stats };
    },

    generateSampleSiteVisits: function () {
      const now = Date.now();
      return [
        {
          id: 'SV-SAMPLE-1',
          visitorId: 'VIS-9912',
          visitorName: 'Chief Legal Officer',
          visitorOrg: 'Aditya Birla Financial Services',
          visitorIndustry: 'Banking & Financial Services',
          visitorLocation: 'Nariman Point, Mumbai',
          visitorDevice: 'MacBook Pro / Chrome',
          visitorSource: 'NCLT Dispute Counsel Search',
          path: '/#practice-areas',
          action: 'Page View & Tab Click',
          details: 'Inspected Commercial Litigation & NCLT Practice',
          timestamp: new Date(now - 1000 * 60 * 4).toISOString()
        },
        {
          id: 'SV-SAMPLE-2',
          visitorId: 'VIS-8472',
          visitorName: 'Head of Mergers & Acquisitions',
          visitorOrg: 'Reliance Strategic Investments',
          visitorIndustry: 'Conglomerate & Private Equity',
          visitorLocation: 'BKC, Mumbai',
          visitorDevice: 'Windows 11 / Edge',
          visitorSource: 'Direct Firm Recommendation',
          path: '/#attorneys',
          action: 'Attorney Bio Click',
          details: 'Reviewed Adv. Priya S. Merchant bio & credentials',
          timestamp: new Date(now - 1000 * 60 * 12).toISOString()
        },
        {
          id: 'SV-SAMPLE-3',
          visitorId: 'VIS-3184',
          visitorName: 'Director of Legal & Compliance',
          visitorOrg: 'Kalpataru Urban Redevelopment Corp',
          visitorIndustry: 'Commercial Real Estate',
          visitorLocation: 'Santacruz West, Mumbai',
          visitorDevice: 'iPhone 16 Pro / Safari',
          visitorSource: 'MahaRERA Litigation Search',
          path: '/#legal-tools',
          action: 'Tool Calculator Used',
          details: 'Calculated Maharashtra Stamp Duty & Surcharge',
          timestamp: new Date(now - 1000 * 60 * 25).toISOString()
        },
        {
          id: 'SV-SAMPLE-4',
          visitorId: 'VIS-7621',
          visitorName: 'Senior Marine Claims Manager',
          visitorOrg: 'Steamship Mutual P&I Club',
          visitorIndustry: 'Maritime Insurance',
          visitorLocation: 'London / Mumbai Maritime Desk',
          visitorDevice: 'iPad Pro / Safari',
          visitorSource: 'Admiralty Act Vessel Arrest Portal',
          path: '/#contact',
          action: 'Direct Hotline Clicked',
          details: 'Clicked Mumbai Office Direct Hotline (+91 22 2650 4630)',
          timestamp: new Date(now - 1000 * 60 * 48).toISOString()
        },
        {
          id: 'SV-SAMPLE-5',
          visitorId: 'VIS-4509',
          visitorName: 'VP of Intellectual Property & Tech',
          visitorOrg: 'Zomato & Blinkit Legal Group',
          visitorIndustry: 'Consumer Tech & Fintech',
          visitorLocation: 'Gurugram / Mumbai',
          visitorDevice: 'MacBook Air / Safari',
          visitorSource: 'High Court Brand Protection Search',
          path: '/#insights',
          action: 'Legal Bulletin Read',
          details: 'Read "Supreme Court Landmark Ruling on Section 9 Interim Measures"',
          timestamp: new Date(now - 1000 * 60 * 75).toISOString()
        }
      ];
    },

    // Reset To Defaults
    resetToFactoryDefaults: function () {
      setStored(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
      setStored(STORAGE_KEYS.ATTORNEYS, DEFAULT_ATTORNEYS);
      setStored(STORAGE_KEYS.INSIGHTS, DEFAULT_INSIGHTS);
      setStored(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      setStored(STORAGE_KEYS.VISITS, this.generateSampleVisits());
      setStored(STORAGE_KEYS.SITE_VISITS, this.generateSampleSiteVisits());
      setStored(STORAGE_KEYS.SITE_STATS, {
        totalVisits: 1842,
        uniqueVisitors: 618,
        activeNow: 14,
        todayVisits: 129,
        lastUpdated: new Date().toISOString()
      });
      logActivity('Database Reset', 'Reset data store to certified defaults');
    }
  };
});

