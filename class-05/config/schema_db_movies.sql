
DROP database IF exists moviesweb;
CREATE DATABASE moviesweb;

USE moviesweb;

CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(80) NOT NULL,
    year INT(4) NOT NULL,
    director VARCHAR(100) NOT NULL,
    duration INT(4) NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre(
	id INT auto_increment primary key,
    name varchar(20) not null unique
);

create table movies_genres(
	movie_id binary(16) references movies(id),
    genre_id int references genres(id),
    primary key (movie_id, genre_id)
);

insert into genre(name) values
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

insert into movie(id, title, year, director, duration, poster, rate) values 
(UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(UUID_TO_BIN(UUID()), "Titanic", 1997, "James Cameron", 195, "https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png", 7.8),
(UUID_TO_BIN(UUID()), "Avatar", 2009, "James Cameron", 162, "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg", 7.8);

insert into movies_genres(movie_id, genre_id) values
((select id from movie where title = 'The Shawshank Redemption'), (select id from genre where name = 'Drama')),
((select id from movie where title = 'Titanic'), (select id from genre where name = 'Drama')),
((select id from movie where title = 'Titanic'), (select id from genre where name = 'Romance')),
((select id from movie where title = 'Avatar'), (select id from genre where name = 'Adventure'));

select * from movie;