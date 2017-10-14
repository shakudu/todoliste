$(document).ready(function () {

    $("#lagreKnapp").click(function () {
        var id = $("#id").val();
        var tekst = $("#textarea").val();
        if(tekst == "") {
            $("#textarea").prop('required','true');

        } else {
            $("#textarea").removeProp('required');
            if (id) {
                var json = {
                    "id": id,
                    "task": tekst,
                    "completed": "false",
                    "tidStart": $("#tidstart").val(),
                    "tidStopp": $("#tidstopp").val()
                };
            } else {
                var json = {
                    "task": $("#textarea").val(),
                    "completed": "false",
                    "tidStart": $("#tidstart").val(),
                    "tidStopp": $("#tidstopp").val()
                };
            }
            $.ajax({
                type: "POST",
                url: "/api/todo",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(getCSRFHeader(), getCSRFToken());
                },
                data: JSON.stringify(json),
                success: function () {
                    displayAlert("success", "OK", "Ny oppgave lagt til i listen");
                    nullstillSkjema();
                    tabellLoad();
                    $("#modal").modal('toggle');
                },
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
            });
        }
    });

    $("#avbrytKnapp").click(function () {
        $("#textarea").val("");
        $("#textarea").removeProp('required');
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