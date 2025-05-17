import http from 'k6/http';
import { check, sleep } from 'k6';

export const options2 = {
    stages: [
        { duration: '15s', target: 1050 },    // Calentamiento
        { duration: '30s', target: 1050 },    // Carga moderada
        { duration: '55m', target: 1050 },   // Pico sostenido (debería tumbar el pod)
        { duration: '10s', target: 0 },     // Descenso abrupto
    ],
    thresholds: {
        http_req_failed: ['rate<0.2'],             // Hasta 20% de fallos tolerables
        http_req_duration: ['p(95)<3000'],         // 95% bajo 3s
    },
};

export const options = {
    vus: 100,
    duration: '15m',
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
    sleep(0.1);
    // No sleep: máxima agresividad por VU
}
