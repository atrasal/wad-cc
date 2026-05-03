import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  user: any = {};

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }
}