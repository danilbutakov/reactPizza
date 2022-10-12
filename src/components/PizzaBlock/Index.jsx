import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../redux/slices/cartSlice';

export const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
	isLoading,
}) => {
	const dispatch = useDispatch();
	const cartItem = useSelector((state) =>
		state.cart.items.find((obj) => obj.id === id),
	);

	const addedCount = cartItem ? cartItem.count : 0;

	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);

	const onClickAdd = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
		};
		dispatch(addItem(item));
	};

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				{isLoading ? (
					<ContentLoader
						speed={2}
						width={280}
						height={500}
						viewBox='0 0 280 500'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'>
						<circle cx='134' cy='136' r='125' />
						<rect x='0' y='279' rx='10' ry='10' width='280' height='23' />
						<rect x='0' y='326' rx='10' ry='10' width='280' height='88' />
						<rect x='0' y='436' rx='10' ry='10' width='95' height='30' />
						<rect
							x='125'
							y='427'
							rx='24'
							ry='24'
							width='152'
							height='45'
						/>
					</ContentLoader>
				) : (
					<>
						<Link to={`/pizza/${id}`}>
							<img
								className='pizza-block__image'
								src={imageUrl}
								alt='Pizza'
							/>
						</Link>
						<h4 className='pizza-block__title'>{title}</h4>
						<div className='pizza-block__selector'>
							<ul>
								{types.map((typeID) => (
									<li
										key={typeID}
										onClick={() => setActiveType(typeID)}
										className={activeType === typeID ? 'active' : ''}>
										{typeNames[typeID]}
									</li>
								))}
							</ul>
							<ul>
								{sizes.map((size, i) => (
									<li
										key={size}
										onClick={() => setActiveSize(i)}
										className={activeSize === i ? 'active' : ''}>
										{size} см.
									</li>
								))}
							</ul>
						</div>
						<div className='pizza-block__bottom'>
							<div className='pizza-block__price'>от {price} ₽</div>
							<button
								onClick={onClickAdd}
								className='button button--outline button--add'>
								<svg
									width='12'
									height='12'
									viewBox='0 0 12 12'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
										fill='white'></path>
								</svg>
								<span>Добавить</span>
								{addedCount > 0 && <i>{addedCount}</i>}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default PizzaBlock;
