import React from 'react'

const Categories = () => {

    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((value, id) => (
                    <li onClick={() => setActiveIndex(id)} className={activeIndex === id ? 'active' : ''}>{value}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;