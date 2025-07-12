import {
  IClothingTryOnService,
  IDecorVisualizationService,
  IAISizingService,
  ServiceProvider as ServiceProviderType,
} from "./types";

import {
  ServiceProvider,
  ServiceProviderManager,
  SERVICE_CONFIGS,
} from "./config";

import {
  MockClothingTryOnService,
  MockDecorVisualizationService,
  MockAISizingService,
} from "./implementations/mockServices";

import {
  KlingClothingTryOnService,
  ReplicateClothingTryOnService,
} from "./implementations/clothingServices";

// Service Factory for creating service instances
export class ServiceFactory {
  private static instance: ServiceFactory;
  private serviceCache: Map<ServiceProvider, any> = new Map();

  private constructor() {}

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  // Create or get cached clothing try-on service
  public getClothingTryOnService(
    provider: ServiceProvider,
  ): IClothingTryOnService {
    const cacheKey = provider;

    if (this.serviceCache.has(cacheKey)) {
      return this.serviceCache.get(cacheKey);
    }

    const config = SERVICE_CONFIGS[provider];
    let service: IClothingTryOnService;

    switch (provider) {
      case ServiceProvider.KLING:
        service = new KlingClothingTryOnService(config);
        break;
      case ServiceProvider.REPLICATE_TRYON:
        service = new ReplicateClothingTryOnService(config);
        break;
      case ServiceProvider.MOCK_CLOTHING:
      default:
        service = new MockClothingTryOnService();
        break;
    }

    this.serviceCache.set(cacheKey, service);
    return service;
  }

  // Create or get cached decor visualization service
  public getDecorVisualizationService(
    provider: ServiceProvider,
  ): IDecorVisualizationService {
    const cacheKey = provider;

    if (this.serviceCache.has(cacheKey)) {
      return this.serviceCache.get(cacheKey);
    }

    const config = SERVICE_CONFIGS[provider];
    let service: IDecorVisualizationService;

    switch (provider) {
      case ServiceProvider.REIMAGINE_HOME:
        // service = new ReimagineHomeService(config);
        // For now, fallback to mock
        service = new MockDecorVisualizationService();
        break;
      case ServiceProvider.MODSY:
        // service = new ModsyService(config);
        // For now, fallback to mock
        service = new MockDecorVisualizationService();
        break;
      case ServiceProvider.MOCK_DECOR:
      default:
        service = new MockDecorVisualizationService();
        break;
    }

    this.serviceCache.set(cacheKey, service);
    return service;
  }

  // Create or get cached AI sizing service
  public getAISizingService(provider: ServiceProvider): IAISizingService {
    const cacheKey = provider;

    if (this.serviceCache.has(cacheKey)) {
      return this.serviceCache.get(cacheKey);
    }

    const config = SERVICE_CONFIGS[provider];
    let service: IAISizingService;

    switch (provider) {
      case ServiceProvider.THREE_D_LOOK:
        // service = new ThreeDLookService(config);
        // For now, fallback to mock
        service = new MockAISizingService();
        break;
      case ServiceProvider.BODYLABS:
        // service = new BodyLabsService(config);
        // For now, fallback to mock
        service = new MockAISizingService();
        break;
      case ServiceProvider.MOCK_SIZING:
      default:
        service = new MockAISizingService();
        break;
    }

    this.serviceCache.set(cacheKey, service);
    return service;
  }

  // Clear service cache (useful for testing or configuration changes)
  public clearCache(): void {
    this.serviceCache.clear();
  }

  // Get service with automatic fallback
  public getServiceWithFallback<T>(
    primaryProvider: ServiceProvider,
    fallbackProvider: ServiceProvider,
    serviceType: "clothing" | "decor" | "sizing",
  ): T {
    try {
      switch (serviceType) {
        case "clothing":
          return this.getClothingTryOnService(primaryProvider) as T;
        case "decor":
          return this.getDecorVisualizationService(primaryProvider) as T;
        case "sizing":
          return this.getAISizingService(primaryProvider) as T;
        default:
          throw new Error(`Unknown service type: ${serviceType}`);
      }
    } catch (error) {
      console.warn(
        `Primary service ${primaryProvider} failed, falling back to ${fallbackProvider}`,
        error,
      );

      switch (serviceType) {
        case "clothing":
          return this.getClothingTryOnService(fallbackProvider) as T;
        case "decor":
          return this.getDecorVisualizationService(fallbackProvider) as T;
        case "sizing":
          return this.getAISizingService(fallbackProvider) as T;
        default:
          throw new Error(`Unknown service type: ${serviceType}`);
      }
    }
  }
}

