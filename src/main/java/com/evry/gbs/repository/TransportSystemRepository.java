package com.evry.gbs.repository;

import com.evry.gbs.domain.TransportSystem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransportSystem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportSystemRepository extends JpaRepository<TransportSystem, Long> {

}
