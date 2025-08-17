let englishMode = false;
// Helper: set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

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


    // Helper: get a cookie
    function getCookie(name) {
      const cname = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
        }
      }
      return "";
    }
/*
    // Apply language
    function applyLanguage(lang) {
      const greeting = document.getElementById("greeting");
      if (lang === "zh") {
        greeting.textContent = "你好，世界！";
      } else if (lang === "es") {
        greeting.textContent = "¡Hola, mundo!";
      } else {
        greeting.textContent = "Hello, world!";
      }
    }
*/
/*
// Change language and save to cookie
    function setLanguage(lang) {
      setCookie("language", lang, 30); // save for 30 days
      applyLanguage(lang);
    }
*/
    // On page load, check cookie
    document.onload = function() {
      let lang = getCookie("language");
      if (lang === "") {
        lang = "en"; // default
        setCookie("language", lang, 30);
      }else if(lang==="zh"){
        switchLanguage();
      }
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