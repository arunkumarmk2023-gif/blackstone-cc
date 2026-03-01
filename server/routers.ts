import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getFixtures, getFixtureById, createFixture, updateFixture, deleteFixture, getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer, getNews, getNewsById, createNews, updateNews, deleteNews, getNotifications, createNotification, markNotificationAsRead, subscribeNewsletter, getNewsletterSubscribers, getSubscriberByEmail, unsubscribeNewsletter, deleteNewsletterSubscriber, createContactSubmission, getContactSubmissions, getContactSubmissionById, updateContactSubmissionStatus, deleteContactSubmission, createGalleryImage, getGalleryImages, getGalleryImageById, getGalleryImagesByCategory, updateGalleryImage, deleteGalleryImage, getFeaturedGalleryImages, createJoiner, getJoiners, getJoinerById, getJoinersByStatus, updateJoinerStatus, deleteJoiner } from "./db";
import { InsertFixture, InsertPlayer, InsertNews, InsertNotification, InsertNewsletterSubscriber, InsertContactSubmission, InsertGallery, InsertJoiner } from "../drizzle/schema";
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
      return updateFixture(input.id, input.data as Partial<InsertFixture>);
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
      role: z.string(),
      battingStyle: z.string().optional(),
      bowlingStyle: z.string().optional(),
      jerseyNumber: z.number().optional(),
      bio: z.string().optional(),
      photoUrl: z.string().optional(),
      joinedYear: z.number().optional(),
      matches: z.number().optional(),
      runs: z.number().optional(),
      wickets: z.number().optional(),
      stats: z.string().optional(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can create players");
      return createPlayer(input as InsertPlayer);
    }),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        name: z.string().optional(),
        role: z.string().optional(),
        battingStyle: z.string().optional(),
        bowlingStyle: z.string().optional(),
        jerseyNumber: z.number().optional(),
        bio: z.string().optional(),
        photoUrl: z.string().optional(),
        joinedYear: z.number().optional(),
        matches: z.number().optional(),
        runs: z.number().optional(),
        wickets: z.number().optional(),
        stats: z.string().optional(),
      }),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update players");
      return updatePlayer(input.id, input.data as Partial<InsertPlayer>);
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
      content: z.string(),
      author: z.string().optional(),
      featured: z.boolean().optional(),
      imageUrl: z.string().optional(),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can create news");
      return createNews(input as InsertNews);
    }),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        featured: z.boolean().optional(),
        imageUrl: z.string().optional(),
      }),
    })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update news");
      return updateNews(input.id, input.data as Partial<InsertNews>);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete news");
      return deleteNews(input.id);
    }),
  }),

  notifications: router({
    list: protectedProcedure.query(({ ctx }) => getNotifications(ctx.user?.id || 0)),
    create: protectedProcedure.input(z.object({
      title: z.string(),
      message: z.string(),
      type: z.enum(["info", "success", "warning", "error"]).optional(),
    })).mutation(({ input, ctx }) => {
      return createNotification({
        userId: ctx.user?.id || 0,
        title: input.title,
        message: input.message,
        type: input.type || "info",
        read: 0,
      } as InsertNotification);
    }),
    markAsRead: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => {
      return markNotificationAsRead(input.id);
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure.input(z.object({ email: z.string().email() })).mutation(({ input }) => {
      return subscribeNewsletter(input.email);
    }),
    unsubscribe: publicProcedure.input(z.object({ email: z.string().email() })).mutation(({ input }) => {
      return unsubscribeNewsletter(input.email);
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view subscribers");
      return await getNewsletterSubscribers();
    }),
  }),

  contact: router({
    submit: publicProcedure.input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(10),
    })).mutation(async ({ input }) => {
      try {
        const submission: InsertContactSubmission = {
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          subject: input.subject || null,
          message: input.message,
          status: "new",
        };
        await createContactSubmission(submission);
        const confirmationHtml = generateContactConfirmationEmail({ name: input.name, email: input.email, subject: input.subject || 'General Inquiry', message: input.message });
        const confirmationText = generateContactConfirmationEmailText({ name: input.name, email: input.email, subject: input.subject || 'General Inquiry', message: input.message });
        await sendEmail({
          to: input.email,
          subject: "We received your message - Blackstone CC",
          html: confirmationHtml,
          text: confirmationText,
        });
        return { success: true, message: "Thank you for contacting us!" };
      } catch (error) {
        console.error("Contact submission error:", error);
        throw new Error("Failed to submit contact form");
      }
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view contact submissions");
      return await getContactSubmissions();
    }),
    getById: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view contact details");
      return await getContactSubmissionById(input.id);
    }),
    updateStatus: protectedProcedure.input(z.object({ id: z.number(), status: z.enum(["new", "read", "responded", "archived"]) })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update contact status");
      return await updateContactSubmissionStatus(input.id, input.status);
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
      title: z.string().min(1),
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

  joiners: router({
    submit: publicProcedure.input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      role: z.enum(["batsman", "bowler", "allrounder", "wicketkeeper", "supporter"]),
      experience: z.enum(["beginner", "intermediate", "advanced", "professional"]),
      message: z.string().min(10),
    })).mutation(async ({ input }) => {
      try {
        const joiner: InsertJoiner = {
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          role: input.role,
          experience: input.experience,
          message: input.message,
          status: "new",
        };
        await createJoiner(joiner);
        return { success: true, message: "Thank you! We will contact you soon about trials and training." };
      } catch (error) {
        console.error("Joiner submission error:", error);
        throw new Error("Failed to submit joiner application");
      }
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view joiner applications");
      return await getJoiners();
    }),
    getById: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can view joiner details");
      return await getJoinerById(input.id);
    }),
    updateStatus: protectedProcedure.input(z.object({ id: z.number(), status: z.enum(["new", "reviewed", "accepted", "rejected", "archived"]) })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can update joiner status");
      return await updateJoinerStatus(input.id, input.status);
    }),
    delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Only admins can delete joiner records");
      return await deleteJoiner(input.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
