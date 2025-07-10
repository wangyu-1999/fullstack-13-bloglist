CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('Tom King', 'https://www.firstbook.com', 'The First Book', 5),
('Jane Doe', 'https://www.secondbook.com', 'The Second Book', 10),
('Alice Smith', 'https://www.thirdbook.com', 'The Third Book', 15);