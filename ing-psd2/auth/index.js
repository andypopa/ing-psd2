import { ingPsd2HttpClient } from '../http-client.js';
import { routes } from '../routes.js';

export const token = async () => {
	const payload = 'grant_type=client_credentials';
	return ingPsd2HttpClient.post(routes.auth.token, payload);
}


export const authorizationServerUrl = async () => {
	// to do:
	//   use payload instead of string
	const payload = '?scope=payment-accounts%3Abalances%3Aview%20payment-accounts%3Atransactions%3Aview&redirect_uri=https://www.example.com&country_code=NL';
	return ingPsd2HttpClient.get(routes.auth.authorizationServerUrl + payload);
}

export const auth = {
	token,
	authorizationServerUrl
}