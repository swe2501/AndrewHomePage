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
    animations: [
      //   trigger('loadLogo', [
      //     state('load', style({ height:'120px', width:'120px', transform: 'translateX(0%)'})),
      //       transition('void => *', [
      //         style({height:'100%',width:'100%'}),
      //         animate('2s ease', style({
      //           width:'120px',
      //           height:'120px'
      //         }))
      //       ])
      //   ]),
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
    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus2;

    initWidth = document.body.clientWidth;//螢幕寬度
    initHeight = window.screen.availHeight//螢幕高度

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
      this.loadLogo();
      this.loadLogoText();
    }

    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }
    
    loadLogo(){
      console.log('document.body.clientHeight:',document.body.clientHeight);
      console.log('window.screen.availHeight:',window.screen.availHeight);
      // document.getElementById('logo').style.width = '1000px';
      // console.log('z-index:',document.getElementById('logo').style);
      // this.logo.state = this.logo.state === 'init' ? 'startload' : 'init';
      // console.log('狀態2:',this.logo.state);

      // if(document.getElementById('logo')){
      //   return;
      // }

      // console.log('是什麼:',document.getElementById('logo'));
      var initOffsetY = (-this.initHeight/2)+75;
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
          return
        }
        variationWidth -= (this.initWidth-104)/240;
        // culmilativeOffsetY += (((this.initHeight+6300)/2))/(this.initWidth-104)/2;
        culmilativeOffsetY += (this.initHeight/3)/240; 
        culmilativeWidth = this.initWidth - variationWidth;
        document.getElementById('logo').style.width = variationWidth + 'px';
        document.getElementById('logo').style.left = culmilativeWidth/2+'px';
        document.getElementById('logo').style.right = culmilativeWidth/2+'px';
        document.getElementById('logo').style.top = culmilativeOffsetY+'px';
      },4)
    }

    loadLogoText(){
      document.getElementById('logoText').style.top = '52px';

      var initanimationOffsetX = (this.initWidth/2)-40;
      document.getElementById('logoText').style.left = initanimationOffsetX+'px';

      var initOffsetX = initanimationOffsetX;
      var culmilativeOffsetX = 0;
      var variationX ;
      var interval = setInterval(() => {
        if(culmilativeOffsetX > 80){
          // document.getElementById('logo').setAttribute('src','assets/img/RangerLogo/首頁/web logo 1.png');
          clearInterval(interval);
          return
        }
        culmilativeOffsetX += 1;
        variationX = initOffsetX - culmilativeOffsetX
        document.getElementById('logoText').style.left = variationX+'px';
      },12)
    }
}
