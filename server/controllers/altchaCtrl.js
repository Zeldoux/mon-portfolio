
require('dotenv').config();

exports.getChallenge = async (req, res) => {
  console.log('[ALTCHA Challenge] Request received.');

  try {
    const response = await fetch('https://api.altcha.io/challenge', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ALTCHA_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error('[ALTCHA Challenge] Failed to fetch challenge:', response.statusText);
      return res.status(500).json({ message: 'Failed to fetch ALTCHA challenge.' });
    }

    const data = await response.json();
    console.log('[ALTCHA Challenge] Challenge received:', data);

    if (data && data.id && data.difficulty) {
      res.status(200).json({
        id: data.id,
        difficulty: data.difficulty,
        maxIterations: data.maxIterations || 1000000,
      });
    } else {
      console.error('[ALTCHA Challenge] Invalid challenge data:', data);
      res.status(500).json({ message: 'Invalid ALTCHA challenge response.' });
    }
  } catch (error) {
    console.error('[ALTCHA Challenge Error]:', error);
    res.status(500).json({ message: 'Failed to fetch ALTCHA challenge.', error });
  }
};
