# INDUSA - AI-Powered Fashion & Home Decor Platform

A comprehensive multi-platform shopping ecosystem featuring AI-powered virtual try-on technology, personalized styling, and seamless shopping experiences across web and iOS platforms.

## ✨ Platform Features

### 🤖 AI-Powered Shopping

- **Virtual Try-On**: See how clothes and home decor look on you or in your space using advanced AI
- **AI Sizing**: Get perfect fit recommendations based on your measurements
- **Smart Style Assistant**: Personalized outfit suggestions and styling recommendations
- **Visual Search**: Find products by uploading photos

### 👗 Fashion & Wardrobe

- **Personal Wardrobe**: Organize your clothing collection and purchased items
- **Outfit Creator**: Mix and match items to create perfect looks
- **Instagram Sharing**: Share your try-on results and outfits directly to social media
- **Style Collections**: Curated looks from fashion experts
- **Wishlist & Favorites**: Save items you love for later

### 🏠 Home Decor

- **Room Visualization**: See furniture and decor in your actual space
- **Design Collections**: Professionally curated home decor sets
- **Spatial AI**: Get size and fit recommendations for your room dimensions

### 🎨 Designer Marketplace

- **Custom Clothes Creation**: Work with designers to create bespoke pieces
- **Designer Profiles**: Featured fashion and home decor designers
- **Starting Prices**: ZARA ($199), H&M ($149), UNIQLO ($99)
- **Consultation Workflow**: Professional design process

### 🛒 E-Commerce

- **Advanced Search & Filtering**: Find exactly what you're looking for
- **Smart Cart**: Intelligent shopping cart with recommendations
- **Multiple Payment Options**: Secure checkout with various payment methods
- **Order Tracking**: Real-time updates on your purchases

## 📁 Project Structure

```
├── shared-resources/          # Shared code between platforms
│   ├── models.ts             # TypeScript interfaces and types
│   ├── mock-data.ts          # Sample data for both platforms
│   ├── constants.ts          # Brand config, API settings, colors
│   ├── utils.ts              # Utility functions
│   └── api.ts                # API client configuration
├── webapp/                   # React/TypeScript web application
│   ├── client/              # Frontend React application
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── data/            # Static data and configurations
│   ├── server/              # Backend Express.js server
│   ├��─ public/              # Static assets
│   ├── src/
│   │   ├── config/          # Web-specific configuration
│   │   ├── types/           # Web-specific TypeScript types
│   │   └── utils/           # Web-specific utilities
│   └── package.json         # Web dependencies and scripts
└── ios/                     # Native iOS Swift/SwiftUI application
    ├── Sources/
    │   └── IndusaApp/
    │       ├── Models/      # iOS data models
    │       ├── Views/       # SwiftUI views
    │       ├── Managers/    # State management classes
    │       └── Utils/       # iOS utilities and extensions
    └── Tests/              # iOS unit tests
```

## 🚀 Getting Started

### Prerequisites

- **For Web Development:**
  - Node.js 18+ and npm/yarn
  - Modern web browser

- **For iOS Development:**
  - macOS with Xcode 15+
  - iOS 15+ device or simulator
  - Swift 5.9+

## 💻 Local Development Setup

### Quick Start (Web Application)

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd indusa-platform
   ```

2. **Navigate to webapp directory:**

   ```bash
   cd webapp
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**

   Navigate to `http://localhost:8080` to see the web application running.

### Full Local Development Setup

#### Step 1: Environment Setup

**For Web Development:**

```bash
# Verify Node.js version (should be 18+)
node --version

# Verify npm version
npm --version

# Optional: Use yarn instead of npm
yarn --version
```

**For iOS Development (macOS only):**

```bash
# Verify Xcode installation
xcodebuild -version

# Verify Swift version
swift --version
```

#### Step 2: Project Setup

1. **Clone and navigate to project:**

   ```bash
   git clone <repository-url>
   cd indusa-platform
   ```

2. **Install web dependencies:**

   ```bash
   cd webapp
   npm install
   cd ..
   ```

#### Step 3: Running the Applications

**Web Application:**

```bash
# From project root
cd webapp

# Start development server
npm run dev

# The app will be available at http://localhost:8080
# Hot reload is enabled - changes will reflect automatically
```

**iOS Application:**

```bash
# From project root
cd ios

# Open in Xcode
open Package.swift

# Or use Xcode command line
xed .
```

Then in Xcode:

