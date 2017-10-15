var timeout = 0;
tabellrad = $("tbody#personlist");
template = tabellrad.html();
var loginErrorMsg = "Du må logge inn for å kunne gjøre endringer i listen";

function getCSRFToken() {
    return $("meta[name='_csrf']").attr("content");
}

function getCSRFHeader() {
    return $("meta[name='_csrf_header']").attr("content");
}

function displayAlert(type,header,message) {
    var divId = "alerts";
    var html = '<div class="alert alert-' + type + ' alert-dismissable fade in" role="alert">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
        '<strong>' + header + '!</strong> ' + message +'</div>';
    $("#" + divId).html(html);
    $("#" + divId).show();
    window.setTimeout(function () {
        $('.alert').fadeOut('slow')
    },5000);
};

function nullstillSkjema() {
    $("#textarea").val("");
    $("#id").val("");
    $("#tidstopp").val("");
    $("#tidstart").val("");
}

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
            $("td#slett", tr).html('<button type="button" value="'+t.id+'" class="sletteknapp btn btn-sm btn-default">\n' +
                '                <span class="glyphicon glyphicon-trash"></span> Slett\n' +
                '            </button>');
            $("td#rediger",tr).html('<button type="button" value="'+t.id+'" class="redigerknapp btn btn-sm btn-default">\n' +
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
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(getCSRFHeader(), getCSRFToken());
                    },
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
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(getCSRFHeader(), getCSRFToken());
                },
                type: 'POST',
                contentType:"application/json;charset=UTF-8",
                dataType: "json",
                statusCode: {
                    200: function () {
                        tabellLoad();
                    },
                    401: function () {
                        displayAlert("info", "OBS!",loginErrorMsg);
                        tabellLoad();
                    }
                }
            });
        });

        $(".redigerknapp").on("click",function () {
            var id = $(this).val();
            $.ajax({
                url: '/api/todo/' + id,
                type: 'GET',
                success: function (todo) {
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

var treff = 0;
function resetSearch() {
    treff = 0;
    $("#search").val("");
    $("#nullstillKnapp").hide();
    $("#treff").hide();
    $("#tabell tr").each(function () {
        $(this).show();
    });
}

function setTreff(number) {
    $("#treff").show();
    treff = number;
    if(treff == 0) {
        $("#treff").text("Ingen oppføringer matchet søketekst.");
        if($("#search").val().length == 0 ) {
            resetSearch();
        }
    } else {
        $("#treff").text(treff + " oppføringer matchet søketekst.");
    }
}

function updatePositions() {
    var order = 1;
    var data = [];
    $("#personlist").children().each(function () {
        var id = $(this).find(".redigerknapp").val();
        var task = $(this).find("#oppgave").text();
        var start = $(this).find("#start").text();
        var stopp = $(this).find("#stopp").text();
        if($(this).find("#status").text() == "Todo") { var comp = false; }
        else { var comp = true; }
        data.push({ "order" : order ,"id" : id, "task" : task, "tidStart" : start, "tidStopp" : stopp, "completed" : comp});
        order++;
    });

    $.ajax({
        url: '/api/todo/order',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: function(xhr) {
            xhr.setRequestHeader(getCSRFHeader(), getCSRFToken());
        },
        statusCode: {
            200: function () {
                displayAlert("success", "OK","Rekkefølge lagret");
            },
            401: function () {
                displayAlert("info", "OBS!",loginErrorMsg);
                tabellLoad();
            }
        }
    });
}

$(document).ready(function () {
    tabellLoad();
    resetSearch(); // Kaller denne for å skjule "Nullstill søk"-knappen.

    $("#personlist").sortable({
        axis: "y",
        cursor: "move",
        stop: function() {
            updatePositions()
        }
    }).disableSelection();

    $("#search").keyup(function () {
        searchInput = $("#search").val();
        if(searchInput.length > 0) {
            $("#nullstillKnapp").show();
        } else {
            resetSearch();
        }

        treff = 0;

        $("#tabell tr:not(:first-child)").each(function () {
            var task = $(this).text().toLowerCase();
            //$(this).highlight(searchInput);
            if(searchInput) {
                if (task.search(searchInput.toLowerCase()) != -1) {
                    $(this).show();
                    setTreff(treff + 1);
                } else {
                    $(this).hide();
                }
            } else {
                $(this).show();
                $("#treff").hide();
            }
            setTreff(treff)
        });

    });

    var format = 'dd/mm/yy';
    $( "#tidstopp" ).datepicker({
        dateFormat : format });
    $( "#tidstart" ).datepicker({
        dateFormat : format});

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

    $("#nullstillKnapp").click(function () {
        resetSearch();
    });
});
