package com.mini.ecommerce.service;

import com.mini.ecommerce.domain.dto.order.CreateOrderRequest;
import com.mini.ecommerce.domain.dto.order.CreateOrderResponse;
import com.mini.ecommerce.domain.dto.order.OrderDetailsResponse;
import com.mini.ecommerce.domain.dto.product.ProductResponse;
import com.mini.ecommerce.domain.entity.Order;
import com.mini.ecommerce.domain.entity.OrderItem;
import com.mini.ecommerce.exception.BusinessException;
import com.mini.ecommerce.exception.NotFoundException;
import com.mini.ecommerce.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;

    @Transactional
    public CreateOrderResponse create(CreateOrderRequest req) {
        var products = productService.listProducts().stream().collect(Collectors.toMap(ProductResponse::id, p -> p));

        var order = new Order();
        order.setCustomerName(req.nome());
        order.setCustomerEmail(req.email());
        order.setAddress(req.endereco());
        order.setPaymentMethod(req.formaPagamento());

        BigDecimal total = BigDecimal.ZERO;

        for (var itemReq : req.produtos()) {
            var p = products.get(itemReq.productId());
            if (p == null) throw new BusinessException("Produto não encontrado: " + itemReq.productId());

            if (itemReq.quantidade() > p.estoque()) {
                throw new BusinessException("Estoque insuficiente para o produto: " + p.nome());
            }

            var item = new OrderItem();
            item.setOrder(order);
            item.setProductId(p.id());
            item.setProductName(p.nome());
            item.setUnitPrice(p.precoReais());
            item.setQuantity(itemReq.quantidade());

            var subtotal = p.precoReais().multiply(BigDecimal.valueOf(itemReq.quantidade()));
            item.setSubtotal(subtotal);

            order.getItems().add(item);
            total = total.add(subtotal);
        }

        order.setTotalAmount(total);

        var saved = orderRepository.save(order);
        return new CreateOrderResponse(saved.getId());
    }

    @Transactional
    public OrderDetailsResponse getById(Long id) {
        var order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado: " + id));
        return OrderDetailsResponse.from(order);
    }
}
