package com.mini.ecommerce.domain.dto.order;

import com.mini.ecommerce.domain.entity.PaymentMethod;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateOrderRequest(
        @NotBlank String nome,
        @Email @NotBlank String email,
        @NotBlank String endereco,
        @NotNull PaymentMethod formaPagamento,
        @NotEmpty List<OrderProductRequest> produtos
) {}