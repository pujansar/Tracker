const months = [
    {
        name: "January",
        days: 31,
    },
    {
        name: "February",
        days: 28,
    },
    {
        name: "March",
        days: 31,
    }, 
    {
        name: "April",
        days: 30,
    },
    {
        name: "May",
        days: 31,
    },
    {
        name: "June",
        days: 30,
    },
    {
        name: "July",
        days: 31,
    },
    {
        name: "August",
        days: 31,
    },
    {
        name: "September",
        days: 30,
    },
    {
        name: "October",
        days: 31,
    },
    {
        name: "November",
        days: 30,
    },
    {
        name: "December",
        days: 31,
    }
]

const monthLabel = document.getElementById("month-label");
const calendar = document.getElementById("calendar");
const testButton = document.getElementById("test-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const todayButton = document.getElementById("today-btn");
const startDate = document.getElementById("start-date");
const timeInput = document.getElementById("time-input");
const cycleInput = document.getElementById("cycle-input");
const trackButton = document.getElementById("track-btn");

class MyDate {
    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
    
    addDays(days) {
        this.day += days;
        if (this.day > months[this.month - 1].days) {
            this.day -= months[this.month - 1].days;
            this.month++;
            if (this.month > 12) {
                this.month = 1;
                this.year++;
            }
        }
    }
}

const today = new Date();
let selectedDate = new MyDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
let cycleStartDate;

const printDate = () => {
    calendar.innerHTML = "";
    monthLabel.innerText = `${months[selectedDate.month - 1].name} ${selectedDate.year}`;
    fillDays(selectedDate.month, selectedDate.year);
};

const splitDate = (date) => {
    return date.split("-").reverse().map((item) => Number(item)); // [day, month, year]
}

const fillDays = (month, year) => {
    // Fill the calendar with the days of the month
    const firstWeekday = (calcFirstweekday(year, month) + 5) % 7;
    let i = firstWeekday; //sa = 5, so = 6, mo = 0, di = 1, mi = 2, do = 3, fr = 4
    let extraDays = 1;
    for (let j = 0; j < 42; j++) {
        if (i > 0) {
            calendar.innerHTML += `<button class="grayed-out prev-month">${months[((month - 2 >= 0) ? month - 2 : 11)].days - i + 1}</button>`;
            i--;
        } else if (j > months[month - 1].days - 1 + firstWeekday) {
            calendar.innerHTML += `<button class="grayed-out next-month">${extraDays}</button>`
            extraDays++;
        } else {
            calendar.innerHTML += `<button class="days" id="${j+1-firstWeekday}">${j+1-firstWeekday}</button>`;
        }
    }
    const dayButtons = document.querySelectorAll("button[class=days]");
    dayButtons.forEach((button) => {
        button.addEventListener("click", () => {
            highlightDay(button.id);
            selectedDate = new MyDate(button.id, month, year);
            startDate.textContent = `${button.id > 9 ? button.id : "0" + button.id}.${month > 9 ? month : "0" + month}.${year}`;
        });
    });
    const grayButtons = document.querySelectorAll("button[class^=grayed-out]");
    grayButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("prev-month")) {
                prevMonth();
            } else {
                nextMonth();
            }
        })
    })
}

const prevMonth = () => {
    console.log(selectedDate.month, selectedDate.year);
    if (selectedDate.month === 1) {
        selectedDate.month = 12;
        selectedDate.year--;
    } else {
        selectedDate.month--;
    }
    printDate();
}

const nextMonth = () => {
    console.log(selectedDate.month, selectedDate.year);
    if (selectedDate.month === 12) {
        selectedDate.month = 1;
        selectedDate.year++;
    } else {
        selectedDate.month++;
    }
    printDate();
}

const highlightDay = (day) => {
    const prevDay = document.getElementById(selectedDate.day);
    prevDay.style.border = "none";
    const currentDay = document.getElementById(day);
    currentDay.style.border = "solid white";
    currentDay.style.borderWidth = "1px"; 
}

const calcFirstweekday = (year, month, day=1) => {
    const monthCode = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
    const lastTwoDigits = Number(String(year).substring(2));
    const oneQuarter = Math.floor(lastTwoDigits * 1.25);
    const monthKeyAdded = oneQuarter + monthCode[month - 1] + day - 1 + ((month === 1 || month === 2) && year % 4 === 0 ? -1 : 0) ;
    const remainder = monthKeyAdded % 7;
    return remainder;
}

const todayDate = () => {
    const newSelectedDate = new MyDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
    if (JSON.stringify(selectedDate) === JSON.stringify(newSelectedDate)) {
        return;
    }
    selectedDate = newSelectedDate;
    printDate();
    highlightDay(selectedDate.day);
}

const highlightPeriod = () => {
    const time = parseInt(timeInput.value);
    const cycle = parseInt(cycleInput.value);
    cycleStartDate = selectedDate;
    if (isNaN(time) || isNaN(cycle) || cycleStartDate === undefined) {
        return;
    }
    printDate();
    let startDay = cycleStartDate.day;
    let i = 0;
    while (i < cycle) {
        console.log("i: ", i, "startDay: ", startDay, "time: ", time);
        const currentDay = document.getElementById(startDay + i);
        if (currentDay === null) {
            break;
        }
        if (i < time) {
            currentDay.style.backgroundColor = "rgba(114, 19, 19, 0.3)";
        } else {
            currentDay.style.backgroundColor = "rgba(19, 114, 19, 0.3)";
        }
        i++;	
    }
}

todayButton.addEventListener("click", todayDate);
prevButton.addEventListener("click", prevMonth);
nextButton.addEventListener("click", nextMonth);
trackButton.addEventListener("click", highlightPeriod);
calendar.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        nextMonth();
    } else {
        prevMonth();
    }
})

printDate();