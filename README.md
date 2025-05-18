# DevRel Hub - Developer Relations Management Platform

A tool for Developer Relations & Dev Advocates that helps them move faster, stay in sync with their communities, and scale their impact. Saves time manually generating every demo, doc, or insight.

•	Auto-generated blog posts and tutorials from changelogs  
•	Community sentiment analysis  
•	Code sample scaffolds
•	Internal feedback summaries, ready to ship to Product


## Team

Lana Zumbrunn
Jonny Tran
Kevin Rohling
Hari Vilas Panjwani
Harshdeep Gupta

![DevRel Hub Dashboard](https://placeholder.com/dashboard-preview.png)

## Features

- **Community Sentiment Tracking**: Monitor and analyze developer sentiment across social media, forums, and GitHub interactions
- **Content Management**: Create, review, and publish blog posts, social media content, and code examples
- **Community Idea Management**: Track and prioritize feature requests and bug reports from the community
- **AI-Powered Assistance**: Generate content drafts, PRDs, and code examples using AI
- **Analytics Dashboard**: Visualize community engagement and sentiment trends

## Tech Stack

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Database**: [Neon](https://neon.tech) - Serverless Postgres database
- **AI Integration**: 
  - [CopilotKit](https://www.copilotkit.ai/) - For AI-powered content generation and code assistance
  - [CrewAI](https://www.crewai.io/) - For orchestrating AI agents to handle different aspects of developer relations
- **UI Components**: Custom components built with Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, or pnpm
- Neon database account
- CopilotKit API key
- CrewAI API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/devrel-hub.git
cd devrel-hub
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```
NEON_DATABASE_URL=your_neon_database_url
COPILOTKIT_API_KEY=your_copilotkit_api_key
CREWAI_API_KEY=your_crewai_api_key
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Setup with Neon

This project uses Neon, a serverless Postgres database, for data storage. To set up your database:

1. Create an account at [Neon](https://neon.tech)
2. Create a new project and database
3. Get your connection string from the Neon dashboard
4. Add the connection string to your `.env.local` file

## AI Integration

### CopilotKit

CopilotKit is used for generating content drafts, code examples, and providing real-time assistance. To integrate CopilotKit:

1. Sign up for an API key at [CopilotKit](https://www.copilotkit.ai/)
2. Add the API key to your `.env.local` file
3. Use the CopilotKit SDK for content generation features

### CrewAI

CrewAI is used to orchestrate multiple AI agents that handle different aspects of developer relations:

1. Content Agent: Generates blog posts and social media content
2. Community Agent: Analyzes community sentiment and feedback
3. Code Agent: Creates code examples and documentation

To set up CrewAI:

1. Sign up for an API key at [CrewAI](https://www.crewai.io/)
2. Add the API key to your `.env.local` file
3. Configure agent roles and workflows in the CrewAI dashboard

## Deployment

This application can be deployed on Vercel or any other Next.js-compatible hosting platform:

```bash
npm run build
npm run start
```

For production deployment, we recommend using Vercel for the frontend and Neon for the database.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
