import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCousineComponent } from './fav-cousine.component';

describe('FavCousineComponent', () => {
  let component: FavCousineComponent;
  let fixture: ComponentFixture<FavCousineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavCousineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavCousineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
