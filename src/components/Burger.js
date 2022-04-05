import React from 'react'
import PropTypes from 'prop-types'

class Burger extends React.Component {

    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string
        }),
        index: PropTypes.string,
        addToOrder: PropTypes.func
    }

    render() {
        const { image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';

        return (
            <li className='menu-burger'>
                <div className='image-container'>
                    <img src={image} alt={name} />
                </div>

                <div className='burger-details'>
                    <h3 className='burger-name'>
                        {name}
                        <span className='price'>{price} ₽</span>
                    </h3>
                    <p>{desc}</p>
                    <button
                        className='buttonOrder'
                        disabled={!isAvailable}
                        onClick={() => this.props.addToOrder(this.props.index)}
                    >
                        {isAvailable ? 'Заказать' : 'Временно нет'}
                    </button>
                </div>
            </li>
        )
    }
}


export default Burger;