import { readFileSync } from 'fs';

const SIGNING_CERT_PATH = './certs/example_client_signing.cer';

export const config = {
    baseUrl: 'https://api.sandbox.ing.com',
    routes: {
        auth: '/oauth2/token'
    },
    certs: {
        signing: {
            path: SIGNING_CERT_PATH,
            data: readFileSync(SIGNING_CERT_PATH, 'utf8'),
            serialNumber: '5E4299BE'
        }
    }
}