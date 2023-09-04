import './Favorites.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import { FavoriteItem } from '../../components/FavoriteItem/FavoriteItem'

export function Favorites(){

    const item = ''

    const [isLogged, setIsLogged] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLogged(true)
            axios
                .get('http://localhost:2121/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    if(!res.data.length){
                        setProducts([])
                        return
                    }
                    setProducts(res.data)})
                .catch(err => {
                    console.log(err.response.data)
                })
        }
    }, [])

    function logOut(){
        localStorage.removeItem('token')
        setIsLogged(false)
    }

    return (
        <main className='favorites'>
            <BurgerMenu isLogged={isLogged} logOut={logOut}/>
            <Header item={item} isLogged={isLogged} logOut={logOut}/>
            <div className='favorites__contianer'>
                {!products.length ?
                <p className='favorites__message'>No products found</p>
                :
                products.map(product => {
                    return (
                        <FavoriteItem 
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            imageUrl={product.image}
                            link={product.link}
                            location={product.location}
                            id={product.id}
                            setProducts={setProducts}
                        />
                    )
                })}
            </div>
        </main>
    )
}