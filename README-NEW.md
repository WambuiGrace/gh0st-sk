# Find Something ToDo 🪴

A community-driven todo app where people can share what they're working on and get inspired by others' productivity. Built with Astro, TailwindCSS, MongoDB, and Clerk authentication.

## Features

- 🌱 **Community Todos**: Browse what others are working on
- ✍️ **Add Your Own**: Share your current tasks and projects
- 🎯 **Categories**: Organize todos by learning, health, creative, productivity, etc.
- 🔍 **Search & Filter**: Find specific types of todos
- 🎨 **Beautiful Design**: Plant-themed, green aesthetic with smooth animations
- 🔐 **Authentication Ready**: Clerk integration for user accounts (coming soon)

## Tech Stack

- **Frontend**: Astro with TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB
- **Authentication**: Clerk (planned)
- **Deployment**: Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gh0st-sk
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=find-todo-app
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:4321](http://localhost:4321) in your browser

## Project Structure

```
src/
├── components/
│   ├── AddToDoForm.astro    # Form for adding new todos
│   ├── Header.astro         # Navigation header
│   └── ToDoCard.astro       # Individual todo display
├── layouts/
│   └── Layout.astro         # Base HTML layout
├── lib/
│   └── db.js               # MongoDB connection and queries
├── pages/
│   ├── index.astro         # Home page with recent todos
│   ├── browse.astro        # Browse all todos with filters
│   ├── add.astro           # Add new todo page
│   ├── signin.astro        # Authentication page
│   └── api/
│       └── todos.js        # API endpoints for todos
└── styles/
    └── global.css          # Global styles and animations
```

## API Endpoints

### GET /api/todos
Fetch todos with pagination and filtering:
- `?limit=10` - Number of todos to return
- `?skip=0` - Number of todos to skip
- `?category=learning` - Filter by category

### POST /api/todos
Add a new todo:
```json
{
  "todoText": "Learning Astro framework",
  "userName": "Dev Explorer",
  "category": "learning",
  "isPublic": true
}
```

## Database Schema

### Todos Collection
```javascript
{
  _id: ObjectId,
  text: String,        // The todo description
  user: String,        // User name (anonymous for now)
  category: String,    // learning, health, creative, etc.
  isPublic: Boolean,   // Whether to show in public feed
  createdAt: Date,
  updatedAt: Date
}
```

## Future Enhancements

- [ ] Clerk authentication integration
- [ ] User profiles and personal todo lists
- [ ] Todo voting/liking system
- [ ] Todo completion tracking
- [ ] Real-time updates
- [ ] Email notifications
- [ ] Mobile app
- [ ] Todo templates and suggestions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - feel free to use this project for your own learning and development!

## Acknowledgments

- Inspired by the original "Find Something ToDo" by Salma Alam-Naylor
- Plant emojis and green theme for a calming, productive vibe
- Built with modern web technologies for optimal performance
