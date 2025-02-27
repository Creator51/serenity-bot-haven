
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Function to get HuggingFace API token from environment
const getHuggingFaceToken = () => {
  const token = Deno.env.get('HUGGINGFACE_API_TOKEN');
  if (!token) {
    throw new Error('Missing HUGGINGFACE_API_TOKEN environment variable');
  }
  return token;
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define context for mental health responses
const getSystemPrompt = (userMessage: string) => {
  return `You are Serenity, an AI mental wellness companion designed to provide supportive, empathetic responses to users. Your goal is to offer helpful guidance and emotional support, but you are not a replacement for professional mental health services.

Current user message: "${userMessage}"

Important guidelines to follow:
1. Respond with empathy and understanding
2. Validate the user's feelings
3. Provide constructive suggestions when appropriate
4. Never give medical advice or make diagnoses
5. Always maintain a supportive and non-judgmental tone
6. Keep responses focused on mental wellbeing
7. If the user mentions self-harm or harm to others, gently recommend seeking professional help

Your response:`;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid message format. Please provide a text message.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call HuggingFace API to get response from BART model
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${getHuggingFaceToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: getSystemPrompt(message),
          parameters: {
            max_length: 250,
            do_sample: true,
            temperature: 0.7,
            top_k: 50,
            top_p: 0.95
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HuggingFace API error:', errorText);
      
      // Return a fallback response
      return new Response(
        JSON.stringify({
          response: "I'm having trouble processing your message right now. Could you please try again in a moment?",
          error: "HuggingFace API error"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    let aiResponse = result[0].generated_text;
    
    // Sometimes the model returns the prompt too, let's remove it
    const promptIndex = aiResponse.indexOf('Your response:');
    if (promptIndex !== -1) {
      aiResponse = aiResponse.substring(promptIndex + 15).trim();
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in serenity-ai function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I apologize, but I'm experiencing technical difficulties right now. Please try again later."
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
