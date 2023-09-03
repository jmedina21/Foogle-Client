import './BurgerMenu.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import burger from '../../assets/icons/burger.svg'
import login from '../../assets/icons/login.svg'
import favorites from '../../assets/icons/favorites.svg'
import github from '../../assets/icons/github.png'



export function BurgerMenu(){

    return (
        <Menu right width={ '170px' }  customBurgerIcon={ <img src={burger} /> }>
            <Link to={'/signin'} className="menu__item">
                <img className='menu__item-icon' src={login} alt="signing" />
                <p className='menu__item-text'>SIGN IN</p>
            </Link>
            <Link to={'/favorites'} className="menu__item">
                <img className='menu__item-icon' src={favorites} alt="signing" />
                <p className='menu__item-text'>FAVORITES</p>
            </Link>
            <a href='https://github.com/jmedina21/Foogle-Server.git' target='_blank' className="menu__item">
                <img className='menu__item-icon' src={github} alt="signing" />
                <p className='menu__item-text'>GITHUB</p>    
            </a>
        </Menu>
    )
}