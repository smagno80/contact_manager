import {
	FC,
	ReactElement,
	useState,
	useEffect,
	ChangeEventHandler,
	ChangeEvent,
	FormEventHandler,
	FormEvent,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IContactGroups } from '../../../interface';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact: FC = (): ReactElement => {
	const { contactId } = useParams();
	// console.log(useParams());

	const navigate = useNavigate();
	const [state, setState] = useState<IContactGroups>({
		loading: false,
		contact: {
			name: '',
			photo: '',
			mobile: '',
			email: '',
			company: '',
			title: '',
			groupId: '',
		},
		groups: [],
		errorMessage: '',
	});

	useEffect((): void => {
		const getContact = async (): Promise<void> => {
			try {
				setState({ ...state, loading: true });
				const response = await ContactService.getContactById(contactId!);
				const groupResponse = await ContactService.getGroups();
				setState({
					...state,
					loading: false,
					contact: response.data,
					groups: groupResponse.data,
				});
			} catch (error: any) {
				setState({ ...state, loading: false, errorMessage: error.message });
			}
		};
		getContact();
	}, [contactId]);

	const handleChange: ChangeEventHandler = (
		event: ChangeEvent<HTMLInputElement>
	): void => {
		const { name, value } = event.target;
		setState({
			...state,
			contact: {
				...state.contact,
				[name]: value,
			},
		});
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();

		try {
			const response = await ContactService.updateContact(
				state.contact,
				contactId!
			);
			if (response) {
				navigate('/contacts/list', { replace: true });
			}
		} catch (error: any) {
			setState({ ...state, errorMessage: error.message });
			navigate(`/contacts/edit/${contactId}`, { replace: false });
		}
	};

	const { contact, groups, loading } = state;

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					{/* <pre>{JSON.stringify(contact)}</pre> */}
					<section className='add-contact p-3'>
						<div className='container'>
							<div className='row'>
								<div className='col'>
									<p className='h4 fw-bold text-primary'>Edit Contact</p>
									<p className='fst-italic'>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Minus officia fugit mollitia ipsum tempore eius
										reprehenderit aliquam praesentium, qui voluptatibus, aut
										expedita dolorem veritatis illum? Itaque sed facere possimus
										ea?
									</p>
								</div>
							</div>

							<div className='row align-items-center'>
								<div className='col-md-4'>
									<form onSubmit={handleSubmit}>
										<div className='mb-2'>
											<input
												type='text'
												className='form-control'
												placeholder='Name'
												name='name'
												value={contact.name}
												onChange={handleChange}
												required={true}
											/>
										</div>

										<div className='mb-2'>
											<input
												type='text'
												className='form-control'
												placeholder='Photo Url'
												name='photo'
												value={contact.photo}
												onChange={handleChange}
												required={true}
											/>
										</div>
										<div className='mb-2'>
											<input
												type='number'
												className='form-control'
												placeholder='Mobile'
												name='mobile'
												value={contact.mobile}
												onChange={handleChange}
												required={true}
											/>
										</div>
										<div className='mb-2'>
											<input
												type='email'
												className='form-control'
												placeholder='Email'
												name='email'
												value={contact.email}
												onChange={handleChange}
												required={true}
											/>
										</div>
										<div className='mb-2'>
											<input
												type='text'
												className='form-control'
												placeholder='Company'
												name='company'
												value={contact.company}
												onChange={handleChange}
												required={true}
											/>
										</div>
										<div className='mb-2'>
											<input
												type='text'
												className='form-control'
												placeholder='Title'
												name='title'
												value={contact.title}
												onChange={handleChange}
												required={true}
											/>
										</div>
										<div className='mb-2'>
											<select
												className='form-control'
												name='groupId'
												value={contact.groupId}
												onChange={handleChange}
												required={true}
											>
												<option value=''>Select a Group</option>
												{groups &&
													groups.map(group => {
														return (
															<option key={group.id} value={group.id}>
																{group.name}
															</option>
														);
													})}
											</select>
										</div>

										<div className='mb-2'>
											<input
												type='submit'
												className='btn btn-primary'
												value='Update'
											/>
											<Link to={`/contacts/list`} className='btn btn-dark ms-2'>
												Cancel
											</Link>
										</div>
									</form>
								</div>

								<div className='col-md-6'>
									<img src={contact.photo} alt='' className='contact-img' />
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

export default EditContact;
