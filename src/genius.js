import cheerio from 'cheerio'

class Genius {
  constructor(token) {
    this.token = token;
  }

  async request(path) {
    const url = path.includes('?') ?
      `https://api.genius.com/${path}&access_token=${this.token}`
      : `https://api.genius.com/${path}?access_token=${this.token}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

    if (result.error) {
      throw new Error(`${result.error}: ${result.error_description}`);
    }
    if (result.meta.status !== 200) {
      throw new Error(`${result.meta.status}: ${result.meta.message}`);
    }
    return result.response;
  }

  async song(title, artist) {
    const searchPath = `search?q="${title} by ${artist}"`;
    const songPath = (await this.request(searchPath)).hits[0].result.api_path.slice(1);
    const { song } = await this.request(songPath);
    const lyrics = await this.scrapeLyrics(song.url);
    return Object.assign({ lyrics }, song);
  }

  async referents(id) {
    const path = `referents?song_id=${id}&text_format=html`;
    return (await this.request(path)).referents;
  }

  async scrapeLyrics(url) {
    const completeUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    const response = await fetch(completeUrl);
    const text = await response.text();
    const parsed = cheerio.load(text);
    return parsed('.lyrics')
      .text()
      .trim();
  }
}

export default Genius;