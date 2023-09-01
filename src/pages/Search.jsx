import './Search.scss'
import { Header } from '../components/Header/Header'
import { Listing } from '../components/Listing/Listing'
import { useParams } from 'react-router-dom'
import { BurgerMenu } from '../components/Menu/BurgerMenu'

export function Search(){

    const {item} = useParams()

    return (
        <main>
            <BurgerMenu />
            <Header item={item} />
            <Listing />
        </main>
    )
}