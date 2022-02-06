import { readFileSync } from 'fs';

const SIGNING_CERT_PATH = './certs/example_client_signing.cer';
const SIGNING_KEY_PATH = './certs/example_client_signing.key';

const CLIENT_CERT_PATH = './certs/example_client_tls.cer';
const CLIENT_KEY_PATH = './certs/example_client_tls.key';

export const config = {
    baseUrl: 'https://api.sandbox.ing.com',
    certs: {
        signing: {
            cert: readFileSync(SIGNING_CERT_PATH, 'utf8')?.replace(/\n/g, ''),
            key: readFileSync(SIGNING_KEY_PATH, 'utf8'),
            serialNumber: '5E4299BE'
        },
        client: {
            cert: readFileSync(CLIENT_CERT_PATH, 'utf8'),
            key: readFileSync(CLIENT_KEY_PATH, 'utf8')
        }
    }
}