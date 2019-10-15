import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COUNTRIES } from './countries';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {

  ALPHABET: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  COUNTRY_LIST = COUNTRIES;

  @Input() events: Observable<void>;
  @Output() countriesListUpdated: EventEmitter<any> = new EventEmitter();

  selectedCountries = [];
  selectedCharacter = 'A';
  eventsSubscription: any = {};

  constructor() { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => {
      this.selectedCountries = [];
    });
  }

  isCountrySelected(country: any): boolean {
    return this.selectedCountries.includes(country.name);
  }

  toggleCountrySelection(country: string): void {
    if (this.selectedCountries.includes(country)) {
      this.selectedCountries = this.selectedCountries.filter((c: string) => c !== country);
    } else {
      this.selectedCountries.push(country);
    }
    this.countriesListUpdated.emit(this.selectedCountries);
  }

}
