// Load the JSON file with menu data
const loadJSON = async () => {
    try {
        const response = await fetch('15_days_menu_processed.json'); // Ensure this path is correct
        const menuData = await response.json();
        return menuData;
    } catch (error) {
        console.error('Error fetching menu data:', error);
    }
};

// Function to display the menu for today's date
const displayMenu = async () => {
    const menuData = await loadJSON();
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];

    const menuForToday = menuData.find(menu => menu.date === todayDate);
    
    const mealDisplay = document.getElementById('mealDisplay');

    if (menuForToday) {
        let menuHTML = `<h3>Breakfast</h3><ul>`;
        menuForToday.meals.breakfast.forEach((item, index) => {
            menuHTML += `<li style="--i:${index}">${item}</li>`;
        });
        menuHTML += `</ul><h3>Lunch</h3><ul>`;
        menuForToday.meals.lunch.forEach((item, index) => {
            menuHTML += `<li style="--i:${index}">${item}</li>`;
        });
        menuHTML += `</ul><h3>Snack</h3><ul>`;
        menuForToday.meals.snack.forEach((item, index) => {
            menuHTML += `<li style="--i:${index}">${item}</li>`;
        });
        menuHTML += `</ul><h3>Dinner</h3><ul>`;
        menuForToday.meals.dinner.forEach((item, index) => {
            menuHTML += `<li style="--i:${index}">${item}</li>`;
        });
        menuHTML += `</ul><h3>Tuckshop</h3><ul>`;
        menuForToday.meals.tuckshop.forEach((item, index) => {
            menuHTML += `<li style="--i:${index}">${item}</li>`;
        });
        menuHTML += `</ul>`;
        
        mealDisplay.innerHTML = menuHTML;
    } else {
        mealDisplay.innerHTML = `<p>Menu not available for today. Sorry for the inconvenience.</p>`;
    }
};

// Function to toggle between dark and light modes
const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Change title for accessibility
    const toggleButton = document.getElementById('darkModeToggle');
    if (body.classList.contains('dark-mode')) {
        toggleButton.title = 'Switch to Light Mode';
    } else {
        toggleButton.title = 'Switch to Dark Mode';
    }
};

// Add event listener to the dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Load the menu on page load
window.onload = () => {
    displayMenu();
};
