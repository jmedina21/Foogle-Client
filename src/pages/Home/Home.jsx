import './Home.scss'
import searchIcon from '../../assets/icons/MagnifyingGlass.svg'
import logo from '../../assets/logos/foogle_logo.png'
import { slide as Menu } from 'react-burger-menu'    
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'

export function Home(){

    const [search, setSearch] = useState('')
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
        <main className='home'>
            <BurgerMenu />
            <div className='home__container'>
                <img src={logo} alt="logo" className='home__logo' />
                <div className='home__search-section'>
                    <input type="text" className='home__search-bar' onChange={handleChange} onKeyDown={searchOnKeyDown} placeholder="Search all second hand market from one place"/>
                    <p className='home__search-btn' onClick={searchOnClick} >{`>`}</p>
                    <img className='home__search-icon' src={searchIcon} alt="search" />
                </div>
            </div>
        </main>
    )
}