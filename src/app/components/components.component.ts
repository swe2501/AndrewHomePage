import { Component, OnInit, Renderer2, OnDestroy, ViewChildren, QueryList, HostListener } from '@angular/core';
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
import * as Rellax from 'rellax';
import { Input } from '@angular/core';
import { translate } from '@angular/localize/src/utils';

@Component({
    selector: 'ngbd-carousel-basic',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `],
    styleUrls: ['./component.component.scss'],
    animations: [
        trigger('loadSlogon', [
          state('init', style({ opacity: 1 })),
            transition('void => *', [
              style({opacity: 0}),
              animate('3.1s ease', style({
              }))
            ])
        ]),
      //   trigger('loadLogoText', [
      //     state('load', style({ transform: 'translateY(400%), translateX(100%)' })),
      //       transition('void => *', [
      //         style({transform: 'translateY(400%), translateX(100%)'}),
      //         animate('1s ease-in')
      //       ])
      // ]),
    ]
})

export class ComponentsComponent implements OnInit, OnDestroy {
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    aboutRangerImage = "../../assets/img/RangerLogo/首頁/Rectangle 4.png"
    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus2;

    isLogoAnimationFinish = false;
    isLogoTextAnimationFinish = false;

    initWidth = window.innerWidth;//螢幕寬度
    initHeight = window.innerHeight//螢幕高度

    isOpen = true;
    interval;
    toggle(){
        this.isOpen = !this.isOpen;
    }

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

    ngAfterViewInit(){
      console.log('寬度:',document.body.clientWidth);
      // console.log('navbar:',document.querySelector('#navbar').setAttribute('hidden','true'));
      // console.log('document.getElementById("logoText-h1"):',document.getElementById("logoText-h1"));
      document.getElementById("slogon-h1").style.top = '104px';
      document.getElementById("slogon-h1").style.left = (this.initWidth/2)-(144/2)+'px';

      document.getElementById("slogon-h2").style.top = '156px';
      document.getElementById("slogon-h2").style.left = (this.initWidth/2)-(604.362/2)+'px';
      this.loadLogo();
      this.loadLogoText();
    }

    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }
    
    @HostListener('window:resize' , ['$event'])
    onResize(event){
      var browserWidth = window.innerWidth;//螢幕寬度
      var logoTag = document.getElementById('logo');
      var widthOflogoTag = Number(logoTag.style.width.substr(0,logoTag.style.width.indexOf('px')));
      var logoTextTag = document.getElementById('logoText');
      var widthOflogoTextTag = Number(logoTextTag.style.width.substr(0,logoTextTag.style.width.indexOf('px')));
      var logoH1 = document.getElementById('slogon-h1');
      var widthOflogoH1 = logoH1.offsetWidth;
      var logoH2 = document.getElementById('slogon-h2');
      var widthOflogoH2 = logoH2.offsetWidth;
      logoTag.style.left = (browserWidth/2)-(widthOflogoTag/2)+'px';
      logoTextTag.style.left = (browserWidth/2)-(widthOflogoTextTag/2)+'px';
      logoH1.style.left = (browserWidth/2)-(widthOflogoH1/2)+'px';
      logoH2.style.left = (browserWidth/2)-(widthOflogoH2/2)+'px';
    }

    loadLogo(){
      var initOffsetY = (-this.initHeight/2);
      document.getElementById('logo').style.width = this.initWidth+'px';
      document.getElementById('logo').style.left = '0px';
      document.getElementById('logo').style.top = initOffsetY+'px';

      var culmilativeWidth = 0;
      var variationWidth = this.initWidth;
      var culmilativeOffsetY = initOffsetY;
      var interval = setInterval(() => {
        if(variationWidth < 104){
          document.getElementById('logo').setAttribute('src','assets/img/RangerLogo/首頁/web logo 1.png');//到適當大小後，換成有陰影的logo
          clearInterval(interval);
          this.isLogoAnimationFinish = true;
          return
        }
        variationWidth -= (this.initWidth-104)/240;
        // culmilativeOffsetY += (3*this.initHeight/7)/240; 
        culmilativeOffsetY += ((this.initHeight/2)-104+52-10)/240;
        culmilativeWidth = this.initWidth - variationWidth;
        document.getElementById('logo').style.width = variationWidth + 'px';
        document.getElementById('logo').style.left = culmilativeWidth/2+'px';
        document.getElementById('logo').style.right = culmilativeWidth/2+'px';
        document.getElementById('logo').style.top = culmilativeOffsetY+'px';
      },4)
    }

    loadLogoText(){
      document.getElementById('logoText').style.top = '52px';
      document.getElementById('logoText').style.width = '241px';
      var initanimationOffsetX = (this.initWidth/2)-40;
      document.getElementById('logoText').style.left = initanimationOffsetX+'px';
      // document.getElementById('logoText1').style.left = initanimationOffsetX+'px';

      var initOffsetX = initanimationOffsetX;
      var culmilativeOffsetX = 0;
      var variationX ;
      var interval = setInterval(() => {
        if(culmilativeOffsetX > 80){
          // document.getElementById('logo').setAttribute('src','assets/img/RangerLogo/首頁/web logo 1.png');
          clearInterval(interval);
          this.isLogoTextAnimationFinish = true;
          return
        }
        culmilativeOffsetX += 1;
        variationX = initOffsetX - culmilativeOffsetX
        document.getElementById('logoText').style.left = variationX+'px';
        // document.getElementById('logoText1').style.left = variationX+'px';
      },12)
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
