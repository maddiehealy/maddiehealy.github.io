// Utility function to capitalize the first letter of each word
function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

// Function to handle sorting of predefined fruit arrays and display results
function lastItem(fruits, outputId) {
    fruits.sort((a, b) => a.localeCompare(b));  // Sort the fruits alphabetically
    const lastAlphabetical = fruits[fruits.length - 1];  // Get the last fruit in the sorted list
    const outputDiv = document.getElementById(outputId);  // Target the correct output div
    outputDiv.innerHTML = `Fruits sorted: ${fruits.join(', ')}<br>Last Alphabetical Item: ${lastAlphabetical}`;
}

// Function to collect categories and items from the user, then sort and display all items globally
function collectCategoriesAndItems() {
    const numberOfCategories = prompt("How many categories would you like to enter? (between 2 and 4)");
    const categoryCount = parseInt(numberOfCategories, 10);

    if (isNaN(categoryCount) || categoryCount < 2 || categoryCount > 4) {
        alert("Please enter a valid number between 2 and 4.");
        return;
    }

    let categories = [];
    let allItems = [];

    for (let i = 0; i < categoryCount; i++) {
        const category = prompt(`Enter category ${i + 1} of ${categoryCount}:`);
        if (category) {
            categories.push(capitalize(category));
        }
    }

    categories.forEach(category => {
        const item = prompt(`Enter an item for the category '${category}':`);
        if (item) {
            allItems.push(capitalize(item));
        }
    });

    allItems.sort((a, b) => a.localeCompare(b));  // Sort all items globally
    const sortedItemsDiv = document.getElementById('sortedItems');
    sortedItemsDiv.innerHTML = `All items sorted alphabetically: ${allItems.join(', ')}`;

    alert(`You submitted ${allItems.join(', ')} to be sorted. Check the display below.`);
}

// Setup event listener for the category/item submission form
document.getElementById('itemForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    collectCategoriesAndItems();
});

// Utility function to toggle the visibility of an element
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block'; // Show the element
    } else {
        element.style.display = 'none'; // Hide the element
    }
}

// Function to handle sorting of predefined fruit arrays and display results
function lastItem(fruits, outputId) {
    const outputDiv = document.getElementById(outputId);
    if (!outputDiv.innerHTML) { // Check if the content is already populated
        fruits.sort((a, b) => a.localeCompare(b));
        const lastAlphabetical = fruits[fruits.length - 1];
        outputDiv.innerHTML = `Fruits sorted: ${fruits.join(', ')}<br>Last Alphabetical Item: ${lastAlphabetical}`;
    }
    toggleVisibility(outputId); // Toggle the visibility of the results
}

// Add this function call inside your button's onClick attribute:
// onclick="lastItem(['Fruit1', 'Fruit2'], 'outputId')"
