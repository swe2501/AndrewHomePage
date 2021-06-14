import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ExamplesComponent } from './examples/examples.component';
import { TeamComponent } from './examples/team/team.component';
import { WorksSharingComponent } from './examples/worksSharing/worksSharing.component';

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent, data: {animation: 'HomePage'} },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent ,data: {animation: 'LandingPage'}},
    { path: 'examples/login',       component: LoginComponent ,data: {animation: 'LoginPage'}},
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'examples/team',        component: TeamComponent ,data: {animation: 'TeamPage'}},
    { path: 'examples/worksSharing',component: WorksSharingComponent ,data: {animation: 'WorksSharing'}},
    { path: 'examples',             component: ExamplesComponent },
    { path: 'projects',             component: ProjectsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
