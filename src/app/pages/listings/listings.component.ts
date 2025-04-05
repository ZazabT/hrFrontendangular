import { Component } from '@angular/core';
import { JobListingService } from '../../services/job-listing.service';
@Component({
  selector: 'app-listings',
  imports: [],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {


  constructor (private jobListingService :JobListingService ) {}
    
      ngOnInit() {
        this.jobListingService.getAllJobListings().subscribe((response)=> {
          console.log(response);
        })
      }
}
