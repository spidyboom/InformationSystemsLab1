package ru.ifmo.se.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "coordinates")
public class Coordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Getter
    @Setter
    private Integer id;

    @NotNull
    @Column(name = "x", nullable = false)
    @Getter
    @Setter
    private Float x;

    @NotNull
    @DecimalMin(value = "-504.0", inclusive = false)
    @Column(name = "y", nullable = false)
    @Getter
    @Setter
    private Float y;
}
