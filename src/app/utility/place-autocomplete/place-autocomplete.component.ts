import { Component, OnInit, Input } from '@angular/core';

import { Address } from "ngx-google-places-autocomplete/objects/address";
import { AddressComponent } from "ngx-google-places-autocomplete/objects/addressComponent";

import { CityService } from '../../services/city.service';
import { City } from '../../models/system/city';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.css']
})
export class PlaceAutocompleteComponent implements OnInit {

  @Input() selectedCity: any;
  cities: City[];
  filteredCities: City[];
  selectedCities: City[];

  @Input() addtessTitle: string;//父类传来的值
  @Input() initialAddress: string;
  @Input() province: string;
  @Input() postcode: string;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    if (this.addtessTitle == null || this.addtessTitle == "") {
      this.addtessTitle = "Please enter the address";
    }
    if (this.initialAddress == null || this.initialAddress == "") {
      this.initialAddress = this.addtessTitle;
    }
    this.cityService.getCities().then(cities => {
      this.cities = cities;
    });
  }

  filterCity(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      if (city.cityName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }
    this.filteredCities = filtered;
  }

  formattedaddress: string;
  houseNumber: string;
  street: string;
  country: string;
  keyinCity: string;

  options = {
    componentRestrictions: {
      country: ["CA", "US"]
    }
  }

  public AddressChange(address: any) {
    //setting address from API to local variable 
    this.formattedaddress = address.formatted_address;
    this.houseNumber = this.findType(address, "street_number");
    this.street = this.findType(address, "route");
    let city: string = this.findType(address, "locality");
    this.province = this.findType(address, "administrative_area_level_1");
    this.postcode = this.findType(address, "postal_code");
    this.country = this.findType(address, "country");
    //console.log("sublocality: " + this.findType(address, "sublocality"));
    //console.log("administrative_area_level_2: " + this.findType(address, "administrative_area_level_2"));
    //console.log("administrative_area_level_3: " + this.findType(address, "administrative_area_level_3"));
    //console.log("route: " + this.findType(address, "route"));
    //console.log("address : " + this.findType(address, "address "));
    //console.log("political : " + this.findType(address, "political "));
    //console.log("geocode  : " + this.findType(address, "geocode  "));
    this.selectedCity = {
      "cityName": city,
      "cityCode": city,
      "provinceName": this.province,
      "countryName": this.country,
    }
  }

  public setProvince(): void {
    if (this.selectedCity != null && this.selectedCity.provinceName != null) {
      this.province = this.selectedCity.provinceName;
    }
  }

  public cityOnBlur(): void {
    //因没有邮编的输入，所以当修改城市时清空邮编
    this.postcode = "";
  }

  public getAddress(): string {
    let r = (this.houseNumber ? this.houseNumber + " " : "") + (this.street ? this.street : "");
    if (r == null || r.trim() == "") {
      if (this.keyinCity == null || this.keyinCity.length < 3) {
        if (this.addtessTitle == this.initialAddress) {
          return "";
        } else {
          return this.initialAddress;
        }
      }
      return this.keyinCity;
    }
    return r;
  }

  public getCity(): string {
    if (typeof this.selectedCity == "string") {//被谷歌浏览器地址自动刷新时
      return this.selectedCity;
    }
    if (this.selectedCity == null || this.selectedCity.cityName == null) {
      return ""
    }
    return this.selectedCity.cityName;
  }

  public getProvince(): string {
    return this.province;
  }

  public getCountry(): string {
    return this.country;
  }

  public getPostcode(): string {
    return this.postcode;
  }

  private findType(addr: Address, type: string): string {
    let comp: AddressComponent = addr.address_components.find((item: AddressComponent) => item.types.indexOf(type) >= 0);
    return comp ? comp.short_name : "";
  }
}