// Main Service Manager - Central access point for all services
export class TryOnServiceManager {
  private static instance: TryOnServiceManager;
  private serviceFactory: ServiceFactory;
  private providerManager: ServiceProviderManager;

  private constructor() {
    this.serviceFactory = ServiceFactory.getInstance();
    this.providerManager = ServiceProviderManager.getInstance();
  }

  public static getInstance(): TryOnServiceManager {
    if (!TryOnServiceManager.instance) {
      TryOnServiceManager.instance = new TryOnServiceManager();
    }
    return TryOnServiceManager.instance;
  }

  // Get currently active services
  public getActiveServices(): ServiceProviderType {
    const activeProviders = this.providerManager.getActiveProviders();

    return {
      clothingTryOn: this.serviceFactory.getClothingTryOnService(
        activeProviders.clothingTryOn,
      ),
      decorVisualization: this.serviceFactory.getDecorVisualizationService(
        activeProviders.decorVisualization,
      ),
      aiSizing: this.serviceFactory.getAISizingService(
        activeProviders.aiSizing,
      ),
    };
  }

  // Switch service provider dynamically
  public switchProvider(
    serviceType: "clothingTryOn" | "decorVisualization" | "aiSizing",
    provider: ServiceProvider,
  ): void {
    this.providerManager.setProvider(serviceType, provider);
    this.serviceFactory.clearCache(); // Clear cache to force new instances
  }

  // Get service with automatic fallback to mock if primary fails
  public getClothingTryOnService(): IClothingTryOnService {
    const activeProviders = this.providerManager.getActiveProviders();
    return this.serviceFactory.getServiceWithFallback<IClothingTryOnService>(
      activeProviders.clothingTryOn,
      ServiceProvider.MOCK_CLOTHING,
      "clothing",
    );
  }

  public getDecorVisualizationService(): IDecorVisualizationService {
    const activeProviders = this.providerManager.getActiveProviders();
    return this.serviceFactory.getServiceWithFallback<IDecorVisualizationService>(
      activeProviders.decorVisualization,
      ServiceProvider.MOCK_DECOR,
      "decor",
    );
  }

  public getAISizingService(): IAISizingService {
    const activeProviders = this.providerManager.getActiveProviders();
    return this.serviceFactory.getServiceWithFallback<IAISizingService>(
      activeProviders.aiSizing,
      ServiceProvider.MOCK_SIZING,
      "sizing",
    );
  }

  // Health check for all active services
  public async checkServiceHealth(): Promise<{
    clothingTryOn: boolean;
    decorVisualization: boolean;
    aiSizing: boolean;
  }> {
    const services = this.getActiveServices();

    const [clothingAvailable, decorAvailable, sizingAvailable] =
      await Promise.all([
        services.clothingTryOn?.isAvailable() || false,
        services.decorVisualization?.isAvailable() || false,
        services.aiSizing?.isAvailable() || false,
      ]);

    return {
      clothingTryOn: clothingAvailable,
      decorVisualization: decorAvailable,
      aiSizing: sizingAvailable,
    };
  }

  // Get service information
  public getServiceInfo(): {
    activeProviders: any;
    serviceVersions: any;
    healthStatus: any;
  } {
    const activeProviders = this.providerManager.getActiveProviders();
    const services = this.getActiveServices();

    return {
      activeProviders,
      serviceVersions: {
        clothingTryOn: {
          name: services.clothingTryOn?.name,
          version: services.clothingTryOn?.version,
        },
        decorVisualization: {
          name: services.decorVisualization?.name,
          version: services.decorVisualization?.version,
        },
        aiSizing: {
          name: services.aiSizing?.name,
          version: services.aiSizing?.version,
        },
      },
      healthStatus: null, // Will be populated by checkServiceHealth()
    };
  }

  // Validate all configurations
  public validateConfiguration(): { valid: boolean; errors: string[] } {
    return this.providerManager.validateActiveProviders();
  }
}

// Export singleton instance for easy access
export const tryOnServiceManager = TryOnServiceManager.getInstance();
