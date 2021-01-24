package com.example.demo;

import com.example.demo.model.Productstore;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreproductRepository extends JpaRepository<Productstore, Long> {

}
