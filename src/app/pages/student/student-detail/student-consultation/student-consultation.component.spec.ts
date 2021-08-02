import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConsultationComponent } from './student-consultation.component';

describe('StudentConsultationComponent', () => {
  let component: StudentConsultationComponent;
  let fixture: ComponentFixture<StudentConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
