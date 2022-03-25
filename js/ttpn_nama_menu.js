var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "modul", "title": "Nama Modul" },
    { "name": "menu", "title": "Nama Menu" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/menusList",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let convertList = JSON.stringify(response.data);
    $("#dataList").val(convertList);
    var list = [];
    let bil = 1;

    $.each(response.data, function (i, field) {
        if (field.FK_parent != '0')   {
            list.push({
                id: field.PK, modul: '<p style="white-space: pre-line">'+ field.modul +'</p>', menu: '<p style="white-space: pre-line">'+ field.menu +'</p>', bil: bil++,
                "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
            });
        }
    });

    $("#menuList").footable({
        "columns": colums,
        "rows": list,
        "paging": {
            "enabled": true,
            "size": 10
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
    $('#upt_id').val(data[indexs].PK);   
    $('#upt_modul').val(data[indexs].modul);   
    $('#upt_nama_menu').val(data[indexs].menu);   
    $('#upt_parent_menu').val(data[indexs].parent_menu);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].PK + "]" + data[indexs].menu + " at Tetapan Nama Menu.",window.sessionStorage.browser);

    $("#update-menu").modal("show");
    document.getElementById("upt_nama_menu").focus();    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Menu",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-menu").modal("hide");
            let nama_menu = $("#nama_menu").val();
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
            form.append("nama_menu",nama_menu);
            form.append("FK_kluster",FK_kluster);
            // formData.append("kod",kod);
            // formData.append("file",json_img);
            // formData.append("catatan",catatan);
            // formData.append("dsemak",dsemak);
            // formData.append("peratus",peratus);
            // formData.append("pegawai",pegawai);
            // formData.append("ucreate",ucreate);
            // formData.append("token",window.sessionStorage.token);
            console.log(nama_menu)
            var settings = {
                "url": host+"api_public/public/addMenus",
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
                        title: "Daftar Menu",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        sessionStorage.token = result.token;
                        window.location.reload();      
                    });
                }
                sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Register Data ["+ nama_menu +"] at Tetapan Nama Menu.",window.sessionStorage.browser);
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
            title: "Kemaskini Nama Menu",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_menu = $("#upt_nama_menu").val();

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_menu", upt_nama_menu);
            form.append("updated_by", window.sessionStorage.id);

            var settings = {
                "url": host+"api_public/public/menusUpdate",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                console.log(response)
                result = JSON.parse(response);
                if (!result.success) {
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Kemaskini Nama Menu",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        sessionStorage.token = result.token;
                        window.location.reload();      
                    });
                }
                sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_menu + " at Tetapan Nama Menu.",window.sessionStorage.browser);
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
            title: "Hapus Menu",
            text: "Anda Pasti Untuk Hapus?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/menusDelete",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
              };

            $.ajax(settings).done(function (response) {
                console.log(response)
                result = JSON.parse(response);
                if (!result.success) {
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Hapus Menu",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        sessionStorage.token = result.token;
                        window.location.reload();      
                    });
                }
                swal({
                    title: "Hapus Menu",
                    text: "Berjaya!",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();      
                });
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
        $('#FK_kluster').empty();
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
        $('#upt_FK_kluster').empty();
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