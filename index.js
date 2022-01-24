import axios from 'axios';
import { config } from './config.js';

const { payload, digest, reqDate, signature } = process.env;

console.log({ payload, digest, reqDate, signature, signingCert: config.certs.signing });
