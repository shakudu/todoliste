package no.gitt.todoliste.repository;

import no.gitt.todoliste.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findAll();
    Todo save(Todo todo);
    List<Todo> findAllByOrderByTidDesc();
    Todo findById(String id);

}