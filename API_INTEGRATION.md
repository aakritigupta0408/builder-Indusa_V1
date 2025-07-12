# Indusa AI Services - Plug & Play API Architecture

## Overview

The Indusa platform features a modular, plug-and-play architecture for AI services that allows easy integration of different API providers for:

- **Clothing Try-On** (KLING, Replicate, etc.)
- **Home Decor Visualization** (ReimagineHome, Modsy, etc.)
- **AI Sizing** (3DLook, BodyLabs, etc.)

## Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:

```env
# Example configuration
VITE_KLING_API_KEY=your_kling_api_key_here
VITE_REPLICATE_API_KEY=your_replicate_api_key_here
VITE_REIMAGINE_API_KEY=your_reimagine_key_here
VITE_3DLOOK_API_KEY=your_3dlook_key_here

# Select active providers
VITE_CLOTHING_PROVIDER=kling
VITE_DECOR_PROVIDER=reimagine-home
VITE_SIZING_PROVIDER=3dlook
```

### 2. Using Services in Components

```tsx
import {
  useClothingTryOn,
  useDecorVisualization,
  useAISizing,
} from "@/hooks/useServices";

function MyComponent() {
  const clothingTryOn = useClothingTryOn();
  const decorViz = useDecorVisualization();
  const aiSizing = useAISizing();

  const handleTryOn = async () => {
    await clothingTryOn.tryOn({
      userPhoto: userPhotoUpload,
      garmentImage: garmentUpload,
      options: { quality: "high" },
    });

    if (clothingTryOn.result) {
      setPreviewImage(clothingTryOn.result.processedImageUrl);
    }
  };

  return (
    <div>
      <button onClick={handleTryOn} disabled={clothingTryOn.isProcessing}>
        {clothingTryOn.isProcessing ? "Processing..." : "Try On"}
      </button>
      {clothingTryOn.error && <div>Error: {clothingTryOn.error}</div>}
    </div>
  );
}
```

## Available Services

### Clothing Try-On Providers

| Provider          | Description                  | Status   |
| ----------------- | ---------------------------- | -------- |
| `mock-clothing`   | Mock service for development | ✅ Ready |
| `kling`           | KLING AI try-on service      | ✅ Ready |
| `replicate-tryon` | Replicate AI models          | ✅ Ready |

### Decor Visualization Providers

| Provider         | Description                  | Status      |
| ---------------- | ---------------------------- | ----------- |
| `mock-decor`     | Mock service for development | ✅ Ready    |
| `reimagine-home` | ReimagineHome API            | 🚧 Template |
| `modsy`          | Modsy 3D visualization       | 🚧 Template |

### AI Sizing Providers

| Provider      | Description                  | Status      |
| ------------- | ---------------------------- | ----------- |
| `mock-sizing` | Mock service for development | ✅ Ready    |
| `3dlook`      | 3DLook body measurement      | 🚧 Template |
| `bodylabs`    | BodyLabs analysis            | 🚧 Template |

## Architecture

### Service Interfaces

Each service type implements a standardized interface:

```tsx
// Clothing Try-On Interface
interface IClothingTryOnService {
  name: string;
  version: string;
  isAvailable(): Promise<boolean>;
  tryOn(
    request: ClothingTryOnRequest,
  ): Promise<ApiResponse<ClothingTryOnResponse>>;
  getProcessingStatus(jobId: string): Promise<ApiResponse<ProcessingStatus>>;
  validateRequest(request: ClothingTryOnRequest): ValidationResult;
}
```

### Service Factory

The `ServiceFactory` creates and manages service instances:

```tsx
import { tryOnServiceManager } from "@/services/ServiceFactory";

// Get current active services
const services = tryOnServiceManager.getActiveServices();

// Switch providers dynamically
tryOnServiceManager.switchProvider("clothingTryOn", ServiceProvider.KLING);

// Check service health
const health = await tryOnServiceManager.checkServiceHealth();
```

### React Hooks

Pre-built hooks provide easy integration:

```tsx
const clothingTryOn = useClothingTryOn();
const decorViz = useDecorVisualization();
const aiSizing = useAISizing();
const serviceManager = useServiceManager();
const fileUpload = useFileUpload();
```

## Adding New Providers

### 1. Create Service Implementation

```tsx
// client/services/implementations/newProvider.ts
export class NewProviderService implements IClothingTryOnService {
  name = "New Provider";
  version = "1.0.0";

  constructor(private config: ServiceConfig) {}

  async tryOn(
    request: ClothingTryOnRequest,
  ): Promise<ApiResponse<ClothingTryOnResponse>> {
    // Implementation here
  }

  // ... other interface methods
}
```

### 2. Register in Service Factory

```tsx
// client/services/ServiceFactory.ts
case ServiceProvider.NEW_PROVIDER:
  service = new NewProviderService(config);
  break;
```

### 3. Add Configuration

```tsx
// client/services/config.ts
export enum ServiceProvider {
  NEW_PROVIDER = "new-provider",
  // ... other providers
}

export const SERVICE_CONFIGS = {
  [ServiceProvider.NEW_PROVIDER]: {
    baseUrl: getEnvVar("VITE_NEW_PROVIDER_API_URL"),
    apiKey: getEnvVar("VITE_NEW_PROVIDER_API_KEY"),
    timeout: 30000,
  },
  // ... other configs
};
```

## API Response Types

### Clothing Try-On Response

```tsx
interface ClothingTryOnResponse {
  processedImageUrl: string;
  maskUrl?: string;
  confidence?: number;
  processingTime?: number;
  metadata?: {
    bodyDetected: boolean;
    garmentFit: "tight" | "loose" | "perfect";
    recommendations?: string[];
  };
}
```

### Decor Visualization Response

```tsx
interface DecorVisualizationResponse {
  processedImageUrl: string;
  roomAnalysis?: {
    roomType: string;
    lightingConditions: string;
    suggestedPlacements: Array<{ x: number; y: number; confidence: number }>;
  };
  confidence?: number;
  processingTime?: number;
}
```

### AI Sizing Response

```tsx
interface SizingAnalysisResponse {
  measurements: BodyMeasurements;
  sizeRecommendations: SizeRecommendation[];
  bodyType?: string;
  confidence?: number;
  annotatedImageUrl?: string;
}
```

## Error Handling

The system provides comprehensive error handling:

```tsx
try {
  await clothingTryOn.tryOn(request);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error: ${error.message} (${error.statusCode})`);
  } else if (error instanceof ValidationError) {
    console.error(`Validation Error: ${error.errors.join(", ")}`);
  }
}
```

## Development vs Production

### Development

- Use mock services for immediate testing
- No API keys required
- Instant responses with realistic data

### Production

- Configure real API providers
- Add API keys to environment variables
- Monitor service health and switch providers as needed

## Configuration UI

The platform includes a built-in configuration interface:

```tsx
import { ServiceConfigDialog } from "@/components/ServiceConfig";

function AdminPanel() {
  return (
    <div>
      <ServiceConfigDialog />
    </div>
  );
}
```

## Best Practices

1. **Always use mock services for development** - No API costs and instant feedback
2. **Implement proper error handling** - Use the provided error types
3. **Validate files before upload** - Use `useFileUpload` hook for validation
4. **Monitor service health** - Use `useServiceManager` to check API status
5. **Handle loading states** - Each hook provides `isProcessing` state
6. **Implement fallbacks** - Services automatically fallback to mock if primary fails

## Support

For implementation questions or adding new providers, refer to:

- Service interfaces in `client/services/types.ts`
- Example implementations in `client/services/implementations/`
- React hooks in `client/hooks/useServices.ts`
