const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateOpenAIResponse(openAIApiKey: string, prompt: string) {
  console.log('Sending request to OpenAI');
  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a JSON-only response generator. Only return valid JSON objects, no additional text or explanations.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error(`OpenAI API error: ${errorText}`);
  }

  return response.json();
}