import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonSpinner} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather-service';
import { Pais } from '../../models/paises.model';
import { ClimaPaises } from '../../models/climapaises.model';

@Component({
 selector: 'app-detail-weather',
 templateUrl: './detail-weather.component.html',
 styleUrls: ['./detail-weather.component.scss'],
 standalone: true,
 imports: [IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonSpinner, FormsModule, CommonModule],
})
export class DetailWeatherComponent implements OnInit {
 paises: Pais[] = [];
 paisSeleccionado?: Pais | null = null;
 loading: boolean = false;
 resultado?: ClimaPaises | null = null;

 constructor(private http: HttpClient, private weatherService: WeatherService) { }

 ngOnInit() {
	 this.http.get<Pais[]>('assets/data/paises.json').subscribe((data) => {
		 this.paises = data;
	 });
 }

 onPaisChange() {
	 if (!this.paisSeleccionado) return;
	 this.consultarClima();
 }

 consultarClima() {
	 if (!this.paisSeleccionado) return;
	 this.loading = true;
	 this.resultado = null;
	 const lat = this.paisSeleccionado.lat;
	 const lon = this.paisSeleccionado.lon;
	 this.weatherService.getWeather(lat, lon).subscribe({
		 next: (resp: any) => {
			 const current = resp.current_weather;
			 const hourly = resp.hourly || {};
			 let humidity: number | undefined;
			 let apparent: number | undefined;
			 if (hourly.time && Array.isArray(hourly.time)) {
				 const idx = hourly.time.indexOf(current.time);
				 if (idx >= 0) {
					 humidity = hourly.relativehumidity_2m ? hourly.relativehumidity_2m[idx] : undefined;
					 apparent = hourly.apparent_temperature ? hourly.apparent_temperature[idx] : undefined;
				 }
			 }

			 this.resultado = {
				 country: this.paisSeleccionado!.pais,
				 capital: this.paisSeleccionado!.capital,
				 condition: this.weatherCodeToCondition(current.weathercode),
				 temperature: current.temperature,
				 apparent_temperature: apparent,
				 humidity: humidity,
				 windspeed: current.windspeed,
				 time: current.time,
			 };
			 this.loading = false;
		 },
		 error: () => {
			 this.loading = false;
		 }
	 });
 }

 private weatherCodeToCondition(code: number): string {
	 const map: { [k: number]: string } = {
		 0: 'Cielo despejado',
		 1: 'Principalmente despejado',
		 2: 'Parcialmente nublado',
		 3: 'Nublado',
		 45: 'Niebla',
		 48: 'Depósitos de escarcha',
		 51: 'Llovizna ligera',
		 53: 'Llovizna moderada',
		 55: 'Llovizna densa',
		 61: 'Lluvia ligera',
		 63: 'Lluvia moderada',
		 65: 'Lluvia intensa',
		 71: 'Nieve ligera',
		 73: 'Nieve moderada',
		 75: 'Nieve intensa',
		 80: 'Chubascos',
		 81: 'Chubascos fuertes',
		 82: 'Chubascos intensos',
	 };
	 return map[code] || 'Desconocido';
 }

}
