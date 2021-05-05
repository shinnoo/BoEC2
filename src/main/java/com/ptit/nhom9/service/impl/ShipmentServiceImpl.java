package com.ptit.nhom9.service.impl;

import com.ptit.nhom9.domain.Shipment;
import com.ptit.nhom9.repository.ShipmentRepository;
import com.ptit.nhom9.service.ShipmentService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Shipment}.
 */
@Service
@Transactional
public class ShipmentServiceImpl implements ShipmentService {

    private final Logger log = LoggerFactory.getLogger(ShipmentServiceImpl.class);

    private final ShipmentRepository shipmentRepository;

    public ShipmentServiceImpl(ShipmentRepository shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }

    @Override
    public Shipment save(Shipment shipment) {
        log.debug("Request to save Shipment : {}", shipment);
        return shipmentRepository.save(shipment);
    }

    @Override
    public Optional<Shipment> partialUpdate(Shipment shipment) {
        log.debug("Request to partially update Shipment : {}", shipment);

        return shipmentRepository
            .findById(shipment.getId())
            .map(
                existingShipment -> {
                    if (shipment.getAddress() != null) {
                        existingShipment.setAddress(shipment.getAddress());
                    }
                    if (shipment.getStreet() != null) {
                        existingShipment.setStreet(shipment.getStreet());
                    }
                    if (shipment.getCity() != null) {
                        existingShipment.setCity(shipment.getCity());
                    }
                    if (shipment.getZipCode() != null) {
                        existingShipment.setZipCode(shipment.getZipCode());
                    }

                    return existingShipment;
                }
            )
            .map(shipmentRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Shipment> findAll(Pageable pageable) {
        log.debug("Request to get all Shipments");
        return shipmentRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Shipment> findOne(Long id) {
        log.debug("Request to get Shipment : {}", id);
        return shipmentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shipment : {}", id);
        shipmentRepository.deleteById(id);
    }
}
