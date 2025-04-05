// src/app/models/leave.model.ts
export type LeaveType = 'sick' | 'vacation' | 'personal' | 'other'; // Enum type

export interface Leave {
  id: number;                  // int, primary key, autoincrement
  employeeId: number;          // int, foreign key to employees.id, not null
  startDate: Date | string;    // date, not null
  endDate: Date | string;      // date, not null
  leaveType: LeaveType;        // mysqlEnum, not null
  reason: string;              // text, not null
  createdAt: Date | string;    // timestamp, default now
}