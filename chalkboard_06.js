function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function collectCategoriesAndItems() {
    // Ask the user how many categories they would like to enter (between 2 and 4).
    const numberOfCategories = prompt("How many categories would you like to enter? (between 2 and 4)");
    const categoryCount = parseInt(numberOfCategories, 10);

    // Validate the number of categories.
    if (isNaN(categoryCount) || categoryCount < 2 || categoryCount > 4) {
        alert("Please enter a valid number between 2 and 4.");
        return;
    }

    // Initialize arrays to store categories and a global list to store all items.
    let categories = [];
    let allItems = [];

    // Collect categories from the user.
    for (let i = 0; i < categoryCount; i++) {
        let category = prompt(`Enter category ${i + 1} of ${categoryCount}:`);
        if (category) {
            categories.push(capitalize(category)); // Capitalize and store the category
        }
    }

    // Collect items for each category and store them in the global list.
    categories.forEach(category => {
        let item = prompt(`Enter an item for the category '${category}':`);
        if (item) {
            allItems.push({category, item: capitalize(item)}); // Capitalize and store the item
        }
    });

    // Sort all items alphabetically based on the 'item' field.
    allItems.sort((a, b) => a.item.localeCompare(b.item));

    // Prepare output string for sorted items.
    let itemsOutput = allItems.map(entry => `${entry.item} (Category: ${entry.category})`).join('<br>');
    let submittedItems = allItems.map(entry => entry.item).join(', ');

    // Display the sorted items in the designated div.
    const sortedItemsDiv = document.getElementById('sortedItems');
    sortedItemsDiv.innerHTML = `All items sorted alphabetically:<br>${itemsOutput}`;

    // Provide feedback to the user about their submissions.
    alert(`You submitted ${submittedItems} to be sorted. Check the display below for alphabetical sorting on the items.`);
}

// Add event listener for the form if there is a form submission approach in HTML.
document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    collectCategoriesAndItems();
});
