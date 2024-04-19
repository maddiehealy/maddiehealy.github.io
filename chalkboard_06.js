// Function to display the last item alphabetically from the array
function lastItem(items) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = "Original array: " + JSON.stringify(items);

    // Sorting a copy of the array to find the last item alphabetically
    const sortedItems = [...items].sort();
    const lastAlphabetical = sortedItems[sortedItems.length - 1];

    // Displaying the last alphabetical item
    outputDiv.innerHTML += "<br>Last item alphabetically: " + lastAlphabetical;
}

// Function to collect items from user input and sort them alphabetically
function collectAndSortItems() {
    const numberOfItems = prompt("How many items would you like to enter? (between 2 and 4)");
    const itemCount = parseInt(numberOfItems, 10);

    if (isNaN(itemCount) || itemCount < 2 || itemCount > 4) {
        alert("Please enter a valid number between 2 and 4.");
        return;
    }

    let items = [];
    for (let i = 0; i < itemCount; i++) {
        let item = prompt(`Enter item ${i + 1}`);
        if (item) {
            items.push(item);
        }
    }

    items.sort(); // Sorting the items alphabetically

    const sortedItemsDiv = document.getElementById('sortedItems');
    sortedItemsDiv.innerHTML = `You entered: ${itemCount} items<br>Categories chosen: ` + items.join(', ');
}

// Event listener for the form to handle item submissions
document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    collectAndSortItems();
});
