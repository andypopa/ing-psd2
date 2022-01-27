import axios from 'axios';
import { config } from './config.js';
import https from 'https';
import { getDigest } from './lib/digest.js';

const { payload, digest, signature } = process.env;

console.log(config.baseUrl);
console.log(config.certs.signing.data);

const instance = axios.create({
	baseURL: config.baseUrl,
	headers: {
		'TPP-Signature-Certificate': config.certs.signing.cert
	},
	httpsAgent: new https.Agent({
		cert: config.certs.client.cert,
		key: config.certs.client.key
	})
});

console.log({ payload, digest, signature, signingCert: config.certs.signing });

const headers = {
	Authorization: `Signature keyId="SN=${config.certs.signing.serialNumber}",algorithm="rsa-sha256",headers="(request-target) date digest",signature="${signature}"`,
	Digest: getDigest(payload),
	Date: new Date().toUTCString()
};

instance.post(config.routes.auth, payload, { headers })
	.then(console.log)
	.catch(console.error);

console.log();