import {
  LegalDocument,
  DocumentAnalysis,
  ComparisonResult,
  QAMessage,
  ChecklistItem,
  LawyerQuestion,
  LegalResource,
} from '../types/legal';

export const SAMPLE_RENTAL_DOCUMENT: LegalDocument = {
  id: 'doc-rental-demo-01',
  name: 'Residential_Rental_Agreement.pdf',
  type: 'Residential Rental Agreement',
  pageCount: 12,
  fileSize: '1.4 MB',
  uploadDate: '2026-09-18',
  isDemo: true,
  description: 'A standard residential tenancy agreement covering lease duration, security deposit, maintenance terms, and termination conditions for an apartment unit.',
  fullTextSections: [
    {
      sectionNumber: 'Section 1',
      heading: 'Parties and Leased Premises',
      page: 1,
      clauseId: 'clause-premises',
      paragraphs: [
        'This Residential Rental Agreement ("Agreement") is executed on this 1st day of October, 2026, by and between Landlord Properties LLC, having its principal address at Suite 400, Metro Tower, Downtown ("Landlord"), and Jane Doe ("Tenant").',
        'The Landlord agrees to lease to the Tenant, and the Tenant hereby agrees to take on lease, the residential premises situated at Unit 4B, 108 Greenview Residency, Park Road ("Premises"), for residential dwelling purposes only and for no other commercial or manufacturing purposes.'
      ]
    },
    {
      sectionNumber: 'Section 2',
      heading: 'Term of Tenancy and Renewal Terms',
      page: 1,
      clauseId: 'clause-renewal',
      paragraphs: [
        'The term of this tenancy shall commence on November 1, 2026, and shall continue for a fixed period of eleven (11) consecutive calendar months, expiring on September 30, 2027.',
        'Renewal Terms: Upon mutual written agreement of both parties delivered at least sixty (60) days prior to the expiration date, this Agreement may be renewed for an additional eleven (11) month tenure. Renewal may include an annual escalation of the monthly rent not exceeding five percent (5%) to seven percent (7%). Neither party shall be automatically bound to renewal without written endorsement.'
      ]
    },
    {
      sectionNumber: 'Section 3',
      heading: 'Rent and Payment Schedule',
      page: 2,
      clauseId: 'clause-rent',
      paragraphs: [
        'The monthly rent for the Premises shall be ₹24,000 (Rupees Twenty Four Thousand only), payable strictly in advance on or before the fifth (5th) calendar day of each operating month via bank electronic funds transfer.',
        'In the event that rent remains unpaid after the tenth (10th) day of the month, a recurring late fee of ₹500 per week shall automatically accrue until full liquidation of the arrears.'
      ]
    },
    {
      sectionNumber: 'Section 4',
      heading: 'Security Deposit and Deductions',
      page: 2,
      clauseId: 'clause-security-deposit',
      paragraphs: [
        'Upon execution of this Agreement, the Tenant shall deposit with the Landlord an interest-free refundable Security Deposit of ₹50,000 (Rupees Fifty Thousand only) as guarantee for the faithful performance of all covenants and obligations.',
        'The Security Deposit shall be returned to the Tenant within thirty (30) business days following full handover of the Premises, keys, and proof of utility clearance, subject to reasonable itemized deductions for documented physical damages exceeding normal wear and tear, unpaid rent, or utility arrears.'
      ]
    },
    {
      sectionNumber: 'Section 5',
      heading: 'Maintenance Responsibilities and Repairs',
      page: 3,
      clauseId: 'clause-maintenance',
      paragraphs: [
        'The Tenant covenants to maintain the interior of the Premises in a sanitary, tidy, and habitable condition throughout the term.',
        'Minor repairs up to ₹1,500 per occurrence resulting from daily wear and routine usage (including light bulbs, faucet washers, and minor fixture tightening) shall be borne by the Tenant. Major structural repairs, primary plumbing failures, roofing integrity, and electrical circuitry faults shall be the Landlord\'s responsibility, provided Tenant gives written notification within forty-eight (48) hours of discovery.'
      ]
    },
    {
      sectionNumber: 'Section 6',
      heading: 'Alterations and Additions',
      page: 3,
      clauseId: 'clause-alterations',
      paragraphs: [
        'The Tenant shall make no structural alterations, wall perforations, paint modifications, or electrical overhauls without the prior express written consent of the Landlord. Any unauthorized alterations shall be restored to initial condition at Tenant\'s sole expense prior to vacation.'
      ]
    },
    {
      sectionNumber: 'Section 7',
      heading: 'Termination and Notice Period',
      page: 4,
      clauseId: 'clause-termination',
      paragraphs: [
        'Either party may terminate this agreement by providing thirty (30) days advance written notice delivered via registered post or certified electronic mail.',
        'Lock-in Condition: Should the Tenant vacate or terminate the lease prior to the expiration of the initial six (6) month lock-in period without documented cause or landlord breach, the Security Deposit equivalent to one month rent shall be forfeited as liquidated damages to compensate for vacancy costs.'
      ]
    },
    {
      sectionNumber: 'Section 8',
      heading: 'Inspection and Entry Rights',
      page: 4,
      clauseId: 'clause-entry',
      paragraphs: [
        'The Landlord or authorized agents retain the right to enter the Premises during reasonable daylight hours (9:00 AM to 7:00 PM) for inspection, emergency maintenance, or displaying the unit to prospective tenants or purchasers, upon tendering at least twenty-four (24) hours prior written notice to the Tenant, except in cases of imminent emergency (fire, water leakage) where immediate entry is permitted.'
      ]
    },
    {
      sectionNumber: 'Section 9',
      heading: 'Subletting and Assignment',
      page: 5,
      clauseId: 'clause-subletting',
      paragraphs: [
        'The Tenant shall not assign, sublease, license, or transfer possession of the Premises or any part thereof to any third party, nor host long-term paying guests, without obtaining prior written approval from the Landlord.'
      ]
    },
    {
      sectionNumber: 'Section 10',
      heading: 'Quiet Enjoyment and Community Rules',
      page: 5,
      clauseId: 'clause-quiet-enjoyment',
      paragraphs: [
        'The Tenant shall be entitled to quiet and peaceful enjoyment of the Premises without unlawful interference by the Landlord. The Tenant agrees to comply with all building bylaws, noise ordinances after 10:00 PM, and waste disposal regulations established by the Resident Welfare Association.'
      ]
    },
    {
      sectionNumber: 'Section 11',
      heading: 'Indemnification and Limitation of Liability',
      page: 6,
      clauseId: 'clause-liability',
      paragraphs: [
        'The Tenant agrees to indemnify, defend, and hold harmless the Landlord from and against any and all claims, liabilities, damages, and legal costs arising from tenant negligence, guest conduct, or violation of applicable laws within the leased premises.',
        'The Landlord shall not be liable for any injury, loss, or theft of personal property belonging to Tenant or occupants, except where directly caused by the gross negligence or intentional misconduct of the Landlord.'
      ]
    },
    {
      sectionNumber: 'Section 12',
      heading: 'Governing Law and Dispute Resolution',
      page: 6,
      clauseId: 'clause-dispute',
      paragraphs: [
        'This Agreement shall be governed by and construed in accordance with the jurisdictional laws of the territory. Any dispute, controversy, or claim arising out of or relating to this Agreement shall first be submitted to mutual amicable mediation for twenty (20) days before either party may seek recourse through the competent civil courts.'
      ]
    }
  ]
};

