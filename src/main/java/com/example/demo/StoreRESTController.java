package com.example.demo;

import java.util.Collection;
import java.util.Optional;

import com.example.demo.model.Productstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Page;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreRESTController {
  @Autowired
  private StoreproductRepository repository;

  @RequestMapping(value = "/storerest222/", method = RequestMethod.GET)
  public Collection<Productstore> productosAll(StoreproductRepository storeproductRepository) {
    return repository.findAll();
  }

  @RequestMapping(value = "/storerest/{id}", method = RequestMethod.GET)
  public Optional<Productstore> getAnuncio(@PathVariable long id) {

    return repository.findById(id);

  }

  @RequestMapping(value = "/storerest/", method = RequestMethod.GET)
  public Page<Productstore> productosAll(@PageableDefault(sort = { "modelo", "proveedor" }, value = 4)

  Pageable page) {
    return repository.findAll(page);
  }

  @RequestMapping(value = "/storerest/?page={num}", method = RequestMethod.GET)
  public Page<Productstore> getPage(@PathVariable long num,
      @PageableDefault(sort = { "modelo", "proveedor" }, value = 4)

      Pageable page) {

    return repository.findAll(page);

  }
}
