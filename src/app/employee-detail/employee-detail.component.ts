import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee-detail.model';
import { EmployeeDetailService } from './employee-detail.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  empData: EmployeeModel[];
  isDescValue: boolean = false;
  column = 'name';
  emp2years = [];
  public searchstring:string;

  constructor(public employeeService: EmployeeDetailService) { }

  ngOnInit(): void {
    this.employeeService.getDataList().subscribe((data) => {
      this.empData = data;
      
      // GET the distinct department
      const element = [...new Set(this.empData.map(i => i.department))];
      console.log("Distinct Department", element);
      
      // GET the Count of candidate
      const count = Object.keys(this.empData).length;
      console.log("Candidate Count", count);

      // Candidate with more than 2 years of expereience
      this.emp2years = this.empData.filter(i => { 
        var joinDate = i.joining_date.split('/');
        return new Date().getTime() - new Date(parseInt(joinDate[2]), parseInt(joinDate[1]), parseInt(joinDate[0])).getTime() > 2*365*24*60*60*1000;
       });
      console.log("Candidate with more than 2 years of expereienc",this.emp2years);
    });
  }
 
  // Sort column 
  sort(element){
    this.isDescValue = !this.isDescValue; 
    this.column = element;
    let direction = this.isDescValue ? 1 : -1;

    this.empData.sort(function (a, b) {
      if (a[element] < b[element]) {
        return -1 * direction;
      }
      else if (a[element] > b[element]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }

  // Remove development candidate
  removeCandidate(index){
    this.empData.splice(index, 1); 
  }

}
