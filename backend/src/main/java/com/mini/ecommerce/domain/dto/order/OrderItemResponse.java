package com.mini.ecommerce.domain.dto.order;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long productId,
        String nome,
        BigDecimal precoUnitario,
        Integer quantidade,
        BigDecimal subtotal
) {}
