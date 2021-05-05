package com.ptit.nhom9.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Orders.
 */
@Entity
@Table(name = "orders")
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @OneToOne
    @JoinColumn(unique = true)
    private Payment payment;

    @OneToOne
    @JoinColumn(unique = true)
    private State state;

    @JsonIgnoreProperties(value = { "customer" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Shipment shipment;

    @ManyToOne
    @JsonIgnoreProperties(value = { "orders", "shipments" }, allowSetters = true)
    private Customer customer;

    @OneToMany(mappedBy = "order")
    @JsonIgnoreProperties(value = { "order", "product" }, allowSetters = true)
    private Set<ProductOrder> productOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getDate() {
        return this.date;
    }

    public Orders date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Payment getPayment() {
        return this.payment;
    }

    public Orders payment(Payment payment) {
        this.setPayment(payment);
        return this;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public State getState() {
        return this.state;
    }

    public Orders state(State state) {
        this.setState(state);
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Shipment getShipment() {
        return this.shipment;
    }

    public Orders shipment(Shipment shipment) {
        this.setShipment(shipment);
        return this;
    }

    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public Orders customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<ProductOrder> getProductOrders() {
        return this.productOrders;
    }

    public Orders productOrders(Set<ProductOrder> productOrders) {
        this.setProductOrders(productOrders);
        return this;
    }

    public Orders addProductOrders(ProductOrder productOrder) {
        this.productOrders.add(productOrder);
        productOrder.setOrder(this);
        return this;
    }

    public Orders removeProductOrders(ProductOrder productOrder) {
        this.productOrders.remove(productOrder);
        productOrder.setOrder(null);
        return this;
    }

    public void setProductOrders(Set<ProductOrder> productOrders) {
        if (this.productOrders != null) {
            this.productOrders.forEach(i -> i.setOrder(null));
        }
        if (productOrders != null) {
            productOrders.forEach(i -> i.setOrder(this));
        }
        this.productOrders = productOrders;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Orders)) {
            return false;
        }
        return id != null && id.equals(((Orders) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Orders{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
