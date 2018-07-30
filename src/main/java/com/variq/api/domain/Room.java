package com.variq.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "occupancy_limit")
    private Integer occupancyLimit;

    @Column(name = "available")
    private Boolean available;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Building building;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "room_equipment",
               joinColumns = @JoinColumn(name = "rooms_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "equipment_id", referencedColumnName = "id"))
    private Set<Equipment> equipment = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Room name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOccupancyLimit() {
        return occupancyLimit;
    }

    public Room occupancyLimit(Integer occupancyLimit) {
        this.occupancyLimit = occupancyLimit;
        return this;
    }

    public void setOccupancyLimit(Integer occupancyLimit) {
        this.occupancyLimit = occupancyLimit;
    }

    public Boolean isAvailable() {
        return available;
    }

    public Room available(Boolean available) {
        this.available = available;
        return this;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Building getBuilding() {
        return building;
    }

    public Room building(Building building) {
        this.building = building;
        return this;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public Set<Equipment> getEquipment() {
        return equipment;
    }

    public Room equipment(Set<Equipment> equipment) {
        this.equipment = equipment;
        return this;
    }

    public Room addEquipment(Equipment equipment) {
        this.equipment.add(equipment);
        equipment.getRooms().add(this);
        return this;
    }

    public Room removeEquipment(Equipment equipment) {
        this.equipment.remove(equipment);
        equipment.getRooms().remove(this);
        return this;
    }

    public void setEquipment(Set<Equipment> equipment) {
        this.equipment = equipment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Room room = (Room) o;
        if (room.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", occupancyLimit=" + getOccupancyLimit() +
            ", available='" + isAvailable() + "'" +
            "}";
    }
}
