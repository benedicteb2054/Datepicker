var datePickerElement = document.querySelector('.date-picker');
var selectedDateElement = document.querySelector('.date-picker .selected-date');
var datesElement = document.querySelector('.date-picker .dates');
var mthElement = document.querySelector('.date-picker .dates .month .mth');
var nextMthElement = document.querySelector('.date-picker .dates .month .next-mth');
var prevMthElement = document.querySelector('.date-picker .dates .month .prev-mth');
var daysElement = document.querySelector('.date-picker .dates .days');

// liste mois de l'annee
var months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

var date = new Date();

var today = date.getDate();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();

var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();
// selection de la date, jour, mois et année choisi
var selectedDate = date;
var selectedDay = day;
var selectedMonth = month;
var selectedYear = year;

mthElement.textContent = months[month] + ' ' + year;
selectedDateElement.textContent = format_date(date);
populate_dates(month, year);

// fonction à appeler chaque fois que l'événement spécifié est envoyé à la cible
datePickerElement.addEventListener('click', toggle_date_picker);
nextMthElement.addEventListener('click', go_to_next_month);
prevMthElement.addEventListener('click', go_to_prev_month);

// fonctions pour afficher le calendrier
function toggle_date_picker(e) {
    path = e.path || (e.composedPath && e.composedPath());
    if (!check_event_path_for_class(path, 'dates')) {
        datesElement.classList.toggle('active');
    }
}
// mois suivant
function go_to_next_month(e) {
    ++month;
    if (month > 11) {
        month = 0;
        ++year;
    }
    mthElement.textContent = months[month] + ' ' + year;
    populate_dates(month, year);
}
// mois precedent
function go_to_prev_month(e) {
    --month;
    if (month < 0) {
        month = 11;
        --year;
    }
    mthElement.textContent = months[month] + ' ' + year;
    populate_dates(month, year);
}
// date du jour
function days_in_month (month, year) { 
    return new Date(year, month, 0).getDate(); 
}
// 1er jour du mois
function first_day_of_the_month(month, year) {
    return new Date(year, month, 0).getDay();
}

function populate_dates(month, year) {
    daysElement.innerHTML = '';

    numberOfSpaces = first_day_of_the_month(month, year);
    for (var i = 0; i < numberOfSpaces; ++i) {
        var dayElement = document.createElement('div');
        dayElement.classList.add('space');
        dayElement.textContent = ' ';
        daysElement.appendChild(dayElement);
    }

    amountOfDays = days_in_month(month + 1, year);

    for (var i = 0; i < amountOfDays; ++i) {
        var dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i + 1;

        if (today == (i + 1) && currentYear == year && currentMonth == month) {
            dayElement.classList.add('today');
        }

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', function () {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            selectedDay = i + 1;
            selectedMonth = month;
            selectedYear = year;
            selectedDateElement.textContent = format_date(selectedDate);
            selectedDateElement.dataset.value = selectedDate;

            populate_dates(month, year);
        });
        daysElement.appendChild(dayElement);
    }
}

//calendrier
function check_event_path_for_class(path, selector) {
    for (var i = 0; i < path.length; ++i) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}
// format date
function format_date(d) {
    var day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    var month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    var year = d.getFullYear();

    return day + '/' + month + '/' + year;
}