function compute_table(){
    // Get and parse input values
    min_x = parseInt(document.getElementById("min_x").value);
    max_x = parseInt(document.getElementById("max_x").value);
    min_y = parseInt(document.getElementById("min_y").value);
    max_y = parseInt(document.getElementById("max_y").value);

    // Get multiplication table
    mult_table = document.getElementById("mult_table");
    
    // Clear previous multiplication table
    mult_table.innerHTML = "";

    // Validate input range
    outOfBounds = n => isNaN(n) || n < -50 || n > 50;
    if(outOfBounds(min_x) || outOfBounds(max_x) || outOfBounds(min_y) || outOfBounds(max_y) ||
       min_x > max_x || min_y > max_y){
        errorRow = document.createElement("tr");
        errorCell = document.createElement("td");
        errorCell.colSpan = 100;
        errorCell.style.color = "red";
        errorCell.textContent = "Please enter integers between -50 and 50 with min ≤ max.";
        errorRow.appendChild(errorCell);
        mult_table.appendChild(errorRow);
        return;
    }

    // Build the multiplication table
    for (let y = min_y - 1; y <= max_y; y++) {
        row = document.createElement("tr");
        for (let x = min_x - 1; x <= max_x; x++) {
            cell = document.createElement("td");

            // Top-left cell
            if (y === min_y - 1 && x === min_x - 1) {
                cell.textContent = "×";
            }
            // Top header row
            else if (y === min_y - 1) {
                cell.textContent = x;
            }
            // Left header column
            else if (x === min_x - 1) {
                cell.textContent = y;
            }
            // Inner multiplication cells
            else {
                cell.textContent = x * y;
            }
            
            // Append cell to row
            row.appendChild(cell);
        }

        // Append row to table
        mult_table.appendChild(row);
    }
}

// Startup code by assigning the compute function to the click event
function init() {
    document.getElementById("submit").onclick = compute_table;
}

window.onload = init;
