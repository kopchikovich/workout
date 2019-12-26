import React from 'react'

// class with helping methods
class Calendar {

    getMonth(monthNum) {
        let date = new Date();
        date.setDate(1);
        date.setMonth(monthNum);
        let days = [];
        let day = 1 - this._getFirstEmptyWeekDays(date);
        for (day; day <= this._getAmountOfDaysInMonth(date); day++) {
            let value = day > 0? `${date.getFullYear()}-${date.getMonth()+1}-${day}` : null;
            let newDay = (
                <span className='calendar__day' key={day} id={value}>
                    {day > 0? day : null}
                </span>
            );
            days.push(newDay);
        }
        return days;
    }

    getMonthName(monthNum) {
        if (monthNum < 0) monthNum += 12;
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return monthNames[monthNum];
    }

    getMonthNameInEng(monthNum) {
        if (monthNum < 0) monthNum += 12;
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        return monthNames[monthNum];
    }

    _getAmountOfDaysInMonth(date) {
        return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
    }

    _getFirstEmptyWeekDays(date) {
        const weekday = date.getDay();
        switch (weekday) {
            case 0: return 6; // Sunday
            case 1: return 0; // Monday
            case 2: return 1; // Tuesday
            case 3: return 2; // Wednesday
            case 4: return 3; // Thursday
            case 5: return 4; // Friday
            case 6: return 5; // Saturday
            default: return -1; // Error
        }
    }

}

// Component
const Month = (props) => {

    const days = Calendar.prototype.getMonth(props.monthNum)
    const openWorkoutData = (e) => {
        if (localStorage.getItem(e.target.id)) {
            const workout = JSON.parse(localStorage[e.target.id]);

            props.openModal(workout[2].name, workout.durationInMinutes); // here
        }
        
    }

    return (
        <article className='calendar__month'>
            <h3 className='calendar__header'>
                {Calendar.prototype.getMonthName(props.monthNum)}
            </h3>
            <div className='calendar__days' onClick={openWorkoutData}>
                {days}
            </div>
        </article>
    )
}

export default Month