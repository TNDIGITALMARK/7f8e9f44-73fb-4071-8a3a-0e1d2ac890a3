import {
  CaseAssessment,
  Evidence,
  LegalDocument,
  DocumentTemplate,
  CaseTimeline,
  AIAnalysisResult,
  RecommendedAction,
  LegalViolation,
  TimelineEvent,
  FormField,
  CaseType,
  EvidenceType,
  EvidenceCategory,
  DocumentType,
  DocumentCategory,
  CasePhase,
  MockDataSets
} from '@/types/legal-platform';

// Mock AI Analysis Results
export const mockAIAnalysis: AIAnalysisResult = {
  overallScore: 78,
  legalStrength: 'strong',
  keyFindings: [
    'Clear pattern of discriminatory behavior documented',
    'Multiple witnesses corroborate incidents',
    'Company policy violations well-documented',
    'Timeline supports retaliation claims'
  ],
  recommendedActions: [
    {
      id: '1',
      title: 'File EEOC Complaint',
      description: 'Initiate formal complaint with Equal Employment Opportunity Commission',
      priority: 'high',
      category: 'filing',
      estimatedDuration: '2-3 weeks',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Collect Additional Evidence',
      description: 'Gather email communications from the relevant time period',
      priority: 'medium',
      category: 'evidence',
      estimatedDuration: '1 week'
    },
    {
      id: '3',
      title: 'Document Witness Statements',
      description: 'Formal statements from colleagues who witnessed incidents',
      priority: 'high',
      category: 'evidence',
      estimatedDuration: '2 weeks'
    }
  ],
  potentialViolations: [
    {
      type: 'Employment Discrimination',
      description: 'Discriminatory treatment based on protected characteristics',
      statute: 'Title VII of the Civil Rights Act of 1964',
      severity: 'major',
      evidence: ['witness-statements', 'email-records', 'performance-reviews']
    },
    {
      type: 'Retaliation',
      description: 'Adverse employment action following complaint',
      statute: 'Title VII - Retaliation Provision',
      severity: 'moderate',
      evidence: ['timeline-documentation', 'policy-violations']
    }
  ],
  evidenceGaps: [
    'Need more documentation of company\'s response to initial complaint',
    'Missing performance reviews from before incident occurred',
    'Require written company policies related to discrimination'
  ],
  estimatedTimeframe: '6-12 months for EEOC process',
  confidenceLevel: 85
};

// Mock Case Assessments
export const mockCaseAssessments: CaseAssessment[] = [
  {
    id: 'case-1',
    caseTitle: 'Workplace Discrimination Case',
    description: 'Experienced discriminatory treatment and retaliation at workplace after filing internal complaint.',
    caseType: CaseType.EMPLOYMENT_DISCRIMINATION,
    urgencyLevel: 'high',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
    aiAnalysis: mockAIAnalysis
  },
  {
    id: 'case-2',
    caseTitle: 'Housing Access Denial',
    description: 'Denied housing application due to disability accommodation requests.',
    caseType: CaseType.HOUSING_DISCRIMINATION,
    urgencyLevel: 'medium',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
    aiAnalysis: {
      overallScore: 65,
      legalStrength: 'moderate',
      keyFindings: [
        'Clear denial based on disability status',
        'Failure to engage in interactive process',
        'Reasonable accommodation request documented'
      ],
      recommendedActions: [
        {
          id: '4',
          title: 'File HUD Complaint',
          description: 'Submit complaint to Housing and Urban Development',
          priority: 'high',
          category: 'filing',
          estimatedDuration: '3-4 weeks'
        }
      ],
      potentialViolations: [
        {
          type: 'Housing Discrimination',
          description: 'Discrimination based on disability status',
          statute: 'Fair Housing Act',
          severity: 'major',
          evidence: ['application-records', 'correspondence']
        }
      ],
      evidenceGaps: [
        'Need documentation of accommodation request details',
        'Require comparative evidence of similar applications approved'
      ],
      estimatedTimeframe: '4-8 months for HUD investigation',
      confidenceLevel: 72
    }
  }
];

