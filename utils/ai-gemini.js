
// Call Gemini API for dream interpretation
export async function getDreamInterpretation(dreamText) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Server misconfigured: GEMINI_API_KEY is missing');
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Dream: ${dreamText}` }]
        }],
        systemInstruction: {
          parts: [{
            text: 'You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.'
          }]
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error ? data.error.message : response.statusText;
      throw new Error(errorMsg);
    }

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text.trim();
    }

    throw new Error('No interpretation returned from Gemini API.');

  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error(`API error: ${error.message}`);
  }
}



