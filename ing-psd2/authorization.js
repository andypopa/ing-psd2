import { config } from '../config.js';
import { signAxiosRequest } from './sign.js';

const authorizationHeaderValueParamMapDefaults = {
	keyId: `SN=${config.certs.signing.serialNumber}`,
	algorithm: 'rsa-sha256',
	headers: '(request-target) date digest',
}

const objectToHeaderValue = (authorizationHeaderValueParamMap) => {
	const retVal = Object.entries(authorizationHeaderValueParamMap)
		.map(([key, val]) => `${key}="${val}"`)
		.join(',');

	return retVal;
}

export const getAuthorizationHeaderValue = (axiosConfig, keyId) => {
	const signature = signAxiosRequest(axiosConfig);

	const authorizationHeaderValueParamMap = {
		...authorizationHeaderValueParamMapDefaults,
		signature
	};

	if (keyId) {
		authorizationHeaderValueParamMap.keyId = keyId;
	}

	let authorizationHeaderValue = objectToHeaderValue(authorizationHeaderValueParamMap);

	if (!keyId) {
		authorizationHeaderValue = 'Signature ' + authorizationHeaderValue;
	}

	return authorizationHeaderValue;
}