export const SAMPLE_ANALYSIS: DocumentAnalysis = {
  id: 'analysis-rental-01',
  documentId: 'doc-rental-demo-01',
  documentName: 'Residential_Rental_Agreement.pdf',
  pageCount: 12,
  overview: 'This agreement outlines rental terms, payment obligations, termination conditions, and responsibilities of both parties.',
  clausesCount: 12,
  importantCount: 3,
  reviewCount: 2,
  obligationsCount: 5,
  keyClauses: [
    {
      id: 'clause-termination',
      documentId: 'doc-rental-demo-01',
      title: 'Termination & Notice Period',
      category: 'important',
      page: 4,
      sectionNumber: 'Section 7',
      originalText: 'Either party may terminate this agreement by providing thirty (30) days advance written notice delivered via registered post or certified electronic mail. Should the Tenant vacate or terminate the lease prior to the expiration of the initial six (6) month lock-in period without documented cause, the Security Deposit equivalent to one month rent shall be forfeited as liquidated damages.',
      plainExplanation: 'Either party can end the agreement, but written notice generally needs to be provided 30 days in advance. Note that leaving during the first 6 months triggers a forfeiture of 1 month of your security deposit.',
      checksToMake: [
        'How must the 30-day notice be delivered? (Registered mail or email is required)',
        'Are there any exceptions to the 6-month lock-in period for emergencies?',
        'Does the agreement specify exact move-out inspection handover procedures?'
      ],
      questionsToAsk: [
        'What happens if I receive a sudden job transfer during the first 6 months?',
        'Can I terminate without forfeiture if the landlord fails to fix critical defects?',
        'Is email notification sufficient, or is a physical letter mandatory?'
      ],
      riskLevel: 'high'
    },
    {
      id: 'clause-security-deposit',
      documentId: 'doc-rental-demo-01',
      title: 'Security Deposit & Deductions',
      category: 'important',
      page: 2,
      sectionNumber: 'Section 4',
      originalText: 'Upon execution of this Agreement, the Tenant shall deposit with the Landlord an interest-free refundable Security Deposit of ₹50,000. The Security Deposit shall be returned to the Tenant within thirty (30) business days following full handover of the Premises, subject to reasonable itemized deductions for documented physical damages.',
      plainExplanation: 'You pay a ₹50,000 refundable deposit upfront. The landlord has up to 30 business days after you move out to return it, and must provide itemized receipts for any damage deductions.',
      checksToMake: [
        'Are repair deduction thresholds clearly itemized in writing?',
        'Is 30 business days acceptable, or can it be shortened to 15 calendar days?',
        'Do you have a pre-move-in condition inspection signed by both parties?'
      ],
      questionsToAsk: [
        'Under what specific criteria can the landlord withhold any deposit funds?',
        'Will interest be earned on the deposit in an escrow account?',
        'What is the turnaround time if there is a dispute regarding wear-and-tear deductions?'
      ],
      riskLevel: 'medium'
    },
    {
      id: 'clause-renewal',
      documentId: 'doc-rental-demo-01',
      title: 'Renewal Terms & Rent Escalation',
      category: 'important',
      page: 1,
      sectionNumber: 'Section 2',
      originalText: 'Upon mutual written agreement delivered at least sixty (60) days prior to the expiration date, this Agreement may be renewed for an additional eleven (11) month tenure. Renewal may include an annual escalation of the monthly rent not exceeding five percent (5%) to seven percent (7%).',
      plainExplanation: 'The lease does not renew automatically. Both parties must agree in writing at least 60 days before expiration. Rent can increase by 5% to 7% upon renewal.',
      checksToMake: [
        'Mark the 60-day renewal deadline on your calendar (roughly day 270 of the lease).',
        'Ensure the rent escalation cap (maximum 7%) is respected in any extension agreement.',
        'Confirm whether a new agreement must be registered or notarized upon extension.'
      ],
      questionsToAsk: [
        'What happens if neither party gives notice 60 days prior to expiration?',
        'Does the agreement convert to month-to-month or automatically terminate?'
      ],
      riskLevel: 'low'
    },
    {
      id: 'clause-maintenance',
      documentId: 'doc-rental-demo-01',
      title: 'Maintenance Responsibilities',
      category: 'obligation',
      page: 3,
      sectionNumber: 'Section 5',
      originalText: 'Minor repairs up to ₹1,500 per occurrence resulting from daily wear and routine usage shall be borne by the Tenant. Major structural repairs, primary plumbing failures, roofing integrity, and electrical circuitry faults shall be the Landlord\'s responsibility, provided Tenant gives written notification within forty-eight (48) hours of discovery.',
      plainExplanation: 'You are responsible for paying small repairs under ₹1,500 (like changing bulbs or washers). The landlord must fix major structural or plumbing issues, but you must report them in writing within 48 hours.',
      checksToMake: [
        'Keep repair receipts and invoices for any reimbursed maintenance work.',
        'Always report serious leaks or electrical problems immediately in writing (not just by phone).'
      ],
      questionsToAsk: [
        'Who pays if multiple minor repairs occur in the same month exceeding ₹1,500 in total?',
        'What is the landlord response timeline for urgent structural repairs?'
      ],
      riskLevel: 'medium'
    },
    {
      id: 'clause-liability',
      documentId: 'doc-rental-demo-01',
      title: 'Indemnification & Liability Limits',
      category: 'review',
      page: 6,
      sectionNumber: 'Section 11',
      originalText: 'The Tenant agrees to indemnify, defend, and hold harmless the Landlord from and against any and all claims, liabilities, damages, and legal costs arising from tenant negligence, guest conduct, or violation of applicable laws within the leased premises.',
      plainExplanation: 'You are agreeing to protect and legally cover the landlord against claims or lawsuits resulting from your actions or your visitors\' actions on the premises.',
      checksToMake: [
        'Check if your renter\'s personal liability insurance covers tenant indemnification clauses.',
        'Ensure you are not held liable for pre-existing building defects or third-party neighbor actions.'
      ],
      questionsToAsk: [
        'Can this clause be narrowed to cover only "gross negligence" rather than general claims?',
        'Is the landlord held to a reciprocal indemnification standard for common areas?'
      ],
      riskLevel: 'high'
    },
    {
      id: 'clause-entry',
      documentId: 'doc-rental-demo-01',
      title: 'Inspection & Entry Rights',
      category: 'review',
      page: 4,
      sectionNumber: 'Section 8',
      originalText: 'The Landlord or authorized agents retain the right to enter the Premises during reasonable daylight hours (9:00 AM to 7:00 PM) for inspection or repairs, upon tendering at least twenty-four (24) hours prior written notice to the Tenant, except in cases of imminent emergency.',
      plainExplanation: 'The landlord must give at least 24 hours notice before entering the property for inspections or repairs, except in real emergencies like fires or burst pipes.',
      checksToMake: [
        'Confirm how notice must be sent (SMS, email, or WhatsApp message).',
        'Verify that inspections cannot occur without you or an authorized representative present.'
      ],
      questionsToAsk: [
        'Can I reschedule an inspection if the proposed 24-hour window conflicts with work?',
        'How many routine inspections are permitted per calendar year?'
      ],
      riskLevel: 'low'
    }
  ],
  thingsToReview: [
    {
      id: 'review-1',
      title: 'Six-Month Lock-in Clause Penalty',
      description: 'Terminating prior to 6 months results in immediate forfeiture of one full month of security deposit without exceptions for medical or employer relocations.',
      severity: 'high'
    },
    {
      id: 'review-2',
      title: 'Broad Tenant Indemnification',
      description: 'Section 11 holds tenant responsible for defending claims related to guest conduct without reciprocal protection for common area structural faults.',
      severity: 'high'
    },
    {
      id: 'review-3',
      title: '30-Day Security Deposit Refund Window',
      description: 'The return window is set to 30 business days (approx. 6 weeks), which is longer than standard 15-day practices.',
      severity: 'medium'
    }
  ],
  obligations: [
    {
      id: 'ob-1',
      actor: 'Tenant (You)',
      title: 'Monthly Rent Payment',
      description: 'Pay ₹24,000 on or before the 5th of each calendar month via bank transfer.',
      timeframe: '5th of each month'
    },
    {
      id: 'ob-2',
      actor: 'Tenant (You)',
      title: 'Minor Maintenance Costs',
      description: 'Bear costs of repairs under ₹1,500 resulting from routine usage.',
      timeframe: 'Ongoing'
    },
    {
      id: 'ob-3',
      actor: 'Tenant (You)',
      title: 'Report Major Structural Defects',
      description: 'Provide written notification to landlord within 48 hours of detecting major defects or leaks.',
      timeframe: 'Within 48 hours'
    },
    {
      id: 'ob-4',
      actor: 'Landlord',
      title: 'Deposit Refund & Itemization',
      description: 'Return ₹50,000 deposit within 30 business days with itemized receipts for any deductions.',
      timeframe: 'Within 30 business days post-move-out'
    },
    {
      id: 'ob-5',
      actor: 'Landlord',
      title: 'Advance Entry Notification',
      description: 'Provide at least 24 hours written notice before entering premises for routine checks.',
      timeframe: '24 hours prior'
    }
  ],
  potentialQuestions: [
    'What happens if I terminate the agreement early?',
    'Who is responsible for routine repairs versus major structural plumbing?',
    'When and under what conditions is the security deposit returned?',
    'Can the rent be increased during the first 11-month term?'
  ]
};

