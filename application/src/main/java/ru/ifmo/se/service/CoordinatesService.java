package ru.ifmo.se.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.dto.request.CoordinatesRequest;
import ru.ifmo.se.dto.response.CoordinatesResponse;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.model.Coordinates;
import ru.ifmo.se.repository.CoordinatesRepository;

import java.util.List;

public interface CoordinatesService {
    CoordinatesResponse create(CoordinatesRequest request);
    CoordinatesResponse findById(Integer id);
    List<CoordinatesResponse> findAll();
    void delete(Integer id);
    List<CoordinatesResponse> findAvailable();
}