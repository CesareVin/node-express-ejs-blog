$(document).ready(function () {

    //title
    $('#txt_title').on('input', function (e) {
        var title = $('#txt_title').val();
        $("#txt_article_title").text(title);
    });

    //description
    $('#txt_description').on('input', function (e) {
        var descr = $('#txt_description').val();
        $("#txt_article_description").text(descr);
    });

    //include
    $('#txt_include').on('input', function (e) {
        var include = $('#txt_include').val();
        $("#txt_article_include").text(include);
    });

    //content
    $('#txt_content').on('input', function (e) {
        var content = $('#txt_content').val();
        /**/

        $("#txt_article_content").html(content);
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
        //hljs.initHighlightingOnLoad();
    });

    //save new articles
    $("#btn_save").click(function () {
        var tk = getUrlParameter("token");
        var article_id = $('#txt_id').html();
        var article_title = $('#txt_title').val();
        var article_descr = $('#txt_description').val();
        var article_include = $('#txt_include').val();
        var article_content = $('#txt_content').val();

        var art = {
            id: article_id,
            title: article_title,
            include: article_include,
            description: article_descr,
            content: article_content
        };
        var objectToSend = {
            article: art,
            token: tk
        };

        $.ajax({
            type: "POST",
            url: "/article",
            data: JSON.stringify(objectToSend),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                alert("Data Loaded: " + data);
            },
        });
    });

    //initialize the page
    init();



});

//
function init() {
    var title = $('#txt_title').val();
    $("#txt_article_title").text(title);

    var descr = $('#txt_description').val();
    $("#txt_article_description").text(descr);

    var include = $('#txt_include').val();
    $("#txt_article_include").text(include);

    var content = $('#txt_content').val();
    $("#txt_article_content").html(content);

    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

//get parameters from url
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};