import Genius from './genius';

const genius = new Genius(process.env.REACT_APP_GENIUS_API_KEY);

export async function loadInfo(username) {
  const response = await fetch(
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='
    + username
    + '&api_key='
    + process.env.REACT_APP_LAST_FM_API_KEY
    + '&format=json'
    + '&limit='
    + 1
  );
  const json = await response.json();
  if (json && json.error) {
    throw new Error('No one found with that username');
  }
  const currentTrack = json.recenttracks.track[0];
  if (!currentTrack["@attr"] || !currentTrack["@attr"].nowplaying) {
    throw new Error('You\'re not currently playing anything');
  }
  const song = await genius.song(currentTrack.name, currentTrack.artist['#text']);
  if (song.primary_artist.name.trim() !== currentTrack.artist['#text'].trim()) {
    throw new Error(`Couldn't find lyrics for ${currentTrack.name}`);
  }
  const referents = await genius.annotations(song.id, song.annotation_count);

  return {
    title: song.title,
    album: song.album.name,
    artist: song.primary_artist.name,
    image: song.album.cover_art_url,
    referents: referents
  };
}

export default loadInfo;
