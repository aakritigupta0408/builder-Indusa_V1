import {
  IClothingTryOnService,
  ClothingTryOnRequest,
  ClothingTryOnResponse,
  ApiResponse,
  ProcessingStatus,
  ApiError,
  ServiceConfig,
} from "../types";

// KLING API Service Implementation
export class KlingClothingTryOnService implements IClothingTryOnService {
  name = "KLING AI Clothing Try-On";
  version = "1.0.0";

  constructor(private config: ServiceConfig) {}

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/health`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch (error) {
      console.warn("KLING service availability check failed:", error);
      return false;
    }
  }

  async tryOn(
    request: ClothingTryOnRequest,
  ): Promise<ApiResponse<ClothingTryOnResponse>> {
    try {
      const validation = this.validateRequest(request);
      if (!validation.valid) {
        throw new ApiError(
          `Validation failed: ${validation.errors?.join(", ")}`,
          400,
          this.name,
        );
      }

      const formData = new FormData();
      formData.append("user_image", request.userPhoto.file);
      formData.append("garment_image", request.garmentImage.file);

      if (request.options) {
        formData.append("options", JSON.stringify(request.options));
      }

      const response = await fetch(`${this.config.baseUrl}/v1/tryon`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          ...this.config.customHeaders,
        },
        body: formData,
        signal: AbortSignal.timeout(this.config.timeout || 30000),
      });

      if (!response.ok) {
        throw new ApiError(
          `KLING API error: ${response.statusText}`,
          response.status,
          this.name,
        );
      }

      const data = await response.json();

      const tryOnResponse: ClothingTryOnResponse = {
        processedImageUrl: data.result_image_url,
        maskUrl: data.mask_url,
        confidence: data.confidence,
        processingTime: data.processing_time,
        metadata: {
          bodyDetected: data.body_detected,
          garmentFit: data.fit_assessment,
          recommendations: data.recommendations,
        },
      };

      return {
        success: true,
        data: tryOnResponse,
      };
    } catch (error) {
      this.logError("tryOn", error);
      return {
        success: false,
        error:
          error instanceof ApiError
            ? error.message
            : "Failed to process try-on request",
      };
    }
  }

  async getProcessingStatus(
    jobId: string,
  ): Promise<ApiResponse<ProcessingStatus>> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/v1/jobs/${jobId}/status`,
        {
          method: "GET",
          headers: this.getHeaders(),
          signal: AbortSignal.timeout(10000),
        },
      );

      if (!response.ok) {
        throw new ApiError(
          `Failed to get job status: ${response.statusText}`,
          response.status,
          this.name,
        );
      }

      const data = await response.json();

      return {
        success: true,
        data: {
          id: jobId,
          status: data.status,
          progress: data.progress,
          message: data.message,
          estimatedTime: data.estimated_time,
        },
      };
    } catch (error) {
      this.logError("getProcessingStatus", error);
      return {
        success: false,
        error: "Failed to get processing status",
      };
    }
  }

  getSupportedFormats(): string[] {
    return ["jpg", "jpeg", "png", "webp"];
  }

  getMaxFileSize(): number {
    return 20 * 1024 * 1024; // 20MB
  }

  validateRequest(request: ClothingTryOnRequest): {
    valid: boolean;
    errors?: string[];
  } {
    const errors: string[] = [];

    if (!request.userPhoto?.file) {
      errors.push("User photo file is required");
    }

    if (!request.garmentImage?.file) {
      errors.push("Garment image file is required");
    }

    if (request.userPhoto?.file?.size > this.getMaxFileSize()) {
      errors.push("User photo exceeds maximum file size");
    }

    if (request.garmentImage?.file?.size > this.getMaxFileSize()) {
      errors.push("Garment image exceeds maximum file size");
    }

    const supportedFormats = this.getSupportedFormats();
    if (
      request.userPhoto?.file &&
      !this.isFormatSupported(request.userPhoto.file, supportedFormats)
    ) {
      errors.push("User photo format not supported");
    }

    if (
      request.garmentImage?.file &&
      !this.isFormatSupported(request.garmentImage.file, supportedFormats)
    ) {
      errors.push("Garment image format not supported");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.config.apiKey}`,
      "Content-Type": "application/json",
      ...this.config.customHeaders,
    };
  }

  private isFormatSupported(file: File, supportedFormats: string[]): boolean {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return supportedFormats.includes(fileExtension || "");
  }

  private logError(method: string, error: any): void {
    if (this.config.enableLogging) {
      console.error(`${this.name}.${method} error:`, error);
    }
  }
}

// Replicate Try-On Service Implementation
export class ReplicateClothingTryOnService implements IClothingTryOnService {
  name = "Replicate Clothing Try-On";
  version = "1.0.0";

  constructor(private config: ServiceConfig) {}

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/v1/account`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch (error) {
      console.warn("Replicate service availability check failed:", error);
      return false;
    }
  }

  async tryOn(
    request: ClothingTryOnRequest,
  ): Promise<ApiResponse<ClothingTryOnResponse>> {
    try {
      const validation = this.validateRequest(request);
      if (!validation.valid) {
        throw new ApiError(
          `Validation failed: ${validation.errors?.join(", ")}`,
          400,
          this.name,
        );
      }

      // Convert files to base64 for Replicate API
      const userImageB64 = await this.fileToBase64(request.userPhoto.file);
      const garmentImageB64 = await this.fileToBase64(
        request.garmentImage.file,
      );

      const payload = {
        version: "your-replicate-model-version-id", // Replace with actual model version
        input: {
          person_image: userImageB64,
          garment_image: garmentImageB64,
          ...request.options,
        },
      };

      const response = await fetch(`${this.config.baseUrl}/v1/predictions`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(this.config.timeout || 45000),
      });

      if (!response.ok) {
        throw new ApiError(
          `Replicate API error: ${response.statusText}`,
          response.status,
          this.name,
        );
      }

      const data = await response.json();

      // Poll for completion if necessary
      const result = await this.pollForCompletion(data.id);

      const tryOnResponse: ClothingTryOnResponse = {
        processedImageUrl: result.output[0], // Replicate typically returns array
        confidence: result.metrics?.confidence || 0.9,
        processingTime: result.metrics?.predict_time,
        metadata: {
          bodyDetected: true,
          garmentFit: "perfect",
          recommendations: [],
        },
      };

      return {
        success: true,
        data: tryOnResponse,
      };
    } catch (error) {
      this.logError("tryOn", error);
      return {
        success: false,
        error:
          error instanceof ApiError
            ? error.message
            : "Failed to process try-on request",
      };
    }
  }

  async getProcessingStatus(
    jobId: string,
  ): Promise<ApiResponse<ProcessingStatus>> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/v1/predictions/${jobId}`,
        {
          method: "GET",
          headers: this.getHeaders(),
          signal: AbortSignal.timeout(10000),
        },
      );

      if (!response.ok) {
        throw new ApiError(
          `Failed to get prediction status: ${response.statusText}`,
          response.status,
          this.name,
        );
      }

      const data = await response.json();

      return {
        success: true,
        data: {
          id: jobId,
          status: this.mapReplicateStatus(data.status),
          progress: this.calculateProgress(data.status),
          message: data.status,
        },
      };
    } catch (error) {
      this.logError("getProcessingStatus", error);
      return {
        success: false,
        error: "Failed to get processing status",
      };
    }
  }

  getSupportedFormats(): string[] {
    return ["jpg", "jpeg", "png"];
  }

  getMaxFileSize(): number {
    return 10 * 1024 * 1024; // 10MB
  }

  validateRequest(request: ClothingTryOnRequest): {
    valid: boolean;
    errors?: string[];
  } {
    const errors: string[] = [];

    if (!request.userPhoto?.file) {
      errors.push("User photo file is required");
    }

    if (!request.garmentImage?.file) {
      errors.push("Garment image file is required");
    }

    if (request.userPhoto?.file?.size > this.getMaxFileSize()) {
      errors.push("User photo exceeds maximum file size");
    }

    if (request.garmentImage?.file?.size > this.getMaxFileSize()) {
      errors.push("Garment image exceeds maximum file size");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private async pollForCompletion(predictionId: string): Promise<any> {
    const maxAttempts = 30;
    const interval = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const statusResponse = await this.getProcessingStatus(predictionId);

      if (statusResponse.success && statusResponse.data) {
        const status = statusResponse.data.status;

        if (status === "succeeded") {
          const response = await fetch(
            `${this.config.baseUrl}/v1/predictions/${predictionId}`,
            {
              method: "GET",
              headers: this.getHeaders(),
            },
          );
          return await response.json();
        }

        if (status === "failed") {
          throw new ApiError(
            "Prediction failed",
            500,
            this.name,
            statusResponse.data,
          );
        }
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new ApiError("Prediction timed out", 408, this.name);
  }

  private calculateProgress(status: string): number {
    switch (status) {
      case "starting":
        return 10;
      case "processing":
        return 50;
      case "succeeded":
        return 100;
      case "failed":
        return 0;
      default:
        return 0;
    }
  }

  private mapReplicateStatus(
    replicateStatus: string,
  ): "pending" | "processing" | "completed" | "failed" {
    switch (replicateStatus) {
      case "starting":
        return "pending";
      case "processing":
        return "processing";
      case "succeeded":
        return "completed";
      case "failed":
        return "failed";
      default:
        return "pending";
    }
  }

  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Token ${this.config.apiKey}`,
      "Content-Type": "application/json",
      ...this.config.customHeaders,
    };
  }

  private logError(method: string, error: any): void {
    if (this.config.enableLogging) {
      console.error(`${this.name}.${method} error:`, error);
    }
  }
}
