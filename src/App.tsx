import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// import './assets/main.css';
// import './assets/chrome-bug.css';

import NavBar from './components/NavBar/NavBar';
import ContactList from './components/contacts/ContactList/ContactList';
import AddContact from './components/contacts/AddContact/AddContact';
import EditContact from './components/contacts/EditContact/EditContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';

const App = (): ReactElement => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path={'/'} element={<Navigate to={'/contacts/list'} />} />
				<Route path={'/contacts/list'} element={<ContactList />} />
				<Route path={'/contacts/add'} element={<AddContact />} />
				<Route path={'/contacts/edit/:contactId'} element={<EditContact />} />
				<Route path={'/contacts/view/:contactId'} element={<ViewContact />} />
			</Routes>
		</>
	);
};

export default App;
