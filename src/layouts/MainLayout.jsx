import React from 'react';
import { Outlet } from 'react-router-dom';

import AppContext from '../context';
import Header from '../components/Header';

const MainLayout = () => {
	const [searchValue, setSearchValue] = React.useState('');
	return (
		<div className='wrapper'>
			<AppContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Outlet />
				</div>
			</AppContext.Provider>
		</div>
	);
};

export default MainLayout;
