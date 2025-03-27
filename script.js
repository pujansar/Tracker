const months = [
    {
        name: "January",
        days: "31",
    },
    {
        name: "February",
        days: "28",
    },
    {
        name: "March",
        days: "31",
    }, 
    {
        name: "April",
        days: "30",
    },
    {
        name: "May",
        days: "31",
    },
    {
        name: "June",
        days: "30",
    },
    {
        name: "July",
        days: "31",
    },
    {
        name: "August",
        days: "31",
    },
    {
        name: "September",
        days: "30",
    },
    {
        name: "October",
        days: "31",
    },
    {
        name: "November",
        days: "30",
    },
    {
        name: "December",
        days: "31",
    }
]

const trackerDisplay = document.getElementById("tracker");
const trackerButton = document.getElementById("tracker-btn");
const dateSelector = document.getElementById("date-selector");
const calendar = document.getElementById("tracker-calendar");
const testButton = document.getElementById("test-btn");
let i = 1;

const printDate = () => {
    date = splitDate(dateSelector.value)
    trackerDisplay.innerText = `${suffixDay(date[0])} ${months[date[1] - 1].name} ${date[2]}`;
};

const suffixDay = day => {
    if (day % 10 === 1) {
        return String(day) + "st";
    } else if (day % 10 === 2){
        return String(day) + "nd";
    } else if (day % 10 === 3){
        return String(day) + "rd";
    } else {
        return String(day) + "th";
    }
}

const splitDate = date => {
    dateList = date.split("-").map((item) => Number(item))
    return [dateList[2], dateList[1], dateList[0]];
} //       date         month        year

const addDays = () => {
    if (true) {
        while (i <= 31) {
            calendar.innerHTML += `<div>${i}</div>`;
            i++;
        }
    } else {
    }
    for (let j = 0; j < 11; j++) {
        calendar.innerHTML += `<div> </div>`;
    }
}
trackerButton.addEventListener("click", printDate);
testButton.addEventListener("click", addDays);
// addDays()