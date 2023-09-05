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

export function Search(){

    const {item} = useParams()
    const [listings, setListings] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showArrowUp, setShowArrowUp] = useState(false);

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


    useEffect(() => {
        setListings([])
         setIsLoading(true)
        let promises = []
        promises.push(
            axios(`http://localhost:2121/listings/facebook?search=${item}`),
            axios(`http://localhost:2121/listings/ebay?search=${item}`),
            axios(`http://localhost:2121/listings/craigslist?search=${item}`)
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
                console.log(err);
            });
    }, [item]);
    

    function renderSkeletons(n) {
        return [...Array(n)].map((_item, i) => <Skeleton key={i} />);
    }

    return (
        <main>
            <BurgerMenu isLogged={isLogged} logOut={logOut}/>
            <Header item={item} isLogged={isLogged} logOut={logOut} />
            <div className="listings">
                {isLoading ?
                    renderSkeletons(9)
                :
                listings.length === 0 ?
                <p className='favorites__message'>No products found with this description</p>
                :
            listings.map((listing, index) => {
                return (
                    <Listing 
                        key={index}
                        title={listing.title}
                        price={listing.price}
                        imageUrl={listing.imageUrl  === null ? placeholder : listing.imageUrl}
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