import {
  IClothingTryOnService,
  IDecorVisualizationService,
  IAISizingService,
  ClothingTryOnRequest,
  ClothingTryOnResponse,
  DecorVisualizationRequest,
  DecorVisualizationResponse,
  SizingAnalysisRequest,
  SizingAnalysisResponse,
  ApiResponse,
  ProcessingStatus,
  BodyMeasurements,
  SizeRecommendation,
} from "../types";

// Mock Clothing Try-On Service
export class MockClothingTryOnService implements IClothingTryOnService {
  name = "Mock Clothing Try-On Service";
  version = "1.0.0";

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async tryOn(
    request: ClothingTryOnRequest,
  ): Promise<ApiResponse<ClothingTryOnResponse>> {
    // Simulate processing time
    await this.delay(2000);

    const response: ClothingTryOnResponse = {
      processedImageUrl: request.userPhoto.url || "/placeholder.svg",
      confidence: 0.95,
      processingTime: 2.1,
      metadata: {
        bodyDetected: true,
        garmentFit: "perfect",
        recommendations: [
          "Great fit for your body type",
          "Consider sizing up for a looser fit",
        ],
      },
    };

    return {
      success: true,
      data: response,
    };
  }

  async getProcessingStatus(
    jobId: string,
  ): Promise<ApiResponse<ProcessingStatus>> {
    return {
      success: true,
      data: {
        id: jobId,
        status: "completed",
        progress: 100,
        message: "Try-on completed successfully",
      },
    };
  }

  getSupportedFormats(): string[] {
    return ["jpg", "png", "webp"];
  }

  getMaxFileSize(): number {
    return 10 * 1024 * 1024; // 10MB
  }

  validateRequest(request: ClothingTryOnRequest): {
    valid: boolean;
    errors?: string[];
  } {
    const errors: string[] = [];

    if (!request.userPhoto) {
      errors.push("User photo is required");
    }

    if (!request.garmentImage) {
      errors.push("Garment image is required");
    }

    if (request.userPhoto?.file?.size > this.getMaxFileSize()) {
      errors.push("User photo file size exceeds maximum limit");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Mock Decor Visualization Service
export class MockDecorVisualizationService
  implements IDecorVisualizationService
{
  name = "Mock Decor Visualization Service";
  version = "1.0.0";

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async visualize(
    request: DecorVisualizationRequest,
  ): Promise<ApiResponse<DecorVisualizationResponse>> {
    // Simulate processing time
    await this.delay(2500);

    const response: DecorVisualizationResponse = {
      processedImageUrl: request.roomPhoto.url || "/placeholder.svg",
      roomAnalysis: {
        roomType: "living room",
        lightingConditions: "natural daylight",
        suggestedPlacements: [
          { x: 0.3, y: 0.6, confidence: 0.9 },
          { x: 0.7, y: 0.4, confidence: 0.8 },
        ],
      },
      confidence: 0.92,
      processingTime: 2.4,
    };

    return {
      success: true,
      data: response,
    };
  }

  async getProcessingStatus(
    jobId: string,
  ): Promise<ApiResponse<ProcessingStatus>> {
    return {
      success: true,
      data: {
        id: jobId,
        status: "completed",
        progress: 100,
        message: "Room visualization completed successfully",
      },
    };
  }

  getSupportedRoomTypes(): string[] {
    return [
      "living room",
      "bedroom",
      "kitchen",
      "dining room",
      "office",
      "bathroom",
    ];
  }

  getSupportedFurnitureTypes(): string[] {
    return [
      "sofa",
      "chair",
      "table",
      "bed",
      "dresser",
      "bookshelf",
      "lamp",
      "rug",
    ];
  }

  validateRequest(request: DecorVisualizationRequest): {
    valid: boolean;
    errors?: string[];
  } {
    const errors: string[] = [];

    if (!request.roomPhoto) {
      errors.push("Room photo is required");
    }

    if (!request.furnitureImage) {
      errors.push("Furniture image is required");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Mock AI Sizing Service
export class MockAISizingService implements IAISizingService {
  name = "Mock AI Sizing Service";
  version = "1.0.0";

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async analyzeMeasurements(
    request: SizingAnalysisRequest,
  ): Promise<ApiResponse<SizingAnalysisResponse>> {
    // Simulate processing time
    await this.delay(3000);

    const measurements: BodyMeasurements = {
      height: 170,
      chest: 91,
      waist: 76,
      hips: 97,
      shoulderWidth: 41,
      armLength: 61,
      inseam: 81,
      neckCircumference: 36,
      bicep: 30,
      wrist: 17,
      thigh: 56,
      calf: 36,
    };

    const sizeRecommendations: SizeRecommendation[] = [
      {
        brand: "Zara",
        size: "M",
        confidence: 0.95,
        fitType: "regular",
        notes: "Perfect fit for this brand's sizing",
      },
      {
        brand: "H&M",
        size: "L",
        confidence: 0.92,
        fitType: "regular",
        notes: "Slightly larger sizing, L recommended",
      },
      {
        brand: "Uniqlo",
        size: "M",
        confidence: 0.97,
        fitType: "regular",
        notes: "Consistent with measurements",
      },
      {
        brand: "Nike",
        size: "L",
        confidence: 0.89,
        fitType: "regular",
        notes: "Athletic fit, size up recommended",
      },
    ];

    const response: SizingAnalysisResponse = {
      measurements,
      sizeRecommendations,
      bodyType: "mesomorph",
      confidence: 0.94,
      annotatedImageUrl: request.photos[0]?.url || "/placeholder.svg",
      processingTime: 2.8,
    };

    return {
      success: true,
      data: response,
    };
  }

  async getProcessingStatus(
    jobId: string,
  ): Promise<ApiResponse<ProcessingStatus>> {
    return {
      success: true,
      data: {
        id: jobId,
        status: "completed",
        progress: 100,
        message: "Sizing analysis completed successfully",
      },
    };
  }

  getSupportedBrands(): string[] {
    return [
      "Zara",
      "H&M",
      "Uniqlo",
      "Nike",
      "Adidas",
      "Gap",
      "Levi's",
      "Calvin Klein",
      "Tommy Hilfiger",
      "Ralph Lauren",
    ];
  }

  getRequiredPhotos(): {
    type: string;
    description: string;
    required: boolean;
  }[] {
    return [
      {
        type: "front",
        description: "Full body front view",
        required: true,
      },
      {
        type: "side",
        description: "Full body side profile",
        required: true,
      },
      {
        type: "back",
        description: "Full body back view",
        required: false,
      },
    ];
  }

  validateRequest(request: SizingAnalysisRequest): {
    valid: boolean;
    errors?: string[];
  } {
    const errors: string[] = [];

    if (!request.photos || request.photos.length < 2) {
      errors.push("At least 2 photos (front and side) are required");
    }

    if (request.photos?.some((photo) => photo.file.size > 10 * 1024 * 1024)) {
      errors.push("Photo file size should not exceed 10MB");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
