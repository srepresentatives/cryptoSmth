import { cryptoAssets } from "../../data";

const API_KEY = 'nmnv3lhvhsxMw609sl89dWplpC1v0iWnVn35OXrqDBU=';
const API_URL = 'https://openapiv1.coinstats.app/coins';

export function fakeFetchCrypto() {
  return fetch(API_URL, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error('Failed to fetch crypto:', error);
      throw error;
    });
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 100);
  });
}