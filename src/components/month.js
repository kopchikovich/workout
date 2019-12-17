import React from 'react'

// class with helping methods
class Calendar {
    getDaysInMonth(date) {
    return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
}
    getFirstEmptyWeekDays(date) {
        date.setDate(1);
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
    getMonthName(monthNum) {
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return monthNames[monthNum];
    }
    getMonthNameInEng(monthNum) {
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        return monthNames[monthNum];
    }
}

// Component
const Month = (props) => {
    return (
        <article>
            <h3 className='calendar__header'>
                {Calendar.prototype.getMonthName(props.state.lastRenderedMonth)}
            </h3>
            <div className='calendar__month'>
                Month days
            </div>
        </article>
    )
}

export default Month