- Select a simulator or connected device
- Press Cmd+R to build and run
- The app will launch in the iOS Simulator or on your device

### Development Scripts

**Web Application Scripts:**

```bash
cd webapp

npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run unit tests
npm run typecheck    # TypeScript type checking
npm run format.fix   # Format code with Prettier
npm run start        # Start production server (after build)
```

**Useful Development Commands:**

```bash
# Check for TypeScript errors
npm run typecheck

# Format all code
npm run format.fix

# Run tests in watch mode
npm run test -- --watch

# Build and serve production version locally
npm run build && npm run start
```

### Troubleshooting Local Setup

#### Common Web Issues

**Port 8080 already in use:**

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

**Node modules issues:**

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**TypeScript errors:**

```bash
# Restart TypeScript server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"

# Or check types manually
npm run typecheck
```

#### Common iOS Issues

**Xcode build errors:**

- Clean build folder: Product → Clean Build Folder (Cmd+Shift+K)
- Reset simulator: Device → Erase All Content and Settings
- Update Xcode to latest version

**Simulator issues:**

- Restart simulator: Device → Restart
- Reset all simulators: Device → Erase All Content and Settings

### Development Workflow

1. **Start the web app:**

   ```bash
   cd webapp && npm run dev
   ```

2. **Open in browser:**
   - Navigate to `http://localhost:8080`
   - Open browser developer tools for debugging

3. **For iOS development:**
   - Open `ios/Package.swift` in Xcode
   - Select iPhone simulator
   - Build and run (Cmd+R)

4. **Making changes:**
   - Web: Changes auto-reload in browser
   - iOS: Rebuild in Xcode to see changes

### Environment Variables (Optional)

Create a `.env` file in the webapp directory for local configuration:

```bash
# webapp/.env
VITE_API_URL=http://localhost:3001
VITE_ENVIRONMENT=development
```

### IDE Recommendations

**For Web Development:**

- VS Code with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

**For iOS Development:**

- Xcode (required for iOS development)
- VS Code for shared resources editing

## 🏗️ Architecture

### Multi-Platform Approach

The INDUSA platform is designed with a shared resource layer that ensures consistency across all platforms while allowing for platform-specific optimizations.

### Shared Resources Layer

The `shared-resources/` folder contains platform-agnostic code:

- **Models**: TypeScript interfaces that define data structures for products, users, orders, etc.
- **Constants**: Brand configuration, colors, API endpoints, error messages
- **Utils**: Pure functions for data manipulation, validation, formatting, and business logic
- **Mock Data**: Comprehensive sample data for development and testing

### Web Application (React/TypeScript)

**Tech Stack:**

- React 18 with TypeScript
- Vite for build tooling and fast development
- Tailwind CSS for styling with custom design system
- React Context API for state management
- React Router for navigation
- React Query for API calls and caching

**Key Features:**

- Responsive design (mobile-first approach)
- Advanced virtual try-on interface
- Comprehensive shopping cart and checkout flow
- User authentication and account management
- Advanced product catalog with search, filtering, and sorting
- Personal wardrobe management with outfit creation
- Instagram sharing integration
- Designer marketplace with custom clothes creation
- Progressive Web App (PWA) capabilities

### iOS Application (Swift/SwiftUI)

**Tech Stack:**

- SwiftUI for modern iOS UI development
- Combine for reactive programming
- ObservableObject for state management
- AVFoundation for camera integration
- PhotosUI for photo selection
- UIKit integration where needed

**Key Features:**

- Native iOS design patterns and conventions
- 3-tab simplified navigation (Home, Shop, You)
- Introduction flow with onboarding
- Camera integration for virtual try-on
- Native photo picker and sharing
- Optimized touch interface
- AI-powered features with native performance
- User hub with centralized account management

## 🎨 Design System

### Brand Colors

```typescript
INDUSA_COLORS = {
  primary: "#CC1A7F", // Pink-Purple
  secondary: "#6B21A8", // Purple
  accent: "#00BCD4", // Cyan
  background: "#FAF9FB", // Light background
  text: {
    primary: "#1A1A1A", // Dark text
    secondary: "#666666", // Medium text
    muted: "#999999", // Light text
  },
};
```

### Typography

- **Web**: Inter font family with Tailwind CSS typography classes
- **iOS**: Native San Francisco font system with semantic sizing

### Components

- **Consistent spacing**: 4px grid system (4, 8, 12, 16, 20, 24px)
- **Border radius**: 8px, 12px, 16px standard values
- **Shadows**: Subtle depth with consistent elevation
- **Gradients**: Brand gradient combinations for visual appeal

