var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Nama Capaian" },
    { "name": "", "title": "Nama Kluster" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/capaiansList",
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
            id: field.id, nama_capaian: field.nama_capaian, nama_kluster: field.nama_kluster, bil: bil++,
            "upt_btn":  '<button class="btn success" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ion-android-create"></i></button> ' +
                        '<button class="btn danger" title="Hapus" onclick="del_rekod(\''+field.id+'\')"><i class="ion-trash-b"></i>'
        });
    });

    $("#capaianList").footable({
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
    $('#upt_nama_capaian').val(data[indexs].nama_capaian);   
    $('#upt_FK_kluster').val(data[indexs].FK_kluster);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_capaian + " at Tetapan Capaian.",window.sessionStorage.browser);

    $("#update-capaian").modal("show");
    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Capaian",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-capaian").modal("hide");
            let nama_capaian = $("#nama_capaian").val();
            let FK_kluster = $("#FK_kluster").val();
            // let catatan = $("#catatan").val();
            // let dsemak = $("#dupdate").val();
            // let peratus = $("#peratus").val();
            // let pegawai = $("#pegawai").val();
            // let ucreate = window.sessionStorage.noanggota;
            // let json_img = $("#json_img").val();
            // let upload_1 = $("#upload_1")[0].files[0];
            // let upload_2 = $("#upload_2")[0].files[0];
            // let upload_3 = $("#upload_3")[0].files[0];

            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("nama_capaian",nama_capaian);
            form.append("FK_kluster",FK_kluster);
            // formData.append("kod",kod);
            // formData.append("file",json_img);
            // formData.append("catatan",catatan);
            // formData.append("dsemak",dsemak);
            // formData.append("peratus",peratus);
            // formData.append("pegawai",pegawai);
            // formData.append("ucreate",ucreate);
            // formData.append("token",window.sessionStorage.token);
            console.log(nama_capaian)
            var settings = {
                "url": host+"api_public/public/addCapaians",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                // console.log(response);
                result = JSON.parse(response);
                if (!result.success) {
                    Swal(result.message, result.data, "error");
                    return;
                }
                sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Register Data ["+ nama_capaian +"] at Tetapan Capaian.",window.sessionStorage.browser);
                window.location.reload();
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
            title: "Kemaskini Capaian",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_capaian = $("#upt_nama_capaian").val();
            let upt_FK_kluster = $("#upt_FK_kluster").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_capaian", upt_nama_capaian);
            form.append("FK_kluster", upt_FK_kluster);

            var settings = {
                "url": host+"api_public/public/capaiansUpdate",
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
                    Swal(result.message, result.data, "error");
                    return;
                }

                // sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_capaian + " at Tetapan Capaian.",window.sessionStorage.browser);
                window.location.reload();

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
            title: "Hapus Capaian",
            text: "Anda Pasti Untuk Hapus?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/capaiansDelete",
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
                    Swal(result.message, result.data, "error");
                    return;
                }

                // sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + upt_id + "]" + upt_nama_capaian + " at Tetapan Capaian.",window.sessionStorage.browser);
                window.location.reload();

            });
        });

}

//Dropdown Kluster List
var settings = {
    "url": host+"api_public/public/klustersList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_kluster').append($('<option>', { 
            value: "",
            text : "Pilih Kluster" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_kluster').append($('<option>', { 
                value: item.id,
                text : item.nama_kluster 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_kluster').append($('<option>', { 
            value: "",
            text : "Pilih Kluster" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_kluster').append($('<option>', { 
                value: item.id,
                text : item.nama_kluster 
            }));
        });
        
    });
// END Dropdown Kluster List