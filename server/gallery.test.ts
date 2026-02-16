import { describe, it, expect } from "vitest";
import { createGalleryImage, getGalleryImages, getGalleryImageById, deleteGalleryImage, getFeaturedGalleryImages } from "./db";
import { InsertGallery } from "../drizzle/schema";

describe("Gallery File Storage", () => {
  let createdImageId: number;

  const testImage: InsertGallery = {
    title: "Match Day Victory",
    description: "Team celebrating after winning match",
    imageUrl: "https://example.com/images/match-victory.jpg",
    fileKey: "gallery/1708000000000-match-victory.jpg",
    fileSize: 2048576,
    mimeType: "image/jpeg",
    category: "Match",
    uploadedBy: 1,
    featured: 1,
    displayOrder: 1,
  };

  it("should create a gallery image record", async () => {
    const result = await createGalleryImage(testImage);
    expect(result).toBeDefined();
    const images = await getGalleryImages();
    const created = images.find((img) => img.fileKey === testImage.fileKey);
    expect(created).toBeDefined();
    expect(created?.title).toBe(testImage.title);
    expect(created?.imageUrl).toBe(testImage.imageUrl);
    if (created) {
      createdImageId = created.id;
    }
  });

  it("should retrieve all gallery images", async () => {
    const images = await getGalleryImages();
    expect(Array.isArray(images)).toBe(true);
    expect(images.length).toBeGreaterThan(0);
  });

  it("should retrieve gallery image by ID", async () => {
    if (!createdImageId) {
      throw new Error("No image ID available for testing");
    }
    const image = await getGalleryImageById(createdImageId);
    expect(image).toBeDefined();
    expect(image?.id).toBe(createdImageId);
    expect(image?.title).toBe(testImage.title);
  });

  it("should retrieve featured gallery images", async () => {
    const featured = await getFeaturedGalleryImages(5);
    expect(Array.isArray(featured)).toBe(true);
    expect(featured.every((img: any) => img.featured === 1)).toBe(true);
  });

  it("should store file metadata correctly", async () => {
    if (!createdImageId) {
      throw new Error("No image ID available for testing");
    }
    const image = await getGalleryImageById(createdImageId);
    expect(image?.fileSize).toBe(testImage.fileSize);
    expect(image?.mimeType).toBe("image/jpeg");
    expect(image?.fileKey).toContain("gallery/");
  });

  it("should handle different image categories", async () => {
    const categories = ["Match", "Training", "Event", "Team Photo", "Other"];
    for (const category of categories) {
      const image: InsertGallery = {
        title: `Test ${category}`,
        description: `Test image for ${category}`,
        imageUrl: `https://example.com/images/${category.toLowerCase()}.jpg`,
        fileKey: `gallery/${Date.now()}-${category}.jpg`,
        fileSize: 1024,
        mimeType: "image/jpeg",
        category: category as any,
        uploadedBy: 1,
        featured: 0,
        displayOrder: 0,
      };
      await createGalleryImage(image);
    }
    const images = await getGalleryImages();
    expect(images.length).toBeGreaterThanOrEqual(5);
  });

  it("should delete gallery image", async () => {
    if (!createdImageId) {
      throw new Error("No image ID available for testing");
    }
    await deleteGalleryImage(createdImageId);
    const deleted = await getGalleryImageById(createdImageId);
    expect(deleted).toBeUndefined();
  });

  it("should preserve image URLs and file keys", async () => {
    const image: InsertGallery = {
      title: "URL Preservation Test",
      description: "Testing URL and file key preservation",
      imageUrl: "https://cdn.example.com/storage/gallery/test-image-2024.jpg?v=1&token=abc123",
      fileKey: "gallery/1708000000000-test-image-2024.jpg",
      fileSize: 3145728,
      mimeType: "image/jpeg",
      category: "Other",
      uploadedBy: 1,
      featured: 0,
      displayOrder: 0,
    };
    await createGalleryImage(image);
    const images = await getGalleryImages();
    const created = images.find((img) => img.fileKey === image.fileKey);
    expect(created?.imageUrl).toBe(image.imageUrl);
    expect(created?.fileKey).toBe(image.fileKey);
  });

  it("should handle display order for gallery sorting", async () => {
    const images: InsertGallery[] = [
      {
        title: "First Image",
        description: "First",
        imageUrl: "https://example.com/1.jpg",
        fileKey: "gallery/1-first.jpg",
        fileSize: 1024,
        mimeType: "image/jpeg",
        category: "Other",
        uploadedBy: 1,
        featured: 0,
        displayOrder: 3,
      },
      {
        title: "Second Image",
        description: "Second",
        imageUrl: "https://example.com/2.jpg",
        fileKey: "gallery/2-second.jpg",
        fileSize: 1024,
        mimeType: "image/jpeg",
        category: "Other",
        uploadedBy: 1,
        featured: 0,
        displayOrder: 1,
      },
    ];
    for (const img of images) {
      await createGalleryImage(img);
    }
    const sorted = await getGalleryImages();
    expect(sorted.length).toBeGreaterThanOrEqual(2);
  });
});
