const months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurdsay", "Friday", "Saturday"];

const d = new Date(2022, 0, 0);
console.log(d.getDate());

function addCalendar() {
    const noDaysForMonths = []
    for (let idx in months) {
        noDaysForMonths.push(new Date(2022, (Number(idx) + 1), 0).getDate());
    }

    
    console.log(noDaysForMonths);


    let datesString = [];

    for(let i = 0; i < months.length; i++) {
        let days = "";
        const firstWeekDay = new Date(2022, i, 1).getDay();
        console.log("Prima zi a Lunii" + firstWeekDay);

        if(firstWeekDay != 0) {
            for(let k = 0; k < firstWeekDay; k++) {
                days += `<span></span>`;
            }
        }

        for(j = 0; j < noDaysForMonths[i]; j++) {
            days += `<span>${j + 1}</span>`;
        }
        datesString.push(days);
    }

    console.log(datesString[0]);

    let monthWeekElem = 
    months.map( month => `
    <div class="month">
    <h2>${month}</h2>
    <div class="week">
    ${weekDays.map(weekDay => 
        `<p>${weekDay}</p>`).join("")}
    `);
    
    console.log(monthWeekElem.length);
    console.log(monthWeekElem);

    for(let i = 0; i < monthWeekElem.length; i++) {
        console.log(i);
        monthWeekElem[i] += datesString[i];
        monthWeekElem[i] += "</div></div>";
    }
    
    console.log(monthWeekElem.join(""));
    document.querySelector(".calendar").innerHTML = monthWeekElem.join("");
}

addCalendar();

