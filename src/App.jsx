import React from 'react';

import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Empty from './pages/Empty';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<Empty />} />
			</Route>
		</Routes>
	);
}

export default App;
