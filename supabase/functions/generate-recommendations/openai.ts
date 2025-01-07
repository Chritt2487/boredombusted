const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateOpenAIResponse(openAIApiKey: string, prompt: string, temperature = 0.7) {
  console.log('Sending request to OpenAI with prompt:', prompt);
  console.log('Using temperature:', temperature);
  
  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a JSON-only response generator specialized in activity recommendations. You must strictly follow all requirements provided and only return valid JSON objects that match the exact criteria specified. Be creative and unconventional while staying within safety guidelines.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: temperature,
      max_tokens: 2000,
      n: 1
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