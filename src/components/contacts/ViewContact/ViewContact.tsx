import { FC, ReactElement, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IContactItem, IPropsContactItem } from '../../../interface';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact: FC = (): ReactElement => {
	const [state, setState] = useState<IContactItem>({
		loading: false,
		contact: {},
		errorMessage: '',
		group: {},
	});
	const { contactId } = useParams();

	useEffect((): void => {
		(async (): Promise<void> => {
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
		})();
	}, [contactId]);

	const { loading, contact, group } = state;

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
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

			{loading ? (
				<Spinner />
			) : (
				<>
					{/* <pre>{JSON.stringify(group)}</pre> */}
					{Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
						<ContactItem contact={contact} group={group} />
					)}
				</>
			)}
		</>
	);
};

const ContactItem: FC<IPropsContactItem> = ({
	contact,
	group,
}): ReactElement => {
	return (
		<section className='view-contact-form m-3'>
			<div className='container'>
				<div className='row align-items-center'>
					<div className='col-md-4'>
						<img src={contact.photo} alt='' className='contact-img' />
					</div>
					<div className='col-md-8'>
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
							<li className='list-group-item list-group-item-action'>
								Company : <span className='fw-bold'>{contact.company}</span>
							</li>

							<li className='list-group-item list-group-item-action'>
								Title : <span className='fw-bold'>{contact.title}</span>
							</li>
							<li className='list-group-item list-group-item-action'>
								Group : <span className='fw-bold'>{group?.name}</span>
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

export default ViewContact;