// Mock Evidence
export const mockEvidence: Evidence[] = [
  {
    id: 'evidence-1',
    title: 'Discriminatory Email Chain',
    description: 'Email communications showing biased language and differential treatment',
    type: EvidenceType.EMAIL,
    category: EvidenceCategory.COMMUNICATION_RECORDS,
    uploadedAt: new Date('2024-01-16'),
    tags: ['discrimination', 'email', 'supervisor'],
    relevanceScore: 95,
    notes: 'Contains explicit discriminatory language from direct supervisor'
  },
  {
    id: 'evidence-2',
    title: 'Witness Statement - Jane Doe',
    description: 'Colleague witness statement corroborating discriminatory incidents',
    type: EvidenceType.WITNESS_STATEMENT,
    category: EvidenceCategory.WITNESS_TESTIMONY,
    uploadedAt: new Date('2024-01-18'),
    tags: ['witness', 'testimony', 'corroboration'],
    relevanceScore: 88,
    notes: 'Key witness who observed multiple incidents'
  },
  {
    id: 'evidence-3',
    title: 'Performance Review Records',
    description: 'Performance reviews showing sudden decline after complaint',
    type: EvidenceType.DOCUMENT,
    category: EvidenceCategory.OFFICIAL_DOCUMENTS,
    uploadedAt: new Date('2024-01-20'),
    tags: ['performance', 'retaliation', 'timeline'],
    relevanceScore: 82
  },
  {
    id: 'evidence-4',
    title: 'Incident Photos',
    description: 'Photos documenting workplace harassment incidents',
    type: EvidenceType.PHOTO,
    category: EvidenceCategory.INCIDENT_DOCUMENTATION,
    uploadedAt: new Date('2024-01-17'),
    tags: ['harassment', 'visual-evidence', 'workplace'],
    relevanceScore: 75
  }
];

// Mock Document Templates
export const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: 'template-1',
    name: 'EEOC Complaint Form',
    description: 'Standard Equal Employment Opportunity Commission complaint filing',
    category: DocumentCategory.FILING_DOCUMENTS,
    fields: [
      {
        id: 'complainant-name',
        label: 'Your Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full legal name'
      },
      {
        id: 'employer-name',
        label: 'Employer Name',
        type: 'text',
        required: true,
        placeholder: 'Name of employer/organization'
      },
      {
        id: 'discrimination-basis',
        label: 'Basis of Discrimination',
        type: 'select',
        required: true,
        options: ['Race', 'Color', 'Religion', 'Sex', 'National Origin', 'Age', 'Disability', 'Retaliation']
      },
      {
        id: 'incident-date',
        label: 'Date of Incident',
        type: 'date',
        required: true
      },
      {
        id: 'incident-description',
        label: 'Description of Incident',
        type: 'textarea',
        required: true,
        placeholder: 'Provide detailed description of discriminatory acts'
      }
    ],
    template: 'EEOC Complaint Template Content...'
  },
  {
    id: 'template-2',
    name: 'Demand Letter',
    description: 'Formal demand letter for civil rights violations',
    category: DocumentCategory.CORRESPONDENCE,
    fields: [
      {
        id: 'recipient-name',
        label: 'Recipient Name',
        type: 'text',
        required: true
      },
      {
        id: 'violation-type',
        label: 'Type of Violation',
        type: 'select',
        required: true,
        options: ['Employment Discrimination', 'Housing Discrimination', 'Police Misconduct', 'Other']
      },
      {
        id: 'damages-amount',
        label: 'Damages Sought',
        type: 'number',
        required: false,
        placeholder: 'Dollar amount if applicable'
      },
      {
        id: 'demand-description',
        label: 'Demand Description',
        type: 'textarea',
        required: true,
        placeholder: 'Specific actions or remedies demanded'
      }
    ],
    template: 'Demand Letter Template Content...'
  },
  {
    id: 'template-3',
    name: 'FOIA Request',
    description: 'Freedom of Information Act request template',
    category: DocumentCategory.EVIDENCE_REQUESTS,
    fields: [
      {
        id: 'agency-name',
        label: 'Government Agency',
        type: 'text',
        required: true,
        placeholder: 'Name of government agency'
      },
      {
        id: 'records-description',
        label: 'Records Requested',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the records you are seeking'
      },
      {
        id: 'date-range',
        label: 'Date Range',
        type: 'text',
        required: false,
        placeholder: 'e.g., January 1, 2023 - December 31, 2023'
      }
    ],
    template: 'FOIA Request Template Content...'
  }
];

