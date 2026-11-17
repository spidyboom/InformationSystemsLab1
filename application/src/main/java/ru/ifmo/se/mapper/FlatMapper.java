package ru.ifmo.se.mapper;

import ru.ifmo.se.dto.request.*;
import ru.ifmo.se.dto.response.*;

import ru.ifmo.se.model.Flat;
import ru.ifmo.se.model.Coordinates;
import ru.ifmo.se.model.House;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FlatMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    @Mapping(target = "coordinates", ignore = true)
    @Mapping(target = "house", ignore = true)
    Flat toEntity(FlatCreateRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    @Mapping(target = "coordinates", ignore = true)
    @Mapping(target = "house", ignore = true)
    void updateEntity(FlatUpdateRequest request, @MappingTarget Flat flat);

    FlatResponse toResponse(Flat flat);

    CoordinatesResponse toResponse(Coordinates coordinates);

    @Mapping(target = "id", ignore = true)
    Coordinates toEntity(CoordinatesRequest request);

    HouseResponse toResponse(House house);

    @Mapping(target = "id", ignore = true)
    House toEntity(HouseRequest request);
}
