CREATE table gym_images (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  img_urls TEXT[] NOT NULL,
  gym_id INTEGER NOT NULL
    REFERENCES gymbnb_gyms(id) ON DELETE CASCADE 
);



