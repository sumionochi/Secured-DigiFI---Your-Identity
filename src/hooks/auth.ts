import { createAuthRequest, requestQR, queryQRResult, cancelQueryQRResult } from 'ontlogin';

export async function initiateLogin() {
  const authRequest = createAuthRequest(); // Generate authentication request
  const challenge = await fetch('your-server-url-to-get-challenge', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authRequest)
  });

  const challengeData = await challenge.json();
  const qrResult = await requestQR(challengeData);

  return qrResult;
}

export async function checkQRResult(id: string) {
  try {
    const challengeResponse = await queryQRResult(id);
    // Submit the challenge response to your server
    const response = await fetch('your-server-url-to-submit-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ response: challengeResponse })
    });

    return response.json();
  } catch (e) {
    cancelQueryQRResult();
    throw e;
  }
}
