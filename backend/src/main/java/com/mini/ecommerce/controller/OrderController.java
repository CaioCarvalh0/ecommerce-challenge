package com.mini.ecommerce.controller;

import com.mini.ecommerce.domain.dto.order.CreateOrderRequest;
import com.mini.ecommerce.domain.dto.order.CreateOrderResponse;
import com.mini.ecommerce.domain.dto.order.OrderDetailsResponse;
import com.mini.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<CreateOrderResponse> create(@Valid @RequestBody CreateOrderRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }

    @GetMapping("/{id}")
    public OrderDetailsResponse get(@PathVariable Long id) {
        return service.getById(id);
    }
}
