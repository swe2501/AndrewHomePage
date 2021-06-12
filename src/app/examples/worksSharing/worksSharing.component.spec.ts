import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksSharingComponent } from './worksSharing.component';

describe('WorkSharingComponent', () => {
  let component: WorksSharingComponent;
  let fixture: ComponentFixture<WorksSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
