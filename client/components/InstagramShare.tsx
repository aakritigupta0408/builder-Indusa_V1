import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Instagram, Share2, Download, Copy, ExternalLink } from "lucide-react";

interface InstagramShareProps {
  imageUrl?: string;
  productName?: string;
  designerName?: string;
  className?: string;
  variant?: "button" | "icon" | "floating";
}

export function InstagramShare({
  imageUrl,
  productName,
  designerName,
  className = "",
  variant = "button",
}: InstagramShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `Just tried on this amazing ${productName || "piece"} ${
    designerName ? `from ${designerName}` : ""
  } using Indusa's AI try-on! 🔥✨ #IndusaAI #VirtualTryOn #AIFashion #TryOn`;

  const handleInstagramShare = () => {
    // Open Instagram in new tab with pre-filled caption
    const instagramUrl = `https://www.instagram.com/`;
    window.open(instagramUrl, "_blank");
  };

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `indusa-tryon-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareUrl = `https://indusa.com/try-on?product=${productName}&designer=${designerName}`;

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my virtual try-on!",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyCaption();
    }
  };

  const TriggerButton = forwardRef<HTMLButtonElement>((props, ref) => {
    if (variant === "icon") {
      return (
        <Button
          ref={ref}
          size="icon"
          variant="outline"
          className={className}
          {...props}
        >
          <Instagram className="w-4 h-4" />
        </Button>
      );
    }

    if (variant === "floating") {
      return (
        <Button
          ref={ref}
          className={`fixed bottom-6 right-6 z-50 shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white ${className}`}
          size="lg"
          {...props}
        >
          <Instagram className="w-5 h-5 mr-2" />
          Share on Instagram
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        className={`bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white ${className}`}
        {...props}
      >
        <Instagram className="w-4 h-4 mr-2" />
        Share on Instagram
      </Button>
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-500" />
            Share on Instagram
          </DialogTitle>
          <DialogDescription>
            Share your virtual try-on with your followers!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview */}
          {imageUrl && (
            <div className="relative bg-neutral rounded-lg overflow-hidden aspect-square">
              <img
                src={imageUrl}
                alt="Try-on preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                Ready to share!
              </div>
            </div>
          )}

          {/* Share Caption */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Caption</label>
            <div className="bg-muted rounded-lg p-3 text-sm">
              <p className="text-muted-foreground">{shareText}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCaption}
              className="w-full"
            >
              <Copy className="w-3 h-3 mr-2" />
              {copied ? "Copied!" : "Copy Caption"}
            </Button>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleDownloadImage}
              variant="outline"
              className="flex flex-col gap-1 h-auto py-3"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs">Download</span>
            </Button>
            <Button
              onClick={handleInstagramShare}
              className="flex flex-col gap-1 h-auto py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-xs">Open Instagram</span>
            </Button>
          </div>

          {/* Additional Share Options */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-3">
              Or share with friends
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareLink}
                className="flex-1"
              >
                <Share2 className="w-3 h-3 mr-2" />
                Share Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                    "_blank",
                  )
                }
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
