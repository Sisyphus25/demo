import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  clientName = '';

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.clientName = localStorage.getItem('userId');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
