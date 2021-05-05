package com.ptit.nhom9.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "prior_customer")
    private Boolean priorCustomer;

    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties(value = { "payment", "state", "shipment", "customer", "productOrders" }, allowSetters = true)
    private Set<Orders> orders = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties(value = { "customer" }, allowSetters = true)
    private Set<Shipment> shipments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer id(Long id) {
        this.id = id;
        return this;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Customer lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Customer firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Boolean getPriorCustomer() {
        return this.priorCustomer;
    }

    public Customer priorCustomer(Boolean priorCustomer) {
        this.priorCustomer = priorCustomer;
        return this;
    }

    public void setPriorCustomer(Boolean priorCustomer) {
        this.priorCustomer = priorCustomer;
    }

    public Set<Orders> getOrders() {
        return this.orders;
    }

    public Customer orders(Set<Orders> orders) {
        this.setOrders(orders);
        return this;
    }

    public Customer addOrders(Orders orders) {
        this.orders.add(orders);
        orders.setCustomer(this);
        return this;
    }

    public Customer removeOrders(Orders orders) {
        this.orders.remove(orders);
        orders.setCustomer(null);
        return this;
    }

    public void setOrders(Set<Orders> orders) {
        if (this.orders != null) {
            this.orders.forEach(i -> i.setCustomer(null));
        }
        if (orders != null) {
            orders.forEach(i -> i.setCustomer(this));
        }
        this.orders = orders;
    }

    public Set<Shipment> getShipments() {
        return this.shipments;
    }

    public Customer shipments(Set<Shipment> shipments) {
        this.setShipments(shipments);
        return this;
    }

    public Customer addShipments(Shipment shipment) {
        this.shipments.add(shipment);
        shipment.setCustomer(this);
        return this;
    }

    public Customer removeShipments(Shipment shipment) {
        this.shipments.remove(shipment);
        shipment.setCustomer(null);
        return this;
    }

    public void setShipments(Set<Shipment> shipments) {
        if (this.shipments != null) {
            this.shipments.forEach(i -> i.setCustomer(null));
        }
        if (shipments != null) {
            shipments.forEach(i -> i.setCustomer(this));
        }
        this.shipments = shipments;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", lastName='" + getLastName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", priorCustomer='" + getPriorCustomer() + "'" +
            "}";
    }
}
