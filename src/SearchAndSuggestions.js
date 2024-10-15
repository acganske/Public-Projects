// Importing necessary libraries and styles
import React, { useState } from 'react'; // React and the useState hook
import './SearchAndSuggestions.css'; // Component-specific styling

/**
 * SearchAndSuggestions Component
 *
 * This component allows users to search for specific dog breeds,
 * provides search suggestions, and manages the selected breeds list.
 * It also triggers fetching images for selected breeds via the fetchDogImages function.
 *
 * @param {Object} breeds - Object containing all available dog breeds.
 * @param {Array} selectedBreeds - List of breeds selected by the user.
 * @param {Function} setSelectedBreeds - Function to update the selected breeds.
 * @param {Function} fetchDogImages - Function to fetch images for selected breeds.
 */
const SearchAndSuggestions = ({ breeds, selectedBreeds, setSelectedBreeds, fetchDogImages }) => {
    // State to track the user's input in the search field
    const [dogInput, setDogInput] = useState('');

    // State to store breed suggestions based on user input
    const [suggestions, setSuggestions] = useState([]);

    /**
     * handleInputChange - Handles changes to the search input
     *
     * Updates the input state and filters the breed suggestions based on the user’s input.
     * Only the top 4 matching suggestions are displayed.
     *
     * @param {Object} e - The event object from the input field
     */
    const handleInputChange = (e) => {
        const userInput = e.target.value; // Get current input value
        setDogInput(userInput); // Update the state with this input

        if (userInput) {
            // Filter the breeds based on input, displaying up to 4 suggestions
            const filteredSuggestions = Object.keys(breeds)
                .filter(breed => breed.toLowerCase().includes(userInput.toLowerCase()))
                .slice(0, 4);
            setSuggestions(filteredSuggestions); // Update state with suggestions
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    /**
     * selectSuggestion - Adds a breed to the selected breeds list
     *
     * This function is triggered when a suggestion is clicked. It adds the breed to the selected list,
     * clears the input and suggestions, and fetches images for the updated list.
     *
     * @param {string} suggestion - The breed that the user clicked on
     */
    const selectSuggestion = (suggestion) => {
        if (!selectedBreeds.includes(suggestion)) { // Avoid duplicates in selection
            setSelectedBreeds([...selectedBreeds, suggestion]); // Update selected breeds
            setDogInput(''); // Clear the input field
            setSuggestions([]); // Clear suggestions
            fetchDogImages([...selectedBreeds, suggestion]); // Fetch images for the new selection
        }
    };

    /**
     * removeBreed - Removes a breed from the selected breeds list
     *
     * This function is triggered when a user clicks the "Remove" button next to a breed.
     * It updates the list of selected breeds and fetches images for the remaining breeds.
     *
     * @param {string} breed - The breed to be removed from the selected list
     */
    const removeBreed = (breed) => {
        const updatedBreeds = selectedBreeds.filter(selected => selected !== breed); // Filter out the breed
        setSelectedBreeds(updatedBreeds); // Update state with remaining breeds
        fetchDogImages(updatedBreeds); // Fetch images for the updated breed list
    };

    /**
     * Component Render
     *
     * Renders the search input, suggestions dropdown, and a list of selected breeds with remove buttons.
     */
    return (
        <div>
            {/* Input and Suggestions Container */}
            <div className="shadowContainer">
                <div className="box1">
                    <input
                        type="text"
                        value={dogInput}
                        onChange={handleInputChange}
                        placeholder="Search Dogs" // Placeholder text for input
                    />
                    <button className="searchButton" onClick={() => fetchDogImages(selectedBreeds)}>
                        Search
                    </button>
                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => selectSuggestion(suggestion)} className="suggestion-item">
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Selected Breeds List */}
            <div className="shadowContainer">
                <div>
                    <h4>Selected Breeds:</h4>
                    <br/>
                    <ul>
                        {selectedBreeds.map((breed, index) => (
                            <li className="breedListItem" key={index}>
                                {breed}
                                <button className="remove-button" onClick={() => removeBreed(breed)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Export the component for use in other files
export default SearchAndSuggestions;
