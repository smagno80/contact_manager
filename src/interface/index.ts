export interface Contact {
	id?: string;
	name?: string;
	photo?: string;
	mobile?: string;
	email?: string;
	company?: string;
	title?: string;
	groupId?: string;
}

export interface ContactGroup {
	id?: string;
	name?: string;
}

export interface IContacts {
	loading: boolean;
	contacts: Contact[] | null;
	filterContacts: Contact[] | null;
	errorMessage: string;
}

export interface IContactGroups {
	loading: boolean;
	contact: Contact;
	groups: ContactGroup[] | null;
	errorMessage: string;
}

export interface IContactItem {
	loading: boolean;
	contact: Contact;
	errorMessage: string;
	group: ContactGroup;
}

export interface IPropsContactItem {
	contact: Contact;
	group?: ContactGroup;
}
