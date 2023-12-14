import './Skeleton.scss'

export function Skeleton({ }) {

    return (
        <article className='listing--loading'>
            <div className="listing__img-price-container" >
                <div className='listing__price-skeleton'></div>
                <div className='listing__img-skeleton'></div>
            </div>
            <div className='listing__title-skeleton'></div>
            <div className='listing__details'>
                <div className='listing__location-skeleton'></div>
                <div className='listing__fav-icon-skeleton'></div>
            </div>
        </article>

    );
}