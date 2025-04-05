
export interface JobPosition {
    id: number;                  // int, primary key, autoincrement
    jobTitle: string;            // varchar(255), not null, unique
    jobDescription: string;      // text, not null
    minSalary: number;           // decimal(10,2), not null
    maxSalary: number;           // decimal(10,2), not null
    departmentId: number;        // int, foreign key to departments.id, not null
    createdAt: Date | string;    // timestamp, default now
  }