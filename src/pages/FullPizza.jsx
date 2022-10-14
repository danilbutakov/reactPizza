import axios from 'axios';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import styles from './FullPizza.module.scss';

const FullPizza = () => {
	const [pizza, setPizza] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { id } = useParams();

	const navigate = useNavigate();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://63343f9f433198e79dd3b5ea.mockapi.io/items/' + id,
				);
				setPizza(data);
				setIsLoading(false);
			} catch (error) {
				alert('Не удалось загрузить пиццу');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (isLoading) {
		return 'Загрузка....';
	}

	return (
		<div className={styles.container}>
			<div className={styles.pizza__container}>
				<img src={pizza.imageUrl} className={styles.img} alt='' />
				<div className={styles.pizza__info}>
					<h2>{pizza.title}</h2>
					<h3>{pizza.price} ₽</h3>
				</div>
			</div>
			<Link to='/' className={styles.btn}>
				<span>Вернуться назад</span>
			</Link>
		</div>
	);
};

export default FullPizza;
