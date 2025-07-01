package com.empresa.demo.domain.ingeniero;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngenieroRepository extends JpaRepository<Ingeniero,Long> {
}
