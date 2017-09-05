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

$("#nullstillKnapp").click(function () {
    resetSearch();
});

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
        $(this).highlight(searchInput);
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