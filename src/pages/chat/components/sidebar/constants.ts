import { Model } from './types';

export const MODELS: Model[] = [
  {
    value: 'gpt-4',
    label: 'GPT-4',
    description: 'Most capable GPT model for complex tasks'
  },
  {
    value: 'gpt-3.5-turbo',
    label: 'GPT-3.5 Turbo',
    description: 'Faster and more cost-effective for simpler tasks'
  },
  {
    value: 'claude-3-opus',
    label: 'Claude 3 Opus',
    description: 'Most powerful Claude model with enhanced capabilities'
  },
  {
    value: 'claude-3-sonnet',
    label: 'Claude 3 Sonnet',
    description: 'Balanced Claude model for most use cases'
  },
];
