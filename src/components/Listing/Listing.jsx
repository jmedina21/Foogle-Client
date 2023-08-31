import img from '../../assets/zelda.jpg'
import img2 from '../../assets/zelda 2.jpeg'
import img3 from '../../assets/zelda 3.jpeg'
import img4 from '../../assets/zelda 4.jpeg'
import img5 from '../../assets/zedla 5.jpeg'
import img6 from '../../assets/zelda 6.jpeg'
import craiglist from '../../assets/logos/craigslist2.png' 
import ebay from '../../assets/logos/ebay3.png' 
import facebook from '../../assets/logos/fb2.png' 


import './Listing.scss'

export function Listing(){
    
    return (
        <>
        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img} alt="listing" />
            </div>
            <p className='listing__title'>Legend of Zelda Tears of the Kingdom sadsd asdsa as
            d asd sadas d sdadas dasdja skd askd sadk hasjdh ajsdh</p>
            <div className='listing__details'>
                <div className='listing__origin' style={{backgroundImage: `url(${craiglist})`}} />
                <p className='listing__location'>Brooklyn</p>
            </div>

        </article>
        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img2} alt="listing" />
            </div>
            <p className='listing__title'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt esse cum eaque cupiditate ullam omnis consequatur quo sapiente, minima quam dolores, voluptas beatae amet dolorum maxime. Ipsa reprehenderit vero iure.</p>
            <div className='listing__details'>
                <div className='listing__origin' style={{backgroundImage: `url(${facebook})`}} />
                <p className='listing__location'>Brooklyn</p>
            </div>

        </article>

        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img3} alt="listing" />
            </div>
            <p className='listing__title'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt assumenda provident odio quidem. Iure quisquam, deserunt aliquid ad voluptatem, quam, fuga magni numquam suscipit ea quae velit inventore voluptate necessitatibus?</p>
            <div className='listing__details'>
                <div className='listing__origin' style={{backgroundImage: `url(${ebay})`}} />
                <p className='listing__location'>Brooklyn</p>
            </div>

        </article>

        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img4} alt="listing" />
            </div>
            <p className='listing__title'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt assumenda provident odio quidem. Iure quisquam, deserunt aliquid ad voluptatem, quam, fuga magni numquam suscipit ea quae velit inventore voluptate necessitatibus?</p>
            <div className='listing__details'>
                <div className='listing__origin' style={{backgroundImage: `url(${craiglist})`}} />
                <p className='listing__location'>Brooklyn</p>
            </div>

        </article>

        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img5} alt="listing" />
            </div>
            <p className='listing__title'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt assumenda provident odio quidem. Iure quisquam, deserunt aliquid ad voluptatem, quam, fuga magni numquam suscipit ea quae velit inventore voluptate necessitatibus?</p>
            <div className='listing__details'>
                <div className='listing__origin' style={{backgroundImage: `url(${craiglist})`}} />
                <p className='listing__location'>Brooklyn</p>
            </div>

        </article>

        <article className='listing'>
            <div className="listing__img-price-container" >
                <h3 className='listing__price'>$150</h3>
                <img className='listing__img' src={img6} alt="listing" />
            </div>
            <p className='listing__title'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt assumenda provident odio quidem. Iure quisquam, deserunt aliquid ad voluptatem, quam, fuga magni numquam suscipit ea quae velit inventore voluptate necessitatibus?</p>
            <div className='listing__details'>
                <div className='listing__origin' style={{backgroundImage: `url(${craiglist})`}} />
                <p className='listing__location'>Brooklyn</p>
            </div>

        </article>
        </>
    )
}

