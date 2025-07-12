import { useState, useRef } from "react";
import { useAISizing, useFileUpload } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Camera,
  Upload,
  RefreshCw,
  Download,
  Share2,
  Ruler,
  User,
  Check,
  X,
  Info,
  Sparkles,
  RotateCcw,
} from "lucide-react";

// Mock body measurements
const mockMeasurements = {
  height: "5'7\" (170 cm)",
  chest: '36" (91 cm)',
  waist: '30" (76 cm)',
  hips: '38" (97 cm)',
  shoulderWidth: '16" (41 cm)',
  armLength: '24" (61 cm)',
  inseam: '32" (81 cm)',
  neckCircumference: '14" (36 cm)',
  bicep: '12" (30 cm)',
  wrist: '6.5" (17 cm)',
  thigh: '22" (56 cm)',
  calf: '14" (36 cm)',
};

// Measurement points for annotation
const measurementPoints = [
  { id: "shoulder", x: 50, y: 25, label: "Shoulder Width", value: '16"' },
  { id: "chest", x: 50, y: 35, label: "Chest", value: '36"' },
  { id: "waist", x: 50, y: 50, label: "Waist", value: '30"' },
  { id: "hips", x: 50, y: 60, label: "Hips", value: '38"' },
  { id: "armLength", x: 25, y: 45, label: "Arm Length", value: '24"' },
  { id: "inseam", x: 45, y: 75, label: "Inseam", value: '32"' },
  { id: "thigh", x: 45, y: 70, label: "Thigh", value: '22"' },
];

interface UploadedPhoto {
  id: string;
  file: File;
  url: string;
  type: "front" | "side" | "back";
  isProcessed: boolean;
}

