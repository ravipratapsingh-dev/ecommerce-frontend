import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  // 🔥 parent ko signal
  @Output() switchToLoginEvent = new EventEmitter<void>();

  constructor(private auth: AuthService) {}

  register() {

    if (!this.name || !this.email || !this.password){
      alert("All fields are required ❌");
      return;
    }

    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: (res) => {
        console.log("SUCCESS RESPONSE:", res);

        alert('Account created successfully ✅ Please login');

        // 🔥 form clear
        this.name = '';
        this.email = '';
        this.password = '';

        // 🔥 auto switch to login
        this.switchToLoginEvent.emit();
      },
      error: (err) => {
        console.log(err);

        if (err.status === 400) {
          alert("Email already exists ❌");
        } else {
          alert("Something went wrong ❌");
        }
      }
    });
  }
}