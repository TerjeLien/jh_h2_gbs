package com.evry.gbs.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "company")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "valid_from_date")
    private ZonedDateTime validFromDate;

    @Column(name = "valid_to_date")
    private ZonedDateTime validToDate;

    @Column(name = "mod_date")
    private ZonedDateTime modDate;

    @Column(name = "mod_user")
    private String modUser;

    @ManyToOne
    @JsonIgnoreProperties("companies")
    private Company removerCompany;

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

    public Company code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public Company shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public ZonedDateTime getValidFromDate() {
        return validFromDate;
    }

    public Company validFromDate(ZonedDateTime validFromDate) {
        this.validFromDate = validFromDate;
        return this;
    }

    public void setValidFromDate(ZonedDateTime validFromDate) {
        this.validFromDate = validFromDate;
    }

    public ZonedDateTime getValidToDate() {
        return validToDate;
    }

    public Company validToDate(ZonedDateTime validToDate) {
        this.validToDate = validToDate;
        return this;
    }

    public void setValidToDate(ZonedDateTime validToDate) {
        this.validToDate = validToDate;
    }

    public ZonedDateTime getModDate() {
        return modDate;
    }

    public Company modDate(ZonedDateTime modDate) {
        this.modDate = modDate;
        return this;
    }

    public void setModDate(ZonedDateTime modDate) {
        this.modDate = modDate;
    }

    public String getModUser() {
        return modUser;
    }

    public Company modUser(String modUser) {
        this.modUser = modUser;
        return this;
    }

    public void setModUser(String modUser) {
        this.modUser = modUser;
    }

    public Company getRemoverCompany() {
        return removerCompany;
    }

    public Company removerCompany(Company company) {
        this.removerCompany = company;
        return this;
    }

    public void setRemoverCompany(Company company) {
        this.removerCompany = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", shortName='" + getShortName() + "'" +
            ", validFromDate='" + getValidFromDate() + "'" +
            ", validToDate='" + getValidToDate() + "'" +
            ", modDate='" + getModDate() + "'" +
            ", modUser='" + getModUser() + "'" +
            "}";
    }
}
