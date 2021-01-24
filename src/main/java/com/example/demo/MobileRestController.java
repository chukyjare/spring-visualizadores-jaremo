package com.example.demo;

import java.util.Collection;

import com.example.demo.model.Mobile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MobileRestController {

  @Autowired
  private MobileRepository repository;

  @RequestMapping(value = "/mobile/", method = RequestMethod.GET)
  public Collection<Mobile> items() {
    return repository.findAll();
  }

}
