BEGIN;

TRUNCATE
  gymbnb_users,
  gymbnb_gyms, 
  gym_images
  RESTART IDENTITY CASCADE;
  

INSERT INTO gymbnb_users (id, first_name, last_name, email, password)
VALUES
  (1, 'Marco', 'Friaz', 'marfriaz@gmail.com', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  (2, 'Dwayne', 'Johnson', 'user@gmail.com', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  (3, 'Chris', 'Rock', 'user2@gmail.com', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne');


INSERT INTO gymbnb_gyms (title, description, price, max_guest, location, user_id)
VALUES
 ('Truly unique gym experience!', 'Gym includes: A beautful view, eliptical, treadmill and a BodyCraft HFT Functional Trainer', 
  15, 5, 'los-angeles', 1),
  ('Well organized gym with tons of equipment!', 'Gym includes: A squat rack, bench press, barbell, dumbbells weghts 10 lbs- 100 lbs and yoga mats.', 
  15, 5, 'sunnyvale', 1),
  ('Getaway gym in San Fran', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 2, 'san-francisco', 3),
        ('Amazing attic gym in SF SoMa area', 'Gym includes: A punching bag, bench press, barbell, dumbbells weghts 10 lbs- 100 lbs and yoga mats.', 
  15, 2, 'san-francisco', 2),
    ('My at home gym in LA, come get swole', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 2, 'los-angeles', 2),
    ('SD gym for you surfer bros & gals', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 3, 'san-diego', 3),
 ('Truly unique gym experience!', 'Gym includes: A beautful view, eliptical, treadmill and a BodyCraft HFT Functional Trainer', 
  30, 5, 'san-diego', 2),
   ('Well organized gym with tons of equipment!', 'Gym includes: A squat rack, bench press, barbell, dumbbells weghts 10 lbs- 100 lbs and yoga mats.', 
  15, 5, 'san-francisco', 1),
      ('Getaway gym in San Fran', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 2, 'los-angeles', 3),
        ('Amazing attic gym in SF SoMa area', 'Gym includes: A punching bag, bench press, barbell, dumbbells weghts 10 lbs- 100 lbs and yoga mats.', 
  15, 2, 'sunnyvale', 2),
    ('My at home gym in LA, come get swole', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 2, 'san-francisco', 2),
    ('SD gym for you surfer bros & gals', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 3, 'los-angeles', 3);


INSERT INTO gym_images (gym_id, img_urls)
VALUES
  (1, '{https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg, https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg}'),
  (2, '{https://live.staticflickr.com/65535/50328970222_1e754e98af_c.jpg, https://live.staticflickr.com/65535/50328970567_4785677e0b_b.jpg, https://live.staticflickr.com/65535/50328791471_e57dc53395_h.jpg}'),
  (3, '{https://i.pinimg.com/originals/6f/c3/e8/6fc3e8a189fa706150a9fc3780ac29ea.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg}'),
  (4, '{https://i.pinimg.com/originals/6f/c3/e8/6fc3e8a189fa706150a9fc3780ac29ea.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg}'),
  (5, '{https://live.staticflickr.com/65535/50328810791_ec927d1725_k.jpg, https://live.staticflickr.com/65535/50328989632_ff27a23dd8_h.jpg}'),
  (6, '{https://i.pinimg.com/originals/26/b1/fb/26b1fbfb2bff406f71bd213b314872a5.jpg, https://i.pinimg.com/236x/5e/49/3d/5e493d1f8381303bcc8d1c870d1da1d7.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg, 
  https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg}'),
  (7, '{https://i.pinimg.com/236x/f0/3e/10/f03e10aee84a171dc6ece6c1e29619d7.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg, 
  https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg}'),
  (8, '{https://live.staticflickr.com/65535/50328957172_22665abf5e_h.jpg, https://live.staticflickr.com/65535/50328956702_00db80da55_h.jpg}'),
  (9, '{https://live.staticflickr.com/65535/50328970222_1e754e98af_c.jpg, https://live.staticflickr.com/65535/50328970567_4785677e0b_b.jpg, https://live.staticflickr.com/65535/50328791471_e57dc53395_h.jpg}'),
  (10, '{https://i.pinimg.com/originals/6f/c3/e8/6fc3e8a189fa706150a9fc3780ac29ea.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg}'),
  (11, '{https://live.staticflickr.com/65535/50328810791_ec927d1725_k.jpg, https://live.staticflickr.com/65535/50328989632_ff27a23dd8_h.jpg}'),
  (12, '{https://i.pinimg.com/originals/26/b1/fb/26b1fbfb2bff406f71bd213b314872a5.jpg, https://i.pinimg.com/236x/5e/49/3d/5e493d1f8381303bcc8d1c870d1da1d7.jpg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg, 
  https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg, https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg}');

COMMIT;
