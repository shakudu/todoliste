package no.gitt.todoliste;

import no.gitt.todoliste.model.Todo;
import no.gitt.todoliste.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

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
        todoRepository.save(new Todo("Handle melk på butikken",false, "04/09/2017","10/10/2017",1));
        todoRepository.save(new Todo("Plukk opp barna i barnehagen",false, "05/09/2017","10/10/2017",2));
        todoRepository.save(new Todo("Vask klær",true, "08/09/2017","12/09/2017"));
    }

    @RequestMapping("/")
    public String todoListe(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        model.addAttribute("username",name);
        //Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>)    SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }
}
