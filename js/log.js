$("#reg-log").on('shown.bs.modal', function(){
    $(this).find('#nama_log').focus();
});

$("#update-log").on('shown.bs.modal', function(){
    $(this).find('#upt_nama_log').focus();
});

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Nama" },
    { "name": "action_made", "title": "Perkara", "breakpoints": "md sm xs" },
    { "name": "logsTime", "title": "Masa", "breakpoints": "md sm xs" },
    // { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/logsList",
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
            id: field.id, nama: field.nama, action_made: field.action_made, logsTime: field.logsTime, bil: bil++
        });
    });

    $("#logList").footable({
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
    $('#upt_nama_log').val(data[indexs].nama_log);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_log + " at Tetapan Log.",window.sessionStorage.browser);

    $("#update-log").modal("show");
    document.getElementById("upt_nama_log").focus();    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Log",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-log").modal("hide");
            let nama_log = $("#nama_log").val();
            
            var form = new FormData();
            form.append("nama_log",nama_log);
            console.log(nama_log)
            var settings = {
                "url": host+"api_public/public/addLogs",
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
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Daftar Log",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        window.location.reload();      
                    });
                } else  {
                    // sessionStorage.token = result.token;
                    saveLog(window.sessionStorage.id,"Register Data ["+ nama_log +"] at Tetapan Log.",window.sessionStorage.browser);
                    window.location.reload();  
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
            title: "Kemaskini Log",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Kemaskini",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_log = $("#upt_nama_log").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_log", upt_nama_log);

            var settings = {
                "url": host+"api_public/public/logsUpdate",
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
                        title: "Kemaskini Log",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        window.location.reload();        
                    });
                } else {
                    saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_log + " at Tetapan Log.",window.sessionStorage.browser);
                    window.location.reload();
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
    

    swal({
            title: "Hapus Log",
            text: "Anda Pasti Untuk Hapus?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/logsDelete",
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
                        title: "Hapus Log",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        window.location.reload();        
                    });
                }
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + upt_id + "]" + upt_nama_log + " at Tetapan Log.",window.sessionStorage.browser);
                window.location.reload();  
            });
        });

}