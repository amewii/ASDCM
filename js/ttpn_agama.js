$("#reg-agama").on('shown.bs.modal', function(){
    $(this).find('#nama_agama').focus();
});

$("#update-agama").on('shown.bs.modal', function(){
    $(this).find('#upt_nama_agama').focus();
});

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama_agama", "title": "Nama" },
    { "name": "status_rekod", "title": "Status" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/agamasListAll",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let convertList = JSON.stringify(response.data);
    $("#dataList").val(convertList);
    var list = [];
    let bil = 1;

    $.each(response.data, function (i, field) {
        var checked;
        if (field.statusrekod == '1') {
            checked = 'checked';
            badge = 'badge-success';
            text_statusrekod = 'Aktif';
        } else  {
            badge = 'badge-danger';
            text_statusrekod = 'Tidak Aktif';   
        }
        list.push({
        id: field.id, nama_agama: field.nama_agama, bil: bil++,
        status_rekod: '<label class="adomx-switch-2 success"><input type="checkbox" id="status_sistem" class="form-control mb-20" '+checked+' onclick="del_rekod(\''+field.id+'\')"> <i class="lever"></i> <span id="text_statusrekod'+field.id+'" class="badge '+ badge +'">'+text_statusrekod+'</span></label>', 
        upt_btn:  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
        });
    });

    $("#agamaList").footable({
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

function loadData(indexs){   

    let data = JSON.parse($("#dataList").val());
    $('#upt_id').val(data[indexs].id);   
    $('#upt_nama_agama').val(data[indexs].nama_agama);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_agama + " at Tetapan Agama.",window.sessionStorage.browser);

    $("#update-agama").modal("show");
    document.getElementById("upt_nama_agama").focus();    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Agama",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-agama").modal("hide");
            let nama_agama = $("#nama_agama").val();
            
            var form = new FormData();
            form.append("nama_agama",nama_agama);
            console.log(nama_agama)
            var settings = {
                "url": host+"api_public/public/addAgamas",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                result = JSON.parse(response);
                if (!result.success) {
                    swal({
                        title: "Daftar Agama",
                        text: result.message + " " + result.data,
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                window.location.reload();     
                            }
                        }
                    );
                } else  {                    
                    swal({
                        title: "Daftar Agama",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                // sessionStorage.token = result.token;
                                saveLog(window.sessionStorage.id,"Register Data ["+ nama_agama +"] at Tetapan Agama.",window.sessionStorage.browser);
                                window.location.reload();     
                            }
                        }
                    ); 
                }
            });

        });
    }
});

//FUNCTION UPDATE

$("#update").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Agama",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_agama = $("#upt_nama_agama").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_agama", upt_nama_agama);

            var settings = {
                "url": host+"api_public/public/agamasUpdate",
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
                        title: "Kemaskini Agama",
                        text: result.message + " " + result.data,
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                window.location.reload();     
                            }
                        }
                    );
                } else {                    
                    swal({
                        title: "Kemaskini Agama",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_agama + " at Tetapan Agama.",window.sessionStorage.browser);
                                window.location.reload();     
                            }
                        }
                    );
                }
            });

        });
    }
});

// FUNCTION DELETE

function del_rekod(i){

    let statusrekod = 'DEL';
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id", id);   

    var settings = {
        "url": host+"api_public/public/agamasDelete",
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
            // Swal(result.message, result.data, "error");
            // return;
            swal({
                title: "Status Rekod",
                text: "Gagal!",
                type: "error",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 1000
            }).then(function(){
                window.location.reload();        
            });
        }
        if (result.data.statusrekod == 1)   {
            $('#text_statusrekod'+result.data.id).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else  {
            $('#text_statusrekod'+result.data.id).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog(window.sessionStorage.id,"Change Record Status for [id = " + upt_id + "]" + upt_nama_agama + " at Tetapan Agama.",window.sessionStorage.browser);
    });

}