import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.error(error);
    });
  }

  LoggedIn(){
    const token = localStorage.getItem('token');
    return!!token;//para retornar si true or false
  }

  logout(){
    localStorage.removeItem('token');
    this.model = null
  }
}
