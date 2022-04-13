import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
    return (
        <div className='login-container'>
            <nav className='login'>
                <h2>Авторизация</h2>
                <p>Введите логин и пароль вашего аккаунта Github или войдите как Гость</p>
                <button className='github' onClick={() => props.authenticate()}>
                    Войти с помощью Github
                </button>
                <button className='github' onClick={() => props.demoAuth()}>
                    Войти как гость
                </button>
            </nav>
        </div>
    )
};

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login