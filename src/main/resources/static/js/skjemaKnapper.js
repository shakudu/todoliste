$(document).ready(function () {

    $("#lagreKnapp").click(function () {
        var id = $("#id").val();
        if(id) {
            var json = { "id" : id,"task": $("#textarea").val(), "completed": "false","tidStart" : $("#tidstart").val(), "tidStopp" : $("#tidstopp").val() };
        } else {
            var json = { "task": $("#textarea").val(), "completed": "false","tidStart" : $("#tidstart").val(), "tidStopp" : $("#tidstopp").val() };
        }
        $.ajax({
            type: "POST",
            url: "/api/todo",
            data: JSON.stringify(json),
            success : function() {
                displayAlert("success","OK","Ny oppgave lagt til i listen");
                nullstillSkjema();
                tabellLoad();

            },
            contentType:"application/json;charset=UTF-8",
            dataType: "json",
        });

    });

    $("#avbrytKnapp").click(function () {
        $("#textarea").val("");
    });

    $("#nyknapp").click(function () {
        nullstillSkjema();
    });

});

function nullstillSkjema() {
    $("#textarea").val("");
    $("#id").val("");
    $("#tidstopp").val("");
    $("#tidstart").val("");
}