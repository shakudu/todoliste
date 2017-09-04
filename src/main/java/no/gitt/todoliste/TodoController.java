package no.gitt.todoliste;

import no.gitt.todoliste.model.Todo;
import no.gitt.todoliste.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.Instant;

@EnableMongoRepositories
@Controller
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    /**
     * Fyller databasen med demodata
     */
    @Autowired
    private void instansierData() {
        todoRepository.save(new Todo("Handle melk på butikken",false));
        todoRepository.save(new Todo("Plukk opp barna i barnehagen",false));
        todoRepository.save(new Todo("Vask klær",true));
    }

    @RequestMapping("/")
    public String todoListe(Model model) {
        model.addAttribute("todoListe",todoRepository.findAllByOrderByTidDesc());
        return "liste";
    }

    @RequestMapping("/tabell")
    public String todoTabell(Model model) {
        model.addAttribute("todoListe",todoRepository.findAllByOrderByTidDesc());
        return "fragments/todo_tabell";
}


}
