const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurdsay", "Friday", "Saturday"];

const currYear = new Date().getFullYear();

function addCalendar() {
    const noDaysForMonths = []
    for (let idx in months) {
        noDaysForMonths.push(new Date(currYear, (Number(idx) + 1), 0).getDate());
    }
    let datesString = [];

    for(let i = 0; i < months.length; i++) {
        let days = "";
        const firstWeekDay = new Date(currYear, i, 1).getDay();

        if(firstWeekDay != 0) {
            for(let k = 0; k < firstWeekDay; k++) {
                days += `<span></span>`;
            }
        }

        for(j = 0; j < noDaysForMonths[i]; j++) {
            days += `<div class="grid-item"><span class="valid">${j + 1}</span></div>`;
        }
        datesString.push(days);
    }

    let monthWeekElem = 
    months.map( month => `
    <div class="month">
    <h2>${month}</h2>
    <div class="week">
    ${weekDays.map(weekDay => 
        `<p>${weekDay}</p>`).join("")}
    `);


    for(let i = 0; i < monthWeekElem.length; i++) {
        monthWeekElem[i] += datesString[i];
        monthWeekElem[i] += "</div></div></div>";
    }
    
    document.querySelector(".calendar").innerHTML = monthWeekElem.join("");
}

addCalendar();

let currentMood = null;

document.querySelectorAll(".moods i").forEach(mood => {
    mood.addEventListener("click", (e) => {
        
        const currentSelected = document.querySelector("i.selected");
        if(currentSelected) {
            currentSelected.classList.remove("selected")
        }
        mood.classList.add("selected");
        currentMood = getComputedStyle(mood).getPropertyValue("color")
    })
})

document.querySelectorAll("span.valid").forEach(date => {
    date.addEventListener("click", (e) => {
        if(currentMood) {
            date.style.backgroundColor = currentMood;
        } else {
            window.alert("Choose a mood first!")
        }
    })
})