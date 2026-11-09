package ru.ifmo.se.service.impl;

import ru.ifmo.se.model.Flat;
import ru.ifmo.se.repository.FlatRepository;
import ru.ifmo.se.service.FlatService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlatServiceImpl implements FlatService {

    private final FlatRepository flatRepository;

    public FlatServiceImpl(FlatRepository flatRepository) {
        this.flatRepository = flatRepository;
    }

    @Override
    public List<Flat> findAll() {
        return flatRepository.findAll();
    }
}