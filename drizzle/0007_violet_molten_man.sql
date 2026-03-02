CREATE TABLE `results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL,
	`venue` varchar(255) NOT NULL,
	`league` varchar(255) NOT NULL,
	`opponentName` varchar(255) NOT NULL,
	`score` varchar(255) NOT NULL,
	`result` enum('win','loss','tie','no_result') NOT NULL,
	`scorecardUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `results_id` PRIMARY KEY(`id`)
);
