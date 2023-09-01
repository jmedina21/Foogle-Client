import img from '../../assets/zelda.jpg'

import './Listing.scss'

export function Listing(){
    
    return (
        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img} alt="listing" />
            </div>
            <p className='listing__title'>Legend of Zelda Tears of the Kingdom sadsd asdsa as
            d asd sadas d sdadas dasdja skd askd sadk hasjdh ajsdh</p>
            <div className='listing__details'>
                <p className='listing__location'>Brooklyn</p>
            </div>
        </article>
    )
}

