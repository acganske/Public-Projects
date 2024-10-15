// Import essential libraries and components
import React, { useState, useEffect } from 'react'; // React and its hooks
import axios from 'axios'; // Library for making HTTP requests

import './App.css'; // App-specific CSS for styling
import '@glidejs/glide/dist/css/glide.core.min.css'; // Glide library for image carousels

import SearchAndSuggestions from './SearchAndSuggestions'; // Component for search and suggestions
import DogCarousel from './DogCarousel'; // Component for displaying dog images in a carousel format

/**
 * App Component
 *
 * Main component that manages state for dog breeds and images.
 * Fetches data from an external API (Dog CEO) to display dog breeds and images.
 *
 * @component
 */
function App() {
    // State to hold all dog breeds retrieved from the API
    const [breeds, setBreeds] = useState({});

    // State to manage which breeds the user has selected for viewing images
    const [selectedBreeds, setSelectedBreeds] = useState([]);

    // State to store the list of dog images fetched from the API
    const [dogPictureList, setDogPictureList] = useState([]);

    /**
     * useEffect hook - runs on component mount
     *
     * Fetches a list of all dog breeds available through the Dog CEO API.
     * Also fetches a default set of random dog images to display.
     */
    useEffect(() => {
        // Function to fetch dog breeds
        const fetchDogBreeds = async () => {
            const url = 'https://dog.ceo/api/breeds/list/all'; // API endpoint for breeds
            try {
                const response = await axios.get(url); // Fetch breed data
                setBreeds(response.data.message); // Update state with breeds list
            } catch (error) {
                console.error('Error fetching dog breeds:', error); // Log any errors
            }
        };

        // Initial data fetch
        fetchDogBreeds();
        fetchRandomDogImages(); // Display random dog images by default
    }, []); // Empty dependency array: this runs only on the first render

    /**
     * Fetches a set of random dog images
     *
     * Default fetch of 6 random images to showcase on the main page load.
     */
    const fetchRandomDogImages = async () => {
        const url = 'https://dog.ceo/api/breeds/image/random/6'; // Endpoint for random images
        try {
            const response = await axios.get(url); // Fetch random images
            setDogPictureList(response.data.message); // Update state with images
        } catch (error) {
            console.error('Error fetching random dog images:', error); // Log any errors
        }
    };

    /**
     * Fetches images for a list of specific breeds
     *
     * @param {Array} breedsToFetch - Array of selected breed names to fetch images for
     */
    const fetchDogImages = async (breedsToFetch) => {
        const allImages = []; // Initialize an array to hold images
        try {
            // Loop through selected breeds and fetch 2 images for each
            for (const breed of breedsToFetch) {
                const url = `https://dog.ceo/api/breed/${breed}/images/random/2`; // Endpoint for breed-specific images
                const response = await axios.get(url); // Fetch images for this breed
                allImages.push(...response.data.message); // Append images to the allImages array
            }
            setDogPictureList(allImages); // Update the main image list with the fetched images
        } catch (error) {
            console.error('Error fetching dog images:', error); // Log any errors
        }
    };

    /**
     * Main component render
     *
     * Includes a header, search and suggestions component, and a carousel for displaying images.
     */
    return (
        <div className="App">
            <header className="App-header">
                <h1>Find a Gallery of YOUR Favorite Dogs!</h1>
            </header>
            <div>
                <SearchAndSuggestions
                    breeds={breeds} // Pass the list of breeds
                    selectedBreeds={selectedBreeds} // Pass selected breeds
                    setSelectedBreeds={setSelectedBreeds} // Setter function for selected breeds
                    fetchDogImages={fetchDogImages} // Function to fetch images based on selected breeds
                />
                <DogCarousel dogPictureList={dogPictureList} /> {/* Carousel component to display dog images */}
            </div>
        </div>
    );
}

// Export App component as the default export
export default App;
