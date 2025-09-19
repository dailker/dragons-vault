# 🐉 Dragon's Vault - Zero-Trust Encrypted Chat

[![Deploy with Vercel](https://vercel.com/button.svg)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdailker%2Fdragons-vault&env=MONGO_ATLAS_URI,NEXTAUTH_SECRET&envDescription=MongoDB%20Atlas%20connection%20string%20and%20NextAuth%20secret%20are%20required&envLink=https%3A%2F%2Fwww.mongodb.com%2Fatlas%2Fdatabase&project-name=dragons-vault&repository-name=dragons-vault)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-username/dragons-vault)
[![Security](https://img.shields.io/badge/security-zero--trust-red)](https://github.com/your-username/dragons-vault)

A military-grade encrypted chat application where **the server never sees your messages**. Built with multi-layered client-side encryption, zero-trust architecture, and modern friend-based messaging system.

> 🔒 **Zero-Trust Promise**: Even if our servers are compromised, your messages remain completely unreadable.

## ✨ Features

### 🔐 Security & Encryption
- ✅ **Multi-Layer Encryption**: AES-256-GCM + XChaCha20-Poly1305 + RSA/ECC
- 🔒 **Zero-Trust Architecture**: Server only stores encrypted blobs
- 🛡️ **Client-Side Encryption**: All encryption happens in your browser
- 🔑 **2FA Authentication**: TOTP-based two-factor authentication
- 💾 **Secure Storage**: Keys encrypted in IndexedDB
- 🚫 **No Metadata Leakage**: Timestamps and user info encrypted

### 👥 Social Features
- 🤝 **Friend System**: Send and receive friend requests
- 📱 **QR Code Sharing**: Share your profile via QR codes
- 🔍 **User Search**: Find friends by username
- 💬 **Direct Messaging**: One-on-one encrypted conversations
- 📬 **Real-time Notifications**: Friend request badges and alerts
- 🎨 **Profile Customization**: Custom avatars, names, and bios

### 🎨 Modern UI/UX
- 🌈 **Multiple Themes**: Dark, Light, Ocean Blue, and Neon themes
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Ultra-Modern Interface**: Glassmorphism effects and smooth animations
- 🌐 **Cross-Platform**: Works on any device with a web browser

<table>
  <tr>
    <td><img src="screenshots/1.png" width="150"/></td>
    <td><img src="screenshots/2.png" width="150"/></td>
  </tr>
  <tr>
    <td><img src="screenshots/3.png" width="150"/></td>
    <td><img src="screenshots/4.png" width="150"/></td>
  </tr>
</table>


## 🏗️ Architecture

```mermaid
sequenceDiagram
    participant Client1 as 👤 Alice
    participant Client2 as 👤 Bob
    participant Server as 🖥️ Server
    participant DB as 🗄️ MongoDB
    
    Note over Client1,DB: Message Encryption Flow
    
    Client1->>Client1: 1. Generate AES session key
    Client1->>Client1: 2. Encrypt message (Layer 1: AES-256)
    Client1->>Client1: 3. Encrypt again (Layer 2: XChaCha20)
    Client1->>Server: 4. Send encrypted blob
    Server->>DB: 5. Store encrypted blob (no decryption)
    
    Note over Client1,DB: Message Retrieval Flow
    
    Client2->>Server: 6. Request messages
    Server->>DB: 7. Fetch encrypted blobs
    DB->>Server: 8. Return encrypted data
    Server->>Client2: 9. Forward encrypted blobs
    Client2->>Client2: 10. Decrypt Layer 2 (XChaCha20)
    Client2->>Client2: 11. Decrypt Layer 1 (AES-256)
    Client2->>Client2: 12. Display plaintext message
```

## 📁 Project Structure

```
dragon-vault/
├── 📁 components/
│   ├── MainLayout.js            # Main application layout
│   ├── Sidebar.js               # Navigation sidebar
│   ├── ChatList.js              # Conversations list
│   ├── ChatArea.js              # Chat interface
│   ├── FriendsList.js           # Add friends interface
│   ├── FriendRequests.js        # Friend requests management
│   ├── ProfileModal.js          # User profile editor
│   ├── SettingsModal.js         # Theme settings
│   ├── AuthForm.js              # Login/Register forms
│   └── SystemMessage.js         # System notifications
├── 📁 lib/
│   ├── encryption.js            # Multi-layer crypto functions
│   ├── storage.js               # Secure IndexedDB operations
│   ├── auth.js                  # Authentication & OTP
│   ├── theme.js                 # Theme management
│   ├── qr-offline.js            # QR code generation
│   └── env-check.js             # Environment validation
├── 📁 pages/
│   ├── index.js                 # Main application entry
│   ├── 📁 profile/
│   │   └── [username].js        # Public profile pages
│   └── 📁 api/
│       ├── register.js          # User registration
│       ├── login.js             # User authentication
│       ├── friend-requests.js   # Friend request management
│       ├── send-friend-request.js # Send friend requests
│       ├── conversations.js     # User conversations
│       ├── search-users.js      # User search
│       └── 📁 profile/
│           └── [username].js    # Profile data API
├── 📁 styles/
│   ├── themes.css              # Theme variables
│   ├── auth.css                # Authentication styling
│   └── layout.css              # Main UI styling
├── 📁 public/
│   └── sw.js                   # Service Worker for offline mode
├── .env.local                  # Environment variables
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🚀 Installation

### Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account (free tier works)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/your-username/dragons-vault.git
cd dragons-vault
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

## 🛠️ Development

### Running the Application

**Option 1: Next.js Development Server (Recommended)**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Option 2: Standalone Fastify Server**
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# MongoDB Atlas Connection
MONGO_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/dragonsVault?retryWrites=true&w=majority

# Authentication (for future features)
NEXTAUTH_SECRET=your-super-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Optional: Custom port
PORT=3000
```

### Getting MongoDB Atlas URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Go to "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Register new user with 2FA |
| `POST` | `/api/login` | Login with username, password & OTP |
| `GET` | `/api/seed` | Generate cryptographic seed |
| `POST` | `/api/qr-code` | Generate QR code for OTP |

### Friends & Social
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search-users` | Search users by username |
| `POST` | `/api/send-friend-request` | Send friend request |
| `GET` | `/api/friend-requests` | Get pending friend requests |
| `POST` | `/api/friend-requests` | Accept/decline friend requests |
| `GET` | `/api/profile/[username]` | Get user profile data |

### Conversations
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/conversations` | Get user's conversations |
| `POST` | `/api/system-messages` | Create system messages |
| `GET` | `/api/system-messages` | Get conversation system messages |

### Example API Usage

**Register User**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "SecurePass123!",
    "otpSecret": "JBSWY3DPEHPK3PXP",
    "otp": "123456",
    "seed": "random-crypto-seed-here"
  }'
```

**Send Friend Request**
```bash
curl -X POST http://localhost:3000/api/send-friend-request \
  -H "Content-Type: application/json" \
  -d '{
    "from": "alice",
    "to": "bob"
  }'
```

**Get Conversations**
```bash
curl "http://localhost:3000/api/conversations?username=alice"
```

## 🔐 Security Model

### How Multi-Layer Encryption Works

```mermaid
flowchart TD
    A["📝 Your Message: 'Hello World'"] --> B["🔑 Generate Random Nonce"]
    B --> C["🛡️ Layer 1: AES-256-GCM Encryption"]
    C --> D["🔒 Encrypted: 'k8s9d2j...'"]
    D --> E["🔑 Generate XChaCha20 Key"]
    E --> F["🛡️ Layer 2: XChaCha20-Poly1305 Encryption"]
    F --> G["🔒 Double-Encrypted: 'x7m2n9...'"]
    G --> H["📤 Send to Server"]
    H --> I["🗄️ Store in MongoDB (Server Blind)"]
    
    I --> J["📥 Recipient Requests"]
    J --> K["🔓 Layer 2: XChaCha20 Decryption"]
    K --> L["🔓 Layer 1: AES-256 Decryption"]
    L --> M["📖 Original Message: 'Hello World'"]
    
    style A fill:#e1f5fe
    style M fill:#e8f5e8
    style I fill:#ffebee
```

### Key Security Features

1. **🔒 Zero-Trust Server**: The server never has access to encryption keys or plaintext
2. **🛡️ Multi-Layer Defense**: Even if one encryption layer is broken, your data stays safe
3. **🔑 Client-Side Keys**: All encryption keys are generated and stored only on your device
4. **📱 Offline Security**: Messages are encrypted even when stored locally
5. **🚫 No Metadata**: Even timestamps and usernames are encrypted

### What Happens If...

| Scenario | Result | Your Data |
|----------|--------|-----------|
| 🏢 Server gets hacked | ✅ Safe | Only encrypted blobs leaked |
| 🗄️ Database is breached | ✅ Safe | Attackers see gibberish |
| 🌐 Network is monitored | ✅ Safe | Multiple encryption layers |
| 💻 Your device is stolen | ⚠️ Risk | Keys encrypted with password |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add comments for complex encryption logic
- Test encryption/decryption thoroughly
- Never log sensitive data
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 
CodeHubber's Repository Contributors, Maintainers and Founders

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and its associated documentation files (the "Software"), to 
use the Software without restriction. This includes, without limitation, the 
rights to: use, copy, modify, merge, publish, distribute, sublicense, and/or 
sell copies of the Software, and to allow others to do the same.

The above copyright notice and this permission notice must be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED. THIS INCLUDES, BUT IS NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING 
FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
```

---

<div align="center">

**🐉 Built with security and friendship in mind. Connect safely, chat privately.**

[Report Bug](https://github.com/codehubbers/dragons-vault/issues) • [Request Feature](https://github.com/codehubbers/dragons-vault/issues) • [Security Policy](SECURITY.md)

</div>