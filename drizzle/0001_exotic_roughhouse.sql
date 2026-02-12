CREATE TABLE `fixtures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`opponent` varchar(255) NOT NULL,
	`venue` varchar(255) NOT NULL,
	`date` timestamp NOT NULL,
	`format` varchar(50) NOT NULL DEFAULT 'Hard Tennis Ball',
	`status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`ourScore` varchar(50),
	`ourWickets` varchar(10),
	`theirScore` varchar(50),
	`theirWickets` varchar(10),
	`result` varchar(100),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fixtures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` enum('Match Report','Announcement','Selection','Event','Other') NOT NULL DEFAULT 'Other',
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`imageUrl` text,
	`author` varchar(255),
	`published` int NOT NULL DEFAULT 0,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` enum('Batsman','Bowler','All-Rounder','Wicketkeeper') NOT NULL,
	`battingStyle` varchar(50),
	`bowlingStyle` varchar(50),
	`jerseyNumber` int,
	`photoUrl` text,
	`bio` text,
	`isCaptain` int NOT NULL DEFAULT 0,
	`isImpactPlayer` int NOT NULL DEFAULT 0,
	`runsScored` int NOT NULL DEFAULT 0,
	`wicketsTaken` int NOT NULL DEFAULT 0,
	`matchesPlayed` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `players_id` PRIMARY KEY(`id`)
);
