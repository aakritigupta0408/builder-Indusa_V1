// Base types for all API services
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface ProcessingStatus {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress?: number;
  message?: string;
  estimatedTime?: number;
}

export interface MediaUpload {
  file: File;
  url?: string;
  type: "image" | "video";
  metadata?: Record<string, any>;
}

// Clothing Try-On Service Interface
export interface ClothingTryOnRequest {
  userPhoto: MediaUpload;
  garmentImage: MediaUpload;
  garmentId?: string;
  options?: {
    bodySegmentation?: boolean;
    preserveBackground?: boolean;
    quality?: "standard" | "high" | "ultra";
    outputFormat?: "jpg" | "png" | "webp";
  };
}

export interface ClothingTryOnResponse {
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

export interface IClothingTryOnService {
  name: string;
  version: string;
  isAvailable(): Promise<boolean>;
  tryOn(
    request: ClothingTryOnRequest,
  ): Promise<ApiResponse<ClothingTryOnResponse>>;
  getProcessingStatus(jobId: string): Promise<ApiResponse<ProcessingStatus>>;
  getSupportedFormats(): string[];
  getMaxFileSize(): number;
  validateRequest(request: ClothingTryOnRequest): {
    valid: boolean;
    errors?: string[];
  };
}

// Home Decor Visualization Service Interface
export interface DecorVisualizationRequest {
  roomPhoto: MediaUpload;
  furnitureImage: MediaUpload;
  furnitureId?: string;
  placement?: {
    x: number;
    y: number;
    scale?: number;
    rotation?: number;
  };
  options?: {
    roomDetection?: boolean;
    shadowGeneration?: boolean;
    lightingAdjustment?: boolean;
    quality?: "standard" | "high" | "ultra";
    outputFormat?: "jpg" | "png" | "webp";
  };
}

export interface DecorVisualizationResponse {
  processedImageUrl: string;
  roomAnalysis?: {
    roomType: string;
    lightingConditions: string;
    suggestedPlacements: Array<{ x: number; y: number; confidence: number }>;
  };
  confidence?: number;
  processingTime?: number;
}

export interface IDecorVisualizationService {
  name: string;
  version: string;
  isAvailable(): Promise<boolean>;
  visualize(
    request: DecorVisualizationRequest,
  ): Promise<ApiResponse<DecorVisualizationResponse>>;
  getProcessingStatus(jobId: string): Promise<ApiResponse<ProcessingStatus>>;
  getSupportedRoomTypes(): string[];
  getSupportedFurnitureTypes(): string[];
  validateRequest(request: DecorVisualizationRequest): {
    valid: boolean;
    errors?: string[];
  };
}

// AI Sizing Service Interface
export interface SizingAnalysisRequest {
  photos: MediaUpload[]; // Front, side, back photos
  userInfo?: {
    height?: number;
    weight?: number;
    age?: number;
    gender?: "male" | "female" | "other";
  };
  options?: {
    measurementUnits?: "metric" | "imperial";
    detailLevel?: "basic" | "detailed" | "comprehensive";
    outputFormat?: "json" | "pdf";
  };
}

export interface BodyMeasurements {
  height: number;
  chest: number;
  waist: number;
  hips: number;
  shoulderWidth: number;
  armLength: number;
  inseam: number;
  neckCircumference: number;
  bicep: number;
  wrist: number;
  thigh: number;
  calf: number;
  [key: string]: number;
}

export interface SizeRecommendation {
  brand: string;
  size: string;
  confidence: number;
  fitType: "tight" | "regular" | "loose";
  notes?: string;
}

export interface SizingAnalysisResponse {
  measurements: BodyMeasurements;
  sizeRecommendations: SizeRecommendation[];
  bodyType?: string;
  confidence?: number;
  annotatedImageUrl?: string;
  processingTime?: number;
}

export interface IAISizingService {
  name: string;
  version: string;
  isAvailable(): Promise<boolean>;
  analyzeMeasurements(
    request: SizingAnalysisRequest,
  ): Promise<ApiResponse<SizingAnalysisResponse>>;
  getProcessingStatus(jobId: string): Promise<ApiResponse<ProcessingStatus>>;
  getSupportedBrands(): string[];
  getRequiredPhotos(): {
    type: string;
    description: string;
    required: boolean;
  }[];
  validateRequest(request: SizingAnalysisRequest): {
    valid: boolean;
    errors?: string[];
  };
}

// Service Provider Configuration
export interface ServiceConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  enableLogging?: boolean;
  customHeaders?: Record<string, string>;
  [key: string]: any;
}

export interface ServiceProvider {
  clothingTryOn?: IClothingTryOnService;
  decorVisualization?: IDecorVisualizationService;
  aiSizing?: IAISizingService;
}

// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public provider?: string,
    public originalError?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: string[],
  ) {
    super(message);
    this.name = "ValidationError";
  }
}
