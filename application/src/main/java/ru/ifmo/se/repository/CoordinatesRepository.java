package ru.ifmo.se.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.ifmo.se.model.Coordinates;

import java.util.List;

@Repository
public interface CoordinatesRepository extends JpaRepository<Coordinates, Integer> {
    @Query("SELECT c FROM Coordinates c WHERE c.id NOT IN (SELECT f.coordinates.id FROM Flat f)")
    List<Coordinates> findAvailable();
}
