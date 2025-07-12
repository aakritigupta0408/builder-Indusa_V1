import { useState, useEffect, useCallback, useRef } from "react";
import {
  ClothingTryOnRequest,
  ClothingTryOnResponse,
  DecorVisualizationRequest,
  DecorVisualizationResponse,
  SizingAnalysisRequest,
  SizingAnalysisResponse,
  ProcessingStatus,
  ApiError,
} from "@/services/types";
import { tryOnServiceManager } from "@/services/ServiceFactory";

// Hook for clothing try-on functionality
export function useClothingTryOn() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ClothingTryOnResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const tryOn = useCallback(async (request: ClothingTryOnRequest) => {
    try {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsProcessing(true);
      setError(null);
      setResult(null);

      const service = tryOnServiceManager.getClothingTryOnService();
      const response = await service.tryOn(request);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "Failed to process try-on request");
      }
    } catch (err) {
      if (err instanceof AbortError) {
        return; // Request was cancelled
      }
      setError(
        err instanceof ApiError
          ? err.message
          : "An unexpected error occurred during try-on",
      );
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setJobId(null);
    setIsProcessing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    tryOn,
    cancel,
    reset,
    isProcessing,
    result,
    error,
    jobId,
  };
}

// Hook for decor visualization functionality
export function useDecorVisualization() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DecorVisualizationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const visualize = useCallback(async (request: DecorVisualizationRequest) => {
    try {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsProcessing(true);
      setError(null);
      setResult(null);

      const service = tryOnServiceManager.getDecorVisualizationService();
      const response = await service.visualize(request);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "Failed to process visualization request");
      }
    } catch (err) {
      if (err instanceof AbortError) {
        return; // Request was cancelled
      }
      setError(
        err instanceof ApiError
          ? err.message
          : "An unexpected error occurred during visualization",
      );
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setJobId(null);
    setIsProcessing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    visualize,
    cancel,
    reset,
    isProcessing,
    result,
    error,
    jobId,
  };
}

// Hook for AI sizing functionality
export function useAISizing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SizingAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  const analyzeMeasurements = useCallback(
    async (request: SizingAnalysisRequest) => {
      try {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setIsProcessing(true);
        setError(null);
        setResult(null);
        setProgress(0);

        const service = tryOnServiceManager.getAISizingService();

        // Simulate progress updates for better UX
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 300);

        const response = await service.analyzeMeasurements(request);

        clearInterval(progressInterval);
        setProgress(100);

        if (response.success && response.data) {
          setResult(response.data);
        } else {
          setError(response.error || "Failed to analyze measurements");
        }
      } catch (err) {
        if (err instanceof AbortError) {
          return; // Request was cancelled
        }
        setError(
          err instanceof ApiError
            ? err.message
            : "An unexpected error occurred during measurement analysis",
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
    setIsProcessing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    analyzeMeasurements,
    cancel,
    reset,
    isProcessing,
    result,
    error,
    progress,
  };
}

// Hook for service management and switching
export function useServiceManager() {
  const [serviceInfo, setServiceInfo] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

  const refreshServiceInfo = useCallback(() => {
    const info = tryOnServiceManager.getServiceInfo();
    setServiceInfo(info);
  }, []);

  const checkHealth = useCallback(async () => {
    setIsCheckingHealth(true);
    try {
      const health = await tryOnServiceManager.checkServiceHealth();
      setHealthStatus(health);
    } catch (error) {
      console.error("Failed to check service health:", error);
    } finally {
      setIsCheckingHealth(false);
    }
  }, []);

  const switchProvider = useCallback(
    (
      serviceType: "clothingTryOn" | "decorVisualization" | "aiSizing",
      provider: any,
    ) => {
      tryOnServiceManager.switchProvider(serviceType, provider);
      refreshServiceInfo();
    },
    [refreshServiceInfo],
  );

  // Initialize service info on mount
  useEffect(() => {
    refreshServiceInfo();
    checkHealth();
  }, [refreshServiceInfo, checkHealth]);

  return {
    serviceInfo,
    healthStatus,
    isCheckingHealth,
    refreshServiceInfo,
    checkHealth,
    switchProvider,
  };
}

// Hook for file upload utilities
export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const createMediaUpload = useCallback(
    (file: File): { file: File; url: string; type: "image" | "video" } => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith("image/") ? "image" : "video";

      return {
        file,
        url,
        type,
      };
    },
    [],
  );

  const validateFile = useCallback(
    (
      file: File,
      maxSize: number = 10 * 1024 * 1024,
      allowedTypes: string[] = ["image/jpeg", "image/png", "image/webp"],
    ) => {
      const errors: string[] = [];

      if (file.size > maxSize) {
        errors.push(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      }

      if (!allowedTypes.includes(file.type)) {
        errors.push(`File type ${file.type} is not supported`);
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    },
    [],
  );

  return {
    isUploading,
    uploadProgress,
    createMediaUpload,
    validateFile,
  };
}

// Custom error for abort operations
class AbortError extends Error {
  constructor() {
    super("Operation was aborted");
    this.name = "AbortError";
  }
}
