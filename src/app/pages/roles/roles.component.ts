import { Component } from '@angular/core';
import { Irole } from '../../core/interceptors/Roles.module';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  roleList:Irole[]=[]



}
