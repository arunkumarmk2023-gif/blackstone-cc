import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getFixtures, getFixtureById, createFixture, updateFixture, deleteFixture, getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer, getNews, getNewsById, createNews, updateNews, deleteNews, getNotifications, createNotification, markNotificationAsRead, subscribeNewsletter, getNewsletterSubscribers, getSubscriberByEmail, unsubscribeNewsletter, deleteNewsletterSubscriber, createContactSubmission, getContactSubmissions, getContactSubmissionById, updateContactSubmissionStatus, deleteContactSubmission, createGalleryImage, getGalleryImages, getGalleryImageById, getGalleryImagesByCategory, updateGalleryImage, deleteGalleryImage, getFeaturedGalleryImages } from "./db";
import { InsertFixture, InsertPlayer, InsertNews, InsertNotification, InsertNewsletterSubscriber, InsertContactSubmission, InsertGallery } from "../drizzle/schema";
import { sendEmail, generateContactConfirmationEmail, generateContactConfirmationEmailText } from "./email";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  fixtures: router({
    list: publicProcedure.query(() => getFixtures()),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => getFixtureById(input.id)),
    create: protectedProcedure.input(z.object({
      opponent: z.string(),
      venue: z.string(),
      date: z.date(),
      format: z.string().optional(),
      status: z.enum(["upcoming", "live", "completed", "cancelled"]).optional(),
      ourScore: z.string().optional(),
      ourWickets: z.string().optional(),
      theirScore: z.string().optional(),
      theirWickets: z.string().optional(),
      result: z.string().optional(),
      notes: z.string().optional(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can create fixtures");
      return createFixture(input as InsertFixture);
    }),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        opponent: z.string().optional(),
        venue: z.string().optional(),
        date: z.date().optional(),
        format: z.string().optional(),
        status: z.enum(["upcoming", "live", "completed", "cancelled"]).optional(),
        ourScore: z.string().optional(),
        ourWickets: z.string().optional(),
        theirScore: z.string().optional(),
        theirWickets: z.string().optional(),
        result: z.string().optional(),
        notes: z.string().optional(),
      }),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update fixtures");
      return updateFixture(input.id, input.data);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete fixtures");
      return deleteFixture(input.id);
    }),
  }),

  players: router({
    list: publicProcedure.query(() => getPlayers()),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => getPlayerById(input.id)),
    create: protectedProcedure.input(z.object({
      name: z.string(),
      role: z.enum(["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"]),
      battingStyle: z.string().optional(),
      bowlingStyle: z.string().optional(),
      jerseyNumber: z.number().optional(),
      photoUrl: z.string().optional(),
      bio: z.string().optional(),
      isCaptain: z.number().optional(),
      isImpactPlayer: z.number().optional(),
      runsScored: z.number().optional(),
      wicketsTaken: z.number().optional(),
      matchesPlayed: z.number().optional(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can create players");
      return createPlayer(input as InsertPlayer);
    }),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        name: z.string().optional(),
        role: z.enum(["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"]).optional(),
        battingStyle: z.string().optional(),
        bowlingStyle: z.string().optional(),
        jerseyNumber: z.number().optional(),
        photoUrl: z.string().optional(),
        bio: z.string().optional(),
        isCaptain: z.number().optional(),
        isImpactPlayer: z.number().optional(),
        runsScored: z.number().optional(),
        wicketsTaken: z.number().optional(),
        matchesPlayed: z.number().optional(),
      }),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update players");
      return updatePlayer(input.id, input.data);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete players");
      return deletePlayer(input.id);
    }),
  }),

  news: router({
    list: publicProcedure.query(() => getNews()),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => getNewsById(input.id)),
    create: protectedProcedure.input(z.object({
      title: z.string(),
      category: z.enum(["Match Report", "Announcement", "Selection", "Event", "Other"]).optional(),
      summary: z.string(),
      content: z.string(),
      imageUrl: z.string().optional(),
      author: z.string().optional(),
      published: z.number().optional(),
      publishedAt: z.date().optional(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can create news");
      return createNews(input as InsertNews);
    }),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        title: z.string().optional(),
        category: z.enum(["Match Report", "Announcement", "Selection", "Event", "Other"]).optional(),
        summary: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        author: z.string().optional(),
        published: z.number().optional(),
        publishedAt: z.date().optional(),
      }),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update news");
      return updateNews(input.id, input.data);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete news");
      return deleteNews(input.id);
    }),
  }),

  notifications: router({
    list: publicProcedure.query(() => getNotifications()),
    create: protectedProcedure.input(z.object({
      title: z.string(),
      message: z.string(),
      type: z.enum(["info", "success", "warning", "error", "match_alert", "announcement"]).optional(),
      icon: z.string().optional(),
      isGlobal: z.number().optional(),
      actionUrl: z.string().optional(),
      actionLabel: z.string().optional(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can create notifications");
      return createNotification(input as InsertNotification);
    }),
    markAsRead: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => {
      return markNotificationAsRead(input.id);
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure.input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
    })).mutation(async ({ input }) => {
      const existing = await getSubscriberByEmail(input.email);
      if (existing && existing.subscribed) {
        throw new Error("Email already subscribed");
      }
      return await subscribeNewsletter({
        email: input.email,
        name: input.name,
        subscribed: 1,
        verified: 1,
      } as InsertNewsletterSubscriber);
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view subscribers");
      return await getNewsletterSubscribers();
    }),
    unsubscribe: publicProcedure.input(z.object({
      email: z.string().email(),
    })).mutation(({ input }) => {
      return unsubscribeNewsletter(input.email);
    }),
    delete: protectedProcedure.input(z.object({
      id: z.number(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete subscribers");
      return deleteNewsletterSubscriber(input.id);
    }),
  }),

  contact: router({
    submit: publicProcedure.input(z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Valid email is required"),
      phone: z.string().optional(),
      subject: z.string().min(1, "Subject is required"),
      message: z.string().min(1, "Message is required"),
    })).mutation(async ({ input }) => {
      try {
        // Save to database
        const submission: InsertContactSubmission = {
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          subject: input.subject,
          message: input.message,
          status: "new",
        };
        await createContactSubmission(submission);

        // Send confirmation email
        const htmlContent = generateContactConfirmationEmail(input);
        const textContent = generateContactConfirmationEmailText(input);
        
        const emailSent = await sendEmail({
          to: input.email,
          subject: "We received your message - Blackstone Cricket Club",
          html: htmlContent,
          text: textContent,
        });

        if (!emailSent) {
          console.warn("Confirmation email failed to send, but contact form was submitted and saved");
        }

        return {
          success: true,
          message: "Your message has been received and saved. Check your email for confirmation.",
          emailSent,
        };
      } catch (error) {
        console.error("Error processing contact form:", error);
        throw new Error("Failed to process your message. Please try again.");
      }
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view contact submissions");
      return await getContactSubmissions();
    }),
    getById: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view contact submissions");
      return await getContactSubmissionById(input.id);
    }),
    updateStatus: protectedProcedure.input(z.object({
      id: z.number(),
      status: z.enum(["new", "read", "responded", "archived"]),
      notes: z.string().optional(),
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update contact submissions");
      return await updateContactSubmissionStatus(input.id, input.status, input.notes, ctx.user.id);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete contact submissions");
      return await deleteContactSubmission(input.id);
    }),
  }),
  gallery: router({
    list: publicProcedure.query(async () => {
      return await getGalleryImages();
    }),
    featured: publicProcedure.input(z.object({ limit: z.number().optional() })).query(async ({ input }) => {
      return await getFeaturedGalleryImages(input.limit || 6);
    }),
    upload: protectedProcedure.input(z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().optional(),
      category: z.enum(["Match", "Training", "Event", "Team Photo", "Other"]),
      featured: z.boolean().optional(),
      fileData: z.string(),
      fileName: z.string(),
      mimeType: z.string(),
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can upload gallery images");
      try {
        const buffer = Buffer.from(input.fileData, "base64");
        const fileKey = `gallery/${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        const galleryImage: InsertGallery = {
          title: input.title,
          description: input.description || null,
          imageUrl: url,
          fileKey,
          fileSize: buffer.length,
          mimeType: input.mimeType,
          category: input.category as any,
          uploadedBy: ctx.user.id,
          featured: input.featured ? 1 : 0,
          displayOrder: 0,
        };
        await createGalleryImage(galleryImage);
        return { success: true, url, message: "Image uploaded successfully" };
      } catch (error) {
        console.error("Gallery upload error:", error);
        throw new Error("Failed to upload image");
      }
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete gallery images");
      return await deleteGalleryImage(input.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
