import './Header.scss'
import searchIcon from '../../assets/icons/MagnifyingGlass.svg'
import login from '../../assets/icons/login.svg'
import logo from '../../assets/logos/foogle_logo.png'
import favorites from '../../assets/icons/favorites.svg'
import github from '../../assets/icons/github.png'
import logout from '../../assets/icons/logout.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Header({item , isLogged, logOut}){

    const [search, setSearch] = useState(item)
    const navigate = useNavigate()

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleFocus() {
        setSearch('');
    }
    
    function searchOnClick(){
        navigate(`/search/${search}`)
    }

    function searchOnKeyDown(e){
        if(e.key === 'Enter'){
            navigate(`/search/${search}`)
        }
    }


    return (
        <header className='header'>
            <div className='header__container'>
                <Link className='header__logo-link' to={'/'}><img src={logo} alt="logo" className='header__logo' /></Link>
                <div className='header__search-section'>
                    <input type="text" className='header__search-bar' 
                        onChange={handleChange} 
                        onFocus={handleFocus} 
                        onKeyDown={searchOnKeyDown} 
                        value={search} 
                        placeholder="Search all second hand markets from one place"/>
                    <p className='header__search-btn' onClick={searchOnClick} >{`>`}</p>
                    <img className='header__search-icon' src={searchIcon} alt="search" />
                </div>
                <nav className='header__nav'>
                {!isLogged ?
                    <Link to={'/signin'} className="header__item">
                        <img className='home__item-icon' src={login} alt="signing" />
                        <p className='home__item-text'>SIGN IN</p>
                    </Link>
                    :
                    <div className='header__item' onClick={logOut} >
                        <img src={logout} alt="logout" className='home__item-icon' />
                        <p className='home__item-text' >LOG OUT</p>
                    </div>
                    }
                    {isLogged ?
                <Link to={'/favorites'} className="home__item">
                    <img className='home__item-icon' src={favorites} alt="signing" />
                    <p className='home__item-text'>FAVORITES</p>
                </Link>
                :
                <div className='home__item home__item--disabled'>
                    <img className='home__item-icon' src={favorites} alt="signing" />
                    <p className='home__item-text'>FAVORITES</p>
                </div>
                }   
                    {/* <a href='https://github.com/jmedina21/Foogle-Server.git' target='_blank' className="header__item">
                        <img className='header__item-icon' src={github} alt="signing" />
                        <p className='home__item-text'>GITHUB</p>    
                    </a> */}
                </nav>
            </div>
        </header>
    )
}