import './BurgerMenu.scss'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import burger from '../../assets/icons/burger.svg'
import login from '../../assets/icons/login.svg'
import favorites from '../../assets/icons/favorites.svg'
import logout from '../../assets/icons/logout.svg'
import bmc from '../../assets/icons/bmc-logo.svg'

interface BurgerMenuProps {
    isLogged: boolean
    logOut: React.MouseEventHandler<HTMLDivElement>
}

export function BurgerMenu({isLogged, logOut}: BurgerMenuProps){

    return (
        <Menu right width={ '170px' }  customBurgerIcon={ <img src={burger} /> }>
            {!isLogged ?
            <Link to={'/login'} className="menu__item">
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
                <a href="https://www.buymeacoffee.com/jpmm21" target='_blank' className="header__item">
                    <img className='menu__item-icon' src={bmc} alt="signing" />
                    <p className='menu__item-text'>BUY ME A COFFEE</p>
                </a>
        </Menu>
    )
}