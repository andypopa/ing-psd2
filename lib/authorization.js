import { config } from '../config.js';
import { signAxiosRequest } from './sign.js';

const authorizationHeaderValueParamMapDefaults = {
	keyId: `SN=${config.certs.signing.serialNumber}`,
	algorithm: 'rsa-sha256',
	headers: '(request-target) date digest',
}

const getAuthorizationHeaderValueFromParamMap = (authorizationHeaderValueParamMap) => {
	const retVal = 'Signature ' + Object.entries(authorizationHeaderValueParamMap)
		.map(([key, val]) => `${key}="${val}"`)
		.join(',');

	return retVal;
}

export const getAuthorizationHeaderValue = (axiosConfig) => {
	const signature = signAxiosRequest(axiosConfig);
	const authorizationHeaderValueParamMap = {
		...authorizationHeaderValueParamMapDefaults,
		signature
	};

	const authorizationHeaderValue = getAuthorizationHeaderValueFromParamMap(authorizationHeaderValueParamMap);

	return authorizationHeaderValue;
}