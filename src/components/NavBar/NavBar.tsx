import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { FaPhone } from 'react-icons/fa';

const NavBar: FC = (): ReactElement => {
	return (
		<>
			<nav className='h-20 bg-gray-800'>
				<div className='ml-10 flex h-full items-center md:ml-16'>
					<Link to={'/'} className='flex items-center space-x-2 text-2xl'>
						<FaPhone className='text-orange-400' />
						<span className='text-white'>Contact</span>
						<span className='text-orange-400'>Manager</span>
					</Link>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
