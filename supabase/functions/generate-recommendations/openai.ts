const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateOpenAIResponse(openAIApiKey: string, prompt: string, temperature = 0.7) {
  console.log('Sending request to OpenAI with prompt:', prompt);
  console.log('Using temperature:', temperature);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

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
            content: 'You are a JSON-only response generator specialized in activity recommendations. You must strictly follow all requirements provided and only return valid JSON objects that match the exact criteria specified. Be creative and unconventional while staying within safety guidelines.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        max_tokens: 1000, // Reduced from 2000 to improve response time
        n: 1
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      
      if (errorText.includes('insufficient_quota') || response.status === 429) {
        throw new Error('OpenAI API quota exceeded. Please update your API key.');
      }
      
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI:', data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
      throw new Error('Request timed out after 25 seconds');
    }
    console.error('Error in OpenAI request:', error);
    throw error;
  }
}