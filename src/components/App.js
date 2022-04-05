import React from 'react'
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import sampleBurgers from '../sample-burgers'
import Burger from './Burger';
import base from '../base';
import firebase from 'firebase/app';
import SignIn from './Auth/SignIn';

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    state = {
        burgers: {},
        order: {},
        adminMenuEnabled: false
    };

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.restaurantId)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        };
        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };


    addBurger = (burger) => {
        // 1. Делаем копию объекта state
        const burgers = { ...this.state.burgers }
        // 2. Добавить новый бургер в переменную burgers
        burgers[`burger${Date.now()}`] = burger;
        // 3. Записать наш новый объект burgers в state
        this.setState({ burgers })
    };

    updatedBurger = (key, updatedBurger) => {
        // 1. Делаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Обновляем нужный burger
        burgers[key] = updatedBurger;
        // 3. Записать наш новый объект burgers в state
        this.setState({ burgers });
    }

    deleteBurger = key => {
        // 1. Делаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Удаляем burger
        burgers[key] = null;
        // 3. Записать наш новый объект burgers в state
        this.setState({ burgers });
    }

    loadSampleBurgers = () => {
        this.setState({ burgers: sampleBurgers })
    }

    addToOrder = (key) => {
        // 1. Делаем копию объекта state
        const order = { ...this.state.order };
        // 2. Добавить ключ к заказу со значением 1, либо обновить текущее значение
        order[key] = order[key] + 1 || 1;
        // 3. Записываем наш новый объект order в объект state
        this.setState({ order });
    }

    deleteFromOrder = (key) => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    }

    handleLogOut = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    }

    toggleAdminMenu = () => {
        this.setState(({ adminMenuEnabled }) => ({ adminMenuEnabled: !adminMenuEnabled }));
    }

    render() {
        const { adminMenuEnabled, burgers } = this.state;
        return (
            <SignIn>
                <button onClick={() => this.toggleAdminMenu()}>{adminMenuEnabled ? 'Администратор' : 'Пользователь'}</button>
                <div className={adminMenuEnabled ? 'burger-paradise' : 'burger-paradise burger-paradise-menu-disabled'}>
                    <div className='menu'>
                        <Header title='Hot Burgers' />
                        <ul className='burgers'>
                            {Object.keys(burgers).map(key => {
                                return (
                                    <Burger
                                        key={key}
                                        index={key}
                                        addToOrder={this.addToOrder}
                                        details={burgers[key]}
                                    />
                                )
                            })}
                        </ul>
                    </div>

                    <Order
                        burgers={this.state.burgers}
                        order={this.state.order}
                        deleteFromOrder={this.deleteFromOrder}
                    />

                    {this.state.adminMenuEnabled
                        ? <MenuAdmin
                            addBurger={this.addBurger}
                            loadSampleBurgers={this.loadSampleBurgers}
                            burgers={this.state.burgers}
                            updatedBurger={this.updatedBurger}
                            deleteBurger={this.deleteBurger}
                            handleLogOut={this.handleLogOut}
                        />
                        : null}
                </div>
            </SignIn>
        )
    }
}


export default App;