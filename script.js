let shelfNumber = 1;
const areas = [];
const totalAreas = [];
const counts = [];
const totalCosts = [];

// Function to calculate area of rectangle
function areaOfRectangle(length, width) {
    return length * width;
}

// Function to handle adding a shelf
function addShelf() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const numSimilar = parseInt(document.getElementById('num-similar').value, 10);
    const pricePerUnit = parseFloat(document.getElementById('price-per-unit').value);

    if (isNaN(length) || isNaN(width) || isNaN(numSimilar) || isNaN(pricePerUnit) || numSimilar <= 0 || pricePerUnit < 0) {
        alert('Please enter valid values for all inputs.');
        return;
    }

    const area = areaOfRectangle(length, width);
    const totalArea = area * numSimilar;
    const totalCost = parseFloat((totalArea * pricePerUnit).toFixed(2));

    areas.push(area);
    totalAreas.push(totalArea);
    counts.push(numSimilar);
    totalCosts.push(totalCost);

    displaySummary();
    resetForm();
}

// Function to display the summary
function displaySummary() {
    let areaSummary = '<h3>Area Summary:</h3><ul>';
    let costSummary = '<h3>Cost Summary:</h3><ul>';
    let totalArea = 0;
    let totalCost = 0;

    for (let i = 0; i < areas.length; i++) {
        areaSummary += `
            <li>Shelf ${i + 1}: ${areas[i]} sqin, count: ${counts[i]}, total shelf ${i + 1}: ${totalAreas[i]} sqin 
            <button onclick="removeShelf(${i})">Remove</button></li>`;
        costSummary += `<li>Shelf ${i + 1} cost: $${totalCosts[i]} 
        <button onclick="removeShelf(${i})">Remove</button></li>`;
        totalArea += totalAreas[i];
        totalCost += totalCosts[i];
    }

    areaSummary += '</ul>';
    costSummary += '</ul>';
    
    document.getElementById('area-summary').innerHTML = areaSummary;
    document.getElementById('cost-summary').innerHTML = costSummary;
    document.getElementById('total-summary').innerHTML = `
        <h3>Total Area of All Shelves Combined: <span style="color: green; background-color: #ffffcc;">${totalArea} sqin</span></h3>
        <h3>Total Cost of All Shelves Combined: <span style="color: green;background-color: #ffffcc;">$${totalCost.toFixed(2)}</span></h3>`;
}



// Function to remove a shelf
function removeShelf(index) {
    if (index >= 0 && index < areas.length) {
        areas.splice(index, 1);
        totalAreas.splice(index, 1);
        counts.splice(index, 1);
        totalCosts.splice(index, 1);
        displaySummary();
    }
}

// Function to reset the form
function resetForm() {
    document.getElementById('calculator-form').reset();
}

// Function to handle Enter key, Arrow keys, and Tab key for input focus navigation and form submission
function handleKeyNavigation(event) {
    const inputs = document.querySelectorAll('#calculator-form input');
    const currentIndex = Array.from(inputs).indexOf(event.target);
    
    if (event.key === 'Enter') {
        event.preventDefault();
        
        if (currentIndex === inputs.length - 1) {
            // If on the last input field, trigger the addShelf function
            addShelf();
        } else {
            // Move focus to the next input field
            const nextIndex = currentIndex + 1;
            inputs[nextIndex].focus();
        }
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        
        // Move focus to the next input field
        const nextIndex = currentIndex + 1 < inputs.length ? currentIndex + 1 : currentIndex;
        inputs[nextIndex].focus();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        
        // Move focus to the previous input field
        const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
        inputs[prevIndex].focus();
    }
}

// Add event listeners to input fields for key handling
document.querySelectorAll('#calculator-form input').forEach(input => {
    input.addEventListener('keydown', handleKeyNavigation);
});
