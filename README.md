# Chatbot AI

![Chatbot AI](![image](https://github.com/user-attachments/assets/6c29079e-998e-4a2c-ace0-613de12e34d3)
)  
A powerful AI-driven chatbot built with Next.js, AI SDK, and Upstash RAG.

## 🚀 Features

- **AI-Powered Conversations** - Uses OpenAI for natural language processing.
- **Next.js & React 19** - Leverages the latest Next.js features with App Router.
- **Upstash RAG ** - Enables efficient retrieval-augmented generation and caching.
- **ShadCN UI & TailwindCSS** - Provides a beautiful, modern UI.
- **Optimized Performance** - Uses TurboPack and efficient list virtualization.
- **Testing with Jest & React Testing Library** - Ensures reliability.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS, ShadCN UI, Lucide React
- **AI & Backend**: OpenAI SDK, Upstash RAG, Upstash Redis
- **Testing**: Jest, React Testing Library
- **Tooling**: ESLint, TypeScript, Tailwind Merge

## 📦 Installation

Clone the repository and install dependencies using `pnpm`:

```sh
pnpm install
```

## 🔧 Usage

### Development

```sh
pnpm dev
```

### Build for Production

```sh
pnpm build
pnpm start
```

### Linting

```sh
pnpm lint
```

### Running Tests

```sh
pnpm test
```

## 🔑 Environment Variables

Create a `.env.local` file and add the following environment variables:

```env
UPSTASH_VECTOR_REST_URL=your upstash_vector_url
UPSTASH_VECTOR_REST_TOKEN=your upstash_vector_rest_token

QSTASH_URL=your qstash_url
QSTASH_TOKEN=your qstash_token

QSTASH_CURRENT_SIGNING_KEY=your qstash_key
QSTASH_NEXT_SIGNING_KEY=your qstash_next_key

INFACTORY_API_KEY=your infactory_api_key
```

## 📂 Project Structure

```
├── src
│   ├── components   # UI Components
│   ├── common       # Common 
│   ├── pages        # Next.js App Router Pages
│   ├── hooks        # Custom Hooks
│   ├── utils        # Utility Functions
│   ├── styles       # Tailwind Styles
│   └── lib          # API and Database Logic
├── public           # Static Assets
├── tests            # Unit and Integration Tests
└── README.md        # Project Documentation
```

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests. Contributions are welcome!

## 📜 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- OpenAI for AI capabilities
- Upstash for RAG & Redis services
- Next.js and React teams
- ShadCN UI for beautiful components

---

