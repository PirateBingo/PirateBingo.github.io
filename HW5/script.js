/*
  Author: Jack Ray
  Course: COMP 4610 GUI I
  Assignment: HW5 - Scrabble Drag-and-Drop
  Description: Handles tile dealing, drag-and-drop, and score calculation
*/

// Data from Scrabble_Pieces_AssociativeArray_Jesse.js
let ScrabbleTiles = {
  "A": { "value": 1,  "originalCount": 9, "remaining": 9 },
  "B": { "value": 3,  "originalCount": 2, "remaining": 2 },
  "C": { "value": 3,  "originalCount": 2, "remaining": 2 },
  "D": { "value": 2,  "originalCount": 4, "remaining": 4 },
  "E": { "value": 1,  "originalCount": 12,"remaining": 12 },
  "F": { "value": 4,  "originalCount": 2, "remaining": 2 },
  "G": { "value": 2,  "originalCount": 3, "remaining": 3 },
  "H": { "value": 4,  "originalCount": 2, "remaining": 2 },
  "I": { "value": 1,  "originalCount": 9, "remaining": 9 },
  "J": { "value": 8,  "originalCount": 1, "remaining": 1 },
  "K": { "value": 5,  "originalCount": 1, "remaining": 1 },
  "L": { "value": 1,  "originalCount": 4, "remaining": 4 },
  "M": { "value": 3,  "originalCount": 2, "remaining": 2 },
  "N": { "value": 1,  "originalCount": 6, "remaining": 6 },
  "O": { "value": 1,  "originalCount": 8, "remaining": 8 },
  "P": { "value": 3,  "originalCount": 2, "remaining": 2 },
  "Q": { "value": 10, "originalCount": 1, "remaining": 1 },
  "R": { "value": 1,  "originalCount": 6, "remaining": 6 },
  "S": { "value": 1,  "originalCount": 4, "remaining": 4 },
  "T": { "value": 1,  "originalCount": 6, "remaining": 6 },
  "U": { "value": 1,  "originalCount": 4, "remaining": 4 },
  "V": { "value": 4,  "originalCount": 2, "remaining": 2 },
  "W": { "value": 4,  "originalCount": 2, "remaining": 2 },
  "X": { "value": 8,  "originalCount": 1, "remaining": 1 },
  "Y": { "value": 4,  "originalCount": 2, "remaining": 2 },
  "Z": { "value": 10, "originalCount": 1, "remaining": 1 },
  "_": { "value": 0,  "originalCount": 2, "remaining": 2 }
};

// Initialize game
$(document).ready(function () {
  initBoard();
  dealTiles();

  $("#submit-word").click(scoreWord);
  $("#restart-game").click(restartGame);
});

// Create a row of 7 board squares (with bonuses)
function initBoard() {
  const board = $("#scrabble-board");
  board.empty();

  const bonuses = ["", "double-letter", "", "double-word", "", "triple-letter", ""];

  for (let i = 0; i < 7; i++) {
    const square = $("<div></div>").addClass("square").addClass(bonuses[i]);
    square.attr("data-bonus", bonuses[i]);
    board.append(square);

    square.droppable({
      accept: ".tile",
      drop: function (event, ui) {
        const tile = ui.draggable;
        const letter = tile.attr("data-letter");

        // Prevent dropping more than one tile per square
        if ($(this).children().length === 0) {
          tile.position({ of: $(this), my: 'left top', at: 'left top' });
          tile.draggable("disable");
          tile.css({ top: 0, left: 0 });
          $(this).append(tile);
        } else {
          tile.animate({ top: 0, left: 0 }, "fast");
        }
      }
    });
  }
}

// Randomly deal 7 tiles
function dealTiles() {
  const rack = $("#tile-rack");
  rack.empty();

  for (let i = 0; i < 7; i++) {
    const letter = getRandomTile();
    if (!letter) break;

    const tile = $("<div></div>").addClass("tile").text(letter);
    tile.attr("data-letter", letter);
    tile.attr("data-value", ScrabbleTiles[letter].value);
    tile.draggable({
      revert: "invalid",
      containment: "document",
      helper: "original"
    });

    rack.append(tile);
  }
}

// Get a random tile from remaining pool
function getRandomTile() {
  const available = Object.keys(ScrabbleTiles).filter(l => ScrabbleTiles[l].remaining > 0);
  if (available.length === 0) return null;

  const randIndex = Math.floor(Math.random() * available.length);
  const letter = available[randIndex];
  ScrabbleTiles[letter].remaining--;
  return letter;
}

// Score the word on the board
function scoreWord() {
  let word = "";
  let score = 0;
  let wordMultiplier = 1;

  $(".square").each(function () {
    const tile = $(this).children(".tile");
    if (tile.length === 1) {
      const letter = tile.attr("data-letter");
      const value = parseInt(tile.attr("data-value"));
      word += letter;

      let bonus = $(this).attr("data-bonus");

      if (bonus === "double-letter") {
        score += value * 2;
      } else if (bonus === "triple-letter") {
        score += value * 3;
      } else if (bonus === "double-word") {
        score += value;
        wordMultiplier *= 2;
      } else if (bonus === "triple-word") {
        score += value;
        wordMultiplier *= 3;
      } else {
        score += value;
      }
    }
  });

  score *= wordMultiplier;

  $("#current-word").text(word);
  $("#current-score").text(score);
}

// Restart game
function restartGame() {
  // Reset all tile counts
  for (let letter in ScrabbleTiles) {
    ScrabbleTiles[letter].remaining = ScrabbleTiles[letter].originalCount;
  }

  $("#current-word").text("");
  $("#current-score").text("0");

  initBoard();
  dealTiles();
}
