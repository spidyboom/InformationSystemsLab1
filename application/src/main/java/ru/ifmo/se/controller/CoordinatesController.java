package ru.ifmo.se.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.dto.request.CoordinatesRequest;
import ru.ifmo.se.dto.response.CoordinatesResponse;
import ru.ifmo.se.service.CoordinatesService;

import java.util.List;

@RestController
@RequestMapping("/api/coordinates")
public class CoordinatesController {
    private final CoordinatesService service;

    public CoordinatesController(CoordinatesService service) {
        this.service = service;
    }

    @GetMapping
    public List<CoordinatesResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CoordinatesResponse findById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @GetMapping("/available")
    public List<CoordinatesResponse> findAvailable() {
        return service.findAvailable();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CoordinatesResponse create(@Valid @RequestBody CoordinatesRequest request) {
        return service.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}