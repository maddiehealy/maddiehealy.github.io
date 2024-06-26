function capitalize(text) {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function lastItem(fruitsObj, outputId) {
    const fruitsArray = Object.values(fruitsObj);
    const originalFruits = fruitsArray.join(', ');
    fruitsArray.sort();
    const lastAlphabetical = fruitsArray[fruitsArray.length - 1];
    const outputDiv = document.getElementById(outputId);
    outputDiv.innerHTML = `The original array was ${originalFruits} and I sorted it alphabetically. The last item of the sorted array was: ${lastAlphabetical}`;
    toggleVisibility(outputId);
}

function collectCategoriesAndItems() {
    const numberOfCategories = prompt("How many categories would you like to enter? (between 2 and 4)");
    const categoryCount = parseInt(numberOfCategories, 10);
    if (isNaN(categoryCount) || categoryCount < 2 || categoryCount > 4) {
        alert("Invalid response. Please only enter a valid number between 2 and 4.");
        return;
    }

    let categories = {};
    let items = {};
    let itemsWithCategories = [];

    for (let i = 0; i < categoryCount; i++) {
        const category = prompt(`Enter category ${i + 1} of ${categoryCount}:`);
        if (category) {
            categories[i] = capitalize(category);
        }
    }

    Object.values(categories).forEach((category, index) => {
        const item = prompt(`Enter an item for the category '${category}':`);
        if (item) {
            items[index] = `${capitalize(item)} (${category})`;
            itemsWithCategories.push(items[index]);
        }
    });

    const allItems = Object.values(items).map(item => item.split(' ')[0]).sort();

    const outputDiv = document.getElementById('categoryItemsOutput');
    outputDiv.innerHTML = `<strong>Original Submissions:</strong> ${itemsWithCategories.join(', ')}
<br><strong>All items sorted alphabetically:</strong> ${allItems.join(', ')}`;
    alert(`You submitted items to be sorted. Check the display below.`);
}

function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    collectCategoriesAndItems();
});
