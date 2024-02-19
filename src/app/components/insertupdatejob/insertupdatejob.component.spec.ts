import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertupdatejobComponent } from './insertupdatejob.component';



describe('InsertupdatejobComponent', () => {
  let component: InsertupdatejobComponent;
  let fixture: ComponentFixture<InsertupdatejobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertupdatejobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertupdatejobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
