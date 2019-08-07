package com.evry.gbs.web.rest;

import com.evry.gbs.JhGbsApp;
import com.evry.gbs.config.TestSecurityConfiguration;
import com.evry.gbs.domain.TransportSystem;
import com.evry.gbs.repository.TransportSystemRepository;
import com.evry.gbs.service.TransportSystemService;
import com.evry.gbs.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.evry.gbs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TransportSystemResource} REST controller.
 */
@SpringBootTest(classes = {JhGbsApp.class, TestSecurityConfiguration.class})
public class TransportSystemResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_VALID_TO_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_TO_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_VALID_TO_DATE = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_MOD_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MOD_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_MOD_DATE = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_MOD_USER = "AAAAAAAAAA";
    private static final String UPDATED_MOD_USER = "BBBBBBBBBB";

    @Autowired
    private TransportSystemRepository transportSystemRepository;

    @Autowired
    private TransportSystemService transportSystemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTransportSystemMockMvc;

    private TransportSystem transportSystem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransportSystemResource transportSystemResource = new TransportSystemResource(transportSystemService);
        this.restTransportSystemMockMvc = MockMvcBuilders.standaloneSetup(transportSystemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransportSystem createEntity(EntityManager em) {
        TransportSystem transportSystem = new TransportSystem()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .validToDate(DEFAULT_VALID_TO_DATE)
            .modDate(DEFAULT_MOD_DATE)
            .modUser(DEFAULT_MOD_USER);
        return transportSystem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransportSystem createUpdatedEntity(EntityManager em) {
        TransportSystem transportSystem = new TransportSystem()
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .validToDate(UPDATED_VALID_TO_DATE)
            .modDate(UPDATED_MOD_DATE)
            .modUser(UPDATED_MOD_USER);
        return transportSystem;
    }

    @BeforeEach
    public void initTest() {
        transportSystem = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportSystem() throws Exception {
        int databaseSizeBeforeCreate = transportSystemRepository.findAll().size();

        // Create the TransportSystem
        restTransportSystemMockMvc.perform(post("/api/transport-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportSystem)))
            .andExpect(status().isCreated());

        // Validate the TransportSystem in the database
        List<TransportSystem> transportSystemList = transportSystemRepository.findAll();
        assertThat(transportSystemList).hasSize(databaseSizeBeforeCreate + 1);
        TransportSystem testTransportSystem = transportSystemList.get(transportSystemList.size() - 1);
        assertThat(testTransportSystem.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testTransportSystem.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTransportSystem.getValidToDate()).isEqualTo(DEFAULT_VALID_TO_DATE);
        assertThat(testTransportSystem.getModDate()).isEqualTo(DEFAULT_MOD_DATE);
        assertThat(testTransportSystem.getModUser()).isEqualTo(DEFAULT_MOD_USER);
    }

    @Test
    @Transactional
    public void createTransportSystemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportSystemRepository.findAll().size();

        // Create the TransportSystem with an existing ID
        transportSystem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportSystemMockMvc.perform(post("/api/transport-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportSystem)))
            .andExpect(status().isBadRequest());

        // Validate the TransportSystem in the database
        List<TransportSystem> transportSystemList = transportSystemRepository.findAll();
        assertThat(transportSystemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTransportSystems() throws Exception {
        // Initialize the database
        transportSystemRepository.saveAndFlush(transportSystem);

        // Get all the transportSystemList
        restTransportSystemMockMvc.perform(get("/api/transport-systems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportSystem.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].validToDate").value(hasItem(DEFAULT_VALID_TO_DATE.toString())))
            .andExpect(jsonPath("$.[*].modDate").value(hasItem(DEFAULT_MOD_DATE.toString())))
            .andExpect(jsonPath("$.[*].modUser").value(hasItem(DEFAULT_MOD_USER.toString())));
    }
    
    @Test
    @Transactional
    public void getTransportSystem() throws Exception {
        // Initialize the database
        transportSystemRepository.saveAndFlush(transportSystem);

        // Get the transportSystem
        restTransportSystemMockMvc.perform(get("/api/transport-systems/{id}", transportSystem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transportSystem.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.validToDate").value(DEFAULT_VALID_TO_DATE.toString()))
            .andExpect(jsonPath("$.modDate").value(DEFAULT_MOD_DATE.toString()))
            .andExpect(jsonPath("$.modUser").value(DEFAULT_MOD_USER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransportSystem() throws Exception {
        // Get the transportSystem
        restTransportSystemMockMvc.perform(get("/api/transport-systems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportSystem() throws Exception {
        // Initialize the database
        transportSystemService.save(transportSystem);

        int databaseSizeBeforeUpdate = transportSystemRepository.findAll().size();

        // Update the transportSystem
        TransportSystem updatedTransportSystem = transportSystemRepository.findById(transportSystem.getId()).get();
        // Disconnect from session so that the updates on updatedTransportSystem are not directly saved in db
        em.detach(updatedTransportSystem);
        updatedTransportSystem
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .validToDate(UPDATED_VALID_TO_DATE)
            .modDate(UPDATED_MOD_DATE)
            .modUser(UPDATED_MOD_USER);

        restTransportSystemMockMvc.perform(put("/api/transport-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransportSystem)))
            .andExpect(status().isOk());

        // Validate the TransportSystem in the database
        List<TransportSystem> transportSystemList = transportSystemRepository.findAll();
        assertThat(transportSystemList).hasSize(databaseSizeBeforeUpdate);
        TransportSystem testTransportSystem = transportSystemList.get(transportSystemList.size() - 1);
        assertThat(testTransportSystem.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testTransportSystem.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTransportSystem.getValidToDate()).isEqualTo(UPDATED_VALID_TO_DATE);
        assertThat(testTransportSystem.getModDate()).isEqualTo(UPDATED_MOD_DATE);
        assertThat(testTransportSystem.getModUser()).isEqualTo(UPDATED_MOD_USER);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportSystem() throws Exception {
        int databaseSizeBeforeUpdate = transportSystemRepository.findAll().size();

        // Create the TransportSystem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportSystemMockMvc.perform(put("/api/transport-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transportSystem)))
            .andExpect(status().isBadRequest());

        // Validate the TransportSystem in the database
        List<TransportSystem> transportSystemList = transportSystemRepository.findAll();
        assertThat(transportSystemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportSystem() throws Exception {
        // Initialize the database
        transportSystemService.save(transportSystem);

        int databaseSizeBeforeDelete = transportSystemRepository.findAll().size();

        // Delete the transportSystem
        restTransportSystemMockMvc.perform(delete("/api/transport-systems/{id}", transportSystem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransportSystem> transportSystemList = transportSystemRepository.findAll();
        assertThat(transportSystemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportSystem.class);
        TransportSystem transportSystem1 = new TransportSystem();
        transportSystem1.setId(1L);
        TransportSystem transportSystem2 = new TransportSystem();
        transportSystem2.setId(transportSystem1.getId());
        assertThat(transportSystem1).isEqualTo(transportSystem2);
        transportSystem2.setId(2L);
        assertThat(transportSystem1).isNotEqualTo(transportSystem2);
        transportSystem1.setId(null);
        assertThat(transportSystem1).isNotEqualTo(transportSystem2);
    }
}
