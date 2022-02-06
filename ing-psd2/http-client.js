import axios from 'axios';
import { config } from '../config.js';
import https from 'https';
import { getDigest } from './digest.js';
import { routes } from './routes.js';
import { getAuthorizationHeaderValue } from './authorization.js';
import { signAxiosRequest } from './sign.js';

export const ingPsd2HttpClient = axios.create({
	baseURL: config.baseUrl,
	httpsAgent: new https.Agent({
		cert: config.certs.client.cert,
		key: config.certs.client.key
	})
});

ingPsd2HttpClient.interceptors.request.use(async (axiosConfig) => {
	console.log(axiosConfig);
	axiosConfig.headers.Date = new Date().toUTCString();
	axiosConfig.headers.Digest = getDigest(axiosConfig.data);

	if (axiosConfig.url === routes.auth.token) {
		axiosConfig.headers.Authorization = getAuthorizationHeaderValue(axiosConfig);
		axiosConfig.headers['TPP-Signature-Certificate'] = config.certs.signing.cert;
	} else {
		const payload = 'grant_type=client_credentials';
		const { data } = await ingPsd2HttpClient.post(routes.auth.token, payload);
		axiosConfig.headers.Authorization = 'Bearer ' + data.access_token;
		axiosConfig.headers.Signature = getAuthorizationHeaderValue(axiosConfig, data.client_id);
	}
	const { Authorization } = axiosConfig.headers;
	console.log({ Authorization });
	return axiosConfig;
}, function (error) {
	return Promise.reject(error);
});