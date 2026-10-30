/**
 * LEX GLOBAL ADVOCACY LLP — Official Website Core Scripts
 * Pure Vanilla JavaScript (No TS, No TSX)
 */

(function () {
  'use strict';

  /* ============================================================
     1. DATA DEFINITIONS (PRACTICES, ATTORNEYS, INSIGHTS, STORY)
     ============================================================ */

  const PRACTICE_DATA = {
    'commercial-litigation': {
      title: 'Commercial Litigation & Dispute Resolution',
      category: 'dispute',
      badge: 'High Court & NCLT',
      image: 'https://picsum.photos/seed/lga-pa-commlit/800/500',
      tagline: 'High-stakes advocacy before the Bombay High Court, NCLT, and appellate forums.',
      overview: 'Our commercial litigation practice is recognized for navigating complex multi-jurisdictional disputes, shareholder disagreements, contractual breaches, and insolvency proceedings. We combine forensic factual investigation with aggressive courtroom representation.',
      statutes: [
        'Commercial Courts Act, 2015',
        'Insolvency and Bankruptcy Code (IBC), 2016',
        'Specific Relief Act, 1963',
        'Code of Civil Procedure, 1908'
      ],
      tribunals: [
        'Bombay High Court (Original & Appellate Side)',
        'National Company Law Tribunal (NCLT Mumbai Bench)',
        'National Company Law Appellate Tribunal (NCLAT)',
        'Supreme Court of India'
      ],
      highlights: [
        'Representation in corporate insolvency resolution processes exceeding INR 500 Crores.',
        'Urgent interim injunctions and asset-freezing orders in international commercial disputes.',
        'Shareholder oppression and mismanagement petitions before NCLT Mumbai.'
      ]
    },

    'business-corporate-law': {
      title: 'Business & Corporate Law',
      category: 'corporate',
      badge: 'Corporate Advisory',
      image: 'https://picsum.photos/seed/lga-pa-corplaw/800/500',
      tagline: 'Strategic counsel for mergers, acquisitions, joint ventures, and FDI.',
      overview: 'We advise domestic corporations, multinational enterprises, and emerging high-growth founders on corporate structuring, governance, cross-border commercial transactions, and regulatory filings under Indian corporate jurisprudence.',
      statutes: [
        'Companies Act, 2013 & Rules',
        'Foreign Exchange Management Act (FEMA), 1999',
        'Competition Act, 2002',
        'Securities and Exchange Board of India (SEBI) Regulations'
      ],
      tribunals: [
        'Registrar of Companies (ROC Mumbai I & II)',
        'Regional Director (Western Region, MCA)',
        'Reserve Bank of India (RBI) Foreign Exchange Dept',
        'Securities Appellate Tribunal (SAT)'
      ],
      highlights: [
        'Drafting cross-border Joint Venture & Shareholders Agreements.',
        'Foreign direct investment (FDI) compliances and RBI compounding applications.',
        'Corporate reorganizations, capital reductions, and scheme approvals.'
      ]
    },

    'real-estate': {
      title: 'Real Estate & MahaRERA Advisory',
      category: 'specialized',
      badge: 'MahaRERA & Conveyancing',
      image: 'https://picsum.photos/seed/lga-pa-realestate/800/500',
      tagline: 'Comprehensive property title due diligence, RERA compliance, and redevelopment.',
      overview: 'Operating in the heart of Mumbai, we counsel developers, financial institutions, and property buyers on large-scale redevelopment projects, slum rehabilitation (SRA), title certification, and MahaRERA disputes.',
      statutes: [
        'Real Estate (Regulation and Development) Act (RERA), 2016',
        'Maharashtra Stamp Act, 1958',
        'Registration Act, 1908',
        'Transfer of Property Act, 1882'
      ],
      tribunals: [
        'Maharashtra Real Estate Regulatory Authority (MahaRERA)',
        'MahaRERA Appellate Tribunal',
        'City Civil Court, Mumbai & High Court of Bombay'
      ],
      highlights: [
        'Title search investigation and certification for premium commercial plots in BKC and South Mumbai.',
        'Structuring tripartite redevelopment agreements with housing societies.',
        'MahaRERA complaint adjudication for delays in possession and structural defects.'
      ]
    },

    'arbitration-adr': {
      title: 'Arbitration & Alternate Dispute Resolution (ADR)',
      category: 'dispute',
      badge: 'Domestic & International',
      image: 'https://picsum.photos/seed/lga-pa-arbitration/800/500',
      tagline: 'Institutional & ad-hoc arbitration under MCIA, SIAC, LCIA, and ICC rules.',
      overview: 'Our arbitration counsel represent claimants and respondents across complex engineering, maritime, infrastructure, and commercial disputes, emphasizing prompt enforceability and cost-effective outcomes.',
      statutes: [
        'Arbitration and Conciliation Act, 1996 (as amended 2015, 2019, 2021)',
        'Section 9 (Interim Relief) & Section 34 (Challenge to Arbitral Award)',
        'Section 36 & 48 (Enforcement of Foreign Awards under New York Convention)'
      ],
      tribunals: [
        'Mumbai Centre for International Arbitration (MCIA)',
        'Singapore International Arbitration Centre (SIAC)',
        'International Chamber of Commerce (ICC)',
        'Bombay High Court Arbitration Benches'
      ],
      highlights: [
        'Securing urgent interim reliefs under Section 9 prior to arbitral constitution.',
        'High-value construction contract arbitrations and delay claim assessments.',
        'Execution petitions for foreign awards in Indian courts.'
      ]
    },

    'maritime-admiralty': {
      title: 'Maritime & Admiralty Law',
      category: 'specialized',
      badge: 'Port & Vessel Arrest',
      image: 'https://picsum.photos/seed/lga-pa-maritime/800/500',
      tagline: 'Ship arrests, maritime liens, charterparty disputes, and cargo liability.',
      overview: 'With Mumbai being India’s premier maritime hub, Lex Global Advocacy LLP provides round-the-clock admiralty counsel, vessel arrests for maritime claims, collision liabilities, and bill of lading disputes.',
      statutes: [
        'Admiralty (Jurisdiction and Settlement of Maritime Claims) Act, 2017',
        'Merchant Shipping Act, 1958',
        'Indian Carriage of Goods by Sea Act, 1925',
        'Major Port Authorities Act, 2021'
      ],
      tribunals: [
        'Bombay High Court in its Admiralty & Maritime Jurisdiction',
        'Directorate General of Shipping (DGS)',
        'Mumbai Port Trust & JNPT dispute proceedings'
      ],
      highlights: [
        'Urgent ex-parte warrants of vessel arrest for unpaid bunker supplies and crew wages.',
        'Marine insurance and P&I Club representations.',
        'Salvage, general average, and charterparty arbitrations.'
      ]
    },

    'banking-financial-services': {
      title: 'Banking & Financial Services',
      category: 'corporate',
      badge: 'DRT & Fintech Advisory',
      image: 'https://picsum.photos/seed/lga-pa-banking/800/500',
      tagline: 'Debt recovery, structured finance, syndicated loans, and fintech compliance.',
      overview: 'We counsel scheduled commercial banks, NBFCs, private credit funds, and fintech innovators on lending documentation, security creation, SARFAESI proceedings, and RBI compliance.',
      statutes: [
        'SARFAESI Act, 2002',
        'Recovery of Debts and Bankruptcy Act (RDBA), 1993',
        'Banking Regulation Act, 1949',
        'Payment and Settlement Systems Act, 2007'
      ],
      tribunals: [
        'Debts Recovery Tribunals (DRT I, II, III Mumbai)',
        'Debts Recovery Appellate Tribunal (DRAT Mumbai)',
        'Reserve Bank of India (Ombudsman & Regulatory Cells)'
      ],
      highlights: [
        'Enforcement of security interest under Section 13(4) of SARFAESI Act.',
        'Facility agreements and debenture trust deeds for venture debt deals.',
        'Fintech licensing applications and digital lending compliance.'
      ]
    },

    'intellectual-property': {
      title: 'Intellectual Property Rights (IPR)',
      category: 'specialized',
      badge: 'Trademarks & Patents',
      image: 'https://picsum.photos/seed/lga-pa-ipr/800/500',
      tagline: 'Brand protection, patent litigation, copyright enforcement, and trade secrets.',
      overview: 'We safeguard client innovations, brand names, and digital assets. From trademark prosecution at the Mumbai Patent & Trademark Office to John Doe infringement injunctions before the High Court, we offer full lifecycle IP protection.',
      statutes: [
        'Trade Marks Act, 1999',
        'Patents Act, 1970',
        'Copyright Act, 1957',
        'Designs Act, 2000'
      ],
      tribunals: [
        'Trade Marks Registry (Mumbai)',
        'Patent Office (Boudhik Sampada Bhavan, Mumbai)',
        'Commercial Appellate Division, Bombay High Court'
      ],
      highlights: [
        'Obtaining ex-parte Anton Piller and Mareva injunctions against counterfeit goods.',
        'Global trademark registration portfolios under Madrid Protocol.',
        'Software licensing and technology transfer agreements.'
      ]
    },

    'regulatory-compliance': {
      title: 'Regulatory & Corporate Governance',
      category: 'corporate',
      badge: 'SEBI, CCI & ED',
      image: 'https://picsum.photos/seed/lga-pa-regulatory/800/500',
      tagline: 'Navigating statutory investigations, white-collar compliance, and antitrust.',
      overview: 'Our team assists corporations, boards of directors, and key managerial personnel in complying with dynamic regulatory standards, insider trading codes, and statutory show-cause notices.',
      statutes: [
        'SEBI (Prohibition of Insider Trading) Regulations, 2015',
        'Prevention of Money Laundering Act (PMLA), 2002',
        'Foreign Contribution (Regulation) Act (FCRA)',
        'Digital Personal Data Protection (DPDP) Act, 2023'
      ],
      tribunals: [
        'Securities Appellate Tribunal (SAT)',
        'Enforcement Directorate (ED) Adjudicating Authorities',
        'Competition Commission of India (CCI)'
      ],
      highlights: [
        'Internal corporate investigations and anti-corruption compliance audits.',
        'Appeals against SEBI adjudication orders and debarment penalties.',
        'Data privacy readiness frameworks under DPDP Act 2023.'
      ]
    },

    'estate-planning': {
      title: 'Estate Planning, Wills & Family Trusts',
      category: 'private',
      badge: 'Private Wealth',
      image: 'https://picsum.photos/seed/lga-pa-estate/800/500',
      tagline: 'Intergenerational wealth preservation, private trusts, and probate administration.',
      overview: 'We counsel business families, high-net-worth individuals, and NRI estates on tax-efficient family succession, drafting living wills, establishing private family trusts, and contested probate litigation.',
      statutes: [
        'Indian Succession Act, 1925',
        'Indian Trusts Act, 1882',
        'Hindu Succession Act, 1956 & Special Marriage Act, 1954'
      ],
      tribunals: [
        'Bombay High Court (Testamentary & Intestate Jurisdiction)',
        'District & Subordinate Courts in Maharashtra'
      ],
      highlights: [
        'Creation of irrevocable discretionary private trusts for business continuity.',
        'Probate petitions and Letters of Administration before the Bombay High Court.',
        'Cross-border succession plans covering assets across India, UAE, and the UK.'
      ]
    },

    'employment-law': {
      title: 'Labor & Employment Law',
      category: 'corporate',
      badge: 'Workplace Legal',
      image: 'https://picsum.photos/seed/lga-pa-employment/800/500',
      tagline: 'Employment contracts, POSH compliance, executive severance, and union disputes.',
      overview: 'We advise employers on navigating India’s evolving labor codes, drafting executive non-compete clauses, managing workplace investigations under POSH, and defending wrongful termination claims.',
      statutes: [
        'Industrial Disputes Act, 1947',
        'Sexual Harassment of Women at Workplace (POSH) Act, 2013',
        'Code on Wages, 2019 & Occupational Safety Codes',
        'Payment of Gratuity Act, 1972'
      ],
      tribunals: [
        'Labor & Industrial Courts (Bandra & Mumbai)',
        'Internal Complaints Committees (ICC External Member Services)',
        'High Court of Bombay'
      ],
      highlights: [
        'Formulation of company-wide employment handbooks and ESOP schemes.',
        'Independent external presiding officer for complex POSH inquiries.',
        'Structuring non-compete and non-solicitation covenants.'
      ]
    },

    'family-law': {
      title: 'Matrimonial & Family Law',
      category: 'private',
      badge: 'Family Court',
      image: 'https://picsum.photos/seed/lga-pa-family/800/500',
      tagline: 'Compassionate and resolute representation in matrimonial and custody matters.',
      overview: 'Our family law advocates handle contested and mutual divorce petitions, child custody arrangements, permanent alimony, maintenance claims, and cross-border matrimonial disputes with dignity and discretion.',
      statutes: [
        'Hindu Marriage Act, 1955',
        'Special Marriage Act, 1954',
        'Guardians and Wards Act, 1890',
        'Protection of Women from Domestic Violence Act, 2005'
      ],
      tribunals: [
        'Family Court, Bandra (Mumbai)',
        'Metropolitan Magistrate Courts, Mumbai',
        'High Court of Bombay'
      ],
      highlights: [
        'Resolution of cross-border custody disputes involving OCI/NRI parents.',
        'Negotiation of comprehensive marital settlement agreements.',
        'Asset division and maintenance adjudications.'
      ]
    },

    'construction-law': {
      title: 'Construction & Infrastructure Law',
      category: 'specialized',
      badge: 'EPC & Infra',
      image: 'https://picsum.photos/seed/lga-pa-construction/800/500',
      tagline: 'EPC contract negotiation, FIDIC contracts, public tender claims, and disputes.',
      overview: 'We represent highway contractors, port developers, metro concessionaires, and urban infrastructure developers in procurement challenges, contract management, and delay damages arbitration.',
      statutes: [
        'Indian Contract Act, 1872',
        'National Highways Authority of India Act, 1988',
        'FIDIC Conditions of Contract (Red, Yellow, Silver Books)'
      ],
      tribunals: [
        'Dispute Adjudication Boards (DAB)',
        'Arbitral Tribunals',
        'Bombay High Court Commercial Division'
      ],
      highlights: [
        'Counseling on FIDIC-based EPC contracts for urban transport projects.',
        'Claims assessment for prolongation costs, price variation, and unforeseen site conditions.',
        'Challenging arbitrary blacklisting and tender disqualification.'
      ]
    }
  };

  const ATTORNEYS_DATA = [
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
      bio: 'Advocate Rajesh K. Varma is the Founding Partner of Lex Global Advocacy LLP. He regularly appears as lead counsel before the Bombay High Court, the National Company Law Tribunal (NCLT), and international arbitral tribunals. His practice spans high-value shareholder litigation, insolvency resolution, maritime claims, and corporate investigations.',
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

  const STORY_MILESTONES = {
    '2024': {
      year: '2024',
      heading: 'Founding & Official Incorporation in Mumbai',
      caption: '21 November 2024 — Incorporated at ROC Mumbai I under LLPIN ACK-4630.',
      image: 'https://picsum.photos/seed/lga-story-2024/800/600',
      detail: 'LEX GLOBAL ADVOCACY LLP was formally incorporated on 21 November 2024 under the Limited Liability Partnership Act, registered with the Registrar of Companies, Mumbai I under LLPIN ACK-4630. Established by seasoned advocates with a shared vision of a modern, agile, and forward-looking legal practice.'
    },
    '2025': {
      year: '2025',
      heading: 'Practice Area Activation & BKC Headquarters',
      caption: 'Full-service practice teams established at 91 Springboard BKC 2, Santacruz East.',
      image: 'https://picsum.photos/seed/lga-story-2025/800/600',
      detail: 'In early 2025, the firm established its permanent practice headquarters in Mumbai’s premier business district (Santacruz East / BKC corridor) and activated specialized practice desks across Commercial Litigation, Corporate Governance, MahaRERA, and Maritime Law.'
    },
    '2026': {
      year: '2026',
      heading: 'Cross-Border Vision & Pan-India Client Representation',
      caption: 'Serving corporations, high-net-worth families, and foreign enterprises.',
      image: 'https://picsum.photos/seed/lga-story-2026/800/600',
      detail: 'Presently in 2026, the firm represents clients across Mumbai, Maharashtra, and pan-India, alongside active cross-border advisory for foreign entities investing in India through GIFT City and Mumbai financial hubs.'
    },
    '2027': {
      year: '2027',
      heading: 'Expansion into Technology Law & Institutional ADR',
      caption: 'Deepening arbitration advocacy and emerging AI & data protection compliance.',
      image: 'https://picsum.photos/seed/lga-story-2027/800/600',
      detail: 'Strategic roadmap to scale institutional arbitration before MCIA, SIAC, and LCIA, while building specialized regulatory practice desks in emerging technology, cross-border fintech, and green energy compliance.'
    },
    '2028': {
      year: '2028',
      heading: 'Global Referral Alliances & Bilateral Corridors',
      caption: 'Formalizing international referral alliances in London, Singapore, and Dubai.',
      image: 'https://picsum.photos/seed/lga-story-2028/800/600',
      detail: 'Building formal non-exclusive referral pacts with leading boutique law firms across key international commercial corridors to ensure seamless round-the-clock counsel for Indian enterprises expanding abroad.'
    },
    '2030': {
      year: '2030',
      heading: 'Recognized as a Premier Modern Indian Law Firm',
      caption: 'Vision: An enduring legacy of ethical advocacy, legal innovation, and community impact.',
      image: 'https://picsum.photos/seed/lga-story-2030/800/600',
      detail: 'By 2030, Lex Global Advocacy LLP aims to be celebrated among India’s top multidisciplinary law firms—uncompromising on integrity, pioneering in legal technology, and revered for transformative client results.'
    }
  };

  const INSIGHTS_DATA = {
    'arbitration-stamping': {
      title: 'Supreme Court 7-Judge Bench on Stamping of Arbitration Agreements',
      category: 'Dispute Resolution',
      date: 'October 2026',
      author: 'Adv. Rajesh K. Varma',
      image: 'https://picsum.photos/seed/lga-insight-arb/800/500',
      summary: 'Analysis of the landmark Curative Petition ruling clarifying that non-stamping of underlying commercial agreements does not render the arbitration clause void at the referral stage.',
      content: `
        <h4>Executive Summary</h4>
        <p>In a historic verdict by a 7-judge Constitution Bench, the Supreme Court of India settled a long-standing dilemma in Indian arbitration law, ruling that non-payment or deficiency of stamp duty on an underlying commercial contract does not render the arbitration clause non-existent or void ab initio.</p>
        <h4>Key Implications for Commercial Parties</h4>
        <ul>
          <li><strong>Expedited Section 11 Appointments:</strong> Courts hearing applications under Section 11(6) of the Arbitration & Conciliation Act 1996 will no longer conduct exhaustive mini-trials on stamp duty sufficiency.</li>
          <li><strong>Doctrine of Competence-Competence:</strong> The arbitral tribunal is the appropriate judicial forum to examine objections concerning admissibility and stamping under Section 16.</li>
          <li><strong>Preservation of Urgent Interim Reliefs:</strong> Claimants can seek urgent interim protection under Section 9 from the High Court without preliminary dismissal on stamp-defect grounds.</li>
        </ul>
        <p>Parties executing cross-border and domestic commercial contracts in Maharashtra should nevertheless ensure proper stamping under the Maharashtra Stamp Act, 1958, to avoid impounding during arbitral proceedings.</p>
      `
    },
    'maharera-framework': {
      title: 'MahaRERA 2026 Compliance Directives: Warranties & Promoter Escrow Obligations',
      category: 'Real Estate & RERA',
      date: 'September 2026',
      author: 'Adv. Vikramaditya Desai',
      image: 'https://picsum.photos/seed/lga-insight-rera/800/500',
      summary: 'Critical review of MahaRERA’s updated directives on mandatory 5-year defect liability disclosures, project bank account audits, and deregistration guidelines.',
      content: `
        <h4>Overview of New Directives</h4>
        <p>The Maharashtra Real Estate Regulatory Authority (MahaRERA) has introduced stringent compliance mandates for all ongoing and newly registered real estate developments across the Mumbai Metropolitan Region (MMR).</p>
        <h4>Core Compliance Pillars</h4>
        <ul>
          <li><strong>Separate Bank Account (70% Rule):</strong> Rigorous quarterly CA certifications (Form 3) and Architect certifications (Form 1) required prior to each drawdown from the designated escrow account.</li>
          <li><strong>5-Year Structural Defect Guarantee:</strong> Developers must clearly outline warranty obligations in the registered Agreement for Sale, including rectification timelines within 30 days of notice.</li>
          <li><strong>Parking Space Disclosures:</strong> Strict prohibition on selling open parking spaces; all covered and stilt parkings must be mapped to specific units in the public project dashboard.</li>
        </ul>
        <p>Lex Global Advocacy LLP assists both real estate developers in regulatory compliance audits and allottee associations in resolving delayed possession grievances.</p>
      `
    },
    'bombay-hc-admiralty': {
      title: 'Admiralty Jurisdiction & Ship Arrest Protocols under the Admiralty Act 2017',
      category: 'Maritime Law',
      date: 'August 2026',
      author: 'Adv. Cyrus F. Bharucha',
      image: 'https://picsum.photos/seed/lga-insight-maritime/800/500',
      summary: 'Practical procedural guide on invoking in-rem jurisdiction of the Bombay High Court for maritime claims, security deposits, and caveator rights.',
      content: `
        <h4>The Statutory Framework</h4>
        <p>Under the Admiralty (Jurisdiction and Settlement of Maritime Claims) Act, 2017, the High Court of Bombay exercises statutory admiralty jurisdiction over vessel navigation, maritime liens, and maritime claims within India’s territorial waters.</p>
        <h4>Essential Steps for an Urgent Vessel Arrest</h4>
        <ul>
          <li><strong>Identification of Maritime Claim:</strong> Verifying that the claim falls under Section 4(1) (e.g., unpaid bunker supplies, crew wages, damage caused by vessel, general average).</li>
          <li><strong>In-Rem Plaint Filing:</strong> Preparing the suit in the Admiralty Division with prima facie evidence and affidavit in support of arrest warrant.</li>
          <li><strong>Ex-Parte Caveat Search:</strong> Examining the Caveat Warrant Book at the Bombay High Court registry to check for prior security undertakings.</li>
          <li><strong>Marshal Execution:</strong> Communicating the High Court’s arrest warrant to Mumbai Port Authority, JNPT, and Coast Guard authorities.</li>
        </ul>
        <p>Our maritime team provides emergency 24/7 ship arrest and release services across Mumbai and Western Indian ports.</p>
      `
    }
  };

  /* ============================================================
     2. HERO SLIDER LOGIC
     ============================================================ */
  let currentHeroSlide = 0;
  let heroTimer = null;
  const heroSlides = document.querySelectorAll('.main-slider .slide');
  const currentSlideLabel = document.querySelector('.js-current-slide');
  const totalSlideLabel = document.querySelector('.js-total-slide');

  function initHeroSlider() {
    if (!heroSlides.length) return;
    if (totalSlideLabel) {
      totalSlideLabel.textContent = String(heroSlides.length).padStart(2, '0');
    }
    showHeroSlide(0);
    startHeroAutoplay();

    const prevBtn = document.querySelector('.js-slider-left');
    const nextBtn = document.querySelector('.js-slider-right');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevHeroSlide();
        resetHeroAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextHeroSlide();
        resetHeroAutoplay();
      });
    }

    // Touch swipe support
    const sliderContainer = document.querySelector('.slider');
    if (sliderContainer) {
      let touchStartX = 0;
      let touchEndX = 0;
      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          nextHeroSlide();
          resetHeroAutoplay();
        } else if (touchEndX - touchStartX > 50) {
          prevHeroSlide();
          resetHeroAutoplay();
        }
      }, { passive: true });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (document.querySelector('.modal-overlay.is-open') || document.querySelector('.search-bar.is-open')) return;
      if (e.key === 'ArrowRight') {
        nextHeroSlide();
        resetHeroAutoplay();
      } else if (e.key === 'ArrowLeft') {
        prevHeroSlide();
        resetHeroAutoplay();
      }
    });
  }

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });
    currentHeroSlide = index;
    if (currentSlideLabel) {
      currentSlideLabel.textContent = String(index + 1).padStart(2, '0');
    }
  }

  function nextHeroSlide() {
    let next = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(next);
  }

  function prevHeroSlide() {
    let prev = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prev);
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroTimer = setInterval(nextHeroSlide, 7000);
  }

  function stopHeroAutoplay() {
    if (heroTimer) clearInterval(heroTimer);
  }

  function resetHeroAutoplay() {
    stopHeroAutoplay();
    startHeroAutoplay();
  }

  /* ============================================================
     3. STORY TIMELINE TABS
     ============================================================ */
  function initStoryTimeline() {
    const yearButtons = document.querySelectorAll('.story-year-btn');
    const showcaseImg = document.getElementById('story-showcase-img');
    const showcaseHeading = document.getElementById('story-showcase-heading');
    const showcaseDetail = document.getElementById('story-showcase-detail');
    const showcaseCaption = document.getElementById('story-showcase-caption');

    if (!yearButtons.length) return;

    yearButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const year = btn.getAttribute('data-year');
        if (!year || !STORY_MILESTONES[year]) return;

        yearButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const data = STORY_MILESTONES[year];
        if (showcaseImg) showcaseImg.src = data.image;
        if (showcaseHeading) showcaseHeading.textContent = data.heading;
        if (showcaseCaption) showcaseCaption.textContent = data.caption;
        if (showcaseDetail) showcaseDetail.textContent = data.detail;
      });
    });
  }

  /* ============================================================
     4. PRACTICE AREAS FILTERING & DETAIL MODAL
     ============================================================ */
  function initPracticeAreas() {
    const filterButtons = document.querySelectorAll('.practices-filter-bar .filter-btn');
    const cards = document.querySelectorAll('.practice-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cat = btn.getAttribute('data-filter');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Click on practice card -> open modal
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = card.getAttribute('data-slug');
        openPracticeModal(slug);
      });
    });
  }

  function openPracticeModal(slug) {
    const data = PRACTICE_DATA[slug];
    if (!data) return;

    const modal = document.getElementById('practice-modal');
    if (!modal) return;

    document.getElementById('modal-practice-title').textContent = data.title;
    document.getElementById('modal-practice-tagline').textContent = data.tagline;
    document.getElementById('modal-practice-overview').textContent = data.overview;
    document.getElementById('modal-practice-img').src = data.image;

    const statutesList = document.getElementById('modal-practice-statutes');
    statutesList.innerHTML = '';
    data.statutes.forEach((st) => {
      const li = document.createElement('li');
      li.textContent = st;
      statutesList.appendChild(li);
    });

    const tribunalsList = document.getElementById('modal-practice-tribunals');
    tribunalsList.innerHTML = '';
    data.tribunals.forEach((tr) => {
      const li = document.createElement('li');
      li.textContent = tr;
      tribunalsList.appendChild(li);
    });

    const highlightsList = document.getElementById('modal-practice-highlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach((hl) => {
      const li = document.createElement('li');
      li.textContent = hl;
      highlightsList.appendChild(li);
    });

    // Link consultation button to prefill
    const consultBtn = document.getElementById('modal-practice-consult-btn');
    if (consultBtn) {
      consultBtn.onclick = () => {
        closeAllModals();
        const practiceSelect = document.getElementById('intake-practice');
        if (practiceSelect) {
          practiceSelect.value = slug;
        }
        const consultSection = document.getElementById('consultation');
        if (consultSection) {
          consultSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  /* ============================================================
     5. ATTORNEYS FILTERING & BIO MODAL
     ============================================================ */
  function initAttorneys() {
    const filterButtons = document.querySelectorAll('.attorneys-filter-tabs .attorney-filter-btn');
    const attorneyCards = document.querySelectorAll('.attorney-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.getAttribute('data-filter');

        attorneyCards.forEach((card) => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    attorneyCards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openAttorneyModal(id);
      });
    });
  }

  function openAttorneyModal(id) {
    const data = ATTORNEYS_DATA.find((a) => a.id === id);
    if (!data) return;

    const modal = document.getElementById('attorney-modal');
    if (!modal) return;

    document.getElementById('attorney-modal-name').textContent = data.name;
    document.getElementById('attorney-modal-role').textContent = `${data.role} — ${data.experience}`;
    document.getElementById('attorney-modal-bar').textContent = data.bar;
    document.getElementById('attorney-modal-edu').textContent = data.education;
    document.getElementById('attorney-modal-bio').textContent = data.bio;
    document.getElementById('attorney-modal-img').src = data.image;

    const emailEl = document.getElementById('attorney-modal-email');
    emailEl.href = `mailto:${data.email}`;
    emailEl.textContent = data.email;

    const phoneEl = document.getElementById('attorney-modal-phone');
    phoneEl.href = `tel:${data.phone.replace(/\s+/g, '')}`;
    phoneEl.textContent = data.phone;

    const practicesWrap = document.getElementById('attorney-modal-practices');
    practicesWrap.innerHTML = '';
    data.practices.forEach((p) => {
      const span = document.createElement('span');
      span.className = 'section-badge';
      span.textContent = p;
      practicesWrap.appendChild(span);
    });

    const mattersList = document.getElementById('attorney-modal-matters');
    mattersList.innerHTML = '';
    data.matters.forEach((m) => {
      const li = document.createElement('li');
      li.textContent = m;
      mattersList.appendChild(li);
    });

    // Record Visit in shared LGA_DATASTORE
    if (window.LGA_DATASTORE) {
      window.LGA_DATASTORE.recordProfileVisit(data.id, data.name, data.role);
    }
    renderAttorneyProfileVisitors(data.id, data.name);

    // Booking CTA
    const consultBtn = document.getElementById('attorney-modal-consult-btn');
    if (consultBtn) {
      consultBtn.onclick = () => {
        closeAllModals();
        const notes = document.getElementById('intake-notes');
        if (notes) {
          notes.value = `Requesting consultation specifically with ${data.name} (${data.role}).\n`;
        }
        const consultSection = document.getElementById('consultation');
        if (consultSection) {
          consultSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function renderAttorneyProfileVisitors(attorneyId, attorneyName) {
    if (!window.LGA_DATASTORE) return;
    const visits = window.LGA_DATASTORE.getVisitsForAttorney(attorneyId);
    const countBadge = document.getElementById('attorney-visit-count-badge');
    const listEl = document.getElementById('attorney-recent-visitors-list');
    const personaDisplay = document.getElementById('current-visitor-identity-display');

    if (countBadge) {
      countBadge.textContent = `${visits.length} Verified Profile View${visits.length === 1 ? '' : 's'}`;
    }

    const currentVisitor = window.LGA_DATASTORE.getVisitorSession();
    if (personaDisplay && currentVisitor) {
      personaDisplay.innerHTML = `<strong>Browsing as:</strong> ${currentVisitor.name} (${currentVisitor.org}) &bull; <span style="color:#64748b;">${currentVisitor.location}</span>`;
    }

    if (!listEl) return;
    listEl.innerHTML = '';

    if (visits.length === 0) {
      listEl.innerHTML = '<div style="font-size: 13px; color: #64748b; padding: 6px 0;">Be the first prospective client or counsel to inspect this profile.</div>';
      return;
    }

    const recent = visits.slice(0, 4);
    recent.forEach((v) => {
      const timeAgo = formatTimeAgo(v.timestamp);
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 12.5px;';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 30px; height: 30px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #475569; font-weight: 700; font-size: 11px;">
            ${(v.visitorName || 'U').charAt(0)}
          </div>
          <div>
            <div style="font-weight: 600; color: #0f172a;">${v.visitorName}</div>
            <div style="font-size: 11.5px; color: #64748b;">${v.visitorOrg || 'Verified Legal Client'} &bull; ${v.visitorLocation || 'Mumbai'}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 11px; color: #94a3b8;"><i class="fas fa-clock"></i> ${timeAgo}</span>
          <div style="font-size: 10.5px; color: var(--primary-dark); font-weight: 600;">${v.visitorSource || 'Direct'}</div>
        </div>
      `;
      listEl.appendChild(row);
    });

    // Wire up the persona switcher button inside the modal
    const switchBtn = document.getElementById('btn-change-visitor-persona');
    if (switchBtn) {
      switchBtn.onclick = () => {
        const personas = [
          { name: 'Corporate Legal Director', org: 'Tata Capital Advisory', industry: 'Banking & NBFC', location: 'Nariman Point, Mumbai', source: 'Direct Website Search' },
          { name: 'Chief Legal Officer', org: 'Aditya Birla Financial Group', industry: 'Conglomerate Finance', location: 'Worli, Mumbai', source: 'NCLT Dispute Counsel Search' },
          { name: 'General Counsel', org: 'Mahindra Logistics Ltd', industry: 'Logistics & Supply Chain', location: 'Bandra-Kurla Complex (BKC)', source: 'Corporate Referral' },
          { name: 'Director of Legal & Compliance', org: 'Kalpataru Urban Infra', industry: 'Real Estate & Infra', location: 'Santacruz West, Mumbai', source: 'MahaRERA Litigation Search' },
          { name: 'Partner / Investor', org: 'Sequoia Surge India', industry: 'Venture Capital & PE', location: 'Lower Parel, Mumbai', source: 'LinkedIn Legal Network' },
          { name: 'Senior Marine Claims Manager', org: 'Steamship Mutual P&I Club', industry: 'Maritime Insurance', location: 'London / Mumbai Desk', source: 'Admiralty Portal Referral' },
          { name: 'Managing Partner', org: 'Holborn Chambers (London)', industry: 'International Arbitration', location: 'London, UK', source: 'SIAC Arbitration Referral' }
        ];
        const next = personas[Math.floor(Math.random() * personas.length)];
        window.LGA_DATASTORE.setVisitorSession(next);
        window.LGA_DATASTORE.recordProfileVisit(attorneyId, attorneyName, '');
        renderAttorneyProfileVisitors(attorneyId, attorneyName);
        showToast(`Now browsing as: ${next.name} (${next.org})`, 'fa-user-check');
      };
    }
  }

  function formatTimeAgo(iso) {
    if (!iso) return 'just now';
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  }

  /* ============================================================
     6. INSIGHTS MODAL
     ============================================================ */
  function initInsights() {
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = card.getAttribute('data-slug');
        openInsightModal(slug);
      });
    });
  }

  function openInsightModal(slug) {
    const data = INSIGHTS_DATA[slug];
    if (!data) return;

    const modal = document.getElementById('insight-modal');
    if (!modal) return;

    document.getElementById('insight-modal-title').textContent = data.title;
    document.getElementById('insight-modal-meta').textContent = `${data.category} • ${data.date} • By ${data.author}`;
    document.getElementById('insight-modal-body').innerHTML = data.content;
    document.getElementById('insight-modal-img').src = data.image;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  /* ============================================================
     7. LIVE SEARCH OVERLAY
     ============================================================ */
  function initLiveSearch() {
    const searchBar = document.querySelector('.search-bar');
    const searchOpenBtn = document.querySelector('.header-search');
    const searchCloseBtn = document.querySelector('.search-close');
    const searchInput = document.getElementById('popsearch');
    const searchResults = document.getElementById('live-search-results');

    if (!searchBar || !searchOpenBtn) return;

    searchOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchBar.classList.add('is-open');
      if (searchInput) {
        searchInput.focus();
        triggerSearch(searchInput.value.trim());
      }
    });

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.classList.remove('is-open');
      });
    }

    // Close search on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchBar.classList.contains('is-open')) {
        searchBar.classList.remove('is-open');
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        triggerSearch(e.target.value.trim());
      });
    }

    function triggerSearch(query) {
      if (!searchResults) return;
      if (!query || query.length < 2) {
        searchResults.classList.remove('has-results');
        searchResults.innerHTML = '';
        return;
      }

      const q = query.toLowerCase();
      const results = [];

      // Search Practices
      Object.keys(PRACTICE_DATA).forEach((key) => {
        const p = PRACTICE_DATA[key];
        if (p.title.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)) {
          results.push({
            type: 'Practice Area',
            title: p.title,
            snippet: p.tagline,
            action: () => {
              searchBar.classList.remove('is-open');
              openPracticeModal(key);
            }
          });
        }
      });

      // Search Attorneys
      ATTORNEYS_DATA.forEach((a) => {
        if (a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.practices.some((pr) => pr.toLowerCase().includes(q))) {
          results.push({
            type: 'Attorney',
            title: a.name,
            snippet: `${a.role} — ${a.practices.join(', ')}`,
            action: () => {
              searchBar.classList.remove('is-open');
              openAttorneyModal(a.id);
            }
          });
        }
      });

      // Search Insights
      Object.keys(INSIGHTS_DATA).forEach((key) => {
        const ins = INSIGHTS_DATA[key];
        if (ins.title.toLowerCase().includes(q) || ins.summary.toLowerCase().includes(q)) {
          results.push({
            type: 'Legal Insight',
            title: ins.title,
            snippet: ins.summary,
            action: () => {
              searchBar.classList.remove('is-open');
              openInsightModal(key);
            }
          });
        }
      });

      // Render Results
      searchResults.innerHTML = '';
      if (results.length === 0) {
        searchResults.innerHTML = `<div style="color: #9ca3af; padding: 12px 16px;">No legal matters or articles found matching "${query}". Try "Litigation", "Arbitration", "RERA", or "Varma".</div>`;
        searchResults.classList.add('has-results');
        return;
      }

      results.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
          <span class="search-result-tag">${item.type}</span>
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-snippet">${item.snippet}</div>
        `;
        div.onclick = item.action;
        searchResults.appendChild(div);
      });
      searchResults.classList.add('has-results');
    }
  }

  /* ============================================================
     8. INTERACTIVE LEGAL TOOLS / ESTIMATOR
     ============================================================ */
  function initLegalTools() {
    // 1. Stamp Duty Calculator (Maharashtra)
    const propertyType = document.getElementById('calc-prop-type');
    const considerationValue = document.getElementById('calc-val-input');
    const stampRateEl = document.getElementById('calc-stamp-rate');
    const stampAmountEl = document.getElementById('calc-stamp-amt');
    const regFeeEl = document.getElementById('calc-reg-fee');
    const totalFeeEl = document.getElementById('calc-total-fee');

    function updateStampDuty() {
      if (!considerationValue) return;
      const val = parseFloat(considerationValue.value) || 0;
      const type = propertyType ? propertyType.value : 'residential';

      let ratePercent = 0.05; // 5% Mumbai base
      let localCessPercent = 0.01; // 1% Local body cess / Metro cess
      let effectiveRate = 0.06; // 6%

      if (type === 'commercial') {
        effectiveRate = 0.06;
      } else if (type === 'lease') {
        effectiveRate = 0.02;
      } else if (type === 'gift') {
        effectiveRate = 0.03;
      }

      const stampDuty = Math.round(val * effectiveRate);
      // Maharashtra registration: 1% capped at INR 30,000 for residential sales > 30 Lakhs
      let regFee = Math.min(Math.round(val * 0.01), 30000);
      if (val === 0) regFee = 0;

      const total = stampDuty + regFee;

      if (stampRateEl) stampRateEl.textContent = `${(effectiveRate * 100).toFixed(1)}% (Incl. Metro Cess)`;
      if (stampAmountEl) stampAmountEl.textContent = `₹ ${stampDuty.toLocaleString('en-IN')}`;
      if (regFeeEl) regFeeEl.textContent = `₹ ${regFee.toLocaleString('en-IN')}`;
      if (totalFeeEl) totalFeeEl.textContent = `₹ ${total.toLocaleString('en-IN')}`;
    }

    if (propertyType) propertyType.addEventListener('change', updateStampDuty);
    if (considerationValue) considerationValue.addEventListener('input', updateStampDuty);
    updateStampDuty();

    // 2. Section 29A Arbitration Timeline Tool
    const arbStartDate = document.getElementById('arb-start-date');
    const pleadeDeadlineEl = document.getElementById('arb-pleadings-date');
    const s29aDeadlineEl = document.getElementById('arb-29a-date');
    const extDeadlineEl = document.getElementById('arb-ext-date');

    function updateArbitrationTimeline() {
      if (!arbStartDate || !arbStartDate.value) return;
      const start = new Date(arbStartDate.value);
      if (isNaN(start.getTime())) return;

      // Section 23(4): Statement of claim and defense within 6 months
      const pleadingsDate = new Date(start);
      pleadingsDate.setMonth(pleadingsDate.getMonth() + 6);

      // Section 29A(1): Award within 12 months from completion of pleadings
      const s29aDate = new Date(pleadingsDate);
      s29aDate.setMonth(s29aDate.getMonth() + 12);

      // Section 29A(3): Consent extension by parties up to 6 months
      const extDate = new Date(s29aDate);
      extDate.setMonth(extDate.getMonth() + 6);

      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      if (pleadeDeadlineEl) pleadeDeadlineEl.textContent = pleadingsDate.toLocaleDateString('en-IN', options);
      if (s29aDeadlineEl) s29aDeadlineEl.textContent = s29aDate.toLocaleDateString('en-IN', options);
      if (extDeadlineEl) extDeadlineEl.textContent = extDate.toLocaleDateString('en-IN', options);
    }

    if (arbStartDate) {
      arbStartDate.value = new Date().toISOString().split('T')[0];
      arbStartDate.addEventListener('change', updateArbitrationTimeline);
      updateArbitrationTimeline();
    }
  }

  /* ============================================================
     9. CONSULTATION INTAKE & INQUIRY STORAGE
     ============================================================ */
  function initConsultationForm() {
    const form = document.getElementById('client-intake-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      const fullName = document.getElementById('intake-name').value.trim();
      const email = document.getElementById('intake-email').value.trim();
      const phone = document.getElementById('intake-phone').value.trim();
      const practice = document.getElementById('intake-practice').value;
      const mode = document.getElementById('intake-mode').value;
      const notes = document.getElementById('intake-notes').value.trim();
      const conflictCheck = document.getElementById('intake-conflict').checked;

      if (!fullName || !email || !phone) {
        showToast('Please complete all required fields.', 'fa-exclamation-triangle');
        return;
      }

      if (!conflictCheck) {
        showToast('Please check the conflict verification box.', 'fa-shield-halved');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Intake…';

      setTimeout(() => {
        // Generate Case / Consultation Ref ID
        const refId = `LGA-MUM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const record = {
          refId,
          timestamp: new Date().toISOString(),
          fullName,
          org: document.getElementById('intake-org') ? document.getElementById('intake-org').value.trim() : '',
          email,
          phone,
          practice,
          practiceTitle: PRACTICE_DATA[practice] ? PRACTICE_DATA[practice].title : practice,
          mode,
          notes,
          status: 'New',
          priority: 'Normal',
          assignedTo: 'Adv. Rajesh K. Varma'
        };

        // Save through shared Datastore (syncs automatically to Admin Panel)
        if (window.LGA_DATASTORE) {
          window.LGA_DATASTORE.saveInquiry(record);
        } else {
          try {
            const stored = JSON.parse(localStorage.getItem('lga_client_inquiries') || '[]');
            stored.unshift(record);
            localStorage.setItem('lga_client_inquiries', JSON.stringify(stored));
          } catch (err) {
            console.error(err);
          }
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        form.reset();

        // Show Confirmation Receipt Modal
        openConfirmationModal(record);
        showToast('Consultation request registered and synced with legal registry.', 'fa-circle-check');
      }, 700);
    });

    // Recent Inquiries Trigger
    const viewPastBtn = document.getElementById('view-past-inquiries-btn');
    if (viewPastBtn) {
      viewPastBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPastInquiriesModal();
      });
    }
  }

  function openConfirmationModal(record) {
    const modal = document.getElementById('confirmation-modal');
    if (!modal) return;

    document.getElementById('receipt-ref-id').textContent = record.refId;
    document.getElementById('receipt-name').textContent = record.fullName;
    document.getElementById('receipt-email').textContent = record.email;
    document.getElementById('receipt-phone').textContent = record.phone;
    document.getElementById('receipt-practice').textContent = record.practiceTitle || record.practice;
    document.getElementById('receipt-mode').textContent = record.mode;
    document.getElementById('receipt-date').textContent = new Date().toLocaleString('en-IN');

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    const printBtn = document.getElementById('print-receipt-btn');
    if (printBtn) {
      printBtn.onclick = () => window.print();
    }
  }

  function openPastInquiriesModal() {
    const modal = document.getElementById('past-inquiries-modal');
    if (!modal) return;

    const listContainer = document.getElementById('past-inquiries-list');
    let inquiries = [];
    try {
      inquiries = JSON.parse(localStorage.getItem('lga_client_inquiries') || '[]');
    } catch (e) {
      inquiries = [];
    }

    listContainer.innerHTML = '';
    if (inquiries.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 30px; text-align: center; color: #64748b;">
          <i class="fas fa-folder-open" style="font-size: 36px; margin-bottom: 12px; color: #cbd5e1;"></i>
          <p>No prior consultation requests found on this browser.</p>
        </div>
      `;
    } else {
      inquiries.forEach((item) => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 16px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;';
        div.innerHTML = `
          <div>
            <strong style="color: #000; font-size: 15px;">${item.refId}</strong> — <span style="color: #4b5563;">${item.practiceTitle}</span>
            <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Requested by: ${item.fullName} | Mode: ${item.mode} | ${new Date(item.timestamp).toLocaleDateString('en-IN')}</div>
          </div>
          <span class="section-badge" style="margin: 0;">Active / In Review</span>
        `;
        listContainer.appendChild(div);
      });
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  /* ============================================================
     10. BAR COUNCIL OF INDIA DISCLAIMER MODAL
     ============================================================ */
  function initBciDisclaimer() {
    const modal = document.getElementById('bci-modal');
    const acceptBtn = document.getElementById('bci-accept-btn');
    const bciLink = document.getElementById('bci-trigger-link');
    const BCI_STORAGE_KEY = 'lga_bci_rule36_confirmed';

    if (bciLink) {
      bciLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
          modal.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // If first visit, show disclaimer
    const hasConfirmed = localStorage.getItem(BCI_STORAGE_KEY);
    if (!hasConfirmed && modal) {
      setTimeout(() => {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }, 500);
    }

    if (acceptBtn && modal) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem(BCI_STORAGE_KEY, 'true');
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }
  }

  /* ============================================================
     11. COOKIE CONSENT BANNER
     ============================================================ */
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const closeBtn = document.getElementById('cookie-close');
    const COOKIE_KEY = 'lga_cookie_pref';

    if (!banner) return;

    if (!localStorage.getItem(COOKIE_KEY)) {
      setTimeout(() => banner.classList.add('is-visible'), 1200);
    }

    function recordConsent(type) {
      localStorage.setItem(COOKIE_KEY, type);
      banner.classList.remove('is-visible');
      showToast(`Cookie preferences saved: ${type}`, 'fa-shield-halved');
    }

    if (acceptBtn) acceptBtn.onclick = () => recordConsent('Accepted All');
    if (rejectBtn) rejectBtn.onclick = () => recordConsent('Essential Only');
    if (closeBtn) closeBtn.onclick = () => recordConsent('Dismissed');
  }

  /* ============================================================
     12. GENERAL MODAL CLOSING & NAVIGATION
     ============================================================ */
  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('is-open'));
    document.body.style.overflow = '';
  }

  function initModals() {
    document.querySelectorAll('.modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', () => closeAllModals());
    });

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeAllModals();
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  /* ============================================================
     13. HEADER SCROLL & MOBILE MENU
     ============================================================ */
  function initHeaderAndNav() {
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        if (header) header.classList.add('is-fixed');
        if (backToTopBtn) backToTopBtn.classList.add('is-visible');
      } else {
        if (header) header.classList.remove('is-fixed');
        if (backToTopBtn) backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile Drawer
    const mobileToggle = document.querySelector('.header .tools .toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileClose = document.querySelector('.mobile-nav-close');

    function openMobileNav() {
      if (mobileDrawer) mobileDrawer.classList.add('is-open');
      if (mobileBackdrop) mobileBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      if (mobileDrawer) mobileDrawer.classList.remove('is-open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

    // Accordions inside Mobile Drawer
    document.querySelectorAll('.accordion-trigger').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
          const isOpen = target.classList.contains('is-open');
          target.classList.toggle('is-open');
          const icon = btn.querySelector('i');
          if (icon) {
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
          }
        }
      });
    });

    // Close mobile nav when clicking any nav link
    document.querySelectorAll('.mobile-nav-links a:not(.accordion-trigger)').forEach((link) => {
      link.addEventListener('click', () => closeMobileNav());
    });
  }

  /* ============================================================
     14. TOAST NOTIFICATION UTILITY
     ============================================================ */
  function showToast(message, icon = 'fa-info-circle') {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    toast.classList.add('is-show');
    setTimeout(() => {
      toast.classList.remove('is-show');
    }, 4000);
  }

  /* ============================================================
     16. LIVE SYNC WITH ADMIN PANEL
     ============================================================ */
  function applyLiveSettings() {
    if (!window.LGA_DATASTORE) return;
    const s = window.LGA_DATASTORE.getSettings();
    if (!s) return;

    // Emergency advisory notice banner
    let noticeEl = document.getElementById('firm-emergency-notice-banner');
    if (s.emergencyNotice && s.emergencyNotice.trim()) {
      if (!noticeEl) {
        noticeEl = document.createElement('div');
        noticeEl.id = 'firm-emergency-notice-banner';
        noticeEl.style.cssText = 'background: #b45309; color: #fff; padding: 10px 24px; text-align: center; font-size: 13.5px; font-weight: 600; z-index: 1000; position: relative;';
        document.body.insertBefore(noticeEl, document.body.firstChild);
      }
      noticeEl.innerHTML = `<i class="fas fa-bullhorn" style="margin-right: 8px;"></i> <span>${s.emergencyNotice}</span>`;
      noticeEl.style.display = 'block';
    } else if (noticeEl) {
      noticeEl.style.display = 'none';
    }

    // Direct phones / emails if updated
    if (s.phone) {
      document.querySelectorAll('a[href^="tel:"]').forEach(el => {
        el.href = `tel:${s.phone.replace(/\s+/g, '')}`;
        const span = el.querySelector('.hide-for-small-only');
        if (span) span.textContent = s.phone;
      });
    }

    if (s.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        if (!el.id.includes('attorney')) {
          el.href = `mailto:${s.email}`;
        }
      });
    }
  }

  function renderAttorneysFromStore() {
    if (!window.LGA_DATASTORE) return;
    const attorneys = window.LGA_DATASTORE.getAttorneys();
    const grid = document.querySelector('.attorneys-grid');
    if (!grid || !attorneys.length) return;

    grid.innerHTML = '';
    attorneys.forEach(attorney => {
      const card = document.createElement('div');
      card.className = 'attorney-card';
      card.setAttribute('data-id', attorney.id);
      card.setAttribute('data-category', attorney.category);
      card.innerHTML = `
        <div class="attorney-card-photo">
          <img src="${attorney.image}" alt="${attorney.name}" loading="lazy" />
          <span class="attorney-card-role-badge">${attorney.role}</span>
        </div>
        <div class="attorney-card-info">
          <h4>${attorney.name}</h4>
          <p>${(attorney.practices || []).slice(0, 2).join(', ')}</p>
          <div class="attorney-card-footer">
            <span>${attorney.bar || 'Bar Council of India'}</span>
            <span>View Bio <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        openAttorneyModal(attorney.id);
      });
      grid.appendChild(card);
    });
  }

  /* ============================================================
     14.5 LIVE VISITOR TRACKING & ACTIVITY INTELLIGENCE
     ============================================================ */
  function initVisitorTracking() {
    if (!window.LGA_DATASTORE) return;
    const DS = window.LGA_DATASTORE;

    // 1. Immediately record entry visit to website in background
    DS.recordSiteVisit(window.location.pathname || '/', 'Page Load', 'Client Landed on Lex Global Advocacy Portal');

    // 2. Automated Click Tracking on User Actions (Navigation, Phone, Email, Calculators)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href');
      const id = target.id;
      const text = target.innerText.trim();

      if (href && href.startsWith('#')) {
        const sectionName = href.replace('#', '');
        if (sectionName && ['practice-areas', 'attorneys', 'about', 'legal-tools', 'insights', 'consultation', 'contact'].includes(sectionName)) {
          DS.recordSiteVisit(href, 'Section Navigation', `Navigated to ${sectionName.toUpperCase()} section`);
        }
      } else if (href && href.startsWith('tel:')) {
        DS.recordSiteVisit(href, 'Phone Click', 'Clicked direct Mumbai office telephone line');
      } else if (href && href.startsWith('mailto:')) {
        DS.recordSiteVisit(href, 'Email Inquiry Click', 'Clicked direct email communication link');
      } else if (id === 'calc-stamp-duty-btn' || id === 'calc-arbitration-fee-btn') {
        DS.recordSiteVisit('/#legal-tools', 'Calculator Calculation', `Used legal calculation estimator (${text})`);
      }
    }, { passive: true });

    // 3. Persona Switcher in Attorney Modal
    const switchPersonaBtn = document.getElementById('btn-change-visitor-persona');
    if (switchPersonaBtn) {
      switchPersonaBtn.addEventListener('click', () => {
        const pool = [
          { name: 'Chief Legal Officer', org: 'Aditya Birla Financial', industry: 'Banking', location: 'Nariman Point, Mumbai', source: 'Direct High Court Inquiry' },
          { name: 'Senior Partner', org: 'Freshfields Bruckhaus (Singapore)', industry: 'International Law', location: 'Singapore Maritime Hub', source: 'Arbitration Counsel Referral' },
          { name: 'Director of Legal & Land Affairs', org: 'Oberoi Realty Ltd', industry: 'Real Estate', location: 'Goregaon East, Mumbai', source: 'MahaRERA Advisory Search' },
          { name: 'Head of Regulatory Affairs', org: 'Razorpay & Payments Group', industry: 'Fintech & RBI Compliance', location: 'Bangalore / Mumbai', source: 'Fintech Regulatory Search' },
          { name: 'Managing Counsel', org: 'Mitsui & Co. Infrastructure', industry: 'Commercial Contracts', location: 'Tokyo / Mumbai Desk', source: 'Cross-Border Investment Search' }
        ];
        const next = pool[Math.floor(Math.random() * pool.length)];
        const updated = DS.setVisitorSession(next);
        const disp = document.getElementById('current-visitor-identity-display');
        if (disp) {
          disp.innerHTML = `<strong>Browsing as:</strong> ${updated.name} (${updated.org}) &bull; <span style="color:#64748b;">${updated.location}</span>`;
        }
        showToast(`Identity switched to: ${updated.name} (${updated.org})`, 'fa-user-pen');
      });
    }
  }

  /* ============================================================
     15. INITIALIZATION ON DOM READY
     ============================================================ */
  function initializeAll() {
    renderAttorneysFromStore();
    initHeroSlider();
    initStoryTimeline();
    initPracticeAreas();
    initAttorneys();
    initInsights();
    initLiveSearch();
    initLegalTools();
    initConsultationForm();
    initBciDisclaimer();
    initCookieBanner();
    initModals();
    initHeaderAndNav();
    applyLiveSettings();
    initVisitorTracking();

    // Listen for real-time datastore changes made in the Admin Portal
    window.addEventListener('lga-datastore-updated', () => {
      renderAttorneysFromStore();
      applyLiveSettings();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }

})();


