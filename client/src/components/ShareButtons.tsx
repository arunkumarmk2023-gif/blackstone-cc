import { Share2, Facebook, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
}

export default function ShareButtons({ title, text, url }: ShareButtonsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, "facebook-share", "width=600,height=400");
    setShowMenu(false);
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, "twitter-share", "width=600,height=400");
    setShowMenu(false);
  };

  const shareViaEmail = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + currentUrl)}`;
    window.location.href = mailtoUrl;
    setShowMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Link copied to clipboard!");
      setShowMenu(false);
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };

  // Check if Web Share API is available
  const canUseWebShare = typeof navigator !== "undefined" && navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text,
        url: currentUrl,
      });
      setShowMenu(false);
    } catch (error) {
      // User cancelled share or error occurred
      console.log("Share cancelled or failed");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
        title="Share this result"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
          <div className="p-2 space-y-1">
            {canUseWebShare ? (
              <button
                onClick={handleNativeShare}
                className="w-full text-left px-3 py-2 rounded hover:bg-secondary/50 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            ) : null}

            <button
              onClick={shareOnFacebook}
              className="w-full text-left px-3 py-2 rounded hover:bg-secondary/50 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </button>

            <button
              onClick={shareOnTwitter}
              className="w-full text-left px-3 py-2 rounded hover:bg-secondary/50 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              X (Twitter)
            </button>

            <button
              onClick={shareViaEmail}
              className="w-full text-left px-3 py-2 rounded hover:bg-secondary/50 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>

            <div className="border-t border-border my-1" />

            <button
              onClick={copyToClipboard}
              className="w-full text-left px-3 py-2 rounded hover:bg-secondary/50 transition-colors text-sm font-medium"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
