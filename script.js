let englishMode = false;

function switchLanguage(){
    
    const allElements = document.querySelectorAll("*");
    allElements.forEach(element => {
        if (englishMode && element.hasAttribute("chinese")) {
            element.textContent = element.getAttribute("chinese");
            
        } else if (!englishMode && element.hasAttribute("english")) {
            element.textContent = element.getAttribute("english");
        }
    });
    englishMode = !englishMode;
}

let typeFilter = "";
let difficultyFilter = "";

function filterType(type) {
    const typeFilters = document.querySelectorAll(".filterButton.type");
    typeFilters.forEach(filter => {
        if (filter.id != type && filter.classList.contains("active")) {
            filter.classList.remove("active");
        }
    });
    const button = document.getElementById(type);
    button.classList.toggle("active");
    if (button.classList.contains("active")) {
        typeFilter = type;
    } else {
        typeFilter = "";
    }
    refreshTable();
}

function filterDifficulty(difficulty) {
    const difficultyFilters = document.querySelectorAll(".filterButton.difficulty");
    difficultyFilters.forEach(filter => {
        if (filter.id != difficulty && filter.classList.contains("active")) {
            filter.classList.remove("active");
        }
    });
    const button = document.getElementById(difficulty);
    button.classList.toggle("active");
    if (button.classList.contains("active")) {
        difficultyFilter = difficulty;
    } else {
        difficultyFilter = "";
    }
    refreshTable();
}

function refreshTable() {
    const table = document.getElementById("resourceTable");
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
        if (row.classList.contains("header")) return;
        const typeCell = row.querySelector(".type");
        const difficultyCell = row.querySelector(".difficulty");

        const typeMatch = !typeFilter || typeCell.getAttribute("english").toLowerCase() === typeFilter;
        const difficultyMatch = !difficultyFilter || difficultyCell.getAttribute("english").toLowerCase() === difficultyFilter;

        if (typeMatch && difficultyMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

switchLanguage();