export const SAMPLE_COMPARISON_RESULT: ComparisonResult = {
  id: 'comp-v1-vs-v2',
  docAName: 'Rental_Agreement_V1.pdf',
  docBName: 'Rental_Agreement_V2.pdf',
  diffCount: 4,
  changedCount: 4,
  addedCount: 2,
  removedCount: 1,
  reviewCount: 3,
  summary: 'Document B extends notice periods, increases the security deposit by 50%, alters renewal mechanisms from automatic to manual, and shifts broader liability onto the tenant.',
  diffs: [
    {
      id: 'diff-1',
      clauseTitle: 'Termination Notice Period',
      docAValue: '30 days written notice',
      docBValue: '60 days written notice',
      changeType: 'changed',
      severity: 'high',
      whyItMatters: 'Doubling the notice period from 30 to 60 days gives you less flexibility if you need to relocate unexpectedly. You will need to plan moving out two months in advance to avoid deposit forfeiture.',
      actionRequired: 'Discuss whether a 60-day notice period aligns with your relocation timeline, and ask counsel about statutory notice periods in your area.'
    },
    {
      id: 'diff-2',
      clauseTitle: 'Security Deposit Amount',
      docAValue: '₹50,000 refundable',
      docBValue: '₹75,000 refundable',
      changeType: 'changed',
      severity: 'medium',
      whyItMatters: 'An increase of ₹25,000 (50% increase) locks up more liquidity during your tenancy. Refund conditions also tie up this larger capital amount.',
      actionRequired: 'Clarify with a legal professional whether the increased deposit conforms to local statutory limits, and consider asking for an escrow receipt.'
    },
    {
      id: 'diff-3',
      clauseTitle: 'Renewal Mechanism',
      docAValue: 'Automatic renewal unless notified',
      docBValue: 'Manual renegotiation required 60 days prior',
      changeType: 'changed',
      severity: 'medium',
      whyItMatters: 'In V1, your tenancy rolled over automatically. In V2, failing to send an explicit written renewal 60 days prior terminates your tenancy automatically, risking sudden eviction.',
      actionRequired: 'Check with counsel on default local renewal rules and mark critical written notification deadlines in advance.'
    },
    {
      id: 'diff-4',
      clauseTitle: 'Liability & Indemnification Scope',
      docAValue: 'Limited to tenant direct negligence',
      docBValue: 'Broader indemnity covering all guest actions and legal defense fees',
      changeType: 'review',
      severity: 'high',
      whyItMatters: 'V2 shifts significant third-party risk onto you. If a visitor suffers a slip or causes an incident, you could be contractually obligated to pay the landlord\'s legal fees.',
      actionRequired: 'Review the third-party indemnity language with a legal advisor to identify whether standard mutual negligence clauses apply.'
    }
  ]
};

