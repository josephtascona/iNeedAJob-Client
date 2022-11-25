import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/services/employer.service'

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html'
})
export class EmployerComponent implements OnInit {
  // object to hold the json list of employers
  employers: any

  constructor(private service: EmployerService) {}

  // get all employers from service, which gets them from the server api
  getEmployers(): void {
    this.service.getEmployers().subscribe(response => {
      this.employers = response
    })
  }

  ngOnInit(): void {
      this.getEmployers()
  }
}
