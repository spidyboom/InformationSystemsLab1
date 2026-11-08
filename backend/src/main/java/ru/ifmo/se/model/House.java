package ru.ifmo.se.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "house")
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Getter
    @Setter
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    @Getter
    @Setter
    private String name;

    @Positive
    @NotNull
    @Max(256)
    @Column(name = "year", nullable = false)
    @Getter
    @Setter
    private Long year;

    @Positive
    @NotNull
    @Column(name = "number_of_flats_on_floor", nullable = false)
    @Getter
    @Setter
    private Long numberOfFlatsOnFloor;
}
