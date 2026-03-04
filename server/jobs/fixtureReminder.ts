import { getFixtures } from "../db";
import { sendEmail, generateFixtureReminderEmail } from "../email";

/**
 * Check for upcoming fixtures and send reminder emails to players
 * This job should run every hour to check for fixtures within 24 hours
 */
export async function sendFixtureReminders() {
  try {
    console.log("[FixtureReminder] Starting fixture reminder check...");

    const fixtures = await getFixtures();
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowPlus1Hour = new Date(tomorrow.getTime() + 60 * 60 * 1000);

    // Find fixtures scheduled for tomorrow (within 24-25 hours from now)
    const upcomingFixtures = fixtures.filter((fixture) => {
      const fixtureTime = new Date(fixture.date);
      return (
        fixture.status === "upcoming" &&
        fixtureTime >= tomorrow &&
        fixtureTime <= tomorrowPlus1Hour
      );
    });

    console.log(
      `[FixtureReminder] Found ${upcomingFixtures.length} fixtures scheduled for tomorrow`
    );

    for (const fixture of upcomingFixtures) {
      // Get all players with email addresses
      const { getPlayers } = await import("../db");
      const players = await getPlayers();
      const playersWithEmail = players.filter((p) => p.email);

      console.log(
        `[FixtureReminder] Sending reminders for ${fixture.opponent} to ${playersWithEmail.length} players`
      );

      for (const player of playersWithEmail) {
        try {
          const emailHtml = generateFixtureReminderEmail(
            player.name,
            fixture.opponent,
            new Date(fixture.date),
            fixture.venue,
            fixture.format
          );

          const success = await sendEmail({
            to: player.email!,
            subject: `Match Reminder: Blackstone CC vs ${fixture.opponent} Tomorrow`,
            html: emailHtml,
          });

          if (success) {
            console.log(
              `[FixtureReminder] Email sent to ${player.name} (${player.email})`
            );
          } else {
            console.error(
              `[FixtureReminder] Failed to send email to ${player.name} (${player.email})`
            );
          }
        } catch (error) {
          console.error(
            `[FixtureReminder] Error sending email to ${player.name}:`,
            error
          );
        }
      }
    }

    console.log("[FixtureReminder] Fixture reminder check completed");
  } catch (error) {
    console.error("[FixtureReminder] Error in fixture reminder job:", error);
  }
}
