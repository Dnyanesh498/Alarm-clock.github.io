var sound = new Audio("https://freespecialeffects.co.uk/soundfx/bells/church_bells_01.wav");
sound.loop = true;
var alarmButton = document.querySelector('#alarmButton');
// setting current time
var time = setInterval(function() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var second = time.getSeconds();
    var zone = (time.getHours()) < 12 ? 'AM' : 'PM';
    // if time less than 12 its am and viceversa

    if (hours > 12) {
        hours = 12 - hours;
        // it will convert 24 hours into 12 hours clock
    }

    if (hours < 0) {
        hours = hours * -1;
        // it handles the case in which if hours become less than 0;
    } else if (hours == 00) {
        hours = 12;
        // it handles 12:00 am case
    } else {
        hours = hours;
    }

    var clock = document.querySelector('.digital_Clock');
    var time = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(second) + " " + zone;
    clock.innerHTML = time;
});

// added zerofor numbers less than 10 
function addZero(time) {
    return (time < 10) ? "0" + time : time;
}

// setting up hour for alarm
function hoursList() {
    var select = document.getElementById('alarm_Hours');
    var hrs = 12;
    for (i = 1; i <= hrs; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
hoursList();

// setting up minute for alarm
function minuteList() {
    var select = document.getElementById('alarm_Minutes');
    var mnts = 59;
    for (i = 0; i <= mnts; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
minuteList();

// setting up sec for alarm
function secondList() {
    var select = document.getElementById('alarm_Seconds');
    var scnd = 59;
    for (i = 0; i <= scnd; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
secondList();

// logic for setting alarm

function setAlarm() {

    var hr = document.getElementById('alarm_Hours');
    var min = document.getElementById('alarm_Minutes');
    var sec = document.getElementById('alarm_Seconds');
    var Ap = document.getElementById('zone');

    // fetching alarm time from selected indexes
    var selectHours = hr.options[hr.selectedIndex].value;
    var selectMinutes = min.options[min.selectedIndex].value;
    var selectSeconds = sec.options[sec.selectedIndex].value;
    var selectAmPm = Ap.options[Ap.selectedIndex].value;

    var alarm_Time = addZero(selectHours) + ":" + addZero(selectMinutes) + ":" + addZero(selectSeconds) + " " + selectAmPm;

    addAlarmToList(alarm_Time);
    // for adding alarm into a list
    updateStorage(alarm_Time);
    // for updating in a local storage

    // when alarm time is equal to current time this function triggers alarm
    setInterval(function() {

        var time = new Date();
        var hours = (time.getHours());
        var minutes = time.getMinutes();
        var second = time.getSeconds();
        var zone = (time.getHours()) < 12 ? 'AM' : 'PM';
        if (hours > 12) {
            hours = 12 - hours;
        }
        if (hours < 0) {
            hours = hours * -1;
        } else if (hours == 00) {
            hours = 12;
        } else {
            hours = hours;
        }

        var time = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(second) + " " + zone;
        // when alarm time is equal te current time it will show alert
        let alarmsInList = JSON.parse(localStorage.getItem('alarms'));
        alarmsInList.forEach(element => {
            // we are comparing current time with elements from local storage so if we delete alarm from list it will not ring
            if (element == time) {
                sound.play();
                stopAlarmButton.style.display = "flex";
                // when alarm start it will show the alarm start button
                alarmButton.style.display = "none";
                // and it will hide set alarm button
                editStorage(element);
                //it will delete alarm  from local storage when it rang once.
            }
        });

    });
}
// function for addding element into a alarm list
function addAlarmToList(alarm_Time) {
    let parent = document.createElement("div");
    // create one div 
    parent.classList.add("list");
    // adding class to created div
    parent.innerHTML = `<span> ${alarm_Time} </span> &nbsp &nbsp <a class = "delete"><i class="far fa-trash-alt"></i></a>`;

    var alarm_List = document.getElementById("alarm_List");
    alarm_List.appendChild(parent);
}

// storing alarms to local storage
function updateStorage(value) {
    let alarms;
    alarms = localStorage.getItem('alarms') ? JSON.parse(localStorage.getItem('alarms')) : [];
    // we created one array in a local storage
    alarms.push(value);
    localStorage.setItem("alarms", JSON.stringify(alarms));
    // adding alarm in a array in string formate
}

// we need to display alarms in our list after page reloaded for this we created display storege function
function displayStorage() {
    let alarmItems = localStorage.getItem("alarms");
    if (alarmItems) {
        let storageItems = JSON.parse(localStorage.getItem('alarms'));
        storageItems.forEach(element => {
            addAlarmToList(element);
        });
    }
}
// we will call displayStorage function when page is reloaded
document.addEventListener("DOMContentLoaded", displayStorage);


// when we click on delete icon delete alarm function will be called and it will
// delete alarm from list and from local storage also
alarm_List.addEventListener("click", deleteAlarm);

function deleteAlarm(event) {
    event.preventDefault();
    let item = event.target.parentElement;
    //it will fetch list

    if (item.classList.contains('delete')) {
        let alarm = item.previousElementSibling.innerHTML;
        // it will fetch alarm wich we intent to delete
        let listAlarm = event.target.parentElement.parentElement;
        // it will fetch alarm on we clicked for delete
        alarm_List.removeChild(listAlarm);

        // delete alarm from storage also
        editStorage(alarm);
    }

}

function editStorage(alarm) {
    let alarms_list = JSON.parse(localStorage.getItem('alarms'));
    //get deleted alarm from local storage
    let index = alarms_list.indexOf(alarm);
    alarms_list.splice(index, 1);
    localStorage.removeItem('alarms');

    localStorage.setItem('alarms', JSON.stringify(alarms_list));
    // it will restore remaining items in local storage
}
digital.addEventListener('click', () => {
        let clock = document.querySelector('.digital_Clock');
        let time = document.querySelector('#time');
        time.style.background = "ivory";
        analogueClock.style.display = "none";
        clock.style.display = "block";
        analogue.disabled = false;
        digital.disabled = true;
    })
    // logic for stop alarm when clicked on stop alarm button
var stopAlarmButton = document.querySelector('#stopAlarmButton');
sstopAlarmButton.style.display = "none";

function stopAlarm() {
    sound.loop = false;
    alarmButton.style.display = "flex";
    //when we click on stop alarm button it will display set alarm button
    stopAlarmButton.style.display = "none"
        //and hide stop alarm button
}
