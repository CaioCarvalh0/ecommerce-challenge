package com.mini.ecommerce.domain.dto.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderProductRequest(
        @NotNull Long productId,
        @NotNull @Min(1) Integer quantidade
) {}
