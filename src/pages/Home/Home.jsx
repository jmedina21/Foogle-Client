import './Home.scss'
import searchIcon from '../../assets/icons/MagnifyingGlass.svg'
import logo from '../../assets/logos/Foogle_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import login from '../../assets/icons/login.svg'
import favorites from '../../assets/icons/favorites.svg'
import logout from '../../assets/icons/logout.svg'
import bmc from '../../assets/icons/bmc-logo.svg'

export function Home(){

    const [isLogged, setIsLogged] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'){
            setIsLogged(true)
        }
    }, [])
    
    function logOut(){
        localStorage.removeItem('token')
        setIsLogged(false)
    }

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
        <main className='home'>
            <BurgerMenu isLogged={isLogged} logOut={logOut} />
            <nav className='home__nav'>
                {!isLogged ?
                <Link to={'/login'} className="home__item">
                    <img className='home__item-icon' src={login} alt="signing" />
                    <p className='home__item-text'>SIGN IN</p>
                </Link>
                :
                <div className='home__item' onClick={logOut} >
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
            <div className='home__container'>
                <img src={logo} alt="logo" className='home__logo' />
                <div className='home__search-section'>
                    <input type="text" className='home__search-bar' onChange={handleChange} onKeyDown={searchOnKeyDown} placeholder="Search all second hand markets from one place"/>
                    <p className='home__search-btn' onClick={searchOnClick} >{`>`}</p>
                    <img className='home__search-icon' src={searchIcon} alt="search" />
                </div>
            </div>
        </main>
    )
}