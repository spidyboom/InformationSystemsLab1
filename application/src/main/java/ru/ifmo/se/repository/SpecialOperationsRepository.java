package ru.ifmo.se.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.ifmo.se.model.Flat;

import java.util.List;

public interface SpecialOperationsRepository extends JpaRepository<Flat, Integer> {

    @Query(value = "SELECT delete_one_by_furnish(:furnish)", nativeQuery = true)
    Integer deleteOneByFurnish(@Param("furnish") String furnish);

    @Query(value = "SELECT count_by_furnish(:furnish)", nativeQuery = true)
    Long countByFurnish(@Param("furnish") String furnish);

    @Query(value = "SELECT * FROM find_by_name_prefix(:prefix)", nativeQuery = true)
    List<Flat> findByNamePrefix(@Param("prefix") String prefix);

    @Query(value = "SELECT * FROM find_most_expensive_without_balcony()", nativeQuery = true)
    Flat findMostExpensiveWithoutBalcony();

    @Query(value = "SELECT total_price()", nativeQuery = true)
    Long getTotalPrice();
}