export default function AISizing() {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState<string | null>(
    null,
  );
  const [showTips, setShowTips] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Service hooks
  const aiSizing = useAISizing();
  const fileUpload = useFileUpload();

  // Use service state
  const isProcessing = aiSizing.isProcessing;
  const processingProgress = aiSizing.progress;
  const showResults = !!aiSizing.result;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file, index) => {
      if (uploadedPhotos.length + index < 3) {
        // Validate file using service validation
        const validation = fileUpload.validateFile(file, 10 * 1024 * 1024, [
          "image/jpeg",
          "image/png",
          "image/webp",
        ]);

        if (!validation.valid) {
          console.error("File validation failed:", validation.errors);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto: UploadedPhoto = {
            id: `photo-${Date.now()}-${index}`,
            file,
            url: e.target?.result as string,
            type: index === 0 ? "front" : index === 1 ? "side" : "back",
            isProcessed: false,
          };
          setUploadedPhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (photoId: string) => {
    setUploadedPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
    aiSizing.reset();
  };

  const startProcessing = async () => {
    if (uploadedPhotos.length === 0) return;

    try {
      // Convert uploaded photos to MediaUpload format
      const mediaUploads = await Promise.all(
        uploadedPhotos.map(async (photo) => {
          return fileUpload.createMediaUpload(photo.file);
        }),
      );

      // Start AI sizing analysis
      await aiSizing.analyzeMeasurements({
        photos: mediaUploads,
        options: {
          measurementUnits: "metric",
          detailLevel: "comprehensive",
        },
      });

      // Mark photos as processed if successful
      if (aiSizing.result) {
        setUploadedPhotos((prev) =>
          prev.map((photo) => ({ ...photo, isProcessed: true })),
        );
      }
    } catch (error) {
      console.error("Sizing analysis failed:", error);
    }
  };

  const resetAnalysis = () => {
    setUploadedPhotos([]);
    aiSizing.reset();
    setSelectedMeasurement(null);
  };

  const getPhotoTypeInstructions = (type: "front" | "side" | "back") => {
    const instructions = {
      front: "Stand straight facing the camera, arms at sides",
      side: "Stand sideways to the camera, arms at sides",
      back: "Stand with back to camera, arms at sides",
    };
    return instructions[type];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Ruler className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  AI Sizing
                </h1>
                <p className="text-muted-foreground">
                  Get your precise measurements from photos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Dialog open={showTips} onOpenChange={setShowTips}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4 mr-2" />
                    Tips
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Photo Tips for Best Results</DialogTitle>
                    <DialogDescription>
                      Follow these guidelines for accurate measurements
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">General Guidelines:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Wear form-fitting clothes or underwear</li>
                        <li>• Stand against a plain, light-colored wall</li>
                        <li>
                          • Ensure good lighting (natural light preferred)
                        </li>
                        <li>• Keep arms at your sides, relaxed</li>
                        <li>• Stand straight with feet shoulder-width apart</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Photo Angles:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <strong>Front:</strong> Facing camera directly
                        </li>
                        <li>
                          • <strong>Side:</strong> Profile view, shoulder
                          perpendicular to camera
                        </li>
                        <li>
                          • <strong>Back:</strong> Back to camera (optional but
                          recommended)
                        </li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Left Panel - Photo Upload */}
        <div className="w-full lg:w-1/2 p-6 border-r">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Upload Photos</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {uploadedPhotos.length}/3 photos
                </span>
                {uploadedPhotos.length > 0 && (
                  <Button variant="outline" size="sm" onClick={resetAnalysis}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {uploadedPhotos.length === 0 ? (
              // Upload State
              <div className="flex-1 flex items-center justify-center">
                <Card className="w-full max-w-md p-8 text-center">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Upload Your Photos
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Take 2-3 photos for the most accurate measurements. Our
                        AI will analyze your body proportions.
                      </p>
                    </div>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 10MB each
                      </p>
                    </div>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      size="lg"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              // Photos Uploaded State
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {uploadedPhotos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="relative aspect-[3/4] bg-neutral">
                        <img
                          src={photo.url}
                          alt={`${photo.type} view`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="capitalize">
                            {photo.type} View
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          {photo.isProcessed ? (
                            <Badge className="bg-success text-success-foreground">
                              <Check className="w-3 h-3 mr-1" />
                              Processed
                            </Badge>
                          ) : (
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8"
                              onClick={() => removePhoto(photo.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground">
                          {getPhotoTypeInstructions(photo.type)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add More Photos */}
                  {uploadedPhotos.length < 3 && (
                    <Card className="border-dashed border-2 border-muted aspect-[3/4] flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <div
                        className="text-center p-4"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">Add Photo</p>
                        <p className="text-xs text-muted-foreground">
                          {uploadedPhotos.length === 1
                            ? "Side view recommended"
                            : "Back view optional"}
                        </p>
                      </div>
                    </Card>
                  )}
                </div>

                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {/* Processing Section */}
                {isProcessing ? (
                  <Card className="p-6">
                    <div className="text-center space-y-4">
                      <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto" />
                      <div>
                        <h4 className="font-semibold">Analyzing Your Photos</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI is calculating your precise measurements...
                        </p>
                      </div>
                      <Progress value={processingProgress} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {processingProgress}% complete
                      </p>
                    </div>
                  </Card>
                ) : !showResults ? (
                  <Button
                    size="lg"
                    onClick={startProcessing}
                    className="w-full"
                    disabled={uploadedPhotos.length === 0}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze My Measurements
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="w-full lg:w-1/2 p-6">
          <div className="h-full flex flex-col">
            {!showResults ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-neutral/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ruler className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Your Measurements Will Appear Here
                  </h3>
                  <p className="text-muted-foreground">
                    Upload photos and start the analysis to see your detailed
                    body measurements with visual annotations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Your Measurements</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Annotated Photo */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Annotated View
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] bg-neutral">
                        {uploadedPhotos[0] && (
                          <img
                            src={uploadedPhotos[0].url}
                            alt="Annotated body measurements"
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Measurement Annotations */}
                        {measurementPoints.map((point) => (
                          <div
                            key={point.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                              selectedMeasurement === point.id
                                ? "scale-125 z-10"
                                : "hover:scale-110"
                            }`}
                            style={{ left: `${point.x}%`, top: `${point.y}%` }}
                            onClick={() =>
                              setSelectedMeasurement(
                                selectedMeasurement === point.id
                                  ? null
                                  : point.id,
                              )
                            }
                          >
                            <div className="relative">
                              <div className="w-3 h-3 bg-primary border-2 border-white rounded-full shadow-lg" />
                              <div
                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-lg border min-w-max transition-opacity ${
                                  selectedMeasurement === point.id ||
                                  selectedMeasurement === null
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              >
                                <p className="text-xs font-medium">
                                  {point.label}
                                </p>
                                <p className="text-xs text-primary font-semibold">
                                  {point.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Measurements List */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Detailed Measurements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {aiSizing.result?.measurements
                        ? Object.entries(aiSizing.result.measurements).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0"
                              >
                                <span className="text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="text-sm font-semibold text-primary">
                                  {value} cm
                                </span>
                              </div>
                            ),
                          )
                        : Object.entries(mockMeasurements).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0"
                              >
                                <span className="text-sm font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="text-sm font-semibold text-primary">
                                  {value}
                                </span>
                              </div>
                            ),
                          )}
                    </CardContent>
                  </Card>
                </div>

                {/* Size Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Size Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { brand: "Zara", size: "M", confidence: "95%" },
                        { brand: "H&M", size: "L", confidence: "92%" },
                        { brand: "Uniqlo", size: "M", confidence: "97%" },
                        { brand: "Nike", size: "L", confidence: "89%" },
                      ].map((rec) => (
                        <div
                          key={rec.brand}
                          className="text-center p-3 border rounded-lg"
                        >
                          <p className="font-medium text-sm">{rec.brand}</p>
                          <p className="text-lg font-bold text-primary">
                            {rec.size}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {rec.confidence} match
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <User className="w-4 h-4 mr-2" />
                    Save My Profile
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Shop My Size
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