export const SAMPLE_QA_MESSAGES: QAMessage[] = [
  {
    id: 'qa-msg-1',
    sender: 'user',
    text: 'What happens if I terminate early?',
    timestamp: '10:14 AM'
  },
  {
    id: 'qa-msg-2',
    sender: 'ai',
    text: 'Based on the uploaded demo agreement, Section 7 states that either party may terminate the agreement prior to the expiration date by providing thirty (30) days advance written notice. However, if the tenant vacates prior to the 6-month minimum lock-in period without documented cause, the landlord retains the right to forfeit one month\'s rent equivalent from the security deposit as liquidated damages.',
    timestamp: '10:14 AM',
    sourceReference: {
      documentName: 'Residential_Rental_Agreement.pdf',
      page: 4,
      section: 'Section 7',
      clauseTitle: 'Termination and Notice Period',
      textSnippet: 'Should the Tenant vacate or terminate the lease prior to the expiration of the initial six (6) month lock-in period without documented cause, the Security Deposit equivalent to one month rent shall be forfeited...'
    },
    relatedSections: ['Section 4 (Security Deposit)', 'Section 2 (Term of Tenancy)']
  }
];

export const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    text: 'Read termination notice conditions and lock-in period (Section 7)',
    category: 'Critical',
    completed: true,
    notes: 'Requires 30 days written notice; 6-month lock-in period applies'
  },
  {
    id: 'chk-2',
    text: 'Verify rent payment deadline and late payment surcharge (Section 3)',
    category: 'Compliance',
    completed: true,
    notes: 'Due on 5th of month; ₹500/week late fee after 10th'
  },
  {
    id: 'chk-3',
    text: 'Confirm renewal notification deadline (60 days prior to expiration)',
    category: 'Critical',
    completed: false,
    notes: 'Must send written notice on or before Day 270'
  },
  {
    id: 'chk-4',
    text: 'Keep a copy of signed agreement and security deposit payment receipt',
    category: 'Documentation',
    completed: false,
    notes: 'Obtain landlord signature and stamped receipt for ₹50,000'
  },
  {
    id: 'chk-5',
    text: 'Clarify liability and indemnification provisions with landlord (Section 11)',
    category: 'Clarification',
    completed: false,
    notes: 'Ask to restrict indemnification to tenant direct negligence'
  },
  {
    id: 'chk-6',
    text: 'Inspect premises and photograph pre-existing defects before moving in',
    category: 'Documentation',
    completed: false,
    notes: 'Document condition of fixtures to protect against deposit deductions'
  }
];

