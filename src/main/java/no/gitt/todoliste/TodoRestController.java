package no.gitt.todoliste;

import no.gitt.todoliste.model.Todo;
import no.gitt.todoliste.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todo")
public class TodoRestController {

    @Autowired
    TodoRepository todoRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Todo> todoListe() {
        return todoRepository.findAllByOrderByOrderAsc();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Todo todoById(@PathVariable String id) {
        return todoRepository.findById(id);
    }

    @RequestMapping(method= RequestMethod.POST, value= "/order")
    public ResponseEntity<String> updateOrder(@RequestBody List<Todo> todoList) {
        for(Todo t : todoList) {
            todoRepository.save(t);
        }
        return new ResponseEntity("OK",HttpStatus.OK);
    }

    @PreAuthorize("hasRole('user') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Todo> saveTodo(@RequestBody Todo todo) {
        todoRepository.save(todo);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity<Todo> deleteTodo(@PathVariable String id) {
        Todo t = todoById(id);
        todoRepository.delete(t);
        return new ResponseEntity<>(t,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('user') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.POST, value = "toggle/{id}")
    public ResponseEntity<Todo> toggleTodo(@PathVariable String id) {
        Todo todo = todoById(id);
        if(todo.getCompleted()) {
            todo.setCompleted(false);
        } else {
            todo.setCompleted(true);
        }
        todoRepository.save(todo);
        return new ResponseEntity<>(todo,HttpStatus.OK);
    }

}
