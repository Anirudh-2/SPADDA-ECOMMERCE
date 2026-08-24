package com.spadda.brand;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BrandController {

    private final BrandRepository brandRepository;
    private final ObjectMapper objectMapper;

    public BrandController(BrandRepository brandRepository, ObjectMapper objectMapper) {
        this.brandRepository = brandRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/api/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/api/brand")
    public ResponseEntity<BrandResponse> brand() {
        Brand brand = brandRepository.findAll().stream().findFirst().orElseThrow();
        List<String> logos;
        try {
            logos = objectMapper.readValue(brand.getLogoUrls(), new TypeReference<>() {});
        } catch (Exception e) {
            throw new IllegalStateException("Invalid logo_urls JSON", e);
        }
        return ResponseEntity.ok(new BrandResponse(
                brand.getName(),
                brand.getCategories(),
                brand.getPhone(),
                brand.getAddress(),
                brand.getInstagram(),
                brand.getYoutube(),
                brand.getEmail(),
                brand.getYoutubeUrl(),
                brand.getQrImageUrl(),
                brand.getWelcomeVideoUrl(),
                logos
        ));
    }
}
