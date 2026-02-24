package com.mini.ecommerce.domain.dto.order;

import com.mini.ecommerce.domain.entity.Order;
import com.mini.ecommerce.domain.entity.PaymentMethod;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderDetailsResponse(
        Long id,
        String nome,
        String email,
        String endereco,
        PaymentMethod formaPagamento,
        BigDecimal total,
        Instant criadoEm,
        List<OrderItemResponse> itens
) {
    public static OrderDetailsResponse from(Order o) {
        return new OrderDetailsResponse(
                o.getId(),
                o.getCustomerName(),
                o.getCustomerEmail(),
                o.getAddress(),
                o.getPaymentMethod(),
                o.getTotalAmount(),
                o.getCreatedAt(),
                o.getItems().stream().map(i ->
                        new OrderItemResponse(i.getProductId(), i.getProductName(), i.getUnitPrice(), i.getQuantity(), i.getSubtotal())
                ).toList()
        );
    }
}

