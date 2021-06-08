import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1000,
  duration: '30s',
};

export default function () {
  const random = Math.floor(Math.random() * 10000000) + 1;
  http.get(`http://localhost:3003/${random}`);
  sleep(1);
}