package ru.ifmo.se.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.dto.request.CoordinatesRequest;
import ru.ifmo.se.dto.response.CoordinatesResponse;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.mapper.CoordinatesMapper;
import ru.ifmo.se.model.Coordinates;
import ru.ifmo.se.repository.CoordinatesRepository;
import ru.ifmo.se.service.CoordinatesService;

import java.util.List;

@Service
@Transactional
public class CoordinatesServiceImpl implements CoordinatesService {
    private final CoordinatesRepository repository;
    private final CoordinatesMapper mapper;

    public CoordinatesServiceImpl(CoordinatesRepository repository, CoordinatesMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public CoordinatesResponse create(CoordinatesRequest request) {
        Coordinates coordinates = mapper.toEntity(request);
        return mapper.toResponse(repository.save(coordinates));
    }

    @Override
    @Transactional(readOnly = true)
    public CoordinatesResponse findById(Integer id) {
        Coordinates coordinates = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Координаты под номером (id) " + id + " не найдены"));
        return mapper.toResponse(coordinates);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CoordinatesResponse> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException(
                    "Координаты под номером (id) " + id + " не найдены");
        }
        repository.deleteById(id);
    }
}