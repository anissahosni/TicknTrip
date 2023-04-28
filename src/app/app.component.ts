import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  pageTitle = 'Mes prochains voyages';

  trips = [
    {
      startDate: '2023-05-22',
      endDate: '2023-05-25',
      city: 'Lisbon',
      checked: false,
      items: []
    },
    {
      startDate: '2023-07-01',
      endDate: '2023-07-08',
      city: 'New York',
      checked: false,
      items: [{ name: 'Chemises/Blouses (3)', checked: false }, { name: 'Pantalons/Shorts (2)', checked: false }, { name: 'Robes/Jupes (2)', checked: false }, { name: 'Pulls/Gilets (2)', checked: false }, { name: 'Veste légère (1)', checked: false }, { name: 'Maillots de bain (2)', checked: false }, { name: 'Sous-vêtements (suffisamment pour la durée du voyage)', checked: false }, { name: 'Chaussettes (suffisamment pour la durée du voyage)', checked: false }, { name: 'Chaussures confortables pour la marche (1 paire)', checked: false }, { name: 'Chaussures de soirée (1 paire)', checked: false }, { name: 'Sandales/Tongs (1 paire)', checked: false }, { name: 'Chapeau/casquette', checked: false }
      ]
    },
    {
      startDate: '2023-07-22',
      endDate: '2023-07-29',
      city: 'Paris',
      checked: false,
      items: []
    }
  ];

  constructor(private http: HttpClient) {}

  prepareSuitcase(index: any, trip: { startDate: any; endDate: any; city: any }) {
    const url = `http://localhost:8082/valise/generate`;
    const body = { departureDate: trip.startDate, arrivalDate: trip.endDate, location: trip.city };
    this.http.post(url, body).subscribe(
      (response: any) => {
        console.log('RESPONSE: ', response)
        const items = response;

        items.map((item: any) => {name: item; checked: false});

        this.trips[index].items = items;

        console.log('this.trips: ', this.trips);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
