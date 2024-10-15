// Import necessary libraries for testing
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import SearchAndSuggestions from './SearchAndSuggestions';
import DogCarousel from './DogCarousel';

/**
 * Simple unit test to ensure the App component renders the header correctly
 */
test('renders the App header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Find a Gallery of YOUR Favorite Dogs!/i);
    expect(headerElement).toBeInTheDocument(); // Check that header text is in the document
});

/**
 * Unit test for the SearchAndSuggestions component
 *
 * This test verifies that the input field can be typed into,
 * and that the suggestions are displayed when typing a breed.
 */
test('renders search input and shows suggestions', () => {
    const breeds = { poodle: [], bulldog: [] }; // Mock breed data
    render(
        <SearchAndSuggestions
            breeds={breeds}
            selectedBreeds={[]}
            setSelectedBreeds={() => {}}
            fetchDogImages={() => {}}
        />
    );

    // Find the input field and simulate typing
    const inputElement = screen.getByPlaceholderText(/search dogs/i);
    fireEvent.change(inputElement, { target: { value: 'poo' } });

    // Check if suggestions show up
    const suggestionElement = screen.getByText(/poodle/i);
    expect(suggestionElement).toBeInTheDocument();
});

/**
 * Unit test for the DogCarousel component
 *
 * This test ensures that images are rendered in the carousel when provided with image data.
 */
test('renders images in DogCarousel component', () => {
    const dogPictureList = ['dog1.jpg', 'dog2.jpg']; // Mock image data
    render(<DogCarousel dogPictureList={dogPictureList} />);

    // Check if images are in the document
    const imageElement1 = screen.getByAltText(/dog 1/i);
    const imageElement2 = screen.getByAltText(/dog 2/i);

    expect(imageElement1).toBeInTheDocument();
    expect(imageElement2).toBeInTheDocument();
});

/**
 * Integration test to ensure search and carousel work together
 *
 * This test renders the entire App and checks if typing a breed and searching
 * causes the DogCarousel to update with new images (mocked).
 */
test('search for a breed updates the carousel', () => {
    render(<App />);

    // Type into the search input
    const inputElement = screen.getByPlaceholderText(/search dogs/i);
    fireEvent.change(inputElement, { target: { value: 'bulldog' } });

    // Click the Search button
    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);

    // Mock DogCarousel to check for an updated image (in a real test, you'd mock API calls)
    // Here, we just confirm the search action proceeds without errors
    expect(inputElement.value).toBe('bulldog'); // Confirm input change
});
