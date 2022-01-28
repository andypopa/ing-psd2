import axios from 'axios';
import { config } from './config.js';
import https from 'https';
import { getDigest } from './lib/digest.js';
import { getAuthorizationHeaderValue } from './lib/authorization.js';

const { payload } = process.env;

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

instance.interceptors.request.use((axiosConfig) => {
	console.log(axiosConfig);
	axiosConfig.headers.Date = new Date().toUTCString();
	axiosConfig.headers.Digest = getDigest(axiosConfig.data);
	axiosConfig.headers.Authorization = getAuthorizationHeaderValue(axiosConfig);
	return axiosConfig;
}, function (error) {
	return Promise.reject(error);
});

instance.post(config.routes.auth, payload)
	.then((res) => console.log(res.status))
	.catch(console.error);

console.log();