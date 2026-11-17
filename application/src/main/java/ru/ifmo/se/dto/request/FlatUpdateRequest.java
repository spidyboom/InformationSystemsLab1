package ru.ifmo.se.dto.request;

import ru.ifmo.se.model.Furnish;
import ru.ifmo.se.model.Transport;
import jakarta.validation.constraints.*;

public record FlatUpdateRequest(
        @NotBlank String name,
        @NotNull Integer coordinatesId,
        @Positive long area,
        @NotNull @Positive Integer price,
        @NotNull Boolean balcony,
        @Positive long timeToMetroOnFoot,
        @Positive Integer numberOfRooms,
        @Positive Long floor,
        Furnish furnish,
        Transport transport,
        Long houseId
) {}
