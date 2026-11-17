package ru.ifmo.se.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.model.House;
import ru.ifmo.se.repository.HouseRepository;

import java.util.List;

@Service
@Transactional
public class HouseService {

    private final HouseRepository repository;

    public HouseService(HouseRepository repository) {
        this.repository = repository;
    }

    public House create(House house) {
        return repository.save(house);
    }

    @Transactional(readOnly = true)
    public List<House> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public House findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Дом под номером (id) " + id + " не найден"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Дом под номером (id) " + id + " не найден");
        }
        repository.deleteById(id);
    }
}