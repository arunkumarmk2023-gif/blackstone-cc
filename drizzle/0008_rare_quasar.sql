ALTER TABLE `players` MODIFY COLUMN `role` text NOT NULL;--> statement-breakpoint
ALTER TABLE `players` DROP COLUMN `isCaptain`;--> statement-breakpoint
ALTER TABLE `players` DROP COLUMN `isImpactPlayer`;