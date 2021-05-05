package com.ptit.nhom9.service;

import com.ptit.nhom9.domain.Orders;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Orders}.
 */
public interface OrdersService {
    /**
     * Save a orders.
     *
     * @param orders the entity to save.
     * @return the persisted entity.
     */
    Orders save(Orders orders);

    /**
     * Partially updates a orders.
     *
     * @param orders the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Orders> partialUpdate(Orders orders);

    /**
     * Get all the orders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Orders> findAll(Pageable pageable);

    /**
     * Get the "id" orders.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Orders> findOne(Long id);

    /**
     * Delete the "id" orders.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
