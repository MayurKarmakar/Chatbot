# ChatBot

ChatBot is an application designed for conversational interactions powered by OpenAI's GPT models. This application provides users with a chat interface to engage in conversations with AI models provided by OpenAI using a simple web interface.

<span style="font-size: 20px;">[Demo](https://6642007403039c07f38a7718--resonant-arithmetic-596875.netlify.app/)</span>

## Basic Requirements

Before getting started with ChatBot, make sure your system meets the following requirements:

1. **Node.js**: Version 14.7.0 or higher is required. You can check your Node.js version by running the following command in your terminal:

   ```bash
   node -v
   ```

## Getting Started

### Installation

To get started with ChatBot, clone this repository to your local machine:

```bash
git clone https://github.com/MayurKarmakar/AIChatHub.git
cd chatbot
```

Install the dependencies:

```bash
Using npm:
npm install

Using yarn:
yarn install

Using pnpm:
pnpm install
```

Once you have installed the dependencies, you can start the development server:

```bash
Using npm:
npm run dev

Using yarn:
yarn run dev

Using pnpm:
pnpm run dev
```

This will start the application and open it in your default web browser.

### Usage

Upon opening the web application, you will be presented with a chat interface. Before you can start chatting with AI models, you need to provide the below details:

- **API Key**: An API key provided by the service provider to authenticate requests. If you don't have an API key, you can obtain one from the respective provider's website.

  ```bash
  For OpenAI:
  https://platform.openai.com/api-keys

  For TogetherAI:
  https://api.together.ai/settings/api-keys
  ```

- **Base API URL**: Provide the base API url.

  Base API url examples:

  ```bash
  For OpenAI:
  https://api.openai.com/v1/

  For TogetherAI:
  https://api.together.xyz/v1/
  ```

- **OpenAI Model Name**: The name of the OpenAI model you want to use for generating responses. You can choose from various models provided by OpenAI, such as GPT-3.

- **Response Temperature**: The response temperature, which controls the randomness of the responses generated by the AI model. Lower values result in more deterministic responses, while higher values produce more creative and varied responses.

## Documentation

For detailed documentation on OpenAI account setup and how to obtain OpenAI API key, please refer to the [Quick start guide](https://platform.openai.com/docs/quickstart)

## Contributing

Contributions are welcome!
