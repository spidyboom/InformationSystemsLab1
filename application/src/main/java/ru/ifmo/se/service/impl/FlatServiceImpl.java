package ru.ifmo.se.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.dto.request.FlatCreateRequest;
import ru.ifmo.se.dto.request.FlatUpdateRequest;
import ru.ifmo.se.dto.response.FlatResponse;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.mapper.FlatMapper;
import ru.ifmo.se.model.Coordinates;
import ru.ifmo.se.model.Flat;
import ru.ifmo.se.model.House;
import ru.ifmo.se.repository.CoordinatesRepository;
import ru.ifmo.se.repository.FlatRepository;
import ru.ifmo.se.repository.HouseRepository;
import ru.ifmo.se.service.FlatService;

@Service
@Transactional
public class FlatServiceImpl implements FlatService {

    private final FlatRepository flatRepository;
    private final CoordinatesRepository coordinatesRepository;
    private final HouseRepository houseRepository;
    private final FlatMapper flatMapper;

    public FlatServiceImpl(FlatRepository flatRepository,
                           CoordinatesRepository coordinatesRepository,
                           HouseRepository houseRepository,
                           FlatMapper flatMapper) {
        this.flatRepository = flatRepository;
        this.coordinatesRepository = coordinatesRepository;
        this.houseRepository = houseRepository;
        this.flatMapper = flatMapper;
    }

    @Override
    public FlatResponse create(FlatCreateRequest request) {
        Flat flat = flatMapper.toEntity(request);
        attachRelations(flat, request.coordinatesId(), request.houseId());
        return flatMapper.toResponse(flatRepository.save(flat));
    }

    @Override
    @Transactional(readOnly = true)
    public FlatResponse findById(Integer id) {
        Flat flat = flatRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Квартира под номером (id) " + id + " не найдена"));
        return flatMapper.toResponse(flat);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FlatResponse> findAll(String nameFilter, Pageable pageable) {
        Page<Flat> page = (nameFilter == null || nameFilter.isBlank())
                ? flatRepository.findAll(pageable)
                : flatRepository.findByNameContainingIgnoreCase(nameFilter, pageable);
        return page.map(flatMapper::toResponse);
    }

    @Override
    public FlatResponse update(Integer id, FlatUpdateRequest request) {
        Flat flat = flatRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Квартира под номером (id) " + id + " не найдена"));

        flatMapper.updateEntity(request, flat);
        attachRelations(flat, request.coordinatesId(), request.houseId());

        return flatMapper.toResponse(flatRepository.save(flat));
    }

    @Override
    public void delete(Integer id) {
        if (!flatRepository.existsById(id)) {
            throw new EntityNotFoundException("Квартира под номером (id) " + id + " не найдена");
        }
        flatRepository.deleteById(id);
    }

    private void attachRelations(Flat flat, Integer coordinatesId, Long houseId) {
        Coordinates coordinates = coordinatesRepository.findById(coordinatesId)
                .orElseThrow(() -> new EntityNotFoundException("Координаты под номером (id) " + coordinatesId + " не найдена"));
        flat.setCoordinates(coordinates);

        if (houseId != null) {
            House house = houseRepository.findById(houseId)
                    .orElseThrow(() -> new EntityNotFoundException("Дом под номером (id) " + houseId + " не найдена"));
            flat.setHouse(house);
        } else {
            flat.setHouse(null);
        }
    }
}