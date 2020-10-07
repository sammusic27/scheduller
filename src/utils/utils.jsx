export function findArrayElementByDate(array, date) {
    return array.find(element => element.date === date)
}

export function findArrayIndexByDate(array, date) {
    return array.findIndex(element => element.date === date )
}

export function range(start, end) {
    let list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }

    return list
}