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

export const signAxiosRequest = (axiosConfig) => {
	const signingString = getSigningString(axiosConfig.method, axiosConfig.url, axiosConfig.headers.Date, axiosConfig.headers.Digest);
	const signature = sign(signingString);
	return signature;
}