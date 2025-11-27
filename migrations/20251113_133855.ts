import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_custom_block_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_custom_block_planning_cards_button_variant" AS ENUM('primary', 'primary-outline', 'default', 'outline');
  CREATE TYPE "public"."card_bg" AS ENUM('default', 'floral');
  CREATE TYPE "public"."enum_pages_blocks_custom_block_contact_links_link_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_custom_block_section" AS ENUM('custom', 'signature', 'planning', 'burial-options', 'burial-options-list', 'stats', 'guidance-and-comfort', 'grief-support', 'resources', 'news', 'contact', 'benefit', 'testimonial', 'planning-process', 'faq');
  CREATE TYPE "public"."enum_pages_blocks_custom_block_planning_layout" AS ENUM('default', 'floral');
  CREATE TYPE "public"."enum_pages_blocks_custom_block_burial_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_pages_blocks_custom_block_benefit_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_planning_cards_button_variant" AS ENUM('primary', 'primary-outline', 'default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_contact_links_link_variant" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_section" AS ENUM('custom', 'signature', 'planning', 'burial-options', 'burial-options-list', 'stats', 'guidance-and-comfort', 'grief-support', 'resources', 'news', 'contact', 'benefit', 'testimonial', 'planning-process', 'faq');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_planning_layout" AS ENUM('default', 'floral');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_burial_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_benefit_layout" AS ENUM('vertical', 'horizontal');
  CREATE TABLE "pages_blocks_custom_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_custom_block_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean
  );
  
  CREATE TABLE "pages_blocks_custom_block_planning_cards_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_planning_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"description" varchar,
  	"link" varchar,
  	"button_label" varchar,
  	"button_variant" "enum_pages_blocks_custom_block_planning_cards_button_variant" DEFAULT 'default',
  	"card_background" "card_bg" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_custom_block_burial_options_burial_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_burial_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"burial_link" varchar,
  	"burial_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_custom_block_burial_options_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"button_label" varchar DEFAULT 'Learn More',
  	"button_link" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_stats_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stats_value" varchar,
  	"stats_label" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_label" varchar,
  	"badge_link" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_support_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"support_title" jsonb,
  	"support_description" varchar,
  	"support_button_text" varchar,
  	"support_link" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_resources_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"resource_title" varchar,
  	"resource_url" varchar,
  	"resource_description" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_contact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_title" varchar,
  	"link_url" varchar,
  	"link_variant" "enum_pages_blocks_custom_block_contact_links_link_variant"
  );
  
  CREATE TABLE "pages_blocks_custom_block_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_planning_process_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"faq_question" varchar,
  	"faq_answer" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_pages_blocks_custom_block_section" DEFAULT 'default',
  	"heading" jsonb,
  	"body" jsonb,
  	"signature_name" varchar,
  	"signature_title" varchar,
  	"signature_image_id" integer,
  	"planning_layout" "enum_pages_blocks_custom_block_planning_layout" DEFAULT 'floral',
  	"planning_title" jsonb,
  	"description" varchar,
  	"section_title" jsonb,
  	"burial_layout" "enum_pages_blocks_custom_block_burial_layout" DEFAULT 'vertical',
  	"burial_description" varchar,
  	"image_id" integer,
  	"stats_title" jsonb,
  	"stats_description" varchar,
  	"grief_title" jsonb,
  	"grief_subtitle" varchar,
  	"badge_text" varchar,
  	"guide_title" jsonb,
  	"guide_description" varchar,
  	"resource_title" jsonb,
  	"contact_title" jsonb,
  	"contact_description" varchar,
  	"benefit_title" jsonb,
  	"benefit_layout" "enum_pages_blocks_custom_block_benefit_layout" DEFAULT 'vertical',
  	"benefit_description" varchar,
  	"testimonial_text" varchar,
  	"testimonial_author" varchar,
  	"testimonial_place" varchar,
  	"planning_process_title" jsonb,
  	"planning_process_description" varchar,
  	"faq_rich_title" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_custom_block_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_planning_cards_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_planning_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"description" varchar,
  	"link" varchar,
  	"button_label" varchar,
  	"button_variant" "enum__pages_v_blocks_custom_block_planning_cards_button_variant" DEFAULT 'default',
  	"card_background" "card_bg" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_burial_options_burial_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_burial_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"burial_link" varchar,
  	"burial_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_burial_options_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"button_label" varchar DEFAULT 'Learn More',
  	"button_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_stats_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stats_value" varchar,
  	"stats_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_label" varchar,
  	"badge_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_support_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"support_title" jsonb,
  	"support_description" varchar,
  	"support_button_text" varchar,
  	"support_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_resources_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"resource_title" varchar,
  	"resource_url" varchar,
  	"resource_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_contact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_title" varchar,
  	"link_url" varchar,
  	"link_variant" "enum__pages_v_blocks_custom_block_contact_links_link_variant",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_planning_process_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"faq_question" varchar,
  	"faq_answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section" "enum__pages_v_blocks_custom_block_section" DEFAULT 'default',
  	"heading" jsonb,
  	"body" jsonb,
  	"signature_name" varchar,
  	"signature_title" varchar,
  	"signature_image_id" integer,
  	"planning_layout" "enum__pages_v_blocks_custom_block_planning_layout" DEFAULT 'floral',
  	"planning_title" jsonb,
  	"description" varchar,
  	"section_title" jsonb,
  	"burial_layout" "enum__pages_v_blocks_custom_block_burial_layout" DEFAULT 'vertical',
  	"burial_description" varchar,
  	"image_id" integer,
  	"stats_title" jsonb,
  	"stats_description" varchar,
  	"grief_title" jsonb,
  	"grief_subtitle" varchar,
  	"badge_text" varchar,
  	"guide_title" jsonb,
  	"guide_description" varchar,
  	"resource_title" jsonb,
  	"contact_title" jsonb,
  	"contact_description" varchar,
  	"benefit_title" jsonb,
  	"benefit_layout" "enum__pages_v_blocks_custom_block_benefit_layout" DEFAULT 'vertical',
  	"benefit_description" varchar,
  	"testimonial_text" varchar,
  	"testimonial_author" varchar,
  	"testimonial_place" varchar,
  	"planning_process_title" jsonb,
  	"planning_process_description" varchar,
  	"faq_rich_title" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_custom_block_columns" ADD CONSTRAINT "pages_blocks_custom_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_planning_cards_badges" ADD CONSTRAINT "pages_blocks_custom_block_planning_cards_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block_planning_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_planning_cards" ADD CONSTRAINT "pages_blocks_custom_block_planning_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_burial_options_burial_badges" ADD CONSTRAINT "pages_blocks_custom_block_burial_options_burial_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block_burial_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_burial_options" ADD CONSTRAINT "pages_blocks_custom_block_burial_options_burial_image_id_media_id_fk" FOREIGN KEY ("burial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_burial_options" ADD CONSTRAINT "pages_blocks_custom_block_burial_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_burial_options_list" ADD CONSTRAINT "pages_blocks_custom_block_burial_options_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_burial_options_list" ADD CONSTRAINT "pages_blocks_custom_block_burial_options_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_stats_column" ADD CONSTRAINT "pages_blocks_custom_block_stats_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_badges" ADD CONSTRAINT "pages_blocks_custom_block_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_support_cards" ADD CONSTRAINT "pages_blocks_custom_block_support_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_resources_links" ADD CONSTRAINT "pages_blocks_custom_block_resources_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_contact_links" ADD CONSTRAINT "pages_blocks_custom_block_contact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_benefits" ADD CONSTRAINT "pages_blocks_custom_block_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_planning_process_cards" ADD CONSTRAINT "pages_blocks_custom_block_planning_process_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block_faqs" ADD CONSTRAINT "pages_blocks_custom_block_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block" ADD CONSTRAINT "pages_blocks_custom_block_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block" ADD CONSTRAINT "pages_blocks_custom_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_block" ADD CONSTRAINT "pages_blocks_custom_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_columns" ADD CONSTRAINT "_pages_v_blocks_custom_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_planning_cards_badges" ADD CONSTRAINT "_pages_v_blocks_custom_block_planning_cards_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block_planning_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_planning_cards" ADD CONSTRAINT "_pages_v_blocks_custom_block_planning_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_burial_options_burial_badges" ADD CONSTRAINT "_pages_v_blocks_custom_block_burial_options_burial_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block_burial_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_burial_options" ADD CONSTRAINT "_pages_v_blocks_custom_block_burial_options_burial_image_id_media_id_fk" FOREIGN KEY ("burial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_burial_options" ADD CONSTRAINT "_pages_v_blocks_custom_block_burial_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_burial_options_list" ADD CONSTRAINT "_pages_v_blocks_custom_block_burial_options_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_burial_options_list" ADD CONSTRAINT "_pages_v_blocks_custom_block_burial_options_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_stats_column" ADD CONSTRAINT "_pages_v_blocks_custom_block_stats_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_badges" ADD CONSTRAINT "_pages_v_blocks_custom_block_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_support_cards" ADD CONSTRAINT "_pages_v_blocks_custom_block_support_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_resources_links" ADD CONSTRAINT "_pages_v_blocks_custom_block_resources_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_contact_links" ADD CONSTRAINT "_pages_v_blocks_custom_block_contact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_benefits" ADD CONSTRAINT "_pages_v_blocks_custom_block_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_planning_process_cards" ADD CONSTRAINT "_pages_v_blocks_custom_block_planning_process_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block_faqs" ADD CONSTRAINT "_pages_v_blocks_custom_block_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_custom_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block" ADD CONSTRAINT "_pages_v_blocks_custom_block_signature_image_id_media_id_fk" FOREIGN KEY ("signature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block" ADD CONSTRAINT "_pages_v_blocks_custom_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_block" ADD CONSTRAINT "_pages_v_blocks_custom_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_custom_block_columns_order_idx" ON "pages_blocks_custom_block_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_columns_parent_id_idx" ON "pages_blocks_custom_block_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_planning_cards_badges_order_idx" ON "pages_blocks_custom_block_planning_cards_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_planning_cards_badges_parent_id_idx" ON "pages_blocks_custom_block_planning_cards_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_planning_cards_order_idx" ON "pages_blocks_custom_block_planning_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_planning_cards_parent_id_idx" ON "pages_blocks_custom_block_planning_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_burial_options_burial_badges_order_idx" ON "pages_blocks_custom_block_burial_options_burial_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_burial_options_burial_badges_parent_id_idx" ON "pages_blocks_custom_block_burial_options_burial_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_burial_options_order_idx" ON "pages_blocks_custom_block_burial_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_burial_options_parent_id_idx" ON "pages_blocks_custom_block_burial_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_burial_options_burial_image_idx" ON "pages_blocks_custom_block_burial_options" USING btree ("burial_image_id");
  CREATE INDEX "pages_blocks_custom_block_burial_options_list_order_idx" ON "pages_blocks_custom_block_burial_options_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_burial_options_list_parent_id_idx" ON "pages_blocks_custom_block_burial_options_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_burial_options_list_image_idx" ON "pages_blocks_custom_block_burial_options_list" USING btree ("image_id");
  CREATE INDEX "pages_blocks_custom_block_stats_column_order_idx" ON "pages_blocks_custom_block_stats_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_stats_column_parent_id_idx" ON "pages_blocks_custom_block_stats_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_badges_order_idx" ON "pages_blocks_custom_block_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_badges_parent_id_idx" ON "pages_blocks_custom_block_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_support_cards_order_idx" ON "pages_blocks_custom_block_support_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_support_cards_parent_id_idx" ON "pages_blocks_custom_block_support_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_resources_links_order_idx" ON "pages_blocks_custom_block_resources_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_resources_links_parent_id_idx" ON "pages_blocks_custom_block_resources_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_contact_links_order_idx" ON "pages_blocks_custom_block_contact_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_contact_links_parent_id_idx" ON "pages_blocks_custom_block_contact_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_benefits_order_idx" ON "pages_blocks_custom_block_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_benefits_parent_id_idx" ON "pages_blocks_custom_block_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_planning_process_cards_order_idx" ON "pages_blocks_custom_block_planning_process_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_planning_process_cards_parent_id_idx" ON "pages_blocks_custom_block_planning_process_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_faqs_order_idx" ON "pages_blocks_custom_block_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_faqs_parent_id_idx" ON "pages_blocks_custom_block_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_order_idx" ON "pages_blocks_custom_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_block_parent_id_idx" ON "pages_blocks_custom_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_block_path_idx" ON "pages_blocks_custom_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_custom_block_signature_image_idx" ON "pages_blocks_custom_block" USING btree ("signature_image_id");
  CREATE INDEX "pages_blocks_custom_block_image_idx" ON "pages_blocks_custom_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_custom_block_columns_order_idx" ON "_pages_v_blocks_custom_block_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_columns_parent_id_idx" ON "_pages_v_blocks_custom_block_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_planning_cards_badges_order_idx" ON "_pages_v_blocks_custom_block_planning_cards_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_planning_cards_badges_parent_id_idx" ON "_pages_v_blocks_custom_block_planning_cards_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_planning_cards_order_idx" ON "_pages_v_blocks_custom_block_planning_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_planning_cards_parent_id_idx" ON "_pages_v_blocks_custom_block_planning_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_burial_badges_order_idx" ON "_pages_v_blocks_custom_block_burial_options_burial_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_burial_badges_parent_id_idx" ON "_pages_v_blocks_custom_block_burial_options_burial_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_order_idx" ON "_pages_v_blocks_custom_block_burial_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_parent_id_idx" ON "_pages_v_blocks_custom_block_burial_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_burial_image_idx" ON "_pages_v_blocks_custom_block_burial_options" USING btree ("burial_image_id");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_list_order_idx" ON "_pages_v_blocks_custom_block_burial_options_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_list_parent_id_idx" ON "_pages_v_blocks_custom_block_burial_options_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_burial_options_list_image_idx" ON "_pages_v_blocks_custom_block_burial_options_list" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_custom_block_stats_column_order_idx" ON "_pages_v_blocks_custom_block_stats_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_stats_column_parent_id_idx" ON "_pages_v_blocks_custom_block_stats_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_badges_order_idx" ON "_pages_v_blocks_custom_block_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_badges_parent_id_idx" ON "_pages_v_blocks_custom_block_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_support_cards_order_idx" ON "_pages_v_blocks_custom_block_support_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_support_cards_parent_id_idx" ON "_pages_v_blocks_custom_block_support_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_resources_links_order_idx" ON "_pages_v_blocks_custom_block_resources_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_resources_links_parent_id_idx" ON "_pages_v_blocks_custom_block_resources_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_contact_links_order_idx" ON "_pages_v_blocks_custom_block_contact_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_contact_links_parent_id_idx" ON "_pages_v_blocks_custom_block_contact_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_benefits_order_idx" ON "_pages_v_blocks_custom_block_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_benefits_parent_id_idx" ON "_pages_v_blocks_custom_block_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_planning_process_cards_order_idx" ON "_pages_v_blocks_custom_block_planning_process_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_planning_process_cards_parent_id_idx" ON "_pages_v_blocks_custom_block_planning_process_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_faqs_order_idx" ON "_pages_v_blocks_custom_block_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_faqs_parent_id_idx" ON "_pages_v_blocks_custom_block_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_order_idx" ON "_pages_v_blocks_custom_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_block_parent_id_idx" ON "_pages_v_blocks_custom_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_block_path_idx" ON "_pages_v_blocks_custom_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_custom_block_signature_image_idx" ON "_pages_v_blocks_custom_block" USING btree ("signature_image_id");
  CREATE INDEX "_pages_v_blocks_custom_block_image_idx" ON "_pages_v_blocks_custom_block" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_custom_block_columns" CASCADE;
  DROP TABLE "pages_blocks_custom_block_planning_cards_badges" CASCADE;
  DROP TABLE "pages_blocks_custom_block_planning_cards" CASCADE;
  DROP TABLE "pages_blocks_custom_block_burial_options_burial_badges" CASCADE;
  DROP TABLE "pages_blocks_custom_block_burial_options" CASCADE;
  DROP TABLE "pages_blocks_custom_block_burial_options_list" CASCADE;
  DROP TABLE "pages_blocks_custom_block_stats_column" CASCADE;
  DROP TABLE "pages_blocks_custom_block_badges" CASCADE;
  DROP TABLE "pages_blocks_custom_block_support_cards" CASCADE;
  DROP TABLE "pages_blocks_custom_block_resources_links" CASCADE;
  DROP TABLE "pages_blocks_custom_block_contact_links" CASCADE;
  DROP TABLE "pages_blocks_custom_block_benefits" CASCADE;
  DROP TABLE "pages_blocks_custom_block_planning_process_cards" CASCADE;
  DROP TABLE "pages_blocks_custom_block_faqs" CASCADE;
  DROP TABLE "pages_blocks_custom_block" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_planning_cards_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_planning_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_burial_options_burial_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_burial_options" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_burial_options_list" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_stats_column" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_support_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_resources_links" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_contact_links" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_planning_process_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_custom_block_columns_size";
  DROP TYPE "public"."enum_pages_blocks_custom_block_planning_cards_button_variant";
  DROP TYPE "public"."card_bg";
  DROP TYPE "public"."enum_pages_blocks_custom_block_contact_links_link_variant";
  DROP TYPE "public"."enum_pages_blocks_custom_block_section";
  DROP TYPE "public"."enum_pages_blocks_custom_block_planning_layout";
  DROP TYPE "public"."enum_pages_blocks_custom_block_burial_layout";
  DROP TYPE "public"."enum_pages_blocks_custom_block_benefit_layout";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_planning_cards_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_contact_links_link_variant";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_section";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_planning_layout";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_burial_layout";
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_benefit_layout";`)
}
