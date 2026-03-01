CREATE TABLE `joiners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`role` varchar(50) NOT NULL,
	`experience` varchar(50) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','reviewed','accepted','rejected','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `joiners_id` PRIMARY KEY(`id`)
);
