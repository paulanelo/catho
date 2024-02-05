create schema catho;

CREATE TABLE candidates (id SERIAL PRIMARY KEY, _name VARCHAR );

create table catho.skills
(
  id         SERIAL PRIMARY KEY,
  name       text,
  CONSTRAINT fk_candidate FOREIGN KEY(candidate_id) REFERENCES candidate(id)
);

