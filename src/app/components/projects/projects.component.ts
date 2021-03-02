import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

    constructor() {
    }

  ngOnInit(): void {
  }


  toBig(event) {
    event.target.style.transform = 'scale(1.08)';
    event.target.style.transition = '0.7s';
    console.log('event is ', event);
    console.log('event.target is ', event.target);
  }
  toLittle(event) {
    event.target.style.transform = 'scale(1)';
  }
}
