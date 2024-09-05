/**
 * Asynchronously fetch the menu data from a JSON file.
 * @returns {Object[]} - Parsed menu data from the JSON file.
 */
const loadJSON = async () => {
    try {
        const response = await fetch('15_days_menu_processed.json'); // Ensure the path is correct
        if (!response.ok) {
            throw new Error(`Failed to fetch menu data: ${response.statusText}`);
        }
        const menuData = await response.json();
        return menuData;
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return null; // Return null if an error occurs
    }
};

/**
 * Display the menu for today's date by matching the system date with the menu data.
 */
const displayMenu = async () => {
    const menuData = await loadJSON(); // Fetch the JSON data
    if (!menuData) {
        displayErrorMessage('Unable to load menu data. Please try again later.');
        return;
    }

    // Get today's date in YYYY-MM-DD format in local time
    const today = new Date();
    const todayDate = today.toLocaleDateString('en-CA'); // Ensures format YYYY-MM-DD
    console.log(`Today's Date: ${todayDate}`);

    // Find the menu corresponding to today's date
    const menuForToday = menuData.find(menu => menu.date === todayDate);

    // Reference to the element where the menu will be displayed
    const mealDisplay = document.getElementById('mealDisplay');

    // If today's menu is found, display it; otherwise, show an error message
    if (menuForToday) {
        let menuHTML = `
            <h3>Breakfast</h3><ul>${generateMenuHTML(menuForToday.meals.breakfast)}</ul>
            <h3>Lunch</h3><ul>${generateMenuHTML(menuForToday.meals.lunch)}</ul>
            <h3>Snack</h3><ul>${generateMenuHTML(menuForToday.meals.snack)}</ul>
            <h3>Dinner</h3><ul>${generateMenuHTML(menuForToday.meals.dinner)}</ul>
            <h3>Tuckshop</h3><ul>${generateMenuHTML(menuForToday.meals.tuckshop)}</ul>
        `;
        mealDisplay.innerHTML = menuHTML;
    } else {
        displayErrorMessage('Menu not available for today. Sorry for the inconvenience.');
    }
};

/**
 * Generate HTML for a menu section.
 * @param {string[]} menuItems - List of menu items.
 * @returns {string} - HTML string representing the menu items.
 */
const generateMenuHTML = (menuItems) => {
    if (menuItems && menuItems.length > 0) {
        return menuItems.map((item, index) => `<li style="--i:${index}">${item}</li>`).join('');
    }
    return '<li>No items available</li>'; // Display message if no items exist
};

/**
 * Display an error message when the menu data cannot be found or loaded.
 * @param {string} message - The error message to display.
 */
const displayErrorMessage = (message) => {
    const mealDisplay = document.getElementById('mealDisplay');
    mealDisplay.innerHTML = `<p>${message}</p>`;
};

/**
 * Toggle between dark and light modes.
 */
const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Change the title of the toggle button based on the current mode
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.title = body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    // Log the dark mode toggle event in Firebase Analytics (optional)
    if (typeof firebase !== 'undefined') {
        firebase.analytics().logEvent('dark_mode_toggle', {
            mode: body.classList.contains('dark-mode') ? 'dark' : 'light'
        });
    }
};

// Add event listener to the dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Load the menu on page load and start auto-refresh
window.onload = () => {
    displayMenu();  // Display the menu for the current date when the page loads
};
