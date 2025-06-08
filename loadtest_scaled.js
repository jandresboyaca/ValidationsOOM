import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 200 },   // ~2000 TPS
        { duration: '1m', target: 200 },   // Mantener 2000 TPS 1 minuto
        { duration: '1m', target: 600 },   // Subir a ~6000 TPS (600 VUs * 10 req/s)
        { duration: '10m', target: 600 },   // Mantener 6000 TPS 1 minuto (max scaling)
        { duration: '15m', target: 150 },  // Bajar a ~1500 TPS, mantener 15 minutos
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'],
        http_req_duration: ['p(95)<3000'],
    },
};

export default function () {
    const res = http.get('http://localhost:8080/api/hello');

    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains Hello': (r) => r.body && r.body.includes('Hello'),
    });

    if (!res.body) {
        console.error(`❌ Empty body. Status: ${res.status}`);
    }

    sleep(0.1);  // Cada VU hace aprox 10 req/s
}
