#!/bin/bash


###############################################################################
#                             REQUEST APPLICATIION ACCESS TOKEN               #
###############################################################################
# This script requests application access token for the PSD2 APIs in the ING's#
# sandbox environment using example eIDAS certificates.     	 			  #
###############################################################################

## THE SCRIPT USES THE DOWNLOADED EXAMPLE EIDAS CERTIFICATES
keyId="SN=5E4299BE" # Serial number of the downlaoded certificate in hexadecimal code # NO, config
certPath="certs/" # path of the downloaded certificates and keys # NO, axios
httpHost="https://api.sandbox.ing.com" # NO, config

# httpMethod value must be in lower case
httpMethod="post" # NO, axios
reqPath="/oauth2/token" # NO, axios

# You can also provide scope parameter in the body E.g. "grant_type=client_credentials&scope=greetings%3Aview"
# scope is an optional parameter. If you don't provide a scope, the accessToken is returned for all available scopes
payload="grant_type=client_credentials" # YES
payloadDigest=`echo -n "$payload" | openssl dgst -binary -sha256 | openssl base64` # NO
digest=SHA-256=$payloadDigest  # YES

reqDate=$(LC_TIME=en_US.UTF-8 date -u "+%a, %d %b %Y %H:%M:%S GMT") # YES

# signingString must be declared exactly as shown below in separate lines
signingString="(request-target): $httpMethod $reqPath
date: $reqDate
digest: $digest"

signature=`printf %s "$signingString" | openssl dgst -sha256 -sign "${certPath}example_client_signing.key" -passin "pass:changeit" | openssl base64 -A` # YES

# Curl request method must be in uppercase e.g "POST", "GET"
#payload=$payload digest=$digest signature=$signature node index.js

echo $signature
signingString=$signingString node lib/sign