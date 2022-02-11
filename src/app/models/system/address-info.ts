import { City } from './city';

export interface AddressInfo {
	id: number;
	city?: City;
	postalCode?: string;
	streetName?: string;
	longitude?: number;
	latitude?: number;
}
