export interface CaseAssessment {
  id: string;
  caseTitle: string;
  description: string;
  caseType: CaseType;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  aiAnalysis?: AIAnalysisResult;
}

export interface AIAnalysisResult {
  overallScore: number; // 0-100
  legalStrength: 'weak' | 'moderate' | 'strong' | 'very-strong';
  keyFindings: string[];
  recommendedActions: RecommendedAction[];
  potentialViolations: LegalViolation[];
  evidenceGaps: string[];
  estimatedTimeframe: string;
  confidenceLevel: number; // 0-100
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'legal' | 'evidence' | 'documentation' | 'filing';
  estimatedDuration: string;
  dueDate?: Date;
}

export interface LegalViolation {
  type: string;
  description: string;
  statute: string;
  severity: 'minor' | 'moderate' | 'major' | 'severe';
  evidence: string[];
}

export interface Evidence {
  id: string;
  title: string;
  description: string;
  type: EvidenceType;
  category: EvidenceCategory;
  file?: File;
  fileUrl?: string;
  uploadedAt: Date;
  tags: string[];
  relevanceScore?: number; // 0-100
  notes?: string;
}

export interface CaseTimeline {
  id: string;
  caseId: string;
  events: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'incident' | 'filing' | 'response' | 'deadline' | 'meeting';
  importance: 'low' | 'medium' | 'high';
  documents?: string[]; // Document IDs
}

export interface LegalDocument {
  id: string;
  title: string;
  type: DocumentType;
  template: string;
  content: string;
  status: 'draft' | 'review' | 'final' | 'filed';
  createdAt: Date;
  updatedAt: Date;
  generatedData?: Record<string, any>;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: DocumentCategory;
  fields: FormField[];
  template: string;
  previewImage?: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'checkbox' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[]; // for select fields
  validation?: FieldValidation;
}

export interface FieldValidation {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  customMessage?: string;
}

export interface CaseProgress {
  caseId: string;
  completedTasks: number;
  totalTasks: number;
  currentPhase: CasePhase;
  nextMilestone: string;
  estimatedCompletion: Date;
}

export enum CaseType {
  EMPLOYMENT_DISCRIMINATION = 'employment-discrimination',
  HOUSING_DISCRIMINATION = 'housing-discrimination',
  POLICE_MISCONDUCT = 'police-misconduct',
  VOTING_RIGHTS = 'voting-rights',
  EDUCATION_DISCRIMINATION = 'education-discrimination',
  DISABILITY_RIGHTS = 'disability-rights',
  LGBTQ_RIGHTS = 'lgbtq-rights',
  RELIGIOUS_DISCRIMINATION = 'religious-discrimination',
  OTHER = 'other'
}

export enum EvidenceType {
  DOCUMENT = 'document',
  PHOTO = 'photo',
  VIDEO = 'video',
  AUDIO = 'audio',
  EMAIL = 'email',
  TEXT_MESSAGE = 'text-message',
  WITNESS_STATEMENT = 'witness-statement',
  OFFICIAL_RECORD = 'official-record'
}

export enum EvidenceCategory {
  INCIDENT_DOCUMENTATION = 'incident-documentation',
  COMMUNICATION_RECORDS = 'communication-records',
  WITNESS_TESTIMONY = 'witness-testimony',
  EXPERT_ANALYSIS = 'expert-analysis',
  OFFICIAL_DOCUMENTS = 'official-documents',
  MEDICAL_RECORDS = 'medical-records',
  FINANCIAL_RECORDS = 'financial-records',
  OTHER = 'other'
}

export enum DocumentType {
  COMPLAINT = 'complaint',
  MOTION = 'motion',
  BRIEF = 'brief',
  AFFIDAVIT = 'affidavit',
  DEMAND_LETTER = 'demand-letter',
  FOIA_REQUEST = 'foia-request',
  SETTLEMENT_AGREEMENT = 'settlement-agreement',
  OTHER = 'other'
}

export enum DocumentCategory {
  FILING_DOCUMENTS = 'filing-documents',
  CORRESPONDENCE = 'correspondence',
  EVIDENCE_REQUESTS = 'evidence-requests',
  SETTLEMENT_DOCUMENTS = 'settlement-documents',
  PROCEDURAL_DOCUMENTS = 'procedural-documents'
}

export enum CasePhase {
  INTAKE = 'intake',
  INVESTIGATION = 'investigation',
  EVIDENCE_COLLECTION = 'evidence-collection',
  LEGAL_RESEARCH = 'legal-research',
  FILING_PREPARATION = 'filing-preparation',
  ACTIVE_LITIGATION = 'active-litigation',
  SETTLEMENT_NEGOTIATION = 'settlement-negotiation',
  RESOLUTION = 'resolution'
}

// Mock data interfaces for development
export interface MockDataSets {
  assessments: CaseAssessment[];
  evidence: Evidence[];
  documents: LegalDocument[];
  templates: DocumentTemplate[];
  timelines: CaseTimeline[];
}