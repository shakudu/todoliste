var timeout = 0;
tabellrad = $("tbody#personlist");
template = tabellrad.html();

function tabellLoad() {
    $.getJSON("/api/todo", function(data) {
        tabellrad.html("");
        data.forEach(function (t) {
            tr = $(template);
            $("td#oppgave", tr).html(t.task);
            if(t.completed) {
                var toggleButton = '<button class="toggle btn btn-sm btn-danger" value="'+t.id+'">Fullført</button>';
            } else {
                var toggleButton = '<button class="toggle btn btn-sm btn-success" value="'+t.id+'">Todo</button>';
            }
            $("td#status", tr).html(String(toggleButton));
            $("td#start", tr).html(t.tidStart);
            $("td#stopp", tr).html(t.tidStopp);
            $("td#handling", tr).html('' +
                '<button type="button" value="'+t.id+'" class="sletteknapp btn btn-sm btn-default">\n' +
                '                <span class="glyphicon glyphicon-trash"></span> Slett\n' +
                '            </button>\n' +
                '\n' +
                '            <button type="button" value="'+t.id+'" class="redigerknapp btn btn-sm btn-default">\n' +
                '                <span class="glyphicon glyphicon-edit"></span> Rediger\n' +
                '            </button>');
            tabellrad.append(tr);
        })
    }).always(function () {
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

        $(".toggle").on("click",function () {
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

        $(".redigerknapp").on("click",function () {
            console.log("Meeep");
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
    });
}

function showModal(modal)  {
    $('#' + modal).modal({
        show: true
    });
}
