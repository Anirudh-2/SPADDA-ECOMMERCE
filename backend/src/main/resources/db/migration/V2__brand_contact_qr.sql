ALTER TABLE brand ADD COLUMN email VARCHAR(120);
ALTER TABLE brand ADD COLUMN youtube_url VARCHAR(255);
ALTER TABLE brand ADD COLUMN qr_image_url VARCHAR(255);

UPDATE brand
SET email = 'SPADDA2025@GMAIL.COM',
    youtube = '@spadda2024',
    youtube_url = 'https://www.youtube.com/@spadda2024',
    qr_image_url = '/media/logos/spadda-qr.jpeg';

ALTER TABLE brand ALTER COLUMN email SET NOT NULL;
ALTER TABLE brand ALTER COLUMN youtube_url SET NOT NULL;
ALTER TABLE brand ALTER COLUMN qr_image_url SET NOT NULL;
