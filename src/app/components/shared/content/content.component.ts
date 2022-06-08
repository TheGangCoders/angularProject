import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit(): void {
  }
  registerToggle(){
    this.registerMode = true;
  }
  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

}
