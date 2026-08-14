import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'paises',
    loadComponent: () => import('./pages/weather-page/weather-page.page').then((m) => m.WeatherPagePage),
  },
  {
    path: 'detalle-clima',
    loadComponent: () => import('./components/detail-weather/detail-weather.component').then((m) => m.DetailWeatherComponent),
  },
  {
    path: '',
    redirectTo: 'paises',
    pathMatch: 'full',
  },
];
