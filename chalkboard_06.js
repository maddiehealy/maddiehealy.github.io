function lastItem(items) {
    // Outputting the original array
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = "Original array: " + JSON.stringify(items);

    // Sorting and finding the last item alphabetically
    const lastAlphabetical = items.slice().sort()[items.length - 1];
    outputDiv.innerHTML += "<br>Last item alphabetically: " + lastAlphabetical;
}

function collectAndSortItems() {
    const itemNumber = parseInt(prompt("How many items would you like to enter? (between 2 and 4)"), 10);
    if (itemNumber < 2 || itemNumber > 4 || isNaN(itemNumber)) {
        alert("Please enter a valid number between 2 and 4.");
        return;
    }

    let items = [];
    for (let i = 1; i <= itemNumber; i++) {
        let item = prompt(`Enter item ${i}:`);
        if (item) {
            items.push(item);
        }
    }

    // Sort items alphabetically
    items.sort();

    // Display sorted items
    const sortedItemsDiv = document.getElementById('sortedItems');
    sortedItemsDiv.innerHTML = "You entered: " + itemNumber + " items<br>Categories chosen: " + items.join(', ');
}
