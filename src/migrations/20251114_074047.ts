import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_custom_block_section" ADD VALUE 'default' BEFORE 'custom';
  ALTER TYPE "public"."enum__pages_v_blocks_custom_block_section" ADD VALUE 'default' BEFORE 'custom';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_custom_block" ALTER COLUMN "section" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_custom_block" ALTER COLUMN "section" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_custom_block_section";
  CREATE TYPE "public"."enum_pages_blocks_custom_block_section" AS ENUM('custom', 'signature', 'planning', 'burial-options', 'burial-options-list', 'stats', 'guidance-and-comfort', 'grief-support', 'resources', 'news', 'contact', 'benefit', 'testimonial', 'planning-process', 'faq');
  ALTER TABLE "pages_blocks_custom_block" ALTER COLUMN "section" SET DEFAULT 'default'::"public"."enum_pages_blocks_custom_block_section";
  ALTER TABLE "pages_blocks_custom_block" ALTER COLUMN "section" SET DATA TYPE "public"."enum_pages_blocks_custom_block_section" USING "section"::"public"."enum_pages_blocks_custom_block_section";
  ALTER TABLE "_pages_v_blocks_custom_block" ALTER COLUMN "section" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_custom_block" ALTER COLUMN "section" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_custom_block_section";
  CREATE TYPE "public"."enum__pages_v_blocks_custom_block_section" AS ENUM('custom', 'signature', 'planning', 'burial-options', 'burial-options-list', 'stats', 'guidance-and-comfort', 'grief-support', 'resources', 'news', 'contact', 'benefit', 'testimonial', 'planning-process', 'faq');
  ALTER TABLE "_pages_v_blocks_custom_block" ALTER COLUMN "section" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_custom_block_section";
  ALTER TABLE "_pages_v_blocks_custom_block" ALTER COLUMN "section" SET DATA TYPE "public"."enum__pages_v_blocks_custom_block_section" USING "section"::"public"."enum__pages_v_blocks_custom_block_section";`)
}
