import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DetailWeatherComponent } from '../../components/detail-weather/detail-weather.component';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.page.html',
  styleUrls: ['./weather-page.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DetailWeatherComponent]
})
export class WeatherPagePage implements OnInit {

  constructor(private router: Router) {  }

  ngOnInit() {
  }

  goToDetailWeather() {
    this.router.navigate(['/detalle-clima']);
  }

}
