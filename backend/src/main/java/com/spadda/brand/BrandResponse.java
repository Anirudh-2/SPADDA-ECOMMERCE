package com.spadda.brand;

import java.util.List;

public record BrandResponse(
        String name,
        String categories,
        String phone,
        String address,
        String instagram,
        String youtube,
        String email,
        String youtubeUrl,
        String qrImageUrl,
        String welcomeVideoUrl,
        List<String> logoUrls
) {
}
