package ru.ifmo.se.repository;

import ru.ifmo.se.model.Flat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlatRepository extends JpaRepository<Flat, Integer> {
    // pass
}