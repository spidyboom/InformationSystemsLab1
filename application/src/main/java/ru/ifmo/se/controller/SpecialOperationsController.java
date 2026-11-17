package ru.ifmo.se.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.dto.response.FlatResponse;
import ru.ifmo.se.model.Furnish;
import ru.ifmo.se.service.SpecialOperationsService;

import java.util.List;

@RestController
@RequestMapping("/api/special")
public class SpecialOperationsController {

    private final SpecialOperationsService service;

    public SpecialOperationsController(SpecialOperationsService service) {
        this.service = service;
    }

    @DeleteMapping("/delete-one-by-furnish")
    public ResponseEntity<Integer> deleteOneByFurnish(@RequestParam Furnish furnish) {
        Integer deletedId = service.deleteOneByFurnish(furnish);
        return deletedId == null ? ResponseEntity.noContent().build() : ResponseEntity.ok(deletedId);
    }

    @GetMapping("/count-by-furnish")
    public Long countByFurnish(@RequestParam Furnish furnish) {
        return service.countByFurnish(furnish);
    }

    @GetMapping("/by-name-prefix")
    public List<FlatResponse> byNamePrefix(@RequestParam String prefix) {
        return service.findByNamePrefix(prefix);
    }

    @GetMapping("/most-expensive-without-balcony")
    public ResponseEntity<FlatResponse> mostExpensive() {
        FlatResponse r = service.findMostExpensiveWithoutBalcony();
        return r == null ? ResponseEntity.noContent().build() : ResponseEntity.ok(r);
    }

    @GetMapping("/total-price")
    public Long totalPrice() {
        return service.getTotalPrice();
    }
}