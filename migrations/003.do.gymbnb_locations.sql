CREATE TYPE gym_location AS ENUM (
  'san-francisco',
  'sunnyvale',
  'los-angeles',
  'san-diego'
);

ALTER TABLE gymbnb_gyms
  ADD COLUMN
    location gym_location;
