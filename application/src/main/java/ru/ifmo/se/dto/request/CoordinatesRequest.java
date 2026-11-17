package ru.ifmo.se.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record CoordinatesRequest(
        @NotNull(message = "x cannot be null")
        Float x,

        @DecimalMin(value = "-504.0", inclusive = false,
                message = "y must be greater than -504")
        float y
) {}

