import { Component, Input } from '@angular/core';
import { ICountry } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.css']
})
export class CountriesTableComponent {

  @Input()
  public countries: Array<ICountry> = [];
}
