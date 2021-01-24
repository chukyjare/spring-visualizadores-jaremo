package com.example.demo;

import com.example.demo.model.Mobile;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MobileRepository extends JpaRepository<Mobile, Long> {

}
