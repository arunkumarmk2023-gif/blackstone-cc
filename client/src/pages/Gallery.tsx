/* Heritage Grain Design: Gallery page with lightbox modal — data from database */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import ImageModal from "@/components/ImageModal";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Gallery() {
  const galleryQuery = trpc.gallery.list.useQuery();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = galleryQuery.data || [];

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-b border-border">
        <div className="container">
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-4">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Capturing memorable moments from matches, training sessions, and club events.
            Explore our visual journey through the season. Click any image to view in full size.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16" id="gallery">
        <div className="container">
          {galleryQuery.isLoading ? (
            <div className="flex items-center justify-center gap-4 py-24">
              <Loader2 className="animate-spin w-6 h-6" />
              <span className="text-muted-foreground">Loading gallery...</span>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image: any, index: number) => (
                <Card
                  key={image.id}
                  className="group overflow-hidden border-border hover:border-accent transition-all cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-sm text-accent font-heading font-semibold mb-1">
                          {image.category}
                        </p>
                        <p className="text-foreground font-medium line-clamp-2">
                          {image.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Gallery Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Photos from our matches and events will be uploaded here shortly. Check back soon!
              </p>
            </div>
          )}

          {/* Upload Note */}
          {images.length > 0 && (
            <div className="mt-12 p-8 bg-secondary/50 rounded-xl border border-border text-center">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                More Photos Coming Soon
              </h3>
              <p className="text-muted-foreground">
                We're continuously updating our gallery with photos from recent matches and events.
                Check back regularly for new additions!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedIndex !== null && images[selectedIndex] && (
        <ImageModal
          isOpen={selectedIndex !== null}
          imageUrl={images[selectedIndex].imageUrl}
          caption={images[selectedIndex].title}
          onClose={() => setSelectedIndex(null)}
          onPrevious={selectedIndex > 0 ? handlePrevious : undefined}
          onNext={selectedIndex < images.length - 1 ? handleNext : undefined}
        />
      )}

      <Footer />
    </div>
  );
}
