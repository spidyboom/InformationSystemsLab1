package ru.ifmo.se.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.se.dto.request.HouseRequest;
import ru.ifmo.se.dto.response.HouseResponse;
import ru.ifmo.se.exception.EntityNotFoundException;
import ru.ifmo.se.model.House;
import ru.ifmo.se.repository.HouseRepository;

import java.util.List;

public interface HouseService {
    HouseResponse create(HouseRequest request);
    HouseResponse findById(Long id);
    List<HouseResponse> findAll();
    void delete(Long id);
}