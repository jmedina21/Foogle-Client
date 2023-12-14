import { describe, it, expect } from 'vitest';
import { sortListings } from '../utils/utils';

interface Listing {
    imageUrl: string | null
    link: string
    price: string
    title: string
    location: string | null
}

type Filter = 'relevance' | 'priceAsc' | 'priceDesc'


describe('sortListings', () => {
    const listings: Listing[] = [
        { imageUrl: null, link: '', price: '$100', title: '', location: null },
        { imageUrl: null, link: '', price: '$50', title: '', location: null },
        { imageUrl: null, link: '', price: '$200', title: '', location: null },
    ];

    it('should return the original listings when filter is "relevance"', () => {
        const filter: Filter = 'relevance';
        const sortedListings = sortListings(listings, filter);
        expect(sortedListings).toEqual(listings);
    });

    it('should sort the listings in ascending order by price when filter is "priceAsc"', () => {
        const filter: Filter = 'priceAsc';
        const sortedListings = sortListings(listings, filter);
        expect(sortedListings).toEqual([
            { imageUrl: null, link: '', price: '$50', title: '', location: null },
            { imageUrl: null, link: '', price: '$100', title: '', location: null },
            { imageUrl: null, link: '', price: '$200', title: '', location: null },
        ]);
    });

    it('should sort the listings in descending order by price when filter is "priceDesc"', () => {
        const filter: Filter = 'priceDesc';
        const sortedListings = sortListings(listings, filter);
        expect(sortedListings).toEqual([
            { imageUrl: null, link: '', price: '$200', title: '', location: null },
            { imageUrl: null, link: '', price: '$100', title: '', location: null },
            { imageUrl: null, link: '', price: '$50', title: '', location: null },
        ]);
    });
});
