interface Listing {
    imageUrl: string | null
    link: string
    price: string
    title: string
    location: string | null
}

type Filter = 'relevance' | 'priceAsc' | 'priceDesc'

function sortListings(listings:Listing[], filter:Filter) {
    if (filter === 'relevance') {
        return listings;
    } else if (filter === 'priceAsc') {
        return [...listings].sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
    } else if (filter === 'priceDesc') {
        return [...listings].sort((a, b) => getPriceValue(b.price, 'desc') - getPriceValue(a.price, 'desc'));
    }
    return listings;
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

export {sortListings}