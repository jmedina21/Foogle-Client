import './Home.scss'
import searchIcon from '../../assets/icons/MagnifyingGlass.svg'
import logo from '../../assets/logos/foogle_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import login from '../../assets/icons/login.svg'
import favorites from '../../assets/icons/favorites.svg'
import github from '../../assets/icons/github.png'
import logout from '../../assets/icons/logout.svg'

export function Home(){

    const [isLogged, setIsLogged] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')){
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
                <Link to={'/signin'} className="menu__item">
                    <img className='home__item-icon' src={login} alt="signing" />
                    <p className='home__item-text'>SIGN IN</p>
                </Link>
                :
                <div className='menu__item' onClick={logOut} >
                    <img src={logout} alt="logout" className='home__item-icon' />
                    <p className='home__item-text' >Log out</p>
                </div>
                }
                <Link to={'/favorites'} className="home__item">
                    <img className='home__item-icon' src={favorites} alt="signing" />
                    <p className='home__item-text'>FAVORITES</p>
                </Link>
                <a href='https://github.com/jmedina21/Foogle-Server.git' target='_blank' className="home__item">
                    <img className='home__item-icon' src={github} alt="signing" />
                    <p className='home__item-text'>GITHUB</p>    
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