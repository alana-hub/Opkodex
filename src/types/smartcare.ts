export type Relationship = "child" | "spouse" | "dependent" | "";

export interface Address {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

export interface LocationGroup {
  sector: string;
  cells: string[];
  villages: Record<string, string[]>;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface FileUploads {
  identificationDocument: FileMetadata | null;
  insuranceDocument: FileMetadata | null;
}

export interface Dependent {
  fullName: string;
  relationship: Relationship;
}

export interface PrimarySponsor {
  fullName: string;
  nin: string;
  dateOfBirth: string;
  occupation: string;
  phone: string;
  email: string;
}

export interface InsuranceDetails {
  provider: string;
  policyId: string;
}

export interface VisitDetails {
  date: string;
  department: string;
}

export interface PatientRegistration {
  hospitalId: string;
  primarySponsor: PrimarySponsor;
  address: Address;
  dependent: Dependent | null;
  insurance: InsuranceDetails;
  documents: FileUploads;
  visit: VisitDetails;
  consentAccepted: boolean;
  submittedAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  district: string;
  province: string;
  specialties: string[];
  insurance: string[];
  description: string;
  registrationUrl: string;
  featured?: boolean;
}
