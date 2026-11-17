package ru.ifmo.se.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.model.Coordinates;
import ru.ifmo.se.repository.CoordinatesRepository;

import java.util.List;

@Service
@Transactional
public class CoordinatesService {

    private final CoordinatesRepository repository;

    public CoordinatesService(CoordinatesRepository repository) {
        this.repository = repository;
    }

    public Coordinates create(Coordinates coordinates) {
        return repository.save(coordinates);
    }

    @Transactional(readOnly = true)
    public List<Coordinates> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Coordinates findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Координаты под номером (id) " + id + " не найдены"));
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Координаты под номером (id) " + id + " не найдены");
        }
        repository.deleteById(id);
    }
}