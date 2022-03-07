import { FC, ReactElement } from 'react';
import spinnerImg from '../../assets/img/loading.gif';

const Spinner: FC = (): ReactElement => {
	return (
		<>
			<div>
				<img
					src={spinnerImg}
					alt=''
					className='d-block m-auto '
					style={{ width: '200px' }}
				/>
			</div>
		</>
	);
};

export default Spinner;