## 📱 Platform-Specific Features

### Web Application Exclusive

- **SEO Optimization**: Meta tags, structured data, social sharing
- **Desktop Experience**: Optimized for larger screens and mouse interaction
- **Browser Features**: Local storage, notifications, offline support
- **Analytics Integration**: Google Analytics, custom event tracking

### iOS Application Exclusive

- **Native Camera**: AVFoundation integration for high-quality photo capture
- **iOS Integration**: Native sharing, photo library access, system fonts
- **Touch Optimizations**: Gesture recognition, haptic feedback
- **iOS Design**: Following Apple Human Interface Guidelines
- **Performance**: Native performance for smooth animations and interactions

## 🔧 Development Guidelines

### Adding New Features

1. **Shared Logic**: Add to `shared-resources/` if used by both platforms
2. **Platform-Specific**: Implement in respective platform directories
3. **Consistency**: Ensure UI/UX consistency across platforms
4. **Testing**: Add tests for new functionality

### Code Style

**TypeScript/JavaScript:**

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Prefer functional programming patterns

**Swift:**

- Follow Swift naming conventions
- Use SwiftUI best practices
- Implement proper error handling
- Use Swift Package Manager for dependencies

## 🧪 Testing

### Web Application

```bash
cd webapp
npm run test           # Run unit tests
npm run test:watch     # Watch mode for development
npm run typecheck      # TypeScript type checking
```

### iOS Application

- Use Xcode's built-in testing (Cmd+U)
- Unit tests for business logic
- SwiftUI Preview for UI testing
- Simulator testing for integration

## 🚀 Deployment

### Web Application

```bash
cd webapp
npm run build          # Create production build
npm run start          # Start production server
```

**Deployment Options:**

- Netlify (recommended for static deployment)
- Vercel (for full-stack applications)
- AWS S3 + CloudFront (for scalability)

### iOS Application

1. **Development**: Run on simulator or device for testing
2. **TestFlight**: Upload builds for beta testing
3. **App Store**: Submit for review and distribution

## 🔒 Security & Privacy

- **Data Protection**: Encryption for sensitive user data
- **Authentication**: Secure JWT token management
- **Privacy Compliance**: GDPR and CCPA ready
- **Content Security**: XSS protection and input validation
- **API Security**: Rate limiting and authentication headers

## 📊 Performance & Analytics

### Web Performance

- **Core Web Vitals**: Optimized for Google's performance metrics
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Strategic caching for improved load times

### Analytics

- **User Behavior**: Track shopping patterns and preferences
- **Conversion Funnel**: Monitor cart abandonment and completion
- **AI Performance**: Measure virtual try-on accuracy and usage
- **Error Tracking**: Comprehensive error monitoring and reporting

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow coding standards and linting rules**
4. **Add comprehensive tests for new functionality**
5. **Update documentation as needed**
6. **Submit pull request with detailed description**

### Development Workflow

1. **Design**: Create mockups and user flow diagrams
2. **Shared Resources**: Update models and constants first
3. **Platform Implementation**: Develop for web and iOS simultaneously
4. **Testing**: Ensure cross-platform consistency
5. **Review**: Code review and quality assurance

## 🆘 Support & Documentation

### Getting Help

- **Code Issues**: Check existing documentation and shared resources
- **Feature Requests**: Create detailed GitHub issues
- **Bug Reports**: Include reproduction steps and platform details

### Best Practices

- **Reuse**: Leverage shared resources to avoid duplication
- **Consistency**: Maintain design and UX consistency across platforms
- **Performance**: Optimize for both web and mobile performance
- **Accessibility**: Follow WCAG guidelines for web and iOS accessibility

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🌟 Key Accomplishments

✅ **Multi-Platform Architecture**: Seamless experience across web and iOS
✅ **AI Integration**: Advanced virtual try-on and sizing technology  
✅ **Complete E-Commerce**: Full shopping cart, checkout, and order management
✅ **Social Features**: Instagram sharing and social commerce integration
✅ **Designer Marketplace**: Custom clothes creation with professional designers
✅ **Personal Wardrobe**: Comprehensive outfit management and styling tools
✅ **Responsive Design**: Optimized for all screen sizes and devices
✅ **Modern Tech Stack**: Latest React, TypeScript, SwiftUI, and development tools

**Happy shopping with AI! 🛍️✨**
