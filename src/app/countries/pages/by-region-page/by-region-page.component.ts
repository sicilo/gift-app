import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries : Array<ICountry> = [];

  constructor(private countriesService: CountriesService) { }

  searchByRegion(term: string): void {
    this.countriesService.searchRegion(term).subscribe(
      countries => {
        this.countries = countries;
      }
    )
  }
}
