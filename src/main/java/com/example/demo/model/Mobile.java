package com.example.demo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mobile")
public class Mobile implements Serializable {
  private static final long serialVersionUID = 1L;
  @Id
  @Column(name = "id")
  private long id;
  @Column(name = "modelo")
  private String modelo;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getModelo() {
    return modelo;
  }

  public void setModelo(String modelo) {
    this.modelo = modelo;
  }

  public Mobile(long id, String modelo) {
    this.id = id;
    this.modelo = modelo;
  }

  public Mobile() {

  }
}
