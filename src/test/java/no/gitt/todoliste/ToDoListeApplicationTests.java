package no.gitt.todoliste;

import no.gitt.todoliste.model.Todo;
import no.gitt.todoliste.repository.TodoRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ToDoListeApplicationTests {

	@Autowired
	TodoRepository todoRepository;

	@Test
	public void contextLoads() {
	}

	@Test
	public void databaseTest() {
		Todo todo = new Todo("test",false, "06/08/2017","06/09/2017");
		Todo returTodo = todoRepository.save(todo);
		Assert.assertEquals(todo,returTodo);
	}

}
