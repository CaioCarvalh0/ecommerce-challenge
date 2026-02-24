package com.mini.ecommerce.repository;

import com.mini.ecommerce.domain.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
