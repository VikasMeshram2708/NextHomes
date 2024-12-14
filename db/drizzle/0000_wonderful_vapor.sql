CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
