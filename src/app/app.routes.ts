import { Routes } from '@angular/router';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { ToastalertComponent } from './components/toastalert/toastalert.component';

export const routes: Routes = [
    {path: 'toast', component:ToastalertComponent, title: 'Toast Alert'},
];
