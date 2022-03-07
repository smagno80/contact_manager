import { FC, ReactElement, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { IContactItem, IPropsContactItem } from '../../../interface';
import { ContactService } from '../../../services/ContactService';

const ViewContact: FC = (): ReactElement => {
	const [state, setState] = useState<IContactItem>({
		loading: true,
		contact: {},
		errorMessage: '',
		group: {},
	});
	const { contactId } = useParams();

	useEffect((): void => {
		const fetchData = async (): Promise<void> => {
			try {
				setState({ ...state, loading: true });
				const response = await ContactService.getContactById(contactId!);
				const groupResponse = await ContactService.getGroupById(
					response.data.groupId
				);
				setState({
					...state,
					loading: false,
					contact: response.data,
					group: groupResponse.data,
				});
			} catch (error: any) {
				setState({ ...state, loading: false, errorMessage: error.message });
			}
		};
		fetchData();
	}, [contactId]);

	const { loading, contact, group } = state;

	return (
		<>
			{/* <pre>{loading ? 'Cargando ...' : 'Cargado'}</pre> */}
			<section className='view-contact-intro p-3'>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<p className='h3 text-warning fw-bold'>View Contact</p>

							<p className='fst-italic'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
								rerum reiciendis assumenda dolor ex atque iusto hic quia nobis
								quod, debitis natus tempore eveniet explicabo veniam, ipsa
								voluptatibus illo consequuntur.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* <pre>{JSON.stringify(group)}</pre> */}
			{Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
				<ContactItem contact={contact} group={group} loading={loading} />
			)}
		</>
	);
};

interface IContactItemProps extends IPropsContactItem {
	loading: boolean;
}

const ContactItem: FC<IContactItemProps> = ({
	contact,
	group,
	loading,
}): ReactElement => {
	return (
		<section className='view-contact-form m-3'>
			<div className='container'>
				<div className='row align-items-center'>
					<div className='col-md-4'>
						{loading ? (
							<Skeleton
								circle
								height={200}
								width={200}
								containerClassName='avatar-skeleton'
							/>
						) : (
							<img src={contact.photo} alt='' className='contact-img' />
						)}
					</div>
					<div className='col-md-8'>
						<ul className='list-group'>
							<li className='list-group-item list-group-item-action'>
								<ShowData
									loading={loading}
									title={'Name'}
									field={contact.name}
								/>
							</li>
							<li className='list-group-item list-group-item-action'>
								<ShowData
									loading={loading}
									title={'Mobile'}
									field={contact.mobile}
								/>
							</li>
							<li className='list-group-item list-group-item-action'>
								<ShowData
									loading={loading}
									title={'Email'}
									field={contact.email}
								/>
							</li>
							<li className='list-group-item list-group-item-action'>
								<ShowData
									loading={loading}
									title={'Company'}
									field={contact.company}
								/>
							</li>
							<li className='list-group-item list-group-item-action'>
								<ShowData
									loading={loading}
									title={'Title'}
									field={contact.title}
								/>
							</li>
							<li className='list-group-item list-group-item-action'>
								<ShowData
									loading={loading}
									title={'Group'}
									field={group?.name}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className='row'>
					<div className='col'>
						<Link to={`/contacts/list`} className='btn btn-warning'>
							Back
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

interface IShowDataProps {
	loading: boolean;
	title: string;
	field: string | undefined;
}

const ShowData: FC<IShowDataProps> = ({
	loading,
	title,
	field,
}): ReactElement => {
	return (
		<>
			{loading ? (
				<Skeleton height={30} />
			) : (
				<>
					{title} : <span className='fw-bold'>{field}</span>
				</>
			)}
		</>
	);
};

export default ViewContact;
