import {
	ChangeEvent,
	ChangeEventHandler,
	FC,
	ReactElement,
	useEffect,
	useState,
} from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

import { Contact, IContacts, IPropsContactItem } from '../../../interface';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList: FC = (): ReactElement => {
	const [query, setQuery] = useState({
		text: '',
	});
	const [state, setState] = useState<IContacts>({
		loading: false,
		contacts: [],
		filterContacts: [],
		errorMessage: '',
	});

	useEffect((): void => {
		const getContacts = async (): Promise<void> => {
			try {
				setState({ ...state, loading: true });
				const response = await ContactService.getAllContacts();
				setState({
					...state,
					loading: false,
					contacts: response.data,
					filterContacts: response.data,
				});
			} catch (error: any) {
				setState({ ...state, loading: false, errorMessage: error.message });
			}
		};
		getContacts();
	}, []);

	const onDelete = async (id: string): Promise<void> => {
		try {
			const response = await ContactService.deleteContact(id);
			if (response) {
				setState({ ...state, loading: true });
				const response = await ContactService.getAllContacts();
				setState({ ...state, loading: false, contacts: response.data });
			}
		} catch (error: any) {
			setState({ ...state, loading: false, errorMessage: error.message });
		}
	};

	// Search contacts
	const onSearch: ChangeEventHandler = (
		event: ChangeEvent<HTMLInputElement>
	): void => {
		setQuery({ ...query, text: event.target.value });

		if (!state.contacts || event.target.value === '') {
			setState({ ...state, filterContacts: state.contacts });
		} else {
			const filterContacts = state.contacts.filter(
				(contact: Contact): boolean => {
					return contact.name!.toLowerCase().includes(query.text.toLowerCase());
				}
			);
			setState({ ...state, filterContacts });
		}
	};

	const { loading, filterContacts } = state;

	return (
		<>
			{/* <pre>{JSON.stringify(contacts)}</pre> */}
			<section>
				<div className='container'>
					<div className='px-4 md:px-14'>
						<div className='row flex w-full flex-col'>
							<div className='col'>
								<div className='flex items-center space-x-2'>
									<p className='text-3xl font-bold text-black'>
										Contact Manager
									</p>

									<Link
										to={'/contacts/add'}
										className='flex items-center space-x-2 rounded border border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white transition-all duration-300 ease-out hover:bg-transparent hover:text-blue-700'
									>
										<FaPlusCircle />
										<span>New</span>
									</Link>
								</div>

								<p className='pb-4 italic text-black'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Repellendus, ut repellat. Repellendus excepturi, itaque
									voluptatibus ipsam ut distinctio. Vel consequatur commodi ad,
									numquam voluptates molestias voluptas. Architecto tenetur
									beatae cupiditate?
								</p>
							</div>
						</div>

						<div className='row flex flex-col'>
							<div className='col flex flex-col'>
								<form className='row flex items-center space-x-5'>
									<div className='col w-full lg:w-1/2'>
										<div className=''>
											<input
												className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
												name='text'
												type='text'
												placeholder='Search Names'
												value={query.text}
												onChange={onSearch}
											></input>
										</div>
									</div>

									<div className='col'>
										<div className=''>
											<button
												type='submit'
												className='rounded border border-gray-800 bg-transparent py-2 px-4 font-semibold text-gray-800 transition-all duration-300 ease-out hover:border-transparent hover:bg-gray-800 hover:text-white'
											>
												Search
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			{loading ? (
				<Spinner />
			) : (
				<>
					<section className='contact-list'>
						<div className='container'>
							<div className='row'>
								{filterContacts &&
									filterContacts.map(contact => (
										<ContactItem
											key={contact.id}
											contact={contact}
											onDelete={onDelete}
										/>
									))}
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

interface IContactItemProps extends IPropsContactItem {
	onDelete: (id: string) => void;
}

const ContactItem: FC<IContactItemProps> = ({
	contact,
	onDelete,
}): ReactElement => {
	return (
		<div className='col-md-6'>
			<div className='card my-2'>
				<div className='card-body'>
					<div className='row align-items-center d-flex justify-content-around'>
						<div className='col-md-4'>
							<img src={contact.photo} alt='' className='contact-img' />
						</div>
						<div className='col-md-7'>
							<ul className='list-group'>
								<li className='list-group-item list-group-item-action'>
									Name : <span className='fw-bold'>{contact.name}</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Mobile : <span className='fw-bold'>{contact.mobile}</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Email : <span className='fw-bold'>{contact.email}</span>
								</li>
							</ul>
						</div>
						<div className='col-md-1 d-flex flex-column align-items-center'>
							<Link
								to={`/contacts/view/${contact.id}`}
								className='btn btn-warning my-1'
							>
								<i className='fa fa-eye' />
							</Link>
							<Link
								to={`/contacts/edit/${contact.id}`}
								className='btn btn-primary my-1'
							>
								<i className='fa fa-pen' />
							</Link>
							<button
								className='btn btn-danger my-1'
								onClick={(): void => onDelete(contact.id!)}
							>
								<i className='fa fa-trash' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactList;
