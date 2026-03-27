import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { journalEntries } from '../db/schema';
import { nanoid } from 'nanoid';

const db = drizzle(process.env.DATABASE_URL!);

const mockUserId = 'mock-user-123'; // This would normally come from Clerk

const mockEntries = [
  {
    id: nanoid(),
    userId: mockUserId,
    content: "Today I reflected on the Stoic principle of focusing only what I can control. The morning traffic made me late, but instead of getting angry, I accepted it and used the time to listen to a philosophy podcast. Marcus Aurelius would be proud.",
    philosopher: "Marcus Aurelius",
    philosophicalSchool: "Stoicism",
    keyConcept: "Control and Acceptance",
    personalReflection: "I need to practice this more in my daily life, especially when things don't go according to plan. The stress I feel is often from trying to control the uncontrollable.",
    mood: "Contemplative",
    createdAt: new Date('2026-03-27T08:30:00.000Z'),
    updatedAt: new Date('2026-03-27T08:30:00.000Z'),
  },
  {
    id: nanoid(),
    userId: mockUserId,
    content: "Reading Sartre today made me think about the weight of absolute freedom. Every choice I make defines who I am, and there's no excuse for not taking responsibility. It's both terrifying and liberating.",
    philosopher: "Jean-Paul Sartre",
    philosophicalSchool: "Existentialism",
    keyConcept: "Absolute Freedom",
    personalReflection: "I've been blaming circumstances for my lack of progress, but Sartre reminds me that I am free to choose my response to any situation. Time to take ownership.",
    mood: "Inspired",
    createdAt: new Date('2026-03-27T12:15:00.000Z'),
    updatedAt: new Date('2026-03-27T12:15:00.000Z'),
  },
  {
    id: nanoid(),
    userId: mockUserId,
    content: "Plato's Allegory of the Cave keeps coming to mind. How much of what I perceive as reality is just shadows on the wall? The news I consume, the social media feeds - are they the cave or the way out?",
    philosopher: "Plato",
    philosophicalSchool: "Platonism",
    keyConcept: "Allegory of the Cave",
    personalReflection: "I need to question my sources of truth more. Maybe I should spend less time consuming curated content and more time seeking direct experience and knowledge.",
    mood: "Confused",
    createdAt: new Date('2026-03-27T15:45:00.000Z'),
    updatedAt: new Date('2026-03-27T15:45:00.000Z'),
  },
  {
    id: nanoid(),
    userId: mockUserId,
    content: "Aristotle's concept of the Golden Mean resonates today. I've been oscillating between extreme workaholism and complete laziness. The virtuous path lies in finding the balance - working with purpose but also allowing for proper rest and contemplation.",
    philosopher: "Aristotle",
    philosophicalSchool: "Aristotelianism",
    keyConcept: "Golden Mean",
    personalReflection: "This week I'll schedule both focused work time and dedicated leisure. Neither extreme serves my growth or well-being.",
    mood: "Clarity",
    createdAt: new Date('2026-03-27T18:20:00.000Z'),
    updatedAt: new Date('2026-03-27T18:20:00.000Z'),
  },
  {
    id: nanoid(),
    userId: mockUserId,
    content: "Epicurus would say I'm seeking happiness in the wrong places. The expensive dinner I had last night brought temporary pleasure, but the simple morning walk with a friend brought lasting joy. Ataraxia - freedom from disturbance - comes from simple pleasures and meaningful connections.",
    philosopher: "Epicurus",
    philosophicalSchool: "Epicureanism",
    keyConcept: "Ataraxia",
    personalReflection: "I should focus more on cultivating friendships and simple pleasures rather than chasing external achievements for happiness.",
    mood: "Peaceful",
    createdAt: new Date('2026-03-27T20:00:00.000Z'),
    updatedAt: new Date('2026-03-27T20:00:00.000Z'),
  }
];

async function seedJournal() {
  console.log('Seeding journal entries for March 27, 2026...');
  
  try {
    // Clear existing entries for the mock user on this date
    await db.delete(journalEntries).where(
      eq(journalEntries.userId, mockUserId)
    );
    
    // Insert mock entries
    await db.insert(journalEntries).values(mockEntries);
    
    console.log(`Successfully seeded ${mockEntries.length} journal entries`);
  } catch (error) {
    console.error('Error seeding journal:', error);
  }
}

seedJournal();
