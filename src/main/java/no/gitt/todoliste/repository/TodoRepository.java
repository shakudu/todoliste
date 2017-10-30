package no.gitt.todoliste.repository;

import no.gitt.todoliste.model.Todo;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface TodoRepository extends Repository<Todo, Long> {
    List<Todo> findAll();
    Todo save(Todo todo);
    List<Todo> findAllByOrderByTidDesc();
    List<Todo> findAllByOrderByRekkefolgeAsc();
    Todo findById(Long id);
    void deleteBy(Long id);
}