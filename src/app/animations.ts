import { style } from "@angular/animations";
import { animateChild } from "@angular/animations";
import { animate } from "@angular/animations";
import { group } from "@angular/animations";
import { query } from "@angular/animations";
import { transition } from "@angular/animations";
import { trigger } from "@angular/animations";

export const fadeAnimation =
  trigger('fadeAnimation', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({ opacity: 0 }),
        animate('0.5s' , style({opacity:1}))
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('0.5s ease-out', style({ opacity: 0 }))
        ]),
        query(':enter', [
          animate('0.5s ease-out', style({ opacity: 1 }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);