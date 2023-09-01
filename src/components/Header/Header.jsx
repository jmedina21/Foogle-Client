import './Header.scss'
import searchIcon from '../../assets/icons/MagnifyingGlass.svg'
import login from '../../assets/icons/login.svg'
import logo from '../../assets/logos/foogle_logo.png'
import favorites from '../../assets/icons/favorites.svg'
import github from '../../assets/icons/github.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Header({item}){

    const [search, setSearch] = useState(item)
    const navigate = useNavigate()

    function handleChange(e){
        setSearch(e.target.value)
    }

    function searchOnClick(){
        navigate(`search/${search}`)
    }

    function searchOnKeyDown(e){
        if(e.key === 'Enter'){
            navigate(`search/${search}`)
        }
    }
    return (
        <header className='header'>
            <div className='header__container'>
                <img src={logo} alt="logo" className='header__logo' />
                <div className='header__search-section'>
                    <input type="text" className='header__search-bar' onChange={handleChange} onKeyDown={searchOnKeyDown} placeholder="Search all second hand markets from one place"/>
                    <p className='header__search-btn' onClick={searchOnClick} >{`>`}</p>
                    <img className='header__search-icon' src={searchIcon} alt="search" />
                </div>
            <nav className='header__nav'>
                <Link to={'/signin'} className="menu__item">
                    <img className='header__item-icon' src={login} alt="signing" />
                    <p className='header__item-text'>SIGN IN</p>
                </Link>
                <Link to={'/favorites'} className="header__item">
                    <img className='header__item-icon' src={favorites} alt="signing" />
                    <p className='header__item-text'>FAVORITES</p>
                </Link>
                <a href='https://github.com/jmedina21/Foogle-Server.git' target='_blank' className="header__item">
                    <img className='header__item-icon' src={github} alt="signing" />
                    <p className='header__item-text'>GITHUB</p>    
                </a>
            </nav>
            </div>
        </header>
    )
}