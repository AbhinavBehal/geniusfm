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

    if (result.error) {
      throw new Error(`${result.error}: ${result.error_description}`);
    }
    if (result.meta.status !== 200) {
      throw new Error(`${result.meta.status}: ${result.meta.message}`);
    }
    return result.response;
  }

  async song(title, artist) {
    const trimIndex = title.lastIndexOf('-');
    const fixedTitle = title.slice(0, trimIndex > 0 ? trimIndex : title.length).trim();;
    const searchPath = `search?q="${fixedTitle} ${artist}"&per_page=1`;
    const songPath = (await this.request(searchPath)).hits[0].result.api_path.slice(1);
    const { song } = await this.request(songPath);

    return song;
  }

  async annotations(id, count) {
    const url = `https://genius.com/songs/${id}/embed.js`
    const response = await fetch(url);
    const text = await response.text();
    const parsed = cheerio.load(eval(text.slice(text.indexOf('JSON.parse('), text.lastIndexOf('))') + 1)));
    const children = parsed('.rg_embed_body > p').contents();
    const components = [];
    const referents = await this.referents(id, count);
    const annotationMap = new Map();
    referents.forEach(r => {
      annotationMap.set(
        r.api_path.substr(r.api_path.lastIndexOf('/') + 1),
        r.annotations[0].body.html)
    });
    let currentLine = { lyrics: '', annotation: null };
    const addLine = () => {
      if (currentLine.lyrics.trim().length !== 0) {
        components.push(currentLine);
      }
      currentLine = { lyrics: '', annotation: null };
    };
    children.each(c => {
      const line = children[c];
      if (line.name === 'br') {
        addLine();
      } else if (line.type === 'text') {
        currentLine.lyrics += line.data;
      } else if (
        line.name === 'i'
        && line.children.length > 0
        && line.children[0].type === 'text') {
        currentLine.lyrics += line.children[0].data;
      } else {
        addLine();
        const $ = cheerio.load(line);
        const link = $('a');
        if (link.html()) {
          components.push({
            lyrics: link.removeAttr('href target onclick').html(),
            annotation: annotationMap.get(link.attr('data-id'))
          });
        }
      }
    });
    addLine();
    return components;
  }

  async referents(id, count) {
    // todo: max per_page is 50, get error if larger
    const path = `referents?song_id=${id}&text_format=html&per_page=${count > 0 ? count : 1}`;
    return (await this.request(path)).referents;
  }
}

export default Genius;