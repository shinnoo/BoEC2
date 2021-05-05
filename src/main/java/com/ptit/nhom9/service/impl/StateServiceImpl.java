package com.ptit.nhom9.service.impl;

import com.ptit.nhom9.domain.State;
import com.ptit.nhom9.repository.StateRepository;
import com.ptit.nhom9.service.StateService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link State}.
 */
@Service
@Transactional
public class StateServiceImpl implements StateService {

    private final Logger log = LoggerFactory.getLogger(StateServiceImpl.class);

    private final StateRepository stateRepository;

    public StateServiceImpl(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @Override
    public State save(State state) {
        log.debug("Request to save State : {}", state);
        return stateRepository.save(state);
    }

    @Override
    public Optional<State> partialUpdate(State state) {
        log.debug("Request to partially update State : {}", state);

        return stateRepository
            .findById(state.getId())
            .map(
                existingState -> {
                    if (state.getName() != null) {
                        existingState.setName(state.getName());
                    }
                    if (state.getTaxRate() != null) {
                        existingState.setTaxRate(state.getTaxRate());
                    }

                    return existingState;
                }
            )
            .map(stateRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<State> findAll(Pageable pageable) {
        log.debug("Request to get all States");
        return stateRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<State> findOne(Long id) {
        log.debug("Request to get State : {}", id);
        return stateRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete State : {}", id);
        stateRepository.deleteById(id);
    }
}
