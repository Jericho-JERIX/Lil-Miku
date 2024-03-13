// import { Ping } from "./src/interaction/commands/ping";
import { downloadMusicFromYoutube } from './src/modules/DownloadMusicFromYoutube';

// console.log(Ping);

downloadMusicFromYoutube("https://www.youtube.com/watch?v=H6FUBWGSOIc",(a,b,c) => {
    console.log("DONEEEE")
})