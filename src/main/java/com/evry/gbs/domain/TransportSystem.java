package com.evry.gbs.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A TransportSystem.
 */
@Entity
@Table(name = "transport_system")
public class TransportSystem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "valid_to_date")
    private Instant validToDate;

    @Column(name = "mod_date")
    private Instant modDate;

    @Column(name = "mod_user")
    private String modUser;

    @ManyToOne
    @JsonIgnoreProperties("transportSystems")
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public TransportSystem code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public TransportSystem name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getValidToDate() {
        return validToDate;
    }

    public TransportSystem validToDate(Instant validToDate) {
        this.validToDate = validToDate;
        return this;
    }

    public void setValidToDate(Instant validToDate) {
        this.validToDate = validToDate;
    }

    public Instant getModDate() {
        return modDate;
    }

    public TransportSystem modDate(Instant modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(Instant modDate) {
        this.modDate = modDate;
    }

    public String getModUser() {
        return modUser;
    }

    public TransportSystem modUser(String modUser) {
        this.modUser = modUser;
        return this;
    }

    public void setModUser(String modUser) {
        this.modUser = modUser;
    }

    public Company getCompany() {
        return company;
    }

    public TransportSystem company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransportSystem)) {
            return false;
        }
        return id != null && id.equals(((TransportSystem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TransportSystem{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", validToDate='" + getValidToDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", modUser='" + getModUser() + "'" +
            "}";
    }
}
