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
            content: 'You are a JSON-only response generator specialized in activity recommendations. Return ONLY valid JSON without any markdown formatting or additional text.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        max_tokens: 1000,
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

    // Extract the content and attempt to parse it
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid OpenAI response structure');
    }

    // Remove any potential markdown formatting
    const cleanContent = content.replace(/```json\n|\n```/g, '').trim();
    
    try {
      // Attempt to parse the cleaned content
      const parsedContent = JSON.parse(cleanContent);
      return parsedContent;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', cleanContent);
      throw new Error('Failed to parse OpenAI response as JSON');
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
      throw new Error('Request timed out after 25 seconds');
    }
    console.error('Error in OpenAI request:', error);
    throw error;
  }
}