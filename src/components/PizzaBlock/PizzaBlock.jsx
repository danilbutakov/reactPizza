import React from 'react';
import ContentLoader from 'react-content-loader';


const PizzaBlock = ({ title, price, imageUrl, sizes, types, isLoading }) => {

    const [pizzaCount, setPizzaCount] = React.useState(0);
    const [activeType, setActiveType] = React.useState(0);
    const [activeSize, setActiveSize] = React.useState(0);
    const typeNames = ['тонкое', 'традиционное'];

    const onClickAdd = () => {
        setPizzaCount(pizzaCount + 1);
    }

    return (
        <div className="pizza-block">
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                    <h4 className="pizza-block__title">{title}</h4>
                    <div className="pizza-block__selector">
                        <ul>
                            {types.map((typeID) => (
                                <li key={typeID} onClick={() => setActiveType(typeID)} className={activeType === typeID ? 'active' : ''}>{typeNames[typeID]}</li>
                            ))}
                        </ul>
                        <ul>
                            {sizes.map((size, i) => (
                                <li key={size} onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''}>{size} см.</li>
                            ))}
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">от {price} ₽</div>
                        <button onClick={onClickAdd} className="button button--outline button--add">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="white"></path>
                            </svg>
                            <span>Добавить</span>
                            <i>{pizzaCount}</i>
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
export default PizzaBlock;