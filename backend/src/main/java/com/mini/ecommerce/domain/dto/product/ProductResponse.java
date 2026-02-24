package com.mini.ecommerce.domain.dto.product;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String nome,
        String descricao,
        BigDecimal precoReais,
        Integer estoque,
        String imagem
) {}