// Mock Generated Documents
export const mockGeneratedDocuments: LegalDocument[] = [
  {
    id: 'doc-1',
    title: 'EEOC Complaint - Workplace Discrimination',
    type: DocumentType.COMPLAINT,
    template: 'template-1',
    content: 'Generated EEOC complaint content...',
    status: 'draft',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    generatedData: {
      complainantName: 'John Smith',
      employerName: 'ABC Corporation',
      discriminationBasis: 'Race',
      incidentDate: '2023-12-15'
    }
  },
  {
    id: 'doc-2',
    title: 'Demand Letter - ABC Corporation',
    type: DocumentType.DEMAND_LETTER,
    template: 'template-2',
    content: 'Generated demand letter content...',
    status: 'review',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-24'),
    generatedData: {
      recipientName: 'ABC Corporation HR Department',
      violationType: 'Employment Discrimination',
      damagesAmount: 50000
    }
  }
];

// Mock Timeline
export const mockTimeline: CaseTimeline = {
  id: 'timeline-1',
  caseId: 'case-1',
  events: [
    {
      id: 'event-1',
      date: new Date('2023-10-15'),
      title: 'Initial Discriminatory Incident',
      description: 'First documented instance of discriminatory treatment by supervisor',
      type: 'incident',
      importance: 'high'
    },
    {
      id: 'event-2',
      date: new Date('2023-11-02'),
      title: 'Internal Complaint Filed',
      description: 'Submitted formal complaint to HR department',
      type: 'filing',
      importance: 'high',
      documents: ['internal-complaint-doc']
    },
    {
      id: 'event-3',
      date: new Date('2023-11-20'),
      title: 'Retaliation Begins',
      description: 'Performance review downgraded, responsibilities reduced',
      type: 'incident',
      importance: 'high'
    },
    {
      id: 'event-4',
      date: new Date('2024-01-15'),
      title: 'Legal Consultation',
      description: 'Initial consultation with legal platform for case assessment',
      type: 'meeting',
      importance: 'medium'
    },
    {
      id: 'event-5',
      date: new Date('2024-02-15'),
      title: 'EEOC Filing Deadline',
      description: 'Deadline to file EEOC complaint (300 days from incident)',
      type: 'deadline',
      importance: 'high'
    }
  ]
};

// Consolidated mock data export
export const mockData: MockDataSets = {
  assessments: mockCaseAssessments,
  evidence: mockEvidence,
  documents: mockGeneratedDocuments,
  templates: mockDocumentTemplates,
  timelines: [mockTimeline]
};

// Helper functions for mock data
export const getCaseById = (id: string): CaseAssessment | undefined => {
  return mockData.assessments.find(assessment => assessment.id === id);
};

export const getEvidenceByCase = (caseId: string): Evidence[] => {
  // In a real app, evidence would be linked to cases
  return mockData.evidence;
};

export const getDocumentsByCase = (caseId: string): LegalDocument[] => {
  // In a real app, documents would be linked to cases
  return mockData.documents;
};

export const getTimelineByCase = (caseId: string): CaseTimeline | undefined => {
  return mockData.timelines.find(timeline => timeline.caseId === caseId);
};