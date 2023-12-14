import './FavoriteItem.scss'
import remove from '../../assets/icons/remove.svg'
import axios from 'axios'
import placeholder from '../../assets/images/noImage.svg'

interface FavoriteItemProps {
    title: string
    price: string
    imageUrl: string
    link: string
    location: string
    id: string
    setProducts: Function
}

export function FavoriteItem({title, price, imageUrl,link, location, id, setProducts}: FavoriteItemProps){

    const url = import.meta.env.VITE_API_URL

    function removeProduct(){
        axios
            .delete(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(_res => {
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
                        setProducts(res.data)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
            .catch(err => console.error(err))
    }

    return (
        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>{price}</h3>
                <a className='listing__link' href={link} target='_blank'>
                    <img className='listing__img' src={imageUrl === null ? placeholder : imageUrl} alt={title} />
                </a>
            </div>
            <a className='listing__link' href={link} target='_blank'>
                <p className='listing__title'>{title}</p>
            </a>
            <div className='listing__details'>
                <p className='listing__location'>{location}</p>
                <img src={remove} alt="remove" className='listing__remove' onClick={removeProduct}/>
            </div>
        </article>
    )
}

