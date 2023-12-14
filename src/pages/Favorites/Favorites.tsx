import './Favorites.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import { FavoriteItem } from '../../components/FavoriteItem/FavoriteItem'
import { useNavigate } from 'react-router-dom'
import arrowUp from '../../assets/icons/arrow-up.svg'
import { EmptyBox } from '../../components/EmptyBox/EmptyBox'

interface Product {
    _id: string
    title: string
    price: string
    image: string
    link: string
    location: string
}

type Filter = 'relevance' | 'priceAsc' | 'priceDesc'

export function Favorites(){

    const url = import.meta.env.VITE_API_URL

    const navigate = useNavigate()
    const item = ''

    const [isLogged, setIsLogged] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [showArrowUp, setShowArrowUp] = useState(false);
    const [filter, setFilter] = useState<Filter>('relevance')

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
        if(!sessionStorage.getItem('token')){
            navigate('/') 
        }
    }, [isLogged])

    useEffect(() => {
        async function getItems() {
            try {
                if(sessionStorage.getItem('token')){
                    setIsLogged(true)
                    const res = await axios.get(`${url}/products`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        }
                    })
                    if(!res.data.length){
                        setProducts([])
                        return
                    }
                }
            }catch(err){
                console.error(err)
            }
        }
        getItems()
    }, [])

    function logOut(){
        sessionStorage.removeItem('token')
        setIsLogged(false)
    }

    function getPriceValue(priceString:string | null, direction = 'asc') {
        if (priceString === 'Free' || priceString === null) return 0;
    
        const prices = priceString.replace(/[$,\\-]/g, '').split(' to ');
        const [minPrice, maxPrice] = prices;
    
        if (direction === 'asc') {
            return parseFloat(minPrice || '0');
        } else {
            return parseFloat(maxPrice || minPrice || '0');
        }
    }
    
    function sortProducts(products:Product[], filter:Filter) {
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
                            key={product._id}
                            title={product.title}
                            price={product.price}
                            imageUrl={product.image}
                            link={product.link}
                            location={product.location}
                            id={product._id}
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