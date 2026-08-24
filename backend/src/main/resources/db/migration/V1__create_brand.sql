CREATE TABLE brand (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    categories VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    address VARCHAR(255) NOT NULL,
    instagram VARCHAR(120) NOT NULL,
    youtube VARCHAR(120) NOT NULL,
    welcome_video_url VARCHAR(255) NOT NULL,
    logo_urls TEXT NOT NULL
);

INSERT INTO brand (
    name, categories, phone, address, instagram, youtube, welcome_video_url, logo_urls
) VALUES (
    'SP ADDA',
    'ROLLS | WAFFLE | BURGER | SANDWICH',
    '8019595761',
    'Near Gandhi Statue, Saroor Nagar, Hyderabad',
    '@SPADDA2024',
    '@SPADDA2024',
    '/media/welcome.mp4',
    '["/media/logos/spadda-logo.PNG","/media/logos/spadda-logo-1.jpeg","/media/logos/logo.jpeg"]'
);
