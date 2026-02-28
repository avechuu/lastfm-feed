import fs from "fs";
import fetch from "node-fetch";

const USERNAME = "avechuu";
const API_KEY = "543fffd28f8ca2263455b3c46cd5df95";

const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=5`;

async function run() {
  const response = await fetch(url);
  const data = await response.json();

  const tracks = data.recenttracks.track.map(track => ({
    name: track.name,
    artist: track.artist["#text"],
    image: track.image?.[2]?.["#text"] || "",
    nowPlaying: track["@attr"]?.nowplaying === "true",
    timestamp: track.date?.uts || null
  }));

  fs.writeFileSync("latest.json", JSON.stringify({ tracks }, null, 2));
}

run();
