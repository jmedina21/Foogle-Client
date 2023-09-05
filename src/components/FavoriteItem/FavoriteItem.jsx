import './FavoriteItem.scss'
import remove from '../../assets/icons/remove.svg'
import axios from 'axios'
import placeholder from '../../assets/images/noImage.svg'


export function FavoriteItem({title, price, imageUrl,link, location, id, setProducts}){

    function removeProduct(){
        axios
            .delete(`http://localhost:2121/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(_res => {
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
                        setProducts(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => console.log(err))
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

