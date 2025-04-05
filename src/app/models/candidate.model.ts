// src/app/models/candidate.model.ts
export type CandidateStatus = 'applied' | 'interviewing' | 'offer' | 'rejected'; // Enum type

export interface Candidate {
  id: number;                  // int, primary key, autoincrement
  jobListingId: number;        // int, foreign key to jobListings.id, not null
  firstName: string;           // varchar(255), not null
  lastName: string;            // varchar(255), not null
  email: string;               // varchar(255), not null, unique
  phone: string | null;        // varchar(20), nullable
  address: string | null;      // varchar(255), nullable
  coverLetter: string;         // text, not null
  applicationDate: Date | string; // date, not null
  status: CandidateStatus;     // mysqlEnum, default 'applied'
  createdAt: Date | string;    // timestamp, default now
}