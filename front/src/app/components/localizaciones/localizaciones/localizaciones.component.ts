import { Component, inject } from '@angular/core';
import { LocalizacionesService } from '../../../services/localizaciones/localizaciones.service';
import { Localizaciones } from '../../../interfaces/localizaciones';
import * as L from 'leaflet'

@Component({
  selector: 'app-localizaciones',
  imports: [],
  templateUrl: './localizaciones.component.html',
  styleUrl: './localizaciones.component.scss'
})
export class LocalizacionesComponent {

  localizacionServicio = inject(LocalizacionesService)
  listaLocalizaciones: Localizaciones[] = []
  localizacionesFiltradas: Localizaciones[] = []
  categorias: string[] = []
  selectedCategorias:string[]=[]
  map: any;
  markers: L.Marker[] = []

  ngOnInit(): void {
    this.getListaLocalizaciones();

  }

  ngAfterViewInit(): void {
    this.configMap()

  }

  configMap() {
    this.map = L.map('map').setView([41.38879000, 2.15899000], 13);
    console.log("mapa inicializado", this.map)


      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(this.map);

    const icon = L.icon({
      iconUrl: 'assets/placeholder.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    this.map.whenReady(() => {
      this.map.invalidateSize();
    });
  }

  cargarMarcadores(listaLocalizacionesMarcador:Localizaciones[]){
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = []

    listaLocalizacionesMarcador.forEach(localizacion =>{
      const marker = L.marker([localizacion.latitud,localizacion.longitud],{
        icon: L.icon({
          iconUrl: 'assets/placeholder.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        })
      }
    ).addTo(this.map);
    marker.bindPopup( `<b><h3>${localizacion.nombre}</h3></b>`)
  this.markers.push(marker)
  console.log(marker, "esto es el marker")
  });
}

  getListaLocalizaciones() {
    this.localizacionServicio.getLocalizaciones().subscribe((data: Localizaciones[]) => {
      this.listaLocalizaciones = data
      this.localizacionesFiltradas=data
      console.log(this.listaLocalizaciones)
      
      this.cargarMarcadores(this.listaLocalizaciones)
    })
  }

cambioCategoria(event:any, categoria:string){

  if(event.target.checked){
    this.selectedCategorias.push(categoria);
  }else{
    this.selectedCategorias = this.selectedCategorias.filter(res => res !== categoria);
  }
  this.filtrarPorCategoria();
}


filtrarPorCategoria(){
  if(this.selectedCategorias.length === 0){
    this.localizacionesFiltradas = [...this.listaLocalizaciones]
    console.log(this.localizacionesFiltradas)
  }else {
    this.localizacionesFiltradas = this.listaLocalizaciones.filter(localizacion => this.selectedCategorias.includes(localizacion.categoria))
  };
  this.cargarMarcadores(this.localizacionesFiltradas);
  }

  isCategoriaChecked(categoria:string): boolean{
    return this.selectedCategorias.includes(categoria)
  }

  centrarMapa(localizacion: Localizaciones){
    this.map.setView([localizacion.latitud,localizacion.longitud],14)

  }
}
