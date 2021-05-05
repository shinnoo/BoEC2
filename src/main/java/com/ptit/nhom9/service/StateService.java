package com.ptit.nhom9.service;

import com.ptit.nhom9.domain.State;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link State}.
 */
public interface StateService {
    /**
     * Save a state.
     *
     * @param state the entity to save.
     * @return the persisted entity.
     */
    State save(State state);

    /**
     * Partially updates a state.
     *
     * @param state the entity to update partially.
     * @return the persisted entity.
     */
    Optional<State> partialUpdate(State state);

    /**
     * Get all the states.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<State> findAll(Pageable pageable);

    /**
     * Get the "id" state.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<State> findOne(Long id);

    /**
     * Delete the "id" state.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
