import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { interval, Subscription } from 'rxjs';

@Component({
  templateUrl: './order.component.html',
  styleUrls:['./order.component.css']
})
export class OrderComponent implements OnInit {

  public options;
  public layersControl;
  public layers;
  public markerIcon;
  markers: L.Layer[] = [];
  map;
  subscription: Subscription;
  intervalId: number;
  data: number[][];
  i = -1;
  constructor(private authService: AuthenticationService, private headerService: HeaderService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.mapInIt();

    this.data = [[25.036743, 55.205310], [25.036628, 55.205376], [25.035930, 55.205792],
    [25.034823, 55.206486], [25.034088, 55.205810], [25.033418, 55.204247],
      [25.035042, 55.203283], [25.036424, 55.202799]];

    this.subscription = interval(2000)
      .subscribe(() => {
        if (this.data[this.i + 1]) {
          this.removeMarker(this.map, this.markers[this.i]);
          this.addMarker(this.data[this.i + 1][0], this.data[this.i + 1][1]);
          this.i++;
        }
      })
  }

  private mapInIt() {
   this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        })
      ],
      zoom: 14,
      center: latLng([46.879966, -121.726909])
    };
    this.markerIcon = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
      })
    };
  }

  removeMarker(map: L.Map, marker) {
    if (marker != undefined) 
        map.removeLayer(marker)
  }

  addMarker(lat, lng) {
    const newMarker = L.marker([lat, lng], this.markerIcon);
    this.markers.push(newMarker);

    newMarker.addTo(this.map);
    this.map.panTo(new L.LatLng(lat, lng));
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
