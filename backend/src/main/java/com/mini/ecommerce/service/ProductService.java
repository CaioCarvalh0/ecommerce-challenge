package com.mini.ecommerce.service;

import com.mini.ecommerce.client.ExternalProductClient;
import com.mini.ecommerce.domain.dto.product.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ExternalProductClient client;

    public List<ProductResponse> listProducts() {

        return client.fetchProducts().stream().map(p -> new
                ProductResponse(
                        p.id(),
                        p.title(),
                        p.description(),
                        p.price(),
                        p.stock() != null ? p.stock() : 10,
                        p.thumbnail()
                )
        ).toList();
    }
}
