-- Database: catho
DROP DATABASE IF EXISTS catho;

CREATE DATABASE catho;
\c catho;
DROP TABLE IF EXISTS public.candidates;

CREATE TABLE IF NOT EXISTS public.candidates (
  id serial PRIMARY KEY,
  name text NOT NULL
);

DROP TABLE IF EXISTS public.skills;

CREATE TABLE IF NOT EXISTS public.skills (
  id serial PRIMARY KEY,
  name text NOT NULL
);

DROP TABLE IF EXISTS public.candidate_skill;

CREATE TABLE IF NOT EXISTS public.candidate_skill (
  id serial PRIMARY KEY,
  fk_candidate integer NOT NULL,
  fk_skill integer NOT NULL,
  CONSTRAINT candidate_id FOREIGN KEY (fk_candidate)
    REFERENCES public.candidates (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  CONSTRAINT skill_id FOREIGN KEY (fk_skill)
    REFERENCES public.skills (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);