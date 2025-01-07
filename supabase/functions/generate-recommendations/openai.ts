const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateOpenAIResponse(openAIApiKey: string, prompt: string, temperature = 0.7) {
  console.log('Sending request to OpenAI with prompt:', prompt);
  console.log('Using temperature:', temperature);
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'You are a specialized activity recommendation system. Generate engaging, safe, and appropriate activities based on user preferences. Focus on providing detailed, practical suggestions.' 
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
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Received response from OpenAI:', data);
  
  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid response format from OpenAI');
  }

  return data;
}