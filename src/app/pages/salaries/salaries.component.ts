import { Component } from '@angular/core';
import { SalaryService } from '../../services/salary.service';
@Component({
  selector: 'app-salaries',
  imports: [],
  templateUrl: './salaries.component.html',
  styleUrl: './salaries.component.css'
})
export class SalariesComponent {

  constructor (private salariesService :SalaryService ) {}
  ngOnInit() {
    this.salariesService.getAllSalaries().subscribe((response) => {
      console.log(response);
    })
  }
}
