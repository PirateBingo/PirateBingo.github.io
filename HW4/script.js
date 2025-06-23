// Jack Ray
// COMP 4610 GUI I - Homework 4
// Dynamic Multiplication Table with jQuery Validation plugin and tab support

let tabCounter = 1; // Counter for unique tab IDs

// Function to generate a multiplication table inside a new tab
function createTableTab(minX, maxX, minY, maxY) {
    const tabId = `tabs-${++tabCounter}`;
    const label = `[${minX},${maxX}] x [${minY},${maxY}]`;

    // Create new tab header
    $("<li>")
        .append(`<a href="#${tabId}">${label}</a> <span class="ui-icon ui-icon-close" role="presentation">Remove</span>`)
        .appendTo("#tabs ul");

    // Create new tab content with a table
    const $newTab = $(`<div id="${tabId}"><table class="mult_table"></table></div>`);
    $("#tabs").append($newTab);

    // Generate the table inside the new tab
    const table = $newTab.find("table").empty();

    for (let y = minY - 1; y <= maxY; y++) {
        const row = $("<tr></tr>");
        for (let x = minX - 1; x <= maxX; x++) {
            const cell = $("<td></td>");
            if (y === minY - 1 && x === minX - 1) {
                cell.text("×");
            } else if (y === minY - 1) {
                cell.text(x);
            } else if (x === minX - 1) {
                cell.text(y);
            } else {
                cell.text(x * y);
            }
            row.append(cell);
        }
        table.append(row);
    }

    // Activate the new tab
    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", $("#tabs ul li").length - 1);
}

// Function to validate input and trigger table creation
function computeTable() {
    const minX = parseInt($("#min_x").val());
    const maxX = parseInt($("#max_x").val());
    const minY = parseInt($("#min_y").val());
    const maxY = parseInt($("#max_y").val());

    // Additional logical check
    if (minX > maxX || minY > maxY) {
        alert("Min must be less than or equal to Max for both axes.");
        return false;
    }

    // Create the table tab
    createTableTab(minX, maxX, minY, maxY);
    return false;
}

// Setup validation and tab behavior
function init() {
    // Enable jQuery UI tabs
    $("#tabs").tabs();

    // Enable validation
    $("#form").validate({
        rules: {
            min_x: { required: true, number: true, range: [-50, 50] },
            max_x: { required: true, number: true, range: [-50, 50] },
            min_y: { required: true, number: true, range: [-50, 50] },
            max_y: { required: true, number: true, range: [-50, 50] }
        },
        messages: {
            min_x: { required: "Enter min X", number: "Must be number", range: "Between -50 and 50" },
            max_x: { required: "Enter max X", number: "Must be number", range: "Between -50 and 50" },
            min_y: { required: "Enter min Y", number: "Must be number", range: "Between -50 and 50" },
            max_y: { required: "Enter max Y", number: "Must be number", range: "Between -50 and 50" }
        },
        submitHandler: computeTable,
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

    // Connect button to form submission
    $("#submit").on("click", function () {
        $("#form").submit(); // triggers validation
    });

    // Enable tab closing via × icon
    $("#tabs").on("click", "span.ui-icon-close", function () {
        const panelId = $(this).closest("li").remove().attr("aria-controls");
        $(`#${panelId}`).remove();
        $("#tabs").tabs("refresh");
    });
}

// Bind when document is ready
$(document).ready(init);
