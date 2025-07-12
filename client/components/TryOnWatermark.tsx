import { IndusaLogo } from "./IndusaLogo";

interface TryOnWatermarkProps {
  brandName?: string;
  designerName?: string;
  productName?: string;
  className?: string;
}

export function TryOnWatermark({
  brandName = "Indusa",
  designerName,
  productName,
  className = "",
}: TryOnWatermarkProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Main Brand Watermark - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
          <IndusaLogo size="sm" />
          <div className="text-white">
            <div className="text-sm font-bold tracking-wide">INDUSA</div>
            <div className="text-xs opacity-80">AI Fashion Platform</div>
          </div>
        </div>
      </div>

      {/* Designer Watermark - Top Right */}
      {designerName && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border">
            <div className="text-xs text-muted-foreground">Designer</div>
            <div className="text-sm font-bold text-foreground">
              {designerName}
            </div>
          </div>
        </div>
      )}

      {/* Product Info - Bottom Left */}
      {productName && (
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border max-w-[200px]">
            <div className="text-xs text-muted-foreground">Trying On</div>
            <div className="text-sm font-semibold text-foreground line-clamp-1">
              {productName}
            </div>
          </div>
        </div>
      )}

      {/* Instagram Share Prompt - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg px-3 py-2 text-center">
          <div className="text-xs">Share on</div>
          <div className="text-sm font-bold">Instagram</div>
        </div>
      </div>

      {/* Subtle Brand Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ctext x='10' y='30' font-family='Arial' font-size='8' font-weight='bold'%3EINDUSA%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      {/* Center Brand Mark for Screenshots */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="text-center">
          <IndusaLogo size="xl" />
          <div className="mt-2 text-lg font-black tracking-widest text-primary">
            INDUSA
          </div>
        </div>
      </div>
    </div>
  );
}

// Downloadable watermark version for sharing
export function DownloadableWatermark({
  brandName = "Indusa",
  designerName,
  productName,
}: TryOnWatermarkProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Enhanced watermarks for downloaded images */}

      {/* Main Brand - Top */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3">
          <IndusaLogo size="md" />
          <div className="text-white text-center">
            <div className="text-lg font-black tracking-wide">INDUSA</div>
            <div className="text-xs opacity-90 tracking-wider">
              Made by Humans • Delivered By AI
            </div>
          </div>
        </div>
      </div>

      {/* Designer & Product Info - Bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-primary/20">
          <div className="text-center">
            {designerName && (
              <div className="text-sm font-bold text-primary">
                {designerName}
              </div>
            )}
            {productName && (
              <div className="text-xs text-muted-foreground">{productName}</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              Try it yourself at indusa.com
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Handles - Side */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-10">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-4 text-white text-center">
          <div className="text-xs opacity-80">Follow us</div>
          <div className="text-sm font-bold">@indusa</div>
          <div className="text-sm font-bold">@indusa_ai</div>
        </div>
      </div>
    </div>
  );
}
