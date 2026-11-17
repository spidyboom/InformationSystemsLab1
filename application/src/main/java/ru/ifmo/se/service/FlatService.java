package ru.ifmo.se.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.ifmo.se.dto.request.FlatCreateRequest;
import ru.ifmo.se.dto.request.FlatUpdateRequest;
import ru.ifmo.se.dto.response.FlatResponse;

public interface FlatService {
    FlatResponse create(FlatCreateRequest request);

    FlatResponse findById(Integer id);

    Page<FlatResponse> findAll(String nameFilter, Pageable pageable);

    FlatResponse update(Integer id, FlatUpdateRequest request);

    void delete(Integer id);
}