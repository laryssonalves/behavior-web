import { Component, OnInit } from '@angular/core';
import { Company } from './company.model';
import { CompanyService } from './company.service';


@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  company = new Company();

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
  }

  async submitCompany() {
    try {
      this.company.errors = null;
      this.company = await this.companyService.createCompany(this.company).toPromise();
    } catch (error) {
      this.company.errors = error.error;
    }
  }
}
