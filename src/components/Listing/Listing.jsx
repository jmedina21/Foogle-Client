import './Listing.scss'
import { useState } from 'react'
import axios from 'axios'

export function Listing({title, price, imageUrl,link, location, isLogged}){

    const [liked, setLiked] = useState(false)

    const url = 'https://api.foogle.foo'


    function saveProduct(){
        if(!isLogged){
            alert('You need to be logged in to save products')
            return
        }
        if(!liked){
            setLiked(!liked)
            axios
                .post(`${url}/products`, {
                    title: title,
                    price: price,
                    image: imageUrl,
                    link: link,
                    location: location
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                // .then(_res => console.log('Product saved'))
                .catch(err => console.log(err))
        } else {
            setLiked(!liked)
            axios
                .get(`${url}/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    const product = res.data.find(product => product.title === title)
                    axios
                        .delete(`${url}/products/${product.id}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        // .then(res => console.log(res))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>{price}</h3>
                <a className='listing__link' href={link} target='_blank'>
                    <img className='listing__img' src={imageUrl} alt={title} />
                </a>
            </div>
            <a className='listing__link' href={link} target='_blank'>
                <p className='listing__title'>{title}</p>
            </a>
            <div className='listing__details'>
                <p className='listing__location'>{location}</p>
                {!liked ?
                <svg onClick={saveProduct} className='listing__fav-icon' fill="#0E0E0E" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"/>
                </svg>
                :
                <svg onClick={saveProduct} className='listing__fav-icon' width="20px" height="20px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                    <g transform="translate(0 -1028.4)">
                    <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#e74c3c"/>
                    </g>
                </svg>
                }
            </div>
        </article>
    )
}

