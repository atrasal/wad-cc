import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private router: Router) {}

  login() {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.email === this.email && user.password === this.password) {
      alert("Login Success");
      this.router.navigate(['/profile']);
    } else {
      alert("Invalid Credentials");
    }
  }
}