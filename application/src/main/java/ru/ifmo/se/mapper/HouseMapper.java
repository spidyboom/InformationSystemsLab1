package ru.ifmo.se.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.ifmo.se.dto.request.HouseRequest;
import ru.ifmo.se.dto.response.HouseResponse;
import ru.ifmo.se.model.House;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HouseMapper {
    @Mapping(target = "id", ignore = true)
    House toEntity(HouseRequest request);

    HouseResponse toResponse(House house);
}
