# INDUSA - AI-Powered Fashion & Home Decor Platform

A comprehensive shopping platform with AI-powered virtual try-on technology, available as both a web application and native iOS app.

## 📁 Project Structure

```
├── shared-resources/          # Shared code between platforms
│   ├── models.ts             # TypeScript interfaces and types
│   ├── mock-data.ts          # Sample data for both platforms
│   ├── constants.ts          # Shared constants and configuration
│   ├── utils.ts              # Utility functions
│   └── api.ts                # API client configuration
├── webapp/                   # React/TypeScript web application
│   ├── client/              # Frontend React application
│   ├── server/              # Backend Express.js server
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── config/          # Web-specific configuration
│   │   ├── types/           # Web-specific TypeScript types
│   │   └── utils/           # Web-specific utilities
│   ├── package.json         # Web dependencies
│   ├── vite.config.ts       # Vite configuration
│   └── tsconfig.json        # TypeScript configuration
└── ios/                     # Native iOS Swift/SwiftUI application
    ├── Package.swift        # Swift Package Manager configuration
    ├── Sources/
    │   └── IndusaApp/
    │       ├── Models/      # iOS data models
    │       ├── Views/       # SwiftUI views
    │       ├── Managers/    # State management classes
    │       └── Utils/       # iOS utilities
    ├── Sources/Resources/   # iOS assets and resources
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

### Web Application Setup

1. **Navigate to webapp directory:**

   ```bash
   cd webapp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### iOS Application Setup

1. **Open iOS project in Xcode:**

   ```bash
   cd ios
   open Package.swift
   ```

2. **Or use Xcode CLI:**

   ```bash
   xed ios/
   ```

3. **Build and run:**
   - Select target device/simulator
   - Press Cmd+R to build and run

## 🏗️ Architecture

### Shared Resources Layer

The `shared-resources/` folder contains platform-agnostic code:

- **Models**: TypeScript interfaces that define data structures
- **Constants**: Configuration, colors, API endpoints, error messages
- **Utils**: Pure functions for data manipulation, validation, formatting
- **Mock Data**: Sample data for development and testing

### Web Application (React/TypeScript)

**Tech Stack:**

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation
- React Query for API calls

**Key Features:**

- Responsive design (mobile-first)
- Virtual try-on interface
- Shopping cart and checkout
- User authentication
- Product catalog with search/filter
- Personal wardrobe management
- Progressive Web App (PWA) support

### iOS Application (Swift/SwiftUI)

**Tech Stack:**

- SwiftUI for UI
- Combine for reactive programming
- Swift Package Manager
- Core Data for local storage
- AVFoundation for camera
- Vision framework for AI features

**Key Features:**

- Native iOS design patterns
- Camera integration for try-on
- Touch-optimized interface
- Offline capability
- Push notifications
- Native sharing features

## 🔧 Development Guidelines

### Shared Resources

1. **Adding New Models:**

   ```typescript
   // shared-resources/models.ts
   export interface NewModel {
     id: string;
     name: string;
     // ... other fields
   }
   ```

2. **Adding Constants:**

   ```typescript
   // shared-resources/constants.ts
   export const NEW_FEATURE_CONFIG = {
     enabled: true,
     maxItems: 100,
   };
   ```

3. **Adding Utilities:**
   ```typescript
   // shared-resources/utils.ts
   export function newUtilityFunction(input: string): string {
     // Implementation
     return processedInput;
   }
   ```

### Web Application

1. **Component Structure:**

   ```typescript
   // webapp/client/components/NewComponent.tsx
   import { FC } from 'react';
   import { NewModel } from '../../../shared-resources/models';

   interface Props {
     data: NewModel;
   }

   export const NewComponent: FC<Props> = ({ data }) => {
     return <div>{data.name}</div>;
   };
   ```

2. **Using Shared Resources:**
   ```typescript
   import { BRAND_CONFIG } from "../../../shared-resources/constants";
   import { formatPrice } from "../../../shared-resources/utils";
   import type { Product } from "../../../shared-resources/models";
   ```

### iOS Application

1. **Swift Model Structure:**

   ```swift
   // ios/Sources/IndusaApp/Models/NewModel.swift
   import Foundation

   struct NewModel: Identifiable, Codable {
       let id: String
       let name: String
       // Mirror the TypeScript interface
   }
   ```

2. **SwiftUI View Structure:**

   ```swift
   // ios/Sources/IndusaApp/Views/NewView.swift
   import SwiftUI

   struct NewView: View {
       let data: NewModel

       var body: some View {
           Text(data.name)
       }
   }
   ```

## 🎨 Design System

### Colors (Shared)

```typescript
BRAND_CONFIG.colors = {
  primary: "#CC1A7F", // Pink-Purple
  secondary: "#6B21A8", // Purple
  accent: "#00BCD4", // Cyan
  // ... other colors
};
```

### Typography

- **Web**: Tailwind CSS typography classes
- **iOS**: Native San Francisco font system

### Components

- **Consistent spacing**: 4px grid system
- **Border radius**: 8px, 12px, 16px standard values
- **Shadows**: Subtle depth with consistent elevation

## 🧪 Testing

### Web Application

```bash
cd webapp
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run test:coverage  # Coverage report
```

### iOS Application

- Use Xcode's built-in testing (Cmd+U)
- Unit tests in `ios/Tests/`
- UI tests for critical flows

## 🚀 Deployment

### Web Application

1. **Build production bundle:**

   ```bash
   cd webapp
   npm run build
   ```

2. **Deploy to hosting platform:**
   - Netlify, Vercel, or similar
   - Configure environment variables
   - Set up CI/CD pipeline

### iOS Application

1. **Archive for distribution:**
   - Product → Archive in Xcode
   - Upload to App Store Connect
   - Configure App Store metadata

2. **TestFlight distribution:**
   - Upload build to TestFlight
   - Add internal/external testers
   - Manage app versions

## 📱 Platform-Specific Features

### Web Application

- **PWA Support**: Installable web app
- **Responsive Design**: Mobile, tablet, desktop
- **SEO Optimization**: Meta tags, structured data
- **Analytics Integration**: Google Analytics, custom events

### iOS Application

- **Native Camera**: AVFoundation integration
- **Push Notifications**: Remote notifications
- **Apple Pay**: Native payment integration
- **Siri Shortcuts**: Voice command support
- **Widgets**: Home screen widgets

## 🔒 Security & Privacy

- **Data Encryption**: In transit and at rest
- **Authentication**: JWT tokens, OAuth integration
- **Privacy Compliance**: GDPR, CCPA ready
- **Content Security**: XSS protection, input validation

## 📊 Analytics & Monitoring

- **Error Tracking**: Sentry integration
- **Performance**: Web Vitals, Core Web Vitals
- **User Analytics**: Custom event tracking
- **A/B Testing**: Feature flag system

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow coding standards**
4. **Add tests for new functionality**
5. **Submit pull request**

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🆘 Support

For development questions or issues:

- Check existing documentation
- Review shared resources for reusable code
- Follow platform-specific guidelines
- Maintain consistency across platforms

**Happy coding! 🚀**
