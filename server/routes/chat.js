import express from 'express';
import { callLLM } from '../services/llmService.js';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';
import { validateLayout } from '../utils/jsonValidator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, layout, history = [] } = req.body;

    if (!message || !layout) {
      return res.status(400).json({
        error: 'Message and layout are required',
      });
    }

    const systemPrompt = buildSystemPrompt(layout);

    const llmResponse = await callLLM(
      systemPrompt,
      history,
      message,
      layout
    );

    // Skip validation in mock mode
    if (process.env.MOCK_MODE !== 'true') {
      validateLayout(llmResponse.updatedLayout);
    }

    return res.json({
      explanation: llmResponse.explanation,
      updatedLayout: llmResponse.updatedLayout,
    });
  } catch (error) {
    console.error('Error processing chat:', error);
    return res.status(500).json({
      error: 'Failed to process layout instruction',
      details: error.message,
    });
  }
});

export default router;