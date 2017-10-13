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