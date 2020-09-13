export default function dateFormatter(timeStamp) {
    const dateObj = new Date(timeStamp)
    let month = String(dateObj.getMonth() + 1).padStart(2, '0')
    let date = String(dateObj.getDate()).padStart(2, '0')
    return `${date} / ${month}`
}
