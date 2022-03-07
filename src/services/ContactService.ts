import axios, { AxiosResponse } from 'axios';
import { Contact } from '../interface';

export class ContactService {
	static serverURL = `http://localhost:9000`;

	static getGroups(): Promise<AxiosResponse> {
		const dataURL = `${ContactService.serverURL}/groups`;
		return axios.get(dataURL);
	}

	static getGroupById(id: string): Promise<AxiosResponse> {
		const dataURL = `${ContactService.serverURL}/groups/${id}`;
		return axios.get(dataURL);
	}

	static getAllContacts = (): Promise<AxiosResponse> => {
		const dataURL = `${this.serverURL}/contacts`;
		return axios.get(dataURL);
	};

	static getContactById = (id: string): Promise<AxiosResponse> => {
		const dataURL = `${this.serverURL}/contacts/${id}`;
		return axios.get(dataURL);
	};

	static createContact(contact: Contact): Promise<AxiosResponse> {
		const dataURL = `${this.serverURL}/contacts`;
		return axios.post(dataURL, contact);
	}

	static updateContact(contact: Contact, id: string): Promise<AxiosResponse> {
		const dataURL = `${this.serverURL}/contacts/${id}`;
		return axios.put(dataURL, contact);
	}

	static deleteContact(id: string): Promise<AxiosResponse> {
		const dataURL = `${this.serverURL}/contacts/${id}`;
		return axios.delete(dataURL);
	}
}
