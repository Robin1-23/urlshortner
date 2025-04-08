/*
  # URL Shortener Schema

  1. New Tables
    - `links`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `original_url` (text)
      - `short_code` (text, unique)
      - `created_at` (timestamp)
    - `analytics`
      - `id` (uuid, primary key)
      - `link_id` (uuid, references links)
      - `browser` (text)
      - `os` (text)
      - `device` (text)
      - `country` (text)
      - `city` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  original_url text NOT NULL,
  short_code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  click_count bigint DEFAULT 0
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES links NOT NULL,
  browser text,
  os text,
  device text,
  country text,
  city text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policies for links
CREATE POLICY "Users can create their own links"
  ON links FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own links"
  ON links FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for analytics
CREATE POLICY "Users can view analytics for their links"
  ON analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = analytics.link_id
      AND links.user_id = auth.uid()
    )
  );

ALTER TABLE links ADD COLUMN expires_at timestamptz;


CREATE POLICY "Allow insert analytics for all links"
  ON analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);




-- Create links table
-- CREATE TABLE IF NOT EXISTS links (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id uuid REFERENCES auth.users NOT NULL,
--   original_url text NOT NULL,
--   short_code text UNIQUE NOT NULL,
--   created_at timestamptz DEFAULT now(),
--   click_count bigint DEFAULT 0,
--   expires_at timestamptz -- ✅ added this line to fix the error
-- );

-- -- Create analytics table
-- CREATE TABLE IF NOT EXISTS analytics (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   link_id uuid REFERENCES links NOT NULL,
--   browser text,
--   os text,
--   device text,
--   country text,
--   city text,
--   created_at timestamptz DEFAULT now()
-- );

-- -- Enable Row-Level Security (RLS)
-- ALTER TABLE links ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- -- Policies for links
-- CREATE POLICY "Users can create their own links"
--   ON links FOR INSERT
--   TO authenticated
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can view their own links"
--   ON links FOR SELECT
--   TO authenticated
--   USING (auth.uid() = user_id);

-- -- Policies for analytics
-- CREATE POLICY "Users can view analytics for their links"
--   ON analytics FOR SELECT
--   TO authenticated
--   USING (
--     EXISTS (
--       SELECT 1 FROM links
--       WHERE links.id = analytics.link_id
--       AND links.user_id = auth.uid()
--     )
--   );

-- CREATE POLICY "Allow insert analytics for all links"
--   ON analytics FOR INSERT
--   TO authenticated
--   WITH CHECK (true);
