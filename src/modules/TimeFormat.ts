export function convertSecondToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const second = Math.floor(seconds % 60);
    return `${hours}:${minutes}:${second}`;
}