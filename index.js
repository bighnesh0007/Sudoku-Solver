let grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function printGrid(grid) {
    for (let row of grid) {
        console.log(row.join(" "));
    }
}

function isValid(grid, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 sub-grid
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function solveSudoku(grid) {
    let emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
        return true;
    }

    let [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;

            if (solveSudoku(grid)) {
                return true;
            }

            grid[row][col] = 0;
        }
    }

    return false;
}

if (solveSudoku(grid)) {
    console.log("Sudoku puzzle solved:");
    printGrid(grid);
} else {
    console.log("No solution exists for the given Sudoku puzzle.");
}
