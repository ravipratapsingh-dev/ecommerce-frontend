import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  // 🔥 parent ko signal bhejne ke liye
  @Output() switchToRegister = new EventEmitter<void>();

   // 🔁 register pe switch button
  goToRegister() {
    this.switchToRegister.emit();
  }

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.login(data).subscribe((res:any) => {
      
        console.log("FULL RESPONSE:", res);

        const token = res.data;

        console.log("TOKEN:", token)

        localStorage.setItem('token', token);

        alert('Login successful ✅');

        // 🔥 redirect to dashboard
        this.router.navigate(['/dashboard']);
      }, (err) => {

        // 🔥 better error handling
        if (err.status === 404) {
          alert("User not found ❌ Please register first");
        } else if (err.status === 401) {
          alert("Wrong password ❌");
        } else {
          alert("Login failed ❌");
        }
      });
  }
}