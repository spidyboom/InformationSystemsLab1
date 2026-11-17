package ru.ifmo.se.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.ifmo.se.dto.request.CoordinatesRequest;
import ru.ifmo.se.dto.response.CoordinatesResponse;
import ru.ifmo.se.model.Coordinates;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CoordinatesMapper {

    @Mapping(target = "id", ignore = true)
    Coordinates toEntity(CoordinatesRequest request);

    CoordinatesResponse toResponse(Coordinates coordinates);
}