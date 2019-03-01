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
  if (!currentTrack || !currentTrack["@attr"] || !currentTrack["@attr"].nowplaying) {
    throw new Error('You\'re not currently playing anything');
  }
  const song = await genius.song(currentTrack.name, currentTrack.artist['#text']);
  if (!song || song.primary_artist.name.trim().toLowerCase() !== currentTrack.artist['#text'].trim().toLowerCase()) {
    throw new Error(`Couldn't find lyrics for ${currentTrack.name}`);
  }
  const referents = await genius.annotations(song.id, song.annotation_count);

  return {
    title: song.title,
    album: song.album ? song.album.name : null,
    artist: song.primary_artist.name,
    image: song.album ? song.album.cover_art_url : song.header_image_url,
    referents: referents
  };
}

export default loadInfo;
