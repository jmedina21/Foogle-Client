import './Search.scss'
import { Header } from '../../components/Header/Header'
import { Listing } from '../../components/Listing/Listing'
import { useParams } from 'react-router-dom'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import arrowUp from '../../assets/icons/arrow-up.svg'
import placeholder from '../../assets/images/noImage.svg'
import { EmptyBox } from '../../components/EmptyBox/EmptyBox'

export function Search(){

    const {item} = useParams()
    const [listings, setListings] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showArrowUp, setShowArrowUp] = useState(false);
    const [filter, setFilter] = useState('relevance')

    useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'){
            setIsLogged(true)
        }
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

    function logOut(){
        localStorage.removeItem('token')
        setIsLogged(false)
    }

    const url = 'https://api.foogle.foo'

    useEffect(() => {
        setListings([])
         setIsLoading(true)
        let promises = []
        promises.push(
        //     axios(`http://localhost:2121/listings/facebook?search=${item}`),
        //     axios(`http://localhost:2121/listings/ebay?search=${item}`),
        //     axios(`http://localhost:2121/listings/craigslist?search=${item}`)
            axios(`${url}/listings/facebook?search=${item}`),
            axios(`${url}/listings/ebay?search=${item}`),
            axios(`${url}/listings/craigslist?search=${item}`)
        )
        Promise.all(promises)
            .then((res) => {
                const facebookListings = res[0].data;
                const ebayListings = res[1].data;
                const craigslistListings = res[2].data;

                const maxLength = Math.max(facebookListings.length, ebayListings.length, craigslistListings.length);
    
                let mergedListings = [];
    
                for (let i = 0; i < maxLength; i++) {
                    if (i < facebookListings.length) {
                        mergedListings.push(facebookListings[i]);
                    }
                    if (i < ebayListings.length) {
                        mergedListings.push(ebayListings[i]);
                    }
                    if (i < craigslistListings.length) {
                        mergedListings.push(craigslistListings[i]);
                    }
                }
    
                setListings(mergedListings);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [item]);
    

    function renderSkeletons(n) {
        return [...Array(n)].map((_item, i) => <Skeleton key={i} />);
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
    
    function sortListings(listings, filter) {
        if (filter === 'relevance') {
            return listings;
        } else if (filter === 'priceAsc') {
            return [...listings].sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
        } else if (filter === 'priceDesc') {
            return [...listings].sort((a, b) => getPriceValue(b.price, 'desc') - getPriceValue(a.price, 'desc'));
        }
        return listings;
    }
    
    const sortedListings = sortListings(listings, filter);

    return (
        <main>
            <BurgerMenu isLogged={isLogged} logOut={logOut}/>
            <Header item={item} isLogged={isLogged} logOut={logOut} setFilter={setFilter}/>
            <div className="listings">
                {isLoading ?
                    renderSkeletons(18)
                    :
                    !listings.length ?
                    <div className='listings__empty-container' >
                        <EmptyBox />
                        <p className='listings__message'>No products found with this description</p>
                    </div>
                :
                sortedListings.map((listing, index) => {
                return (
                    <Listing 
                        key={index}
                        title={listing.title}
                        price={listing.price === null ? 'Free' : listing.price}
                        imageUrl={!listing.imageUrl ? placeholder : listing.imageUrl}
                        link={listing.link}
                        location={listing.location}
                        isLogged={isLogged}
                    />
                )
            })
            }
            </div>
            {showArrowUp && (
                <img src={arrowUp} alt="arrow up" className="arrow-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            )}
        </main>
    )
}