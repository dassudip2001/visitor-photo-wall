# Camera Client

A real-time camera sharing application that allows you to capture images from a webcam and display them on a big screen viewer with beautiful animations.

## 🎯 Features

- **Real-time Image Streaming**: Capture and share images instantly using WebSockets (Socket.IO)
- **Camera Client**: Web interface to access your webcam and capture images
- **Big Screen Viewer**: Display received images with elegant animations
  - Images appear as a centered popup for 60 seconds
  - Then smoothly transition to random positions on the screen
  - Automatic collision detection to prevent image overlapping
- **Cross-platform**: Works on any device with a modern web browser
- **TypeScript**: Type-safe codebase for better development experience

## 📋 Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- A modern web browser with webcam support

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd camra-client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Running the Application

#### Development Mode

```bash
npm run dev
# or
yarn dev
```

This will start the server with hot-reloading on `http://0.0.0.0:3000`.

#### Production Mode

1. Build the TypeScript code:
```bash
npm run build
# or
yarn build
```

2. Start the server:
```bash
npm start
# or
yarn start
```

## 📱 Usage

### 1. Start the Server

Run the development or production server as described above.

### 2. Open the Big Screen Viewer

Open your browser and navigate to:
```
http://localhost:3000/screen.html
```

This will be your display screen where captured images will appear.

### 3. Open the Camera Client

On another device or browser tab, navigate to:
```
http://localhost:3000/../client.html
```

Or open the `client.html` file directly in a browser.

**Note**: You may need to update the Socket.IO connection URL in `client.html` if accessing from a different device. Change `http://localhost:3000` to your server's IP address.

### 4. Capture and Send Images

1. Allow camera permissions when prompted
2. Click the "Capture & Send" button to take a snapshot
3. The image will be broadcast to all connected screen viewers

## 🏗️ Project Structure

```
camra-client/
├── src/
│   └── app.ts              # Express + Socket.IO server setup
├── public/
│   └── screen.html         # Big screen viewer interface
├── client.html             # Camera capture client
├── index.ts                # Server entry point
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🛠️ Technical Stack

- **Backend**: 
  - Node.js
  - Express.js
  - Socket.IO (WebSocket communication)
  - TypeScript

- **Frontend**:
  - HTML5
  - JavaScript
  - WebRTC (MediaDevices API for camera access)
  - Socket.IO Client

## 📜 Available Scripts

- `npm run dev` - Run development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run lint` - Lint TypeScript files
- `npm test` - Run tests (Jest)

## ⚙️ Configuration

### Server Settings

You can modify the server configuration in `index.ts`:

```typescript
const PORT = 3000;           // Server port
const HOST = "0.0.0.0";     // Listen on all network interfaces
```

### Display Settings

Modify the popup duration in `public/screen.html`:

```javascript
socket.on('new-image', dataURL => addImage(dataURL, 60000)); // 60000ms = 1 minute
```

## 🔌 Socket.IO Events

### Client → Server

- `send-image`: Emitted when a camera client captures and sends an image
  - Payload: `dataURL` (string) - Base64 encoded image data

### Server → Clients

- `new-image`: Broadcast to all clients when a new image is received
  - Payload: `dataURL` (string) - Base64 encoded image data

## 🌐 Network Access

To access the application from other devices on your network:

1. Find your computer's IP address:
   - Windows: `ipconfig`
   - macOS/Linux: `ifconfig` or `ip addr`

2. Update the Socket.IO connection URLs in:
   - `client.html` (line 17)
   - `public/screen.html` (line 80)

   Replace `localhost` with your IP address, e.g., `http://192.168.1.100:3000`

3. Access the application using:
   - Big Screen: `http://YOUR_IP:3000/screen.html`
   - Camera Client: Open `client.html` and ensure it points to your server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

ISC

## 🐛 Troubleshooting

### Camera not working
- Ensure you've granted camera permissions in your browser
- Check if another application is using the camera
- Try using HTTPS if on a mobile device (some browsers require secure context)

### Images not appearing on screen
- Check browser console for errors
- Verify Socket.IO connection is established
- Ensure the server URL is correct in both client and screen files

### CORS errors
- The server is configured to allow all origins (`cors: { origin: "*" }`)
- If issues persist, check your network/firewall settings

---

Made with ❤️ using TypeScript, Express, and Socket.IO

