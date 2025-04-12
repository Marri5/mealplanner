# Meal Planner

An advanced meal planning application built with Nuxt.js and MongoDB, featuring AI-powered recipe suggestions and meal planning capabilities.

## Features

- Recipe browsing and management
- AI-powered meal suggestions
- Weekly meal planning with drag-and-drop interface
- Automatic shopping list generation
- User authentication and profiles
- Responsive design for all devices
- Dark mode support
- Internationalization ready

## Prerequisites

- Node.js (v18 or later)
- MongoDB (v6.0 or later)
- npm or yarn
- OpenAI API key (for AI features)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meal-planner.git
cd meal-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Project Structure

```
meal-planner/
├── assets/           # Static assets (CSS, images)
├── components/       # Vue components
├── composables/      # Composable functions
├── layouts/          # Page layouts
├── pages/           # Application pages
├── public/          # Public static files
├── server/          # Server-side code
│   ├── api/         # API routes
│   ├── models/      # MongoDB models
│   └── utils/       # Server utilities
└── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Nuxt.js](https://nuxt.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
