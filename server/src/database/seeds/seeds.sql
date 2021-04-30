INSERT INTO users
    (name, email, password)
  VALUES
    ('bob', 'bob@example.com', '$2a$10$jScvaSlIC4KP5YOLG3Ud9ebiMziSv4SyIDm2d.NQbgk6JN4L7IikC');

INSERT INTO likes
    (user_id, brewery_id)
  VALUES
    (1, 8034)