import './Search.scss'
import { Header } from '../../components/Header/Header'
import { Listing } from '../../components/Listing/Listing'
import { useParams } from 'react-router-dom'
import { BurgerMenu } from '../../components/Menu/BurgerMenu'
import { EmptyBox } from '../../components/EmptyBox/EmptyBox'
import { useEffect, useState } from 'react'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { sortListings } from '../../utils/utils'
import axios from 'axios'
import arrowUp from '../../assets/icons/arrow-up.svg'
import placeholder from '../../assets/images/noImage.svg'

interface Listing {
    imageUrl: string | null
    link: string
    price: string
    title: string
    location: string | null
}

type Filter = 'relevance' | 'priceAsc' | 'priceDesc'

export function Search(){

    const {item} = useParams()
    const [listings, setListings] = useState<Listing[]>([])
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showArrowUp, setShowArrowUp] = useState(false);
    const [filter, setFilter] = useState<Filter>('relevance')

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

    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function fetchListings() {
            try {
                setListings([]);
                setIsLoading(true);
    
                const responses = await Promise.all([
                    axios(`${url}/listings/facebook?search=${item}`),
                    axios(`${url}/listings/ebay?search=${item}`),
                    axios(`${url}/listings/craigslist?search=${item}`)
                ]);
    
                const facebookListings = responses[0].data;
                const ebayListings = responses[1].data;
                const craigslistListings = responses[2].data;
    
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
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchListings();
    }, [item]);
    
    

    function renderSkeletons(n:number) {
        return [...Array(n)].map((_item, i) => <Skeleton key={i} />);
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