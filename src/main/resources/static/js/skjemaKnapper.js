$(document).ready(function () {

    $("#lagreKnapp").click(function () {
        var json = { "task": $("#textarea").val(), "completed": "false","tidStart" : $("#tidstart").val(), "tidStopp" : $("#tidstopp").val() };
        $.ajax({
            type: "POST",
            url: "/api/todo",
            data: JSON.stringify(json),
            success : function() {
                displayAlert("success","OK","Ny oppgave lagt til i listen");
                $("#textarea").val("");
                $("#tabell").load("/tabell",null,null);

            },
            contentType:"application/json;charset=UTF-8",
            dataType: "json",
        });

    });

    $("#avbrytKnapp").click(function () {
        $("#textarea").val("");
    });

});