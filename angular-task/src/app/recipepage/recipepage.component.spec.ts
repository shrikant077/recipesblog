import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipepageComponent } from './recipepage.component';

describe('RecipepageComponent', () => {
  let component: RecipepageComponent;
  let fixture: ComponentFixture<RecipepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
