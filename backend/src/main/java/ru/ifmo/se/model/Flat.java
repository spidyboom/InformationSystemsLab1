package ru.ifmo.se.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "flat")
public class Flat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Getter
    @Setter
    private Integer id;

    @NotBlank
    @Column(name = "name", nullable = false)
    @Getter
    @Setter
    private String name;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "coordinates_id", nullable = false, unique = true)
    @Getter
    @Setter
    private Coordinates coordinates;

    @Column(name = "creation_date", nullable = false, updatable = false)
    @Getter
    @Setter
    private LocalDateTime creationDate;

    @Positive
    @Column(name = "area", nullable = false)
    @Getter
    @Setter
    private long area;

    @NotNull
    @Positive
    @Column(name = "price", nullable = false)
    @Getter
    @Setter
    private Integer price;

    @NotNull
    @Column(name = "balcony", nullable = false)
    @Getter
    @Setter
    private Boolean balcony;

    @Positive
    @Column(name = "time_to_metro_on_foot", nullable = false)
    @Getter
    @Setter
    private long timeToMetroOnFoot;

    @Positive
    @Column(name = "number_of_rooms")
    @Getter
    @Setter
    private Integer numberOfRooms;

    @Positive
    @Column(name = "floor")
    @Getter
    @Setter
    private Long floor;

    @Enumerated(EnumType.STRING)
    @Column(name = "furnish")
    @Getter
    @Setter
    private Furnish furnish;

    @Enumerated(EnumType.STRING)
    @Column(name = "transport")
    @Getter
    @Setter
    private Transport transport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    @Getter
    @Setter
    private House house;

    @PrePersist
    public void prePersist() {
        if (creationDate == null) {
            creationDate = LocalDateTime.now();
        }
    }
}
