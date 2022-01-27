import crypto from 'crypto';

export const getDigest = (message) => {
	const hash = crypto.createHash('sha256').update(message).digest('base64');
	return `SHA-256=${hash}`;
}