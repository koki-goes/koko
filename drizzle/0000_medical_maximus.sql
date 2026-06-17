CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`body` text NOT NULL,
	`status` text,
	`due_at` integer,
	`remind_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `entry_tags` (
	`entry_id` text NOT NULL,
	`tag` text NOT NULL,
	FOREIGN KEY (`entry_id`) REFERENCES `entries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entry_tags_entry_id_tag_unique` ON `entry_tags` (`entry_id`,`tag`);