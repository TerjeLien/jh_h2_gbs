package com.evry.gbs.service;

import com.evry.gbs.domain.TransportSystem;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TransportSystem}.
 */
public interface TransportSystemService {

    /**
     * Save a transportSystem.
     *
     * @param transportSystem the entity to save.
     * @return the persisted entity.
     */
    TransportSystem save(TransportSystem transportSystem);

    /**
     * Get all the transportSystems.
     *
     * @return the list of entities.
     */
    List<TransportSystem> findAll();


    /**
     * Get the "id" transportSystem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TransportSystem> findOne(Long id);

    /**
     * Delete the "id" transportSystem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
