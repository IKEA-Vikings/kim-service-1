import http from 'k6/http';
import {check} from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
    },
  },
};

export default function () {
  let res = http.post('http://localhost:3003/api/product');
  check(res, {
    'is status 201': (r) => r.status === 201,
  });
}