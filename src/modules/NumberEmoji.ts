export function emojiedNumber(num: number): string {
    const numberEmoji = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
    return num.toString().split("").map((digit) => numberEmoji[parseInt(digit)]).join("");
}