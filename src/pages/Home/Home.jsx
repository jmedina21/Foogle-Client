import './Home.scss'
import search from '../../assets/icons/search.svg'

export function Home(){

    return (
        <main className='home'>
            <h1 className='home__title'>foogle</h1>
            <div className='home__search-section'>
                <input type="text" className='home__search-bar' placeholder="Search all second hand market from one place"/>
                <img className='home__search-icon' src={search} alt="search" />
            </div>
        </main>
    )
}