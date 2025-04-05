// src/app/models/employee.model.ts
export interface Employee {
  id: number;                  
  firstName: string;           
  lastName: string;            
  email: string;               
  phone: string | null;        
  address: string | null;   
  birthDate: Date | string | null; 
  hireDate: Date | string;     
  jobPositionId: number;      
  createdAt: Date | string;    
}