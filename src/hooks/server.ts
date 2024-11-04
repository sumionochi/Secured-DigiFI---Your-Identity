const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

// Store challenges temporarily (in-memory for demonstration)
let challengeStore = {};

// Endpoint to generate a challenge
app.post('/requestChallenge', (req, res) => {
  const { action, ...authRequest } = req.body;
  // Generate a unique challenge ID (mock implementation)
  const challengeId = `challenge-${Date.now()}`;

  // Save the challenge data
  challengeStore[challengeId] = {
    action,
    authRequest,
    challengeResponse: null
  };

  res.json({
    ver: "1.0",
    type: "ServerHello",
    nonce: challengeId,
    server: {
      name: "MyServer",
      icon: "http://somepic.jpg",
      url: "https://myserver.io",
      did: "did:ont:sampletest"
    },
    chain: ["ONT"],
    alg: ["ES256"],
    VCFilters: [] // Add specific VC filters if needed
  });
});

// Endpoint to handle the submission of challenge response
app.post('/submitChallenge', (req, res) => {
  const { nonce, did, proof, VPs } = req.body;

  // Validate nonce
  if (!challengeStore[nonce]) {
    return res.status(400).json({ error: 'Invalid or expired challenge ID' });
  }

  // Perform additional validation of `proof` and `VPs` if needed

  // Store the response (for demonstration purposes)
  challengeStore[nonce].challengeResponse = {
    did,
    proof,
    VPs
  };

  // Mock response generation, e.g., returning a JWT token
  const mockToken = `jwt-token-for-${did}`;

  res.json({ token: mockToken });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
