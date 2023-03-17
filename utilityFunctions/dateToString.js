module.exports = function dateToString(date) {
    let day = date.getDay().toString();
    let month = date.getMonth().toString();
    let year = date.getFullYear().toString();
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();

    const monthsObj = {
        0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };

    if (day.length === 1) {day = '0' + day}
    if (hours.length === 1) {hours = '0' + hours}
    if (minutes.length === 1) {minutes = '0' + minutes}
    if (seconds.length === 1) {seconds = '0' + seconds}

    return `${day} ${monthsObj[month]} ${year}, ${hours}:${minutes}:${seconds}`;
}