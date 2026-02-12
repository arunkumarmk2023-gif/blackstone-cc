CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('info','success','warning','error','match_alert','announcement') NOT NULL DEFAULT 'info',
	`icon` varchar(50),
	`userId` int,
	`isGlobal` int NOT NULL DEFAULT 1,
	`read` int NOT NULL DEFAULT 0,
	`actionUrl` text,
	`actionLabel` varchar(100),
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
