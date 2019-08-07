package com.evry.gbs.web.rest;

import com.evry.gbs.domain.TransportSystem;
import com.evry.gbs.service.TransportSystemService;
import com.evry.gbs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.evry.gbs.domain.TransportSystem}.
 */
@RestController
@RequestMapping("/api")
public class TransportSystemResource {

    private final Logger log = LoggerFactory.getLogger(TransportSystemResource.class);

    private static final String ENTITY_NAME = "transportSystem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransportSystemService transportSystemService;

    public TransportSystemResource(TransportSystemService transportSystemService) {
        this.transportSystemService = transportSystemService;
    }

    /**
     * {@code POST  /transport-systems} : Create a new transportSystem.
     *
     * @param transportSystem the transportSystem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transportSystem, or with status {@code 400 (Bad Request)} if the transportSystem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transport-systems")
    public ResponseEntity<TransportSystem> createTransportSystem(@RequestBody TransportSystem transportSystem) throws URISyntaxException {
        log.debug("REST request to save TransportSystem : {}", transportSystem);
        if (transportSystem.getId() != null) {
            throw new BadRequestAlertException("A new transportSystem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportSystem result = transportSystemService.save(transportSystem);
        return ResponseEntity.created(new URI("/api/transport-systems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transport-systems} : Updates an existing transportSystem.
     *
     * @param transportSystem the transportSystem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transportSystem,
     * or with status {@code 400 (Bad Request)} if the transportSystem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transportSystem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transport-systems")
    public ResponseEntity<TransportSystem> updateTransportSystem(@RequestBody TransportSystem transportSystem) throws URISyntaxException {
        log.debug("REST request to update TransportSystem : {}", transportSystem);
        if (transportSystem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransportSystem result = transportSystemService.save(transportSystem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, transportSystem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transport-systems} : get all the transportSystems.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transportSystems in body.
     */
    @GetMapping("/transport-systems")
    public List<TransportSystem> getAllTransportSystems() {
        log.debug("REST request to get all TransportSystems");
        return transportSystemService.findAll();
    }

    /**
     * {@code GET  /transport-systems/:id} : get the "id" transportSystem.
     *
     * @param id the id of the transportSystem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transportSystem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transport-systems/{id}")
    public ResponseEntity<TransportSystem> getTransportSystem(@PathVariable Long id) {
        log.debug("REST request to get TransportSystem : {}", id);
        Optional<TransportSystem> transportSystem = transportSystemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transportSystem);
    }

    /**
     * {@code DELETE  /transport-systems/:id} : delete the "id" transportSystem.
     *
     * @param id the id of the transportSystem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transport-systems/{id}")
    public ResponseEntity<Void> deleteTransportSystem(@PathVariable Long id) {
        log.debug("REST request to delete TransportSystem : {}", id);
        transportSystemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
