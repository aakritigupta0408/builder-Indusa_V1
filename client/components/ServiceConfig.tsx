import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useServiceManager } from "@/hooks/useServices";
import { ServiceProvider } from "@/services/config";

export function ServiceConfigDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    serviceInfo,
    healthStatus,
    isCheckingHealth,
    checkHealth,
    switchProvider,
  } = useServiceManager();

  const handleProviderChange = (
    serviceType: "clothingTryOn" | "decorVisualization" | "aiSizing",
    provider: ServiceProvider,
  ) => {
    switchProvider(serviceType, provider);
    checkHealth(); // Refresh health status
  };

  const getHealthIcon = (isHealthy: boolean | null) => {
    if (isHealthy === null) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    return isHealthy ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getHealthText = (isHealthy: boolean | null) => {
    if (isHealthy === null) return "Unknown";
    return isHealthy ? "Online" : "Offline";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          API Config
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>API Service Configuration</DialogTitle>
          <DialogDescription>
            Configure and monitor your AI service providers. Switch between
            different APIs for clothing try-on, decor visualization, and AI
            sizing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Clothing Try-On</p>
                    <p className="text-xs text-muted-foreground">
                      {serviceInfo?.serviceVersions?.clothingTryOn?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthIcon(healthStatus?.clothingTryOn)}
                    <span className="text-xs">
                      {getHealthText(healthStatus?.clothingTryOn)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Decor Visualization</p>
                    <p className="text-xs text-muted-foreground">
                      {serviceInfo?.serviceVersions?.decorVisualization?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthIcon(healthStatus?.decorVisualization)}
                    <span className="text-xs">
                      {getHealthText(healthStatus?.decorVisualization)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">AI Sizing</p>
                    <p className="text-xs text-muted-foreground">
                      {serviceInfo?.serviceVersions?.aiSizing?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthIcon(healthStatus?.aiSizing)}
                    <span className="text-xs">
                      {getHealthText(healthStatus?.aiSizing)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkHealth}
                  disabled={isCheckingHealth}
                >
                  {isCheckingHealth ? "Checking..." : "Refresh Status"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Provider Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Clothing Try-On */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clothing Try-On</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={serviceInfo?.activeProviders?.clothingTryOn}
                  onValueChange={(value: ServiceProvider) =>
                    handleProviderChange("clothingTryOn", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ServiceProvider.MOCK_CLOTHING}>
                      <div className="flex items-center gap-2">
                        Mock Service
                        <Badge variant="secondary">Free</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceProvider.KLING}>
                      <div className="flex items-center gap-2">
                        KLING AI
                        <Badge variant="outline">Premium</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceProvider.REPLICATE_TRYON}>
                      <div className="flex items-center gap-2">
                        Replicate
                        <Badge variant="outline">Premium</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong>Mock:</strong> Instant results for development
                  </p>
                  <p>
                    <strong>KLING:</strong> High-quality AI try-on
                  </p>
                  <p>
                    <strong>Replicate:</strong> Open-source models
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Decor Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Decor Visualization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={serviceInfo?.activeProviders?.decorVisualization}
                  onValueChange={(value: ServiceProvider) =>
                    handleProviderChange("decorVisualization", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ServiceProvider.MOCK_DECOR}>
                      <div className="flex items-center gap-2">
                        Mock Service
                        <Badge variant="secondary">Free</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceProvider.REIMAGINE_HOME}>
                      <div className="flex items-center gap-2">
                        ReimagineHome
                        <Badge variant="outline">Premium</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceProvider.MODSY}>
                      <div className="flex items-center gap-2">
                        Modsy
                        <Badge variant="outline">Premium</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong>Mock:</strong> Instant results for development
                  </p>
                  <p>
                    <strong>ReimagineHome:</strong> Professional room staging
                  </p>
                  <p>
                    <strong>Modsy:</strong> 3D room visualization
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Sizing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Sizing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={serviceInfo?.activeProviders?.aiSizing}
                  onValueChange={(value: ServiceProvider) =>
                    handleProviderChange("aiSizing", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ServiceProvider.MOCK_SIZING}>
                      <div className="flex items-center gap-2">
                        Mock Service
                        <Badge variant="secondary">Free</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceProvider.THREE_D_LOOK}>
                      <div className="flex items-center gap-2">
                        3DLook
                        <Badge variant="outline">Premium</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value={ServiceProvider.BODYLABS}>
                      <div className="flex items-center gap-2">
                        BodyLabs
                        <Badge variant="outline">Premium</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong>Mock:</strong> Instant results for development
                  </p>
                  <p>
                    <strong>3DLook:</strong> Accurate body measurements
                  </p>
                  <p>
                    <strong>BodyLabs:</strong> Advanced body analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Configuration Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p>
                  <strong>Environment Variables:</strong> Add your API keys to{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    .env.local
                  </code>
                </p>
                <div className="bg-muted p-3 rounded-lg text-xs font-mono">
                  <div>VITE_KLING_API_KEY=your_kling_key</div>
                  <div>VITE_REPLICATE_API_KEY=your_replicate_key</div>
                  <div>VITE_REIMAGINE_API_KEY=your_reimagine_key</div>
                  <div>VITE_3DLOOK_API_KEY=your_3dlook_key</div>
                </div>
              </div>

              <div className="text-sm">
                <p>
                  <strong>Development:</strong> Use mock services for immediate
                  testing without API keys.
                </p>
                <p>
                  <strong>Production:</strong> Configure real API providers for
                  production deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
