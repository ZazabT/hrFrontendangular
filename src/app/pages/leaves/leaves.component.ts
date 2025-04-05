import { Component } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
@Component({
  selector: 'app-leaves',
  imports: [],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css'
})
export class LeavesComponent {


   constructor (private leaveService :LeaveService ) {}
  
    ngOnInit() {
      this.leaveService.getAllLeaves().subscribe((response)=> {
        console.log(response);
      })
    }
}
