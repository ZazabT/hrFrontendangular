
export interface Salary {
    id: number;                  // int, primary key, autoincrement
    employeeId: number;          // int, foreign key to employees.id, not null
    amount: number;              // decimal(10,2), not null
    date: Date | string;         // date, not null
    createdAt: Date | string;    // timestamp, default now
  }