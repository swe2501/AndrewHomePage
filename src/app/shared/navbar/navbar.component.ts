import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { trigger } from '@angular/animations';
import { state } from '@angular/animations';
import { style } from '@angular/animations';
import { transition } from '@angular/animations';
import { animate } from '@angular/animations';
import { Input } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('trigerNavbarShow', [
          state('0', style({ opacity: 1 })),
            transition('* => *', [
              style({opacity: 0}),
              animate('3s ease', style({
              }))
            ])
        ]),
    ]
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    navbarService: NavbarService = new NavbarService();

    constructor(public location: Location, private element : ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    // ngAfterViewInit(){
    // }

    showNavImg(index){
        console.log('show:', document.getElementById('navImg'+index));
        // document.getElementById('navImg'+index).style.visibility = 'visible';
        document.getElementById('navImg'+index).style.opacity = '1';
        document.getElementById('navImg'+index).style.transition = '0.3s'
    }

    hideNavImg(index){
        console.log('hidden:', document.getElementById('navImg'+index));
        // document.getElementById('navImg'+index).style.visibility = 'hidden';
        document.getElementById('navImg'+index).style.opacity = '0';
        document.getElementById('navImg'+index).style.transition = '0.3s'
    }
    
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
  
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    toLinks(value){
        var element = document.getElementById(value);

          element.scrollIntoView();
    }
}
