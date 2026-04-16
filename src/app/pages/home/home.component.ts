import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonImports } from '../../core/constants/CommonImports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
