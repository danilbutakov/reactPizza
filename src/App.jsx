import React from 'react';
import AppContext from './context';

import Header from './components/Header';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Empty from './pages/Empty';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

function App() {
	const [searchValue, setSearchValue] = React.useState('');

	return (
		<div className='wrapper'>
			<AppContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/pizza/:id' element={<FullPizza />} />
						<Route path='*' element={<Empty />} />
					</Routes>
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
