package com.mini.ecommerce.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.List;

@Component
public class ExternalProductClient {

    private final WebClient webClient;
    private final String baseUrl;

    public ExternalProductClient(
            @Value("${external.products.base-url}") String baseUrl
    ) {
        this.webClient = WebClient.create();
        this.baseUrl = baseUrl;
    }

    public List<ExternalProduct> fetchProducts() {
        return webClient.get()
                .uri(baseUrl + "/products?limit=50")
                .retrieve()
                .bodyToMono(ExternalProductsWrapper.class)
                .map(ExternalProductsWrapper::products)
                .block();
    }

    public record ExternalProductsWrapper(List<ExternalProduct> products) {}

    public record ExternalProduct(
            Long id,
            String title,
            String description,
            BigDecimal price,
            Integer stock,
            String thumbnail
    ) {}
}