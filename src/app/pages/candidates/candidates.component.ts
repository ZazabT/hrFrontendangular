import { Component } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
@Component({
  selector: 'app-candidates',
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {


  constructor (private candidateService :CandidateService ) {}
  
  ngOnInit() {
    this.candidateService.getAllCandidates().subscribe((response)=> {
      console.log(response);
    })
  }
}
