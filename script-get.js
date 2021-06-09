import http from 'k6/http';
import {check} from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 10000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
    },
  },
};

export default function () {
  const random = Math.floor(Math.random() * (10000000 - 9000000)) + 9000000;
  let res = http.get(`http://localhost:3003/${random}`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}