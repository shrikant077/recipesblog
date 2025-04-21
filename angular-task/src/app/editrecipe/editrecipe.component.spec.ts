import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrecipeComponent } from './editrecipe.component';

describe('EditrecipeComponent', () => {
  let component: EditrecipeComponent;
  let fixture: ComponentFixture<EditrecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditrecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
