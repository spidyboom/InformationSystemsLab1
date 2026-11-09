package ru.ifmo.se.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record HouseRequest(
        @NotNull(message = "name cannot be null")
        String name,

        @Positive(message = "year must be > 0")
        @Max(value = 256, message = "year must be <= 256")
        Long year,

        @Positive(message = "numberOfFlatsOnFloor must be > 0")
        Long numberOfFlatsOnFloor
) {}
