# Foogle - Front End

Welcome to the front end of **Foogle.foo**! This React application, built with Vite. It centralises listing of eBay, Craigslist and Facebook Marketplace making it easier for users to compare similar second hand products 

## BackEnd - git clone https://github.com/jmedina21/Foogle-Server.git

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Usage](#api-usage)
- [Contributing](#contributing)

## Features

1. **Product Listings:**
   Users can view the product listings from Craigslist, eBay, and Facebook Marketplace. These listings are fetched from the server side using API calls.

2. **User Authentication:**
   Users can sign up and log in to their accounts. This ensures a personalized experience and access to saved products.

3. **Saved Products:**
   Users can save products they are interested in. These saved products are stored on the server side and can be managed through the UI.

## Technologies Used

- React
- Vite
- Sass
- Axios

## Getting Started

1. Clone the repository:
- https://github.com/jmedina21/Foogle-Client.git


2. Install dependencies:
```bash
npm i
```

3. Set the API base URL to your locale server URL:


4. Run the development server:
```bash
npm run dev
```

## API Usage

Axios is used to make API calls to the server side. API endpoints can be found in the server's documentation.

Example usage:
```javascript
import axios from 'axios';

const fetchListings = async () => {
  try {
    const response = await axios.get(`${apiURL}/listings/craigslist?search=${searchItem}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
};
```


## Contributing

Contributions to this project are welcome! If you find a bug or want to add a new feature, feel free to open an issue or submit a pull request.


