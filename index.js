import { ingPsd2 } from './ing-psd2/index.js';

ingPsd2.auth.authorizationServerUrl().then((res) => console.log(res.data)).catch(console.error);