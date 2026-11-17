package ru.ifmo.se.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.dto.request.HouseRequest;
import ru.ifmo.se.dto.response.HouseResponse;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.mapper.HouseMapper;
import ru.ifmo.se.model.House;
import ru.ifmo.se.repository.HouseRepository;
import ru.ifmo.se.service.HouseService;

import java.util.List;

@Service
@Transactional
public class HouseServiceImpl implements HouseService {
    private final HouseRepository repository;
    private final HouseMapper mapper;

    public HouseServiceImpl(HouseRepository repository, HouseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public HouseResponse create(HouseRequest request) {
        House house = mapper.toEntity(request);
        return mapper.toResponse(repository.save(house));
    }

    @Override
    @Transactional(readOnly = true)
    public HouseResponse findById(Long id) {
        House house = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Дом не найден"));
        return mapper.toResponse(house);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HouseResponse> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Дом не найден");
        }
        repository.deleteById(id);
    }
}