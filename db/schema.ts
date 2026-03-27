import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const journalEntries = pgTable('journal_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  
  // Philosophical fields
  philosopher: text('philosopher'), // Name of philosopher referenced
  philosophicalSchool: text('philosophical_school'), // School of thought (Stoicism, Existentialism, etc.)
  keyConcept: text('key_concept'), // Main philosophical concept
  personalReflection: text('personal_reflection'), // How it applies to personal life
  mood: text('mood'), // Emotional state when writing
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
