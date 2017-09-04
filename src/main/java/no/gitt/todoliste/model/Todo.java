package no.gitt.todoliste.model;

import no.gitt.todoliste.helper.DateHelper;
import org.springframework.data.annotation.Id;

import java.time.Instant;

public class Todo {
    @Id
    private String id;

    private String task;
    private Boolean completed;
    private Long tid;
    private Long tidStart;
    private Long tidStopp;

    public Todo(String task, Boolean completed, Long tidStart, Long tidStopp) {
        this.task = task;
        this.completed = completed;
        this.tid = Instant.now().toEpochMilli();
        this.tidStart = tidStart;
        this.tidStopp = tidStopp;
    }

    public Todo(String task, Boolean completed, String tidStart, String tidStopp) {
        this.task = task;
        this.completed = completed;
        this.tid = Instant.now().toEpochMilli();
        this.tidStart = DateHelper.getEpochFromDatepicker(tidStart);
        this.tidStopp = DateHelper.getEpochFromDatepicker(tidStopp);
    }

    public Todo() {
        this.tid = Instant.now().toEpochMilli();
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Long getTid() {
        return tid;
    }

    public void setTid(Long tid) {
        this.tid = tid;
    }

    public String getId() {
        return id;
    }

    public Long getTidStart() {
        return tidStart;
    }

    public void setTidStart(Long tidStart) {
        this.tidStart = tidStart;
    }

    public Long getTidStopp() {
        return tidStopp;
    }

    public void setTidStopp(Long tidStopp) {
        this.tidStopp = tidStopp;
    }

}
