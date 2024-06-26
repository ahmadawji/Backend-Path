CREATE TABLE restaurant (
  id integer PRIMARY KEY,
  name varchar(30),
  description text,
  rating decimal,
  telephone char(10),
  hours varchar(100)
);

CREATE TABLE address (
  id integer PRIMARY KEY,
  street_number varchar(20),
  street_name varchar(20),
  city varchar (20),
  state varchar(15),
  google_map_link varchar(2048),
  restaurant_id integer REFERENCES restaurant(id) UNIQUE
);

CREATE TABLE category(
  id varchar(2) PRIMARY KEY,
  name varchar(30), 
  description varchar(200) NULL
);

CREATE TABLE dish(
  id integer PRIMARY KEY,
  name varchar(50), 
  description varchar(200),
  hot_and_spicy boolean
);

CREATE TABLE review(
  id integer PRIMARY KEY,
  review_date date, 
  rating decimal, 
  description varchar(200),
  restaurant_id integer REFERENCES restaurant(id)
);

CREATE TABLE categories_dishes(
  category_id char(2) REFERENCES category(id),
  dish_id integer REFERENCES dish(id),
  price money,
  PRIMARY KEY (category_id, dish_id)
);

----------------------------------------------------


INSERT INTO restaurant VALUES (
  1,
  'Bytes of China',
  'Delectable Chinese Cuisine',
  3.9,
  '6175551212',
  'Mon - Fri 9:00 am to 9:00 pm, Weekends 10:00 am to 11:00 pm'
);

/* 
 *--------------------------------------------
 Insert values for address
 *--------------------------------------------
 */
INSERT INTO address VALUES (
  1,
  '2020',
  'Busy Street',
  'Chinatown',
  'MA',
  'http://bit.ly/BytesOfChina',
  1
);

/* 
 *--------------------------------------------
 Insert values for review
 *--------------------------------------------
 */
INSERT INTO review VALUES (
  1,
  '05-22-2020',
  5.0,
  'Would love to host another birthday party at Bytes of China!',
  1
);

INSERT INTO review VALUES (
  2,
  '04-01-2020',
  4.5,
  'Other than a small mix-up, I would give it a 5.0!',
  1
);

INSERT INTO review VALUES (
  3,
  '03-15-2020',
  3.9,
  'A reasonable place to eat for lunch, if you are in a rush!',
  1
);

/* 
 *--------------------------------------------
 Insert values for category
 *--------------------------------------------
 */
INSERT INTO category VALUES (
  'C',
  'Chicken',
  null
);

INSERT INTO category VALUES (
  'LS',
  'Luncheon Specials',
  'Served with Hot and Sour Soup or Egg Drop Soup and Fried or Steamed Rice  between 11:00 am and 3:00 pm from Monday to Friday.'
);

INSERT INTO category VALUES (
  'HS',
  'House Specials',
  null
);

/* 
 *--------------------------------------------
 Insert values for dish
 *--------------------------------------------
 */
INSERT INTO dish VALUES (
  1,
  'Chicken with Broccoli',
  'Diced chicken stir-fried with succulent broccoli florets',
  false
);

INSERT INTO dish VALUES (
  2,
  'Sweet and Sour Chicken',
  'Marinated chicken with tangy sweet and sour sauce together with pineapples and green peppers',
  false
);

INSERT INTO dish VALUES (
  3,
  'Chicken Wings',
  'Finger-licking mouth-watering entree to spice up any lunch or dinner',
  true
);

INSERT INTO dish VALUES (
  4,
  'Beef with Garlic Sauce',
  'Sliced beef steak marinated in garlic sauce for that tangy flavor',
  true
);

INSERT INTO dish VALUES (
  5,
  'Fresh Mushroom with Snow Peapods and Baby Corns',
  'Colorful entree perfect for vegetarians and mushroom lovers',
  false
);

INSERT INTO dish VALUES (
  6,
  'Sesame Chicken',
  'Crispy chunks of chicken flavored with savory sesame sauce',
  false
);

INSERT INTO dish VALUES (
  7,
  'Special Minced Chicken',
  'Marinated chicken breast sauteed with colorful vegetables topped with pine nuts and shredded lettuce.',
  false
);

INSERT INTO dish VALUES (
  8,
  'Hunan Special Half & Half',
  'Shredded beef in Peking sauce and shredded chicken in garlic sauce',
  true
);

/*
 *--------------------------------------------
 Insert valus for cross-reference table, categories_dishes
 *--------------------------------------------
 */
INSERT INTO categories_dishes VALUES (
  'C',
  1,
  6.95
);

INSERT INTO categories_dishes VALUES (
  'C',
  3,
  6.95
);

INSERT INTO categories_dishes VALUES (
  'LS',
  1,
  8.95
);

INSERT INTO categories_dishes VALUES (
  'LS',
  4,
  8.95
);

INSERT INTO categories_dishes VALUES (
  'LS',
  5,
  8.95
);

INSERT INTO categories_dishes VALUES (
  'HS',
  6,
  15.95
);

INSERT INTO categories_dishes VALUES (
  'HS',
  7,
  16.95
);

INSERT INTO categories_dishes VALUES (
  'HS',
  8,
  17.95
);


-------------------------------------------------

SELECT constraint_name, column_name, table_name
FROM information_schema.key_column_usage
WHERE table_name = 'categories_dishes';

/*SELECT constraint_name, column_name, table_name
FROM information_schema.constraint_column_usage
WHERE table_name = 'restaurant';

SELECT constraint_name, column_name, table_name
FROM information_schema.constraint_column_usage
WHERE table_name = 'address';*/


-- 10
SELECT name, street_number, telephone
FROM restaurant
JOIN address ON restaurant.id = address.restaurant_id;

-- 11
SELECT MAX(rating)
FROM review;

-- 12
SELECT dish.name as dish_name, price, category.name as category
FROM dish
JOIN categories_dishes ON dish.id = categories_dishes.dish_id
JOIN category ON categories_dishes.category_id = category.id
ORDER BY dish_name ASC;

-- 13
SELECT category.name as category, dish.name as dish_name, price
FROM category, dish, categories_dishes
WHERE category.id = categories_dishes.category_id AND dish.id = categories_dishes.dish_id
ORDER BY category ASC;

-- 14
SELECT dish.name as spicy_dish_name, category.name as category, price
FROM dish
JOIN categories_dishes ON dish.id = categories_dishes.dish_id AND dish.hot_and_spicy = true
JOIN category ON categories_dishes.category_id = category.id
ORDER BY spicy_dish_name ASC;

-- 15
SELECT categories_dishes.dish_id, dish.name, COUNT(categories_dishes.dish_id)
FROM categories_dishes
JOIN dish ON categories_dishes.dish_id = dish.id
GROUP BY categories_dishes.dish_id, dish.name;

-- 16
SELECT categories_dishes.dish_id, dish.name, COUNT(categories_dishes.dish_id)
FROM categories_dishes
JOIN dish ON categories_dishes.dish_id = dish.id
GROUP BY categories_dishes.dish_id, dish.name
  HAVING COUNT(categories_dishes.dish_id)>1;

-- 17
SELECT categories_dishes.dish_id, dish.name, COUNT(categories_dishes.dish_id)
FROM categories_dishes, dish
GROUP BY categories_dishes.dish_id, dish.name, dish.id
  HAVING categories_dishes.dish_id = dish.id;

-- 18 
SELECT rating as best_rating, description
FROM review
WHERE rating = (
  SELECT MAX(rating)
  FROM review
);

