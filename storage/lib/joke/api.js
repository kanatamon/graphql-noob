import axios from 'axios';

const BASE_PATH = 'http://api.icndb.com/';

export function getJokes() {
  return axios.get(BASE_PATH + 'jokes')
    .then(response => {
      if (response.data.type !== 'success') {
        throw new Error('Failed to call an external API');
      }
      return {
        error: null,
        data: response.data.value,
      };
    })
    .catch(error => ({
      error,
      data: null,
    }))
}
