const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateOpenAIResponse(openAIApiKey: string, prompt: string) {
  console.log('Sending request to OpenAI with prompt:', prompt);
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
          content: 'You are a JSON-only response generator specialized in activity recommendations. You must strictly follow all requirements provided and only return valid JSON objects that match the exact criteria specified. No additional text or explanations.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5, // Lower temperature for more focused responses
      max_tokens: 2000
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error(`OpenAI API error: ${errorText}`);
  }

  const data = await response.json();
  console.log('Received response from OpenAI:', data);
  return data;
}