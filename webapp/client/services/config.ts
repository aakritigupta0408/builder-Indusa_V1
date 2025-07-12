import { ServiceConfig } from "./types";

// Service Provider Registry
export enum ServiceProvider {
  // Clothing Try-On Providers
  KLING = "kling",
  REPLICATE_TRYON = "replicate-tryon",
  MOCK_CLOTHING = "mock-clothing",

  // Decor Visualization Providers
  REIMAGINE_HOME = "reimagine-home",
  MODSY = "modsy",
  MOCK_DECOR = "mock-decor",

  // AI Sizing Providers
  THREE_D_LOOK = "3dlook",
  BODYLABS = "bodylabs",
  MOCK_SIZING = "mock-sizing",
}

// Get environment variables (Vite uses import.meta.env)
const getEnvVar = (key: string): string | undefined => {
  // In Vite, environment variables are accessed via import.meta.env
  // and must be prefixed with VITE_ to be available in the browser
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[key];
  }
  // Fallback for other environments
  return undefined;
};

// Configuration for each service provider
export const SERVICE_CONFIGS: Record<ServiceProvider, ServiceConfig> = {
  // Clothing Try-On Services
  [ServiceProvider.KLING]: {
    baseUrl: getEnvVar("VITE_KLING_API_URL") || "https://api.kling.ai",
    apiKey: getEnvVar("VITE_KLING_API_KEY"),
    timeout: 30000,
    retryAttempts: 3,
    enableLogging: true,
    customHeaders: {
      "Content-Type": "application/json",
    },
  },
  [ServiceProvider.REPLICATE_TRYON]: {
    baseUrl: getEnvVar("VITE_REPLICATE_API_URL") || "https://api.replicate.com",
    apiKey: getEnvVar("VITE_REPLICATE_API_KEY"),
    timeout: 45000,
    retryAttempts: 2,
    enableLogging: true,
  },
  [ServiceProvider.MOCK_CLOTHING]: {
    baseUrl: "mock://clothing-tryon",
    timeout: 2000,
    enableLogging: false,
  },

  // Decor Visualization Services
  [ServiceProvider.REIMAGINE_HOME]: {
    baseUrl:
      getEnvVar("VITE_REIMAGINE_API_URL") || "https://api.reimaginehome.ai",
    apiKey: getEnvVar("VITE_REIMAGINE_API_KEY"),
    timeout: 40000,
    retryAttempts: 3,
    enableLogging: true,
  },
  [ServiceProvider.MODSY]: {
    baseUrl: getEnvVar("VITE_MODSY_API_URL") || "https://api.modsy.com",
    apiKey: getEnvVar("VITE_MODSY_API_KEY"),
    timeout: 35000,
    retryAttempts: 2,
    enableLogging: true,
  },
  [ServiceProvider.MOCK_DECOR]: {
    baseUrl: "mock://decor-visualization",
    timeout: 2500,
    enableLogging: false,
  },

  // AI Sizing Services
  [ServiceProvider.THREE_D_LOOK]: {
    baseUrl: getEnvVar("VITE_3DLOOK_API_URL") || "https://api.3dlook.me",
    apiKey: getEnvVar("VITE_3DLOOK_API_KEY"),
    timeout: 60000,
    retryAttempts: 3,
    enableLogging: true,
    customHeaders: {
      Authorization: `Bearer ${getEnvVar("VITE_3DLOOK_API_KEY")}`,
    },
  },
  [ServiceProvider.BODYLABS]: {
    baseUrl: getEnvVar("VITE_BODYLABS_API_URL") || "https://api.bodylabs.com",
    apiKey: getEnvVar("VITE_BODYLABS_API_KEY"),
    timeout: 50000,
    retryAttempts: 2,
    enableLogging: true,
  },
  [ServiceProvider.MOCK_SIZING]: {
    baseUrl: "mock://ai-sizing",
    timeout: 3000,
    enableLogging: false,
  },
};

// Active provider configuration
export interface ActiveProviders {
  clothingTryOn: ServiceProvider;
  decorVisualization: ServiceProvider;
  aiSizing: ServiceProvider;
}

// Default active providers (can be overridden via environment variables)
export const DEFAULT_ACTIVE_PROVIDERS: ActiveProviders = {
  clothingTryOn:
    (getEnvVar("VITE_CLOTHING_PROVIDER") as ServiceProvider) ||
    ServiceProvider.MOCK_CLOTHING,
  decorVisualization:
    (getEnvVar("VITE_DECOR_PROVIDER") as ServiceProvider) ||
    ServiceProvider.MOCK_DECOR,
  aiSizing:
    (getEnvVar("VITE_SIZING_PROVIDER") as ServiceProvider) ||
    ServiceProvider.MOCK_SIZING,
};

// Configuration validation
export function validateServiceConfig(
  provider: ServiceProvider,
  config: ServiceConfig,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Skip validation for mock services
  if (provider.includes("mock")) {
    return { valid: true, errors: [] };
  }

  // Validate required fields for real services
  if (!config.baseUrl) {
    errors.push(`Base URL is required for ${provider}`);
  }

  if (!config.apiKey && !provider.includes("mock")) {
    errors.push(`API key is required for ${provider}`);
  }

  if (config.timeout && config.timeout < 1000) {
    errors.push(`Timeout should be at least 1000ms for ${provider}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Environment setup helper
export function getEnvironmentInfo() {
  return {
    nodeEnv: getEnvVar("NODE_ENV") || "development",
    activeProviders: DEFAULT_ACTIVE_PROVIDERS,
    availableProviders: Object.values(ServiceProvider),
    configuredKeys: {
      kling: !!getEnvVar("VITE_KLING_API_KEY"),
      replicate: !!getEnvVar("VITE_REPLICATE_API_KEY"),
      reimagineHome: !!getEnvVar("VITE_REIMAGINE_API_KEY"),
      modsy: !!getEnvVar("VITE_MODSY_API_KEY"),
      threeDLook: !!getEnvVar("VITE_3DLOOK_API_KEY"),
      bodyLabs: !!getEnvVar("VITE_BODYLABS_API_KEY"),
    },
  };
}

// Dynamic provider switching
export class ServiceProviderManager {
  private static instance: ServiceProviderManager;
  private activeProviders: ActiveProviders;

  private constructor() {
    this.activeProviders = { ...DEFAULT_ACTIVE_PROVIDERS };
  }

  public static getInstance(): ServiceProviderManager {
    if (!ServiceProviderManager.instance) {
      ServiceProviderManager.instance = new ServiceProviderManager();
    }
    return ServiceProviderManager.instance;
  }

  public getActiveProviders(): ActiveProviders {
    return { ...this.activeProviders };
  }

  public setProvider(
    serviceType: keyof ActiveProviders,
    provider: ServiceProvider,
  ): void {
    this.activeProviders[serviceType] = provider;
  }

  public getProviderConfig(provider: ServiceProvider): ServiceConfig {
    return SERVICE_CONFIGS[provider];
  }

  public validateActiveProviders(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    Object.entries(this.activeProviders).forEach(([serviceType, provider]) => {
      const config = this.getProviderConfig(provider);
      const validation = validateServiceConfig(provider, config);

      if (!validation.valid) {
        errors.push(
          `${serviceType} (${provider}): ${validation.errors.join(", ")}`,
        );
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
