var timeout = 0;

function tabellLoadCallback() {
    // https://stackoverflow.com/questions/4080497/how-can-i-listen-for-a-click-and-hold-in-jquery
    // Sletting av oppgaver.
    $(".sletteknapp").on('mousedown',function () {
        var id = $(this).val();
        $(this).closest("tr").css({
            transition : 'opacity 2.5s ease-in-out',"opacity":0
        });
        timeout = window.setTimeout(function () {
            $.ajax({
                url: '/api/todo/' + id,
                type: 'DELETE',
                success: function() {
                    tabellLoad();
                    displayAlert("danger","Slettet","Slettet oppgave fra listen")
                }
            });
        }, 2500);
    }).on('mouseup', function () {
        window.clearTimeout(timeout);
        $(this).closest("tr").css({transition : "none","opacity":1 });
    });

    // Toggleknapp
    $(".toggle").click(function () {
        var id = $(this).val();
        $.ajax({
            url: 'api/todo/toggle/' + id,
            type: 'POST',
            contentType:"application/json;charset=UTF-8",
            dataType: "json",
            success: function () {
                tabellLoad();
            }
        });
    });

    // Redigering
    $(".redigerknapp").click(function () {
        var id = $(this).val();
        $.ajax({
            url: '/api/todo/' + id,
            type: 'GET',
            success: function (todo) {
                console.log(todo);
                $("#id").val(todo.id);
                $("#textarea").val(todo.task);
                $("#tidstart").val(todo.tidStart);
                $("#tidstopp").val(todo.tidStopp);
                showModal("modal");
            },
        });
    });

}

function tabellLoad() {
    $("#tabell").load("/tabell", function () {
        tabellLoadCallback();
    });
}

function showModal(modal)  {
    $('#' + modal).modal({
        show: true
    });
}
