import './Header.scss'
import search from '../../assets/icons/MagnifyingGlass.svg'
import login from '../../assets/icons/login.svg'
import logo from '../../assets/logos/foogle_logo.png'
import { Link } from 'react-router-dom'

export function Header(){

    return (
        <header className='header'>
            <Link to={'/'}> <img className='header__logo' src={logo} alt="logo" /> </Link>
            <Link to={'/signin'}>
                <div className='header__signin'>
                    <p className='header__signin-text'>SIGN IN</p>
                    <img src={login} alt="login" className='header__signin-icon' />
                </div>
            </Link>
            <div className='header__input-cont'>
                <input type="text" className='header__search-bar' placeholder="Search all second hand market from one place"/>
                <img className='header__search-icon' src={search} alt="search" />
            </div>
        </header>
    )
}