BEGIN;

TRUNCATE
  gymbnb_users,
  gymbnb_gyms
  RESTART IDENTITY CASCADE;

INSERT INTO gymbnb_users (first_name, last_name, email, password)
VALUES
  ('marco', 'friaz', 'marfriaz@gmail.com', 'password'),
  ('user', 'user', 'user@gmail.com', 'password'),
  ('user2', 'user2', 'user2@gmail.com', 'password');

INSERT INTO gymbnb_gyms (title, description, price, guests, location, user_id, img_url_one, img_url_two, img_url_three, img_url_four, img_url_five)
VALUES
  ('Amazing customized home gym in SF!', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 5, 'san-francisco', 1, 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_6.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg', 
  'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg'
  ),
    ('My at home gym in LA, come get swole', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 2, 'los-angeles', 2, 'https://i.pinimg.com/originals/26/b1/fb/26b1fbfb2bff406f71bd213b314872a5.jpg', 'https://i.pinimg.com/236x/5e/49/3d/5e493d1f8381303bcc8d1c870d1da1d7.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg', 
  'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg'
  ),
    ('SD gym for you surfer bros & gals', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 3, 'san-diego', 3, 'https://i.pinimg.com/236x/f0/3e/10/f03e10aee84a171dc6ece6c1e29619d7.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg', 
  'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg'
  ),
    ('Sunnyvale gym for your workouts', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 5, 'sunnyvale', 1, 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_6.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg', 
  'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafa0e52c5a.jpeg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_3.jpg'
  ),
    ('Getaway gym in San Fran', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 
  15, 2, 'san-francisco', 3, 'https://i.pinimg.com/originals/6f/c3/e8/6fc3e8a189fa706150a9fc3780ac29ea.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/f9b902fc3289af4dd08de5d1de54f68f_4.jpg', 'https://img.gs/kjrgscdmbm/700/https://www.garagegymreviews.com/articles/images/9778d5d219c5080b9a6a17bef029331c_5dbafb8adea35.jpeg', 
  null, null);

COMMIT;
