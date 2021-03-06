$(function(){
    $.ajaxSetup ({
        cache: false
    });
    tableTempoh();
});

function tableTempoh(){
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "tempoh", "title": "Tempoh" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var settings = {
        "url": host + "api_media/public/tempohList",
        "method": "GET",
        "timeout": 0,
      };
    
    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataList").val(convertList);
        var list = [];
        let bil = 1;
    
        $.each(response.data, function (i, field) {
            list.push({
                id: field.id_tempoh, tempoh: field.tempoh + " Hari", bil: bil++,
                "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
                            // '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id+'\')"><i class="ti-trash"></i>'
            });
        });
    
        $("#medtempohList").footable({
            "columns": colums,
            "rows": list,
            "paging": {
                "enabled": true,
                "size": 5
            },
            "filtering": {
                "enabled": true,
                "placeholder": "Carian...",
                "dropdownTitle": "Carian untuk:",
                "class": "brown-700"
            }
        });
    });
}
    
function loadData(indexs){   

    let data = JSON.parse($("#dataList").val());
    $('#upt_id').val(data[indexs].id_tempoh);   
    $('#upt_tempoh').val(data[indexs].tempoh);

    $("#update-medtempoh").modal("show");
    
}

//FUNCTION UPDATE

var confirmed = false;

$("#update").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Tempoh Media",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_tempoh = $("#upt_tempoh").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id_tempoh", upt_id);
            form.append("tempoh", upt_tempoh);
            form.append("updated_by",window.sessionStorage.no_kad_pengenalan);

            var settings = {
                "url": host+"api_media/public/tempohUpdate",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                // console.log(response)
                result = JSON.parse(response);
                if (!result.success) {
                    swal({
                        title: "Kemaskini Tempoh",
                        text: "Gagal!",
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                $("#update-medtempoh").modal("hide");
                                tableTempoh();   
                            }
                        }
                    );
                } else {
                    swal({
                        title: "Kemaskini Tempoh",
                        text: "Berjaya!",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                $("#update-medtempoh").modal("hide");
                                tableTempoh();   
                            }
                        }
                    );
                }
            });

        });
    }
});