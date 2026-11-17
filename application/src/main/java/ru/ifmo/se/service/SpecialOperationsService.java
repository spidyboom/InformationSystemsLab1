package ru.ifmo.se.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.dto.response.FlatResponse;
import ru.ifmo.se.mapper.FlatMapper;
import ru.ifmo.se.model.Flat;
import ru.ifmo.se.model.Furnish;
import ru.ifmo.se.repository.SpecialOperationsRepository;

import java.util.List;

@Service
@Transactional
public class SpecialOperationsService {

    private final SpecialOperationsRepository repository;
    private final FlatMapper flatMapper;

    public SpecialOperationsService(SpecialOperationsRepository repository, FlatMapper flatMapper) {
        this.repository = repository;
        this.flatMapper = flatMapper;
    }

    public Integer deleteOneByFurnish(Furnish furnish) {
        return repository.deleteOneByFurnish(furnish.name());
    }

    public Long countByFurnish(Furnish furnish) {
        return repository.countByFurnish(furnish.name());
    }

    @Transactional(readOnly = true)
    public List<FlatResponse> findByNamePrefix(String prefix) {
        return repository.findByNamePrefix(prefix).stream().map(flatMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public FlatResponse findMostExpensiveWithoutBalcony() {
        Flat flat = repository.findMostExpensiveWithoutBalcony();
        return flat == null ? null : flatMapper.toResponse(flat);
    }

    @Transactional(readOnly = true)
    public Long getTotalPrice() {
        return repository.getTotalPrice();
    }
}