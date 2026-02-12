import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getFixtures, getFixtureById, createFixture, updateFixture, deleteFixture, getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer, getNews, getNewsById, createNews, updateNews, deleteNews, getNotifications, createNotification, markNotificationAsRead } from "./db";
import { InsertFixture, InsertPlayer, InsertNews, InsertNotification } from "../drizzle/schema";

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
});

export type AppRouter = typeof appRouter;
