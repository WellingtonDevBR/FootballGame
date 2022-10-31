import axios from 'axios';

export class Axios {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://estagio.geopostenergy.com/',
      headers: {
        'Content-Type': 'application/json',
        'git-user': 'WellingtonDevBR',
      },
    });
  }

  get(url) {
    return this.client.get(url);
  }

  post(url, data) {
    return this.client.post(url, data);
  }

  put(url, data) {
    return this.client.put(url, data);
  }

  delete(url) {
    return this.client.delete(url);
  }
}