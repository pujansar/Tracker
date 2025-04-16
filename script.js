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
const yearLabel = document.getElementById("year-label");
const calendar = document.getElementById("calendar");
const testButton = document.getElementById("test-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const todayButton = document.getElementById("today-btn");
const startDate = document.getElementById("start-date");
const timeInput = document.getElementById("time-input");
const cycleInput = document.getElementById("cycle-input");
const trackForm = document.getElementById("tracker-form");

class MyDate {
    constructor(month, year, day) {
        if (day !== undefined) {
            this.day = day;
        }
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
        return this;
    }
}

const today = new Date();
let selectedDate = new MyDate(today.getMonth() + 1, today.getFullYear(), today.getDate());
let currentDisplayMonth = new MyDate(today.getMonth() + 1, today.getFullYear());
let highlightedDays = [];

const printDate = () => {
    console.log(selectedDate, currentDisplayMonth);
    calendar.innerHTML = "";
    monthLabel.innerText = months[currentDisplayMonth.month - 1].name;
    yearLabel.innerText = currentDisplayMonth.year;
    fillDays(currentDisplayMonth.month, currentDisplayMonth.year);
    if (selectedDate.month === currentDisplayMonth.month) {
        highlightDay(selectedDate.day);        
    }
};

const formatCurrentDate = () => {
    const { day, month, year } = selectedDate;
    return `${day}.${month}.${year}`
}
// fills current day into startDate input
startDate.textContent = formatCurrentDate();

const fillDays = (month, year) => {
    // fills the calendar with the days of the month
    const firstWeekday = (calcFirstweekday(year, month) + 5) % 7;
    let i = firstWeekday;
    let extraDays = 1;
    for (let j = 0; j < 364; j++) {
        if (i > 0) {
            calendar.innerHTML += `<button class="grayed-out prev-month" id="${months[((month - 2 >= 0) ? month - 2 : 11)].days - i + 1}p">${months[((month - 2 >= 0) ? month - 2 : 11)].days - i + 1}</button>`;
            i--;
        } else if (j > months[month - 1].days - 1 + firstWeekday) {
            calendar.innerHTML += `<button class="grayed-out next-month" id="${extraDays}n">${extraDays}</button>`
            extraDays++;
        } else {
            calendar.innerHTML += `<button class="days" id="${j+1-firstWeekday}">${j+1-firstWeekday}</button>`;
        }
    }
    // adds button functionality to days of the month
    const dayButtons = document.querySelectorAll("button[class=days]");
    dayButtons.forEach((button) => {
        button.addEventListener("click", () => {
            highlightDay(button.id);
            selectedDate = new MyDate(month, year, button.id);
            startDate.textContent = formatCurrentDate();
        });
    });
    // adds button functionality to days outside
    const grayButtons = document.querySelectorAll("button[class^=grayed-out]");
    grayButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("prev-month")) {
                selectedDate = new MyDate((month - 1 < 1) ? 12 : month - 1, year, Number([...button.id].slice(0, -1).join("")));
                prevMonth();
            } else {
                selectedDate = new MyDate((month + 1 > 12) ? 1 : month + 1, year, Number([...button.id].slice(0, -1).join("")));
                nextMonth();
            }
        });
    });
}
// 
const prevMonth = () => {
    if (currentDisplayMonth.month === 1) {
        currentDisplayMonth.month = 12;
        currentDisplayMonth.year--;
    } else {
        currentDisplayMonth.month--;
    }
    printDate();
}

const nextMonth = () => {
    if (currentDisplayMonth.month === 12) {
        currentDisplayMonth.month = 1;
        currentDisplayMonth.year++;
    } else {
        currentDisplayMonth.month++;
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
    selectedDate = new MyDate(today.getMonth() + 1, today.getFullYear(), today.getDate());
    currentDisplayMonth = {...selectedDate};
    printDate();
}

const highlightPeriod = (cycleStart) => {
    const time = parseInt(timeInput.value);
    const cycle = parseInt(cycleInput.value);
    if (isNaN(time) || isNaN(cycle) || cycleStart === undefined) {
        return;
    }
    let startDay = Number(cycleStart.day);
    highlightedDays.forEach((highlightDay) => {
        highlightDay.style.color = "#f0e1d8";
    })
    highlightedDays = [];
    for (let i = 0; i < cycle; i++) {
        const currentDay = document.getElementById(`${startDay + i}`);
        if (currentDay !== null) {
            highlightedDays.push(currentDay);
            console.log("start + i: ", startDay + i, "currentDay: ", currentDay);
            if (i < time) {
                currentDay.style.color = "rgb(255, 0, 0)";
            } else {
                currentDay.style.color = "rgb(35, 231, 35)";
            }
        }
    }
    console.log(highlightedDays);
    // if (selectedDate.year === cycleStart.year) {
    //     highlightPeriod(cycleStart.addDays(cycle));
    // }
}

todayButton.addEventListener("click", todayDate);
prevButton.addEventListener("click", prevMonth);
nextButton.addEventListener("click", nextMonth);
trackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cycleStart = new MyDate(selectedDate.month, selectedDate.year, selectedDate.day);
    highlightPeriod(cycleStart);
});

calendar.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        nextMonth();
    } else {
        prevMonth();
    }
})

cycleInput.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        cycleInput.value--;
    } else {
        cycleInput.value++;
    }
    if (cycleInput.value <= 1) {
        cycleInput.value = 1;
    }
})

timeInput.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        timeInput.value--;
    } else {
        timeInput.value++;
    }
    if (timeInput.value <= 1) {
        timeInput.value = 1;
    }
})

printDate();