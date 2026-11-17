package ru.ifmo.se.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.dto.request.FlatCreateRequest;
import ru.ifmo.se.dto.request.FlatUpdateRequest;
import ru.ifmo.se.dto.response.FlatResponse;
import ru.ifmo.se.service.FlatService;

@RestController
@RequestMapping("/api/flats")
public class FlatController {

    private final FlatService flatService;

    public FlatController(FlatService flatService) {
        this.flatService = flatService;
    }

    @GetMapping
    public Page<FlatResponse> findAll(
            @RequestParam(required = false) String name,
            Pageable pageable) {
        return flatService.findAll(name, pageable);
    }

    @GetMapping("/{id}")
    public FlatResponse findById(@PathVariable Integer id) {
        return flatService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FlatResponse create(@Valid @RequestBody FlatCreateRequest request) {
        return flatService.create(request);
    }

    @PutMapping("/{id}")
    public FlatResponse update(@PathVariable Integer id, @Valid @RequestBody FlatUpdateRequest request) {
        return flatService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        flatService.delete(id);
    }
}