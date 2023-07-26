CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`status` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timelines` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`data` TEXT NOT NULL,
	`type` AS (json_extract(`data`, '$.type')) STORED NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `c_pi` ON `customers` (`org_id`,`status`,`created_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `c_u_email_org_id` ON `customers` (`email`,`org_id`);--> statement-breakpoint
CREATE INDEX `t_pi` ON `timelines` (`customer_id`,`type`,`created_at`);