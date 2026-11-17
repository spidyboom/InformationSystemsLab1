package ru.ifmo.se.dto.response;

import ru.ifmo.se.model.Furnish;
import ru.ifmo.se.model.Transport;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record FlatResponse(
        Integer id,
        String name,
        CoordinatesResponse coordinates,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime creationDate,
        long area,
        Integer price,
        Boolean balcony,
        long timeToMetroOnFoot,
        Integer numberOfRooms,
        Long floor,
        Furnish furnish,
        Transport transport,
        HouseResponse house
) {}