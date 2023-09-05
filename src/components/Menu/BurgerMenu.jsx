import './BurgerMenu.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import burger from '../../assets/icons/burger.svg'
import login from '../../assets/icons/login.svg'
import favorites from '../../assets/icons/favorites.svg'
import github from '../../assets/icons/github.png'
import logout from '../../assets/icons/logout.svg'

export function BurgerMenu({isLogged, logOut}){

    return (
        <Menu right width={ '170px' }  customBurgerIcon={ <img src={burger} /> }>
            {!isLogged ?
            <Link to={'/signin'} className="menu__item">
                <img className='menu__item-icon' src={login} alt="signing" />
                <p className='menu__item-text'>SIGN IN</p>
            </Link>
            :
            <div className='menu__item' onClick={logOut} >
                <img src={logout} alt="logout" className='home__item-icon' />
                <p className='menu__item-text' >Log out</p>
            </div>
            }
            {isLogged ?
                <Link to={'/favorites'} className="home__item">
                    <img className='menu__item-icon' src={favorites} alt="signing" />
                    <p className='menu__item-text'>FAVORITES</p>
                </Link>
                :
                <div className='home__item home__item--disabled'>
                    <img className='menu__item-icon' src={favorites} alt="signing" />
                    <p className='menu__item-text'>FAVORITES</p>
                </div>
                }
            <a href='https://github.com/jmedina21/Foogle-Server.git' target='_blank' className="menu__item">
                <img className='menu__item-icon' src={github} alt="signing" />
                <p className='menu__item-text'>GITHUB</p>    
            </a>
        </Menu>
    )
}