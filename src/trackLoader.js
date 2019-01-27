import Genius from './genius';

export async function loadInfo(username) {
  const response = await fetch(
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='
    + username
    + '&api_key='
    + process.env.REACT_APP_LAST_FM_API_KEY
    + '&format=json'
  );
  const json = await response.json();
  if (json && json.error) {
    // couldn't find user or some other error
    console.log(json.message);
    return;
  }
  const currentTrack = json.recenttracks.track[0];
  if (!currentTrack["@attr"] || !currentTrack["@attr"].nowplaying) {
    console.log('not currently playing anything');
    return;
  }
  // get lyrics
  const genius = new Genius(process.env.REACT_APP_GENIUS_API_KEY);
  const song = await genius.song(currentTrack.name, currentTrack.artist["#text"]);
  const referents = await genius.referents(song.id);
  return {
    title: song.title,
    album: song.album.name,
    artist: song.primary_artist.name,
    image: currentTrack.image[currentTrack.image.length - 1]["#text"],
    lyrics: song.lyrics,
    referents: referents
  };
}

export default loadInfo;
