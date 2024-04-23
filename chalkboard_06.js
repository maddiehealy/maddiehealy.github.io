function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function lastItem(fruits, outputId) {
    fruits.sort((a, b) => a.localeCompare(b));
    const lastAlphabetical = fruits[fruits.length - 1];
    const outputDiv = document.getElementById(outputId);
    if (!outputDiv.innerHTML) {
        outputDiv.innerHTML = `Fruits sorted: ${fruits.join(', ')}<br>Last Alphabetical Item: ${lastAlphabetical}`;
    }
    toggleVisibility(outputId);
}

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

    allItems.sort((a, b) => a.localeCompare(b));
    const sortedItemsDiv = document.getElementById('sortedItems');
    sortedItemsDiv.innerHTML = `All items sorted alphabetically: ${allItems.join(', ')}`;

    alert(`You submitted ${allItems.join(', ')} to be sorted. Check the display below.`);
}

document.getElementById('itemForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    collectCategoriesAndItems();
});

function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
