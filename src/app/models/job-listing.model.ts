// src/app/models/job-listing.model.ts
export type JobListingStatus = 'open' | 'closed'; // Enum type

export interface JobListing {
  id: number;                  // int, primary key, autoincrement
  jobPositionId: number;       // int, foreign key to jobPositions.id, not null
  jobTitle: string;            // varchar(255), not null
  jobRequirements: string;     // text, not null
  postedDate: Date | string;   // date, not null
  deadlineDate: Date | string; // date, not null
  status: JobListingStatus;    // mysqlEnum, default 'open'
  createdAt: Date | string;    // timestamp, default now
}