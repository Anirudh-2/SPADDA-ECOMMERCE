package com.spadda.brand;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "brand")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String categories;
    private String phone;
    private String address;
    private String instagram;
    private String youtube;
    private String email;

    @Column(name = "youtube_url")
    private String youtubeUrl;

    @Column(name = "qr_image_url")
    private String qrImageUrl;

    @Column(name = "welcome_video_url")
    private String welcomeVideoUrl;

    @Column(name = "logo_urls")
    private String logoUrls;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategories() {
        return categories;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getInstagram() {
        return instagram;
    }

    public String getYoutube() {
        return youtube;
    }

    public String getEmail() {
        return email;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public String getQrImageUrl() {
        return qrImageUrl;
    }

    public String getWelcomeVideoUrl() {
        return welcomeVideoUrl;
    }

    public String getLogoUrls() {
        return logoUrls;
    }
}
