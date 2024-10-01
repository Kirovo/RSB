DROP TABLE IF EXISTS reactions;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS reactions_id_seq;
DROP SEQUENCE IF EXISTS comments_id_seq;
DROP SEQUENCE IF EXISTS attachments_id_seq;
DROP SEQUENCE IF EXISTS posts_id_seq;
DROP SEQUENCE IF EXISTS profiles_id_seq;
DROP SEQUENCE IF EXISTS users_id_seq;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(63),
    password_digest VARCHAR(255)
    -- date
);


CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    firstname VARCHAR(63),
    lastname VARCHAR(63),
    mobile VARCHAR(15),
    birthdate VARCHAR(63),
    gendre VARCHAR(63),
    address VARCHAR(255),
    city VARCHAR(63),
    postalcode VARCHAR(15)
    -- date
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    id_profile INT,
    FOREIGN KEY (id_profile) REFERENCES profiles(id) ON DELETE CASCADE,
    topic VARCHAR(2500)
    -- date
);


CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    id_profile INT,
    id_post INT,
    FOREIGN KEY(id_profile) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE,
    path VARCHAR(255),
    filename VARCHAR(127),
    mime VARCHAR(15)
    -- date
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    id_post INT,
    id_profile INT,
    FOREIGN KEY(id_profile) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE,
    content VARCHAR(1500)
    -- date
);


CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    id_post INT,
    id_profile INT,
    FOREIGN KEY(id_profile) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE
    -- date
);

CREATE TYPE status AS ENUM ('request', 'friends');

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    id_profile INT,
    id_friend INT,
    status status,
    FOREIGN KEY(id_profile) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(id_friend) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT check_id_profile_id_friend CHECK (id_profile <> id_friend)
    -- date
);