import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  isLogin = true;

  toggle() {
    this.isLogin = !this.isLogin;
  }
  switchToLogin(){
    this.isLogin = true;
  }
}