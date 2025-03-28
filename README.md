# Chatbot AI

![Chatbot AI](https://via.placeholder.com/100x100.png)  
A powerful AI-driven chatbot built with Next.js, AI SDK, and Upstash RAG.

## 🚀 Features

- **AI-Powered Conversations** - Uses OpenAI for natural language processing.
- **Next.js & React 19** - Leverages the latest Next.js features with App Router.
- **Upstash RAG & Redis** - Enables efficient retrieval-augmented generation and caching.
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
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_rest_token

UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token

QSTASH_URL=your=qstash_url
QSTASH_TOKEN=your qstash_token

QSTASH_CURRENT_SIGNING_KEY=your qstash_key
QSTASH_NEXT_SIGNING_KEY=your qstash_next_key
```

## 📂 Project Structure

```
├── src
│   ├── components   # UI Components
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

Made with ❤️ by Darlene
