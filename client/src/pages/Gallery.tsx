/* Heritage Grain Design: Gallery page with masonry-style image grid */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function Gallery() {
  // Sample gallery images - replace with actual photos
  const galleryImages = [
    {
      url: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-4_1770877525000_na1fn_Y3JpY2tldC10ZWFtLWNlbGVicmF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTRfMTc3MDg3NzUyNTAwMF9uYTFmbl9ZM0pwWTJ0bGRDMTBaV0Z0TFdObGJHVmljbUYwYVc5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fn8LUB9R~8ANOgDkyOh8wmXghNYK9wUGaZAb2yJYvOsUxBmxmXAneS7YZiJqUEq1bkzAceQr87-dBfsjQNm-ZygUQn5r5-4S5QeO26X7F84gDgQnHMlDQpgNKKc2ZpsQRolObPgZYnjVnfPA0w~beN10XXa~29Wagve2yn4eqkwmnOeZp~9-UIlQ4T9Um5Bt2XPb4ciLPTtaP14iuo-GRQBbiQFLtNebiyJDGr32MTufycFdEo3r5AjP6q~686M8AtuqoLDn0LkAoJ4y3xkK0f2mb3-NC0kABe6T0ypRrf8UkOekKhdWW7Nvx6mep6zHy1cDVlbGoEyPM0qLVaE3Gg__",
      caption: "Team celebration after victory",
      category: "Matches",
    },
    {
      url: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-3_1770877524000_na1fn_Y3JpY2tldC1hY3Rpb24tYmF0dGluZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTNfMTc3MDg3NzUyNDAwMF9uYTFmbl9ZM0pwWTJ0bGRDMWhZM1JwYjI0dFltRjBkR2x1WncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GaHDvZMmkykhCmHNmD~TGvxC-dCu6QyWgiXJahwQ-EPqjovHk02v7q9w9Y9-gBX4eJhUFu3Goof1cwUKXims3nVZss75srFJAPztF1zK0S1u4uJCYmTMxQGLlL81gYW7DbZtYOaiOuYVd6~ucWezDrcnSURrssRZLBjUb0KANDjWWU3iEkzsrLGXzXbUkSCAJtVBrkc9m8lcRM6gGhFHuR2NU6UxAAngY0ah~S~IfIQ2jeAF7q6-fmkuhY9sUaAwPnpdPd~YoUKplVRIfJxS~PSvwU7YPJtDjPjgTPJBXEiiI7MoafnujoAVZ~mEBzbLiuhBGmGBm8flba9d~IBp1A__",
      caption: "Powerful batting display",
      category: "Action",
    },
    {
      url: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-5_1770877522000_na1fn_Y3JpY2tldC1maWVsZC1hZXJpYWw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTVfMTc3MDg3NzUyMjAwMF9uYTFmbl9ZM0pwWTJ0bGRDMW1hV1ZzWkMxaFpYSnBZV3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=T~wrwjYyjWotgy4m~Pm13-kdYCrBh2T85p7IQQwEzp-yI-C-5-dHeeqcGJaliJR0SDAcukXMMYhu-vkvxMn4PCcQVei3cFrw25e3sdV5DvXt9pvXlEDQXqIN7afgV904YJ5YNd0QUfJsCOBHnCZIjeM0-k2R-ss1kJYr3nObgljjBnW~76o66fwltEWS8C-CmlW~dfWJHCqZ~rQtVxbMEinkJ0c9TP30ez4igijC~5nDMNrZk8yhZyGA9wWp2oqZrnvnCl6x2Lv8D6fwL29pUIIzY6EznSY41jdUd2ZNedoJKXLAs26YrYcfvCNNPW1JCuIWjkjex8UwylEDk8YaaQ__",
      caption: "Our home ground aerial view",
      category: "Venue",
    },
    {
      url: "https://private-us-east-1.manuscdn.com/sessionFile/klKMM6w8N7qt6X5nMBFEDM/sandbox/Q9c2ieHPWlSgwHcUGYWZj6-img-1_1770877521000_na1fn_aGVyby1jcmlja2V0LXN0YWRpdW0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUva2xLTU02dzhON3F0Nlg1bk1CRkVETS9zYW5kYm94L1E5YzJpZUhQV2xTZ3dIY1VHWVdaajYtaW1nLTFfMTc3MDg3NzUyMTAwMF9uYTFmbl9hR1Z5YnkxamNtbGphMlYwTFhOMFlXUnBkVzAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rujPD1lQLxgEV8XtQjxtFK~ZQnvfeDH9VpHbFxpt1JaKwzzl0MvkOcj8mmM6TDcsv~V7Vu0so65ox1FLaJvaWrS3qAcuhaGAhgd9k-nlj4NPjgw4cBD410cL2Bfdf7eW8WZRCTanhzs8bvr8mIIdXLNqLUMJEnvSdajO0U~a5orF2xV3-6Th16fC56ADYgFNkAdBUOPW57HW8M1bihrZKh1iqcqlOp5rttrTG10obdQKgvDY3j193YSg3vGWM4Qk-cYT24dM52J2OoqFgwesdwFfNSJ-0cAIAQHY5lXaaOQaNR5F~-K2lk7nZGHbeSeeEfU96wEpO74LO9O7xpJeHA__",
      caption: "Stadium at golden hour",
      category: "Venue",
    },
    {
      url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop",
      caption: "Team huddle before match",
      category: "Team",
    },
    {
      url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
      caption: "Training session",
      category: "Training",
    },
  ];

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
            Explore our visual journey through the season.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card key={index} className="group overflow-hidden border-border hover:border-accent transition-all cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-sm text-accent font-heading font-semibold mb-1">
                        {image.category}
                      </p>
                      <p className="text-foreground font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Upload Note */}
          <div className="mt-12 p-8 bg-secondary/50 rounded-xl border border-border text-center">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              More Photos Coming Soon
            </h3>
            <p className="text-muted-foreground">
              We're continuously updating our gallery with photos from recent matches and events. 
              Check back regularly for new additions!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
