-- Mock journal entries for March 27, 2026
-- These entries demonstrate philosophical reflection across different schools of thought

-- Clear existing mock entries (optional)
-- DELETE FROM journal_entries WHERE user_id = 'mock-user-123';

-- Insert Stoic reflection (8:30 AM)
INSERT INTO journal_entries (
  id, 
  user_id, 
  content, 
  philosopher, 
  philosophical_school, 
  key_concept, 
  personal_reflection, 
  mood, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'mock-user-123',
  'Today I reflected on the Stoic principle of focusing only what I can control. The morning traffic made me late, but instead of getting angry, I accepted it and used the time to listen to a philosophy podcast. Marcus Aurelius would be proud.',
  'Marcus Aurelius',
  'Stoicism',
  'Control and Acceptance',
  'I need to practice this more in my daily life, especially when things don''t go according to plan. The stress I feel is often from trying to control the uncontrollable.',
  'Contemplative',
  '2026-03-27 08:30:00 UTC',
  '2026-03-27 08:30:00 UTC'
);

-- Insert Existentialist reflection (12:15 PM)
INSERT INTO journal_entries (
  id, 
  user_id, 
  content, 
  philosopher, 
  philosophical_school, 
  key_concept, 
  personal_reflection, 
  mood, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'mock-user-123',
  'Reading Sartre today made me think about the weight of absolute freedom. Every choice I make defines who I am, and there''s no excuse for not taking responsibility. It''s both terrifying and liberating.',
  'Jean-Paul Sartre',
  'Existentialism',
  'Absolute Freedom',
  'I''ve been blaming circumstances for my lack of progress, but Sartre reminds me that I am free to choose my response to any situation. Time to take ownership.',
  'Inspired',
  '2026-03-27 12:15:00 UTC',
  '2026-03-27 12:15:00 UTC'
);

-- Insert Platonic reflection (3:45 PM)
INSERT INTO journal_entries (
  id, 
  user_id, 
  content, 
  philosopher, 
  philosophical_school, 
  key_concept, 
  personal_reflection, 
  mood, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'mock-user-123',
  'Plato''s Allegory of the Cave keeps coming to mind. How much of what I perceive as reality is just shadows on the wall? The news I consume, the social media feeds - are they the cave or the way out?',
  'Plato',
  'Platonism',
  'Allegory of the Cave',
  'I need to question my sources of truth more. Maybe I should spend less time consuming curated content and more time seeking direct experience and knowledge.',
  'Confused',
  '2026-03-27 15:45:00 UTC',
  '2026-03-27 15:45:00 UTC'
);

-- Insert Aristotelian reflection (6:20 PM)
INSERT INTO journal_entries (
  id, 
  user_id, 
  content, 
  philosopher, 
  philosophical_school, 
  key_concept, 
  personal_reflection, 
  mood, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'mock-user-123',
  'Aristotle''s concept of the Golden Mean resonates today. I''ve been oscillating between extreme workaholism and complete laziness. The virtuous path lies in finding the balance - working with purpose but also allowing for proper rest and contemplation.',
  'Aristotle',
  'Aristotelianism',
  'Golden Mean',
  'This week I''ll schedule both focused work time and dedicated leisure. Neither extreme serves my growth or well-being.',
  'Clarity',
  '2026-03-27 18:20:00 UTC',
  '2026-03-27 18:20:00 UTC'
);

-- Insert Epicurean reflection (8:00 PM)
INSERT INTO journal_entries (
  id, 
  user_id, 
  content, 
  philosopher, 
  philosophical_school, 
  key_concept, 
  personal_reflection, 
  mood, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'mock-user-123',
  'Epicurus would say I''m seeking happiness in the wrong places. The expensive dinner I had last night brought temporary pleasure, but the simple morning walk with a friend brought lasting joy. Ataraxia - freedom from disturbance - comes from simple pleasures and meaningful connections.',
  'Epicurus',
  'Epicureanism',
  'Ataraxia',
  'I should focus more on cultivating friendships and simple pleasures rather than chasing external achievements for happiness.',
  'Peaceful',
  '2026-03-27 20:00:00 UTC',
  '2026-03-27 20:00:00 UTC'
);

-- Verify the entries were created
SELECT 
  id,
  philosopher,
  philosophical_school,
  key_concept,
  mood,
  to_char(created_at, 'HH12:MI AM') as time
FROM journal_entries 
WHERE user_id = 'mock-user-123' 
  AND DATE(created_at) = '2026-03-27'
ORDER BY created_at;
