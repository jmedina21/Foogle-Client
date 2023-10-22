import './Header.scss'
import searchIcon from '../../assets/icons/MagnifyingGlass.svg'
import login from '../../assets/icons/login.svg'
import logo from '../../assets/logos/Foogle_logo.png'
import favorites from '../../assets/icons/favorites.svg'
import logout from '../../assets/icons/logout.svg'
import bmc from '../../assets/icons/bmc-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

export function Header({item , isLogged, logOut, setFilter}){

    const [search, setSearch] = useState(item)
    const navigate = useNavigate()
    const inputRef = useRef(null)

    function handleChange(e){
        setSearch(e.target.value)
    }

    function handleFocus(e) {
        e.target.select();
    }
    
    function searchOnClick(){
        navigate(`/search/${search}`)
    }

    function searchOnKeyDown(e){
        if(e.key === 'Enter'){
            navigate(`/search/${search}`)
        }
    }

    function handleSort(e){
        setFilter(e.target.value)
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
                    <div className='header__filter'>
                        <p className='header__filter-label' >Order by:</p>
                        <select className='header__sort' onChange={handleSort}>
                            <option value="relevance">Relevance</option>
                            <option value="priceAsc">$ - $$$</option>
                            <option value="priceDesc">$$$ - $</option>
                        </select>
                    </div>
                </div>
                <nav className='header__nav'>
                {!isLogged ?
                    <Link to={'/login'} className="header__item">
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
                <a href="https://www.buymeacoffee.com/jpmm21" target='_blank' className="header__item">
                    <img className='home__item-icon' src={bmc} alt="signing" />
                    <p className='home__item-text'>BUY ME A COFFEE</p>
                </a>
                </nav>
            </div>
            
        </header>
    )
}