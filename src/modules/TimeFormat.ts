function fix2Digit(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

export function convertSecondToHHMMSS(second: number): string {
    let h = Math.floor(second / 3600)
    second = second % 3600
    let m = Math.floor(second / 60)
    second = second % 60

    let result = ""
    if (second < 10) {
        result = "0" + String(second)
    }
    else {
        result = String(second)
    }
    if (h > 0 && m < 10) {
        result = `0${m}:${result}`
    }
    else {
        result = `${m}:${result}`
    }
    if (h > 0) {
        result = `${h}:${result}`
    }
    return result
}