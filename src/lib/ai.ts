import { AI_CONFIG } from './config';

interface AIResponse {
  text: string;
  error?: string;
}

export async function askOpenAI(prompt: string): Promise<AIResponse> {
  try {
    if (!AI_CONFIG.openai.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.openai.model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    return { text: data.choices[0].message.content };
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    return { 
      text: '', 
      error: error.message || 'Failed to get response from OpenAI'
    };
  }
}

export async function askAnthropic(prompt: string): Promise<AIResponse> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AI_CONFIG.anthropic.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: AI_CONFIG.anthropic.model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    return { text: data.content[0].text };
  } catch (error) {
    console.error('Anthropic Error:', error);
    return { text: '', error: 'Failed to get response from Anthropic' };
  }
}

export async function generateSpeech(text: string): Promise<string> {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': AI_CONFIG.elevenlabs.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('ElevenLabs Error:', error);
    throw new Error('Failed to generate speech');
  }
}