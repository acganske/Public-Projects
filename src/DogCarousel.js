// Import necessary libraries and styles
import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide'; // Glide.js for creating carousels
import '@glidejs/glide/dist/css/glide.core.min.css'; // Glide core styles
import './DogCarousel.css'; // Component-specific styling

/**
 * DogCarousel Component
 *
 * This component displays a carousel of dog images using the Glide.js library.
 * It dynamically updates when the list of images changes and provides responsive styling.
 *
 * @param {Array} dogPictureList - Array of dog image URLs to be displayed in the carousel.
 */
const DogCarousel = ({ dogPictureList }) => {
    // Refs to store the Glide container element and the Glide instance
    const glideRef = useRef(null); // Ref for the carousel container
    const glideInstanceRef = useRef(null); // Ref for the Glide instance

    /**
     * useEffect - Initializes the Glide instance when images are available
     *
     * This hook creates a new Glide instance whenever the dogPictureList updates
     * and cleans up the instance on component unmount or before creating a new instance.
     */
    useEffect(() => {
        // Initialize Glide only if there are images and a container to attach to
        if (dogPictureList.length > 0 && glideRef.current) {
            // Destroy the previous Glide instance if it exists
            if (glideInstanceRef.current) {
                try {
                    glideInstanceRef.current.destroy();
                } catch (error) {
                    console.warn("Error while destroying previous Glide instance:", error); // Warn if there's an issue
                }
            }

            // Create a new Glide instance with custom settings
            glideInstanceRef.current = new Glide(glideRef.current, {
                type: 'carousel', // Carousel mode
                perView: 3, // Show 3 images at a time
                focusAt: 'center', // Center the focus
                autoplay: 1500, // Autoplay every 1.5 seconds
                breakpoints: {
                    800: { perView: 2 }, // Show 2 images at a time for small screens
                    480: { perView: 1 }, // Show 1 image for very small screens
                },
            });

            // Mount the Glide instance to make it active
            glideInstanceRef.current.mount();
        }

        // Cleanup function to destroy Glide instance when component unmounts
        return () => {
            if (glideInstanceRef.current) {
                try {
                    glideInstanceRef.current.destroy();
                } catch (error) {
                    console.warn("Error while destroying Glide instance during cleanup:", error); // Warn if there's an issue
                }
            }
        };
    }, [dogPictureList]); // Re-run the effect when the dogPictureList changes

    /**
     * Component Render
     *
     * The component layout for the Glide carousel. Images are displayed inside a list,
     * which is wrapped in a div required by Glide for tracking slides.
     */
    return (
        <div className="carouselContainer" ref={glideRef}>
            <div className="carouselSelShadowContainer">
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {dogPictureList.map((image, index) => (
                            <li key={index} className="glide__slide">
                                <img src={image} alt={`Dog ${index + 1}`} /> {/* Display each image */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Export the DogCarousel component for use in other parts of the app
export default DogCarousel;
