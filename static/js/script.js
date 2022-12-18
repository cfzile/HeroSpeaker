$(document).ready(function () {
    var dropZone = $('#upload-container');
    var files;
    $('#file-input').focus(function () {
        $('label').addClass('focus');
    })
        .focusout(function () {
            $('label').removeClass('focus');
        });

    $("#send").on("click", function () {
        // alert(files);
        sendFiles(files);
        $(".container").css("display", "none");
        $(".loading").css("display", "flex");

        var form = document.getElementById("upload-container");
        form.submit();
    });

    dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function () {
        return false;
    });

    dropZone.on('dragover dragenter', function () {
        dropZone.addClass('dragover');
        $(".switcher .item.active").addClass('dragover')
    });

    dropZone.on('dragleave', function (e) {
        let dx = e.pageX - dropZone.offset().left;
        let dy = e.pageY - dropZone.offset().top;
        if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
            dropZone.removeClass('dragover');
            $(".switcher .item.active").removeClass('dragover');
        }
    });

    dropZone.on('drop', function (e) {
        dropZone.removeClass('dragover');
        files = e.originalEvent.dataTransfer.files;
        // files = e.originalEvent.dataTransfer.files;
        // sendFiles(files);
    });

    $('#file-input').change(function () {
        files = this.files;
        loaded()
        // alert(this.files);
        // sendFiles(files);
    });

    function loaded(){
        $("#upload-audio").css("display", "none");
        $('#text_file_loaded').css("display", "inline-block");
        $('#text_choose_file').css("display", "none");
    }

    function sendFiles(files) {
        let maxFileSize = 5242880;
        let Data = new FormData();
        $(files).each(function (index, file) {
            Data.append('file', file);
        });

        var token = $('input[name="csrfmiddlewaretoken"]').attr('value');
        Data.append('csrfmiddlewaretoken', token);

        // $.ajax({
        //     url: dropZone.attr('action'),
        //     type: dropZone.attr('method'),
        //     data: Data,
        //     contentType: false,
        //     processData: false,
        //     success: function (data) {
        //         $(".loading").css("display", "none");
        //         $("#myCanvas").attr("src", data);
        //         $("#myCanvas").css("display", "flex");
        //         // alert(data);
        //         // alert('Файлы были успешно загружены!');
        //     }
        // });
    }
})