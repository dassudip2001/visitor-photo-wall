# 📸 Visitor Photo Wall

A real-time photo sharing application that creates an interactive photo gallery wall. Perfect for events, conferences, retail spaces, or any venue where you want to capture and display visitor photos instantly.

## 🎯 Overview

Visitor Photo Wall is a proof-of-concept application that enables real-time photo capture and display across multiple devices. Photos captured on camera-enabled devices are instantly streamed to a display screen, creating an engaging visual experience.

### Key Features

- **Real-time Photo Streaming**: Instant photo transmission using WebSocket (Socket.IO)
- **Multi-Client Support**: Multiple camera clients can connect to a single display
- **Auto-Capture Mode**: Set cameras to automatically capture photos at defined intervals
- **Beautiful Display**: Premium animated gallery wall with smooth transitions
- **Persistent Storage**: All photos are stored in MongoDB
- **Production Ready**: Dockerized deployment with health checks
- **Modern UI**: Responsive, glassmorphism-styled interface

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Camera    │         │   Node.js    │         │   Display   │
│   Client    │◄───────►│   Server     │◄───────►│   Screen    │
│ (Browser)   │         │ (Socket.IO)  │         │  (Browser)  │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   MongoDB    │
                        │   Database   │
                        └──────────────┘
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js v18+
- **Language**: TypeScript
- **Framework**: Express.js v5
- **Real-time**: Socket.IO v4
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan, Rotating File Stream

### Frontend
- **Vanilla JavaScript** with Socket.IO client
- **Modern CSS** with animations and glassmorphism effects
- **WebRTC** for camera access

### DevOps
- **Docker** for containerization
- **Docker Compose** for orchestration
- **Multi-stage builds** for optimized images

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or cloud)
- Modern web browser with camera support

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd camra-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5678
   HOST=0.0.0.0
   MONGO_URI=mongodb://localhost:27017/visitor-photo-wall
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Docker Deployment

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Manual Docker Build**
   ```bash
   docker build -t visitor-photo-wall .
   docker run -p 5678:5678 \
     -e MONGO_URI=mongodb://your-mongo-host:27017/visitor-photo-wall \
     visitor-photo-wall
   ```

## 🎮 Usage

### Camera Client
1. Open `http://your-server:5678/client.html` in a browser
2. Allow camera permissions when prompted
3. Click "Capture & Send" to take a photo, or enable "Auto-Capture Mode"
4. Photos are instantly sent to the server and display screen

### Display Screen
1. Open `http://your-server:5678/screen.html` on your display device
2. Incoming photos appear in a dramatic full-screen animation
3. After a few seconds, photos shrink and position themselves in the gallery
4. Click any photo to temporarily enlarge it

### Features

**Camera Client:**
- Manual photo capture with live preview
- Auto-capture mode with configurable intervals (1-60 seconds)
- Connection status indicator
- Sent photos counter
- Keyboard shortcut (Space bar) for quick capture

**Display Screen:**
- Animated gradient background with floating orbs
- Dramatic photo entry animations
- Anti-overlap algorithm for smart photo placement
- Click to zoom functionality
- Fullscreen mode
- Clear gallery button

## 🔧 Configuration

### Client ID System
Each camera/display pair uses a `clientId` for room-based communication:
- Cameras join a room with their `clientId`
- Displays listen to the same `clientId` room
- Multiple camera/display pairs can run simultaneously with different IDs

Edit the `clientId` in the HTML files:
```javascript
// In client.html and screen.html
clientId = 1  // Change to match your setup
```

### Server Configuration
- **Port**: Default 5678 (configurable via `PORT` env variable)
- **MongoDB**: Configure via `MONGO_URI` env variable
- **CORS**: Currently set to allow all origins (adjust for production)

## 📊 API Endpoints

### Health Check
```
GET /health
Response: {
  "status": "OK",
  "timestamp": "2025-10-17T...",
  "uptime": 12345.67
}
```

### Socket Events

**Client → Server:**
- `send-image`: Send captured photo
  ```javascript
  socket.emit('send-image', { image: dataURL });
  ```

**Server → Client:**
- `new-image`: Broadcast photo to display screens
  ```javascript
  socket.on('new-image', ({ image, client }) => {
    // Handle incoming image
  });
  ```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing controls
- **Rate Limiting**: Protection against abuse
- **Compression**: Response compression for bandwidth efficiency
- **Input Validation**: JSON payload size limits (10MB for images)

## 📈 Performance Considerations

- **Image Optimization**: Client-side images compressed to JPEG at 90% quality
- **Connection Pooling**: MongoDB pool size optimized for concurrent connections
- **Efficient Broadcasting**: Room-based Socket.IO events reduce unnecessary traffic
- **Anti-overlap Algorithm**: Prevents photo placement overlaps on display screen

## 🧪 Testing

```bash
# Run linter
npm run lint

# Run tests (when implemented)
npm test
```

**Manual Testing:**
- Use `window.testAddImage()` in the browser console on the display screen to generate test photos

## 📁 Project Structure

```
camra-client/
├── src/
│   ├── app.ts              # Express & Socket.IO setup
│   ├── db/
│   │   └── database.ts     # MongoDB connection
│   ├── models/
│   │   └── Image.ts        # Image data model
│   └── utils/
│       └── logger.ts       # Logging utilities
├── public/
│   ├── client.html         # Camera capture interface
│   └── screen.html         # Display gallery interface
├── dist/                   # Compiled JavaScript
├── logs/                   # Application logs
├── index.ts               # Application entry point
├── Dockerfile             # Container definition
├── docker-compose.yml     # Container orchestration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies & scripts
```

## 🐛 Troubleshooting

### Camera Not Working
- Ensure HTTPS is used (required for camera access on non-localhost)
- Check browser permissions for camera access
- Try a different browser (Chrome/Edge recommended)

### Connection Issues
- Verify MongoDB is running and accessible
- Check firewall settings for Socket.IO port
- Ensure `MONGO_URI` environment variable is set correctly

### Photos Not Appearing
- Check browser console for Socket.IO connection errors
- Verify `clientId` matches between camera and display
- Check MongoDB for stored images

## 🚀 Deployment Recommendations

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use a production MongoDB instance (Atlas, etc.)
- [ ] Configure CORS to specific origins only
- [ ] Set up HTTPS/TLS certificates
- [ ] Configure rate limiting appropriately
- [ ] Set up monitoring and logging
- [ ] Use environment-specific Socket.IO URLs (not hardcoded)

### Hosting Options
- **Server**: Render, Heroku, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas, AWS DocumentDB
- **Container**: AWS ECS, Google Cloud Run, Azure Container Instances

## 🔮 Future Enhancements

- [ ] Image filters and effects
- [ ] QR code for easy camera client access
- [ ] Admin dashboard for photo management
- [ ] Photo export/download functionality
- [ ] Multiple display layouts (grid, carousel, etc.)
- [ ] Social media sharing integration
- [ ] Analytics and visitor statistics
- [ ] Photo moderation/approval workflow

## 📝 License

ISC

## 👥 Contributing

This is a proof-of-concept project. For production use, consider implementing:
- Comprehensive error handling
- User authentication
- Image moderation
- Storage optimization (cloud storage integration)
- Analytics and monitoring

## 📧 Contact

For questions or support regarding this POC, please contact the development team.

---

**Built with ❤️ for creating memorable event experiences**
