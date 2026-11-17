package ru.ifmo.se.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.dto.request.HouseRequest;
import ru.ifmo.se.dto.response.HouseResponse;
import ru.ifmo.se.model.House;
import ru.ifmo.se.service.HouseService;

import java.util.List;

@RestController
@RequestMapping("/api/houses")
public class HouseController {
    private final HouseService service;

    public HouseController(HouseService service) {
        this.service = service;
    }

    @GetMapping
    public List<HouseResponse> findAll() {  // ← DTO!
        return service.findAll();
    }

    @GetMapping("/{id}")
    public HouseResponse findById(@PathVariable Long id) {  // ← DTO!
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HouseResponse create(@Valid @RequestBody HouseRequest request) {  // ← DTO!
        return service.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}