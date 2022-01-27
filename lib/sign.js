import crypto from 'crypto';
import { config } from '../config.js';

export const getSigningString = (httpMethod, reqPath, reqDate, digest) => `(request-target): ${httpMethod} ${reqPath}
date: ${reqDate}
digest: ${digest}`;

export const sign = (data) => {
	if (typeof data === 'string') {
		data = Buffer.from(data);
	}

	const signature = crypto.sign('sha256', data, config.certs.signing.key).toString('base64');

	return signature;
}
const { signingString } = process.env;

console.log({ signingString, sign: sign(signingString) })