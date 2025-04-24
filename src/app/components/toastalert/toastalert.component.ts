import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-toastalert',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './toastalert.component.html',
  styleUrl: './toastalert.component.css'
})
export class ToastalertComponent {

  constructor(private toastr:ToastrService) { }

  showSuccess() {
    this.toastr.success('Saved successfully!', 'Success', {closeButton: true, progressBar: true,positionClass: 'toast-top-center',timeOut: 4000});
  }
  showError() {
    this.toastr.error('Hello world!', 'Toastr fun!', {closeButton: true, progressBar: true, positionClass: 'toast-top-center'});
  }

}
