import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherPagePage } from './weather-page.page';

describe('WeatherPagePage', () => {
  let component: WeatherPagePage;
  let fixture: ComponentFixture<WeatherPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
