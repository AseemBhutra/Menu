// Load the JSON file with menu data
const loadJSON = async () => {
    try {
        const response = await fetch('15_days_menu_processed.json'); // Update to correct path
        const menuData = await response.json();
        return menuData;
    } catch (error) {
        console.error('Error fetching menu data:', error);
    }
};

// Function to display the menu based on the selected date
const displayMenu = async (selectedDate) => {
    const menuData = await loadJSON();
    
    const menuForTheDay = menuData.find(menu => menu.date === selectedDate);
    
    const mealDisplay = document.getElementById('mealDisplay');
    const dateDisplay = document.getElementById('selectedDate');

    if (menuForTheDay) {
        dateDisplay.textContent = selectedDate;
        
        let menuHTML = `<h3>Breakfast</h3><ul>`;
        menuForTheDay.meals.breakfast.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += `</ul><h3>Lunch</h3><ul>`;
        menuForTheDay.meals.lunch.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += `</ul><h3>Snack</h3><ul>`;
        menuForTheDay.meals.snack.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += `</ul><h3>Dinner</h3><ul>`;
        menuForTheDay.meals.dinner.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += `</ul><h3>Tuckshop</h3><ul>`;
        menuForTheDay.meals.tuckshop.forEach(item => {
            menuHTML += `<li>${item}</li>`;
        });
        menuHTML += `</ul>`;
        
        mealDisplay.innerHTML = menuHTML;
    } else {
        mealDisplay.innerHTML = `<p>No menu available for this date.</p>`;
    }
};

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Display today's menu on page load
window.onload = () => {
    const todayDate = getTodayDate();
    document.getElementById('todayDate').textContent = todayDate;
    displayMenu(todayDate);
};

// Event listener for the date picker to select a different date
document.getElementById('datePicker').addEventListener('change', (event) => {
    const selectedDate = event.target.value;
    displayMenu(selectedDate);
});
