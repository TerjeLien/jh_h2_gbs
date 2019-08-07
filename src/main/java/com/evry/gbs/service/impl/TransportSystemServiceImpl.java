package com.evry.gbs.service.impl;

import com.evry.gbs.service.TransportSystemService;
import com.evry.gbs.domain.TransportSystem;
import com.evry.gbs.repository.TransportSystemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TransportSystem}.
 */
@Service
@Transactional
public class TransportSystemServiceImpl implements TransportSystemService {

    private final Logger log = LoggerFactory.getLogger(TransportSystemServiceImpl.class);

    private final TransportSystemRepository transportSystemRepository;

    public TransportSystemServiceImpl(TransportSystemRepository transportSystemRepository) {
        this.transportSystemRepository = transportSystemRepository;
    }

    /**
     * Save a transportSystem.
     *
     * @param transportSystem the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TransportSystem save(TransportSystem transportSystem) {
        log.debug("Request to save TransportSystem : {}", transportSystem);
        return transportSystemRepository.save(transportSystem);
    }

    /**
     * Get all the transportSystems.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransportSystem> findAll() {
        log.debug("Request to get all TransportSystems");
        return transportSystemRepository.findAll();
    }


    /**
     * Get one transportSystem by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransportSystem> findOne(Long id) {
        log.debug("Request to get TransportSystem : {}", id);
        return transportSystemRepository.findById(id);
    }

    /**
     * Delete the transportSystem by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransportSystem : {}", id);
        transportSystemRepository.deleteById(id);
    }
}
