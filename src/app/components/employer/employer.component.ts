import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/services/employer.service'

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html'
})
export class EmployerComponent implements OnInit {
  // object to hold the json list of employers
  employers: any
  // properties for an individual employer
  _id: string | undefined
  name: string | undefined
  region: string | undefined
  description: string | undefined

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

  // add new employer, properties auto-bound to the matching form inputs
  addEmployer(): void {
    // 1. create & populate new employer object
    let employer = {
      name: this.name,
      region: this.region,
      description: this.description
    }
    // 2. Call the service, which calls the api, which saves to db
    this.service.addEmployer(employer).subscribe(response => {
      // 3. refresh the list
      this.getEmployers()
      // 4. clear the form
      this.clearForm()
    })
  }

  deleteEmployer(_id: string): void {
    if (confirm("Are you sure???")) {
      this.service.deleteEmployer(_id).subscribe(response => {
        this.getEmployers()
        this.clearForm()
      })
    }
  }

  selectEmployer(_id: string, name: string, region: string, description: string): void {
    this._id = _id
    this.name = name
    this.region = region
    this.description = description
  }

  updateEmployer(): void {
    let employer = {
      _id: this._id,
      name: this.name,
      region: this.region,
      description: this.description
    }

    this.service.updateEmployer(employer).subscribe(response => {
      this.getEmployers()
      this.clearForm()
    })
  }

  clearForm(): void {
    this._id = undefined
    this.name = undefined
    this.region = undefined
    this.description = undefined
  }
}
