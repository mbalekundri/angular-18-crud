import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/Employee';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ToastalertComponent } from './components/toastalert/toastalert.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,MatCardModule,ToastalertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeFormGroup: FormGroup = new FormGroup({});
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];


  constructor(private toastr:ToastrService) {    
    this.createForm();
    this.employeeList = JSON.parse(localStorage.getItem('employeeData') || '[]');
  }

  showSuccess() {
    this.toastr.success('Saved successfully!', 'Success', {closeButton: true, progressBar: true,positionClass: 'toast-top-center',timeOut: 4000});
  }

  createForm() {
    this.employeeFormGroup = new FormGroup({
      id: new FormControl(this.employeeObj.id),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      email: new FormControl(this.employeeObj.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.employeeObj.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl(this.employeeObj.address, [Validators.required])
    });
  }

  onSave() {
    const empData = localStorage.getItem('employeeData');
    if (empData != null) {
        const parsedData = JSON.parse(empData);
        debugger;
        // Find the maximum ID in the existing employee list
        const maxId = parsedData.reduce((max: number, emp: Employee) => emp.id > max ? emp.id : max, 0);
        this.employeeFormGroup.controls['id'].setValue(maxId + 1);
        this.employeeList.push(this.employeeFormGroup.value);
        this.showSuccess();
    } else {
        // If no data exists, start with ID 1
        this.employeeFormGroup.controls['id'].setValue(1);
        this.employeeList.push(this.employeeFormGroup.value);
    }
    localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
    this.onReset();
}

  onReset() {
    this.employeeObj = new Employee();
    this.employeeObj.id = 1;
    this.createForm();
  }

  onEdit(item: Employee) {
    debugger
    this.employeeObj = item;
    this.createForm()
  }

  onDelete(emp: Employee) {
    const isDelete = confirm("Are you sure you want to delete this employee?");
    if (isDelete) {
      const index = this.employeeList.indexOf(emp);
      if (index > -1) {
        this.employeeList.splice(index, 1);
      }
      localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
      this.showSuccess();
    }    
  }

  updateEmployee() {
    const index = this.employeeList.findIndex(emp => emp.id === this.employeeObj.id);
    if (index > -1) {
      this.employeeList[index] = this.employeeFormGroup.value;
    }   
    localStorage.setItem('employeeData', JSON.stringify(this.employeeList));    
    this.onReset();
    this.showSuccess();
  }
 
}
