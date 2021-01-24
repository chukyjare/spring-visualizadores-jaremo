package com.example.demo;

import java.util.Optional;

import javax.annotation.PostConstruct;

import com.example.demo.model.Productstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Page;

@Controller
public class StoreController {

  @Autowired
  private StoreproductRepository repository;

  @PostConstruct
  public void init() {
  }

  @RequestMapping("/store")
  public String store(Model model, @PageableDefault(sort = { "modelo", "proveedor" }, value = 4)

  Pageable page) {

    Page<Productstore> productos = repository.findAll(page);
    model.addAttribute("productos", productos);

    model.addAttribute("showNext", !productos.isLast());
    model.addAttribute("showPrev", !productos.isFirst());
    model.addAttribute("numPage", productos.getNumber());
    model.addAttribute("nextPage", productos.getNumber() + 1);
    model.addAttribute("prevPage", productos.getNumber() - 1);

    return "store";
  }

  @RequestMapping("/producto/{id}")
  public String verAnuncio(Model model, @PathVariable long id) {

    Optional<Productstore> producto = repository.findById(id);
    model.addAttribute("producto", producto.get());

    return "ver_producto";
  }
}
