import './Header.scss'
// import search from '../../assets/icons/search.svg'
import search from '../../assets/icons/MagnifyingGlass.svg'
import logo from '../../assets/logos/foogle-logo.svg'

export function Header(){

    return (
        <header className='search'>
            <div className='search__container'>
                <div className='search__logo-input-cont'>
                    <input type="text" className='search__search-bar' placeholder="Search all second hand market from one place"/>
                    <img className='search__logo' src={logo} alt="logo" />
                </div>
                <img className='search__search-icon' src={search} alt="search" />
            </div>
        </header>
    )
}