export const SAMPLE_LAWYER_QUESTIONS: LawyerQuestion[] = [
  {
    id: 'lq-1',
    question: 'Is the 6-month lock-in penalty legally enforceable if I must relocate for an emergency or job transfer?',
    context: 'Section 7 mandates forfeiture of 1 month deposit if vacated before 6 months.',
    category: 'Termination & Penalties'
  },
  {
    id: 'lq-2',
    question: 'How can we rephrase the blanket indemnification clause to protect against third-party accidents outside my control?',
    context: 'Section 11 requires tenant to defend and indemnify landlord from all claims on premises.',
    category: 'Liability & Risk'
  },
  {
    id: 'lq-3',
    question: 'Is 30 business days an acceptable statutory timeline for returning the security deposit in our jurisdiction?',
    context: 'Section 4 provides a 30 business day return window post-move-out.',
    category: 'Security Deposit'
  },
  {
    id: 'lq-4',
    question: 'Can the landlord unilaterally reject lease renewal if all terms have been faithfully complied with?',
    context: 'Section 2 requires mutual written consent without guarantee of extension.',
    category: 'Tenancy Rights'
  }
];

export const LEGAL_RESOURCES: LegalResource[] = [
  {
    id: 'res-housing',
    title: 'Understanding Residential Tenancy Agreements',
    category: 'Housing',
    readTime: '6 min read',
    description: 'A comprehensive guide on rental contracts, security deposit rules, repair obligations, and fair termination periods.',
    commonPitfalls: [
      'Overlooking lock-in clauses that enforce deposit forfeiture on early move-outs',
      'Failing to document pre-existing damages before taking physical possession',
      'Assuming verbal promises about renovations or maintenance are legally binding'
    ],
    whatToLookFor: [
      'Specific timelines for security deposit refunds (standard: 15-30 days)',
      'Threshold definition for minor tenant repairs vs structural landlord repairs',
      'Exact written notice requirements (post, registered mail, or verified email)'
    ]
  },
  {
    id: 'res-employment',
    title: 'Employment Contracts & Non-Compete Clauses',
    category: 'Employment',
    readTime: '8 min read',
    description: 'Key provisions in employment offers including probation terms, notice periods, intellectual property assignment, and non-solicitation.',
    commonPitfalls: [
      'Unreasonably broad non-compete covenants that restrict entire industries',
      'Vague bonus or incentive structures without guaranteed payment metrics',
      'Automatic assignment of off-hours personal intellectual property'
    ],
    whatToLookFor: [
      'Severance payment terms in involuntary separation scenarios',
      'Clear definition of company confidential information and trade secrets',
      'Reasonable geographic scope and time restrictions on restrictive covenants'
    ]
  },
  {
    id: 'res-consumer',
    title: 'Consumer Protection in Service Agreements',
    category: 'Consumer',
    readTime: '5 min read',
    description: 'Understanding your consumer rights when entering recurring memberships, SaaS agreements, and service subscriptions.',
    commonPitfalls: [
      'Hidden automatic renewal clauses with short cancellation windows',
      'Arbitration clauses that strip away the right to join collective remedies',
      'Unilateral vendor rights to modify pricing or terms without advance warning'
    ],
    whatToLookFor: [
      'Clear refund and prorated cancellation policies',
      'Defined service level agreements (SLAs) and remedies for downtime',
      'Transparent billing cadence and opt-out procedures'
    ]
  },
  {
    id: 'res-contracts',
    title: 'Commercial Contracts & Statement of Work Basics',
    category: 'Contracts',
    readTime: '7 min read',
    description: 'Fundamental elements of freelancer and business contracts: milestones, payment schedules, warranties, and force majeure.',
    commonPitfalls: [
      'Scope creep caused by ambiguous milestone acceptance criteria',
      'Uncapped indemnity clauses that expose personal assets to commercial disputes',
      'Payment terms exceeding 60-90 days without late interest protections'
    ],
    whatToLookFor: [
      'Formal acceptance period (typically 5-10 business days)',
      'Clear ownership transfer of work product only upon receipt of full payment',
      'Mutual limitation of liability capped at the contract fee'
    ]
  },
  {
    id: 'res-cybercrime',
    title: 'Digital Privacy, Data Rights & Cyber Safety',
    category: 'Cybercrime',
    readTime: '6 min read',
    description: 'Navigating website privacy policies, consent for biometric/financial data collection, and breach notification rights.',
    commonPitfalls: [
      'Agreeing to third-party data broker sharing hidden in cookie banners',
      'Ignoring cross-border data transfer disclosures for sensitive personal data',
      'Waiving liability for unauthorized data compromises and breach delays'
    ],
    whatToLookFor: [
      'Explicit right to request data erasure ("Right to be Forgotten")',
      'Specific notification timeline in case of security breaches (e.g. 72 hours)',
      'Clear contact information for the registered Data Protection Officer (DPO)'
    ]
  },
  {
    id: 'res-family',
    title: 'Family Law & Domestic Documentation Overview',
    category: 'Family',
    readTime: '9 min read',
    description: 'General informational overview of marital agreements, powers of attorney, guardianship declarations, and basic estate planning.',
    commonPitfalls: [
      'Using handwritten informal notes without statutory witness requirements',
      'Neglecting to update beneficiary designations following life changes',
      'Confusing general power of attorney with durable healthcare directives'
    ],
    whatToLookFor: [
      'Formal attestation and notarization requirements under local statutes',
      'Clear designation of alternate or successor decision-makers',
      'Revocation clauses clarifying that earlier instruments are superseded'
    ]
  },
  {
    id: 'res-legal-docs',
    title: 'Glossary of Common Legal Jargon & Terms',
    category: 'Legal Documents',
    readTime: '4 min read',
    description: 'Demystifying common Latin phrases and legal shorthand found in everyday agreements and contracts.',
    commonPitfalls: [
      'Confusing "Indemnify" (protect from loss) with simple "Warranty" (quality assurance)',
      'Misinterpreting "Liquidated Damages" as punitive penalties rather than pre-estimates',
      'Overlooking "Severability" clauses that keep remaining terms alive if one is struck down'
    ],
    whatToLookFor: [
      'Plain definitions of Force Majeure, Joint & Several Liability, and Jurisdiction',
      'Distinction between arbitration, mediation, and courtroom litigation',
      'Understanding why boilerplate "Miscellaneous" clauses have real consequences'
    ]
  }
];
