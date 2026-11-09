package ru.ifmo.se.service;

import ru.ifmo.se.model.Flat;
import java.util.List;

public interface FlatService {
    List<Flat> findAll();
}