package ru.ifmo.se.dto.request;

import ru.ifmo.se.model.Furnish;
import ru.ifmo.se.model.Transport;
import jakarta.validation.constraints.*;

public record FlatCreateRequest(
        @NotBlank(message = "name cannot be empty")
        String name,

        @NotNull(message = "coordinatesId is required")
        Integer coordinatesId,

        @Positive(message = "area must be > 0")
        long area,

        @NotNull @Positive(message = "price must be > 0")
        Integer price,

        @NotNull(message = "balcony cannot be null")
        Boolean balcony,

        @Positive(message = "timeToMetroOnFoot must be > 0")
        long timeToMetroOnFoot,

        @Positive(message = "numberOfRooms must be > 0")
        Integer numberOfRooms,

        @Positive(message = "floor must be > 0")
        Long floor,

        Furnish furnish,
        Transport transport,

        Long houseId
) {}
