import { Component, OnInit, Renderer2, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { NgbDateStruct, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    group,
    animateChild
    // ...
  } from '@angular/animations';
import { Logo } from './Logo.service';
import * as Rellax from 'rellax';
import { Input } from '@angular/core';
import { translate } from '@angular/localize/src/utils';
import { LogoText } from './logoText.service';

@Component({
    selector: 'ngbd-carousel-basic',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `],
    animations: [
        trigger('loadLogo', [
            state('startload', style({ height: '120px', width: '120px', position : 'relative',
            left: '120px'})),
              transition('* => startload', [
                style({height : '700px', width : '700px', position : 'relative',
                left: '120px'}),
                animate('2s ease', style({
                  width : '122px',
                  height : '122px',
                  position : 'relative',
                  left: '120px'
                }))
              ])
        ]),
        trigger('loadLogoText', [
          state('startloadText', style({ transform: 'translateY(250%)' })),
            transition('* => startloadText', [
              style({transform: 'translateY(250%)'}),
              animate('1s ease-in')
            ])
      ]),
    ]
})

export class ComponentsComponent implements OnInit, OnDestroy {
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus2;

    isOpen = true;
    interval;
    toggle(){
        this.isOpen = !this.isOpen;
    }

    logo:Logo = new Logo();
    logoText:LogoText = new LogoText();

    date: {year: number, month: number};
    model: NgbDateStruct;
    @ViewChildren(NgbSlide) slides: QueryList<NgbSlide>
    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;
    slideControl: any[] = []
    onSlide(event) {
      this.slides.forEach((x, index) => {
        if (x.id == event.current) {
          this.slideControl[index] = 'in' + event.direction
        }
        if (x.id == event.prev) {
          this.slideControl[index] = 'out' + event.direction
        }
      })
    }
    constructor( private renderer : Renderer2, config: NgbAccordionConfig) {
        config.closeOthers = true;
        config.type = 'info';
    }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
      var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');


    }
    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    startTimmer(){
        // console.log('進入',document.getElementById('logo').style.width.substr(0,document.getElementById('logo').style.width.indexOf('p')));
        // this.interval = setInterval(() => {
        //     if(Number(document.getElementById('logo').style.width.substr(0,document.getElementById('logo').style.width.indexOf('p'))) > 200) {
        //         console.log('進到!');
        //         document.getElementById('logo').style.width = (Number(document.getElementById('logo').style.width.substr(0,document.getElementById('logo').style.width.indexOf('p')))-5).toString()+'px';
        //     } 
        //     // else {
        //     //   this.timeLeft = 60;
        //     // }
        // },10)
    }

    loadLogo(){
      console.log('z-index:',document.getElementById('logo').style);
      this.logo.state = this.logo.state === 'init' ? 'startload' : 'init';
      console.log('狀態2:',this.logo.state);
  }

  loadLogoText(){
    this.logoText.state = this.logoText.state === 'init' ? 'startloadText' : 'init';
  }
}
