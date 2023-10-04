import './Favorites.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import { FavoriteItem } from '../../components/FavoriteItem/FavoriteItem'
import { useNavigate } from 'react-router-dom'
import arrowUp from '../../assets/icons/arrow-up.svg'
import { EmptyBox } from '../../components/EmptyBox/EmptyBox'


export function Favorites(){

    const url = 'https://api.foogle.foo'

    const navigate = useNavigate()
    const item = ''

    const [isLogged, setIsLogged] = useState(false)
    const [products, setProducts] = useState([])
    const [showArrowUp, setShowArrowUp] = useState(false);
    const [filter, setFilter] = useState('relevance')

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowArrowUp(true);
            } else {
                setShowArrowUp(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/') 
        }
    }, [isLogged])

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLogged(true)
            axios
                .get(`${url}/products`, {
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
                    console.log(err)
                })
        }
    }, [])

    function logOut(){
        localStorage.removeItem('token')
        setIsLogged(false)
    }

    function getPriceValue(priceString, direction = 'asc') {
        if (priceString === 'Free' || priceString === null) return 0;
    
        const prices = priceString.replace(/[$,\\-]/g, '').split(' to ');
        const [minPrice, maxPrice] = prices;
    
        if (direction === 'asc') {
            return parseFloat(minPrice || 0);
        } else {
            return parseFloat(maxPrice || minPrice || 0);
        }
    }
    
    function sortProducts(products, filter) {
        if (filter === 'relevance') {
            return products;
        } else if (filter === 'priceAsc') {
            return [...products].sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
        } else if (filter === 'priceDesc') {
            return [...products].sort((a, b) => getPriceValue(b.price, 'desc') - getPriceValue(a.price, 'desc'));
        }
        return products;
    }
    
    const sortedProducts = sortProducts(products, filter);

    return (
        <main className='favorites'>
            <BurgerMenu isLogged={isLogged} logOut={logOut}/>
            <Header item={item} isLogged={isLogged} logOut={logOut} setFilter={setFilter}/>
            <div className='favorites__container'>
                {!products.length ?
                <div className='favorites__empty-container'>
                    <EmptyBox />
                    <p className='favorites__message'>No products found</p>
                </div>
                :
                sortedProducts.map((product) => {
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
            {showArrowUp && (
                <img src={arrowUp} alt="arrow up" className="arrow-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            )}
        </main>
    )
}