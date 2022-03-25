var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama_unit", "title": "Nama Unit" },
    { "name": "nama_kluster", "title": "Nama Kluster" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/unitsList",
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
            id: field.PK, nama_unit: field.nama_unit, nama_kluster: field.nama_kluster, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.PK+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#unitList").footable({
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
    $('#upt_id').val(data[indexs].PK);   
    $('#upt_nama_unit').val(data[indexs].nama_unit);   
    $('#upt_FK_kluster').val(data[indexs].FK_kluster);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].PK + "]" + data[indexs].nama_unit + " at Tetapan Unit.",window.sessionStorage.browser);

    $("#update-unit").modal("show");
    document.getElementById("upt_nama_unit").focus();    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Unit",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-unit").modal("hide");
            let nama_unit = $("#nama_unit").val();
            let FK_kluster = $("#FK_kluster").val();
            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("nama_unit",nama_unit);
            form.append("FK_kluster",FK_kluster);
            console.log(nama_unit)
            var settings = {
                "url": host+"api_public/public/addUnits",
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
                        title: "Daftar Unit",
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
                // sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Register Data ["+ nama_unit +"] at Tetapan Unit.",window.sessionStorage.browser);
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
            title: "Kemaskini Unit",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_unit = $("#upt_nama_unit").val();
            let upt_FK_kluster = $("#upt_FK_kluster").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_unit", upt_nama_unit);
            form.append("FK_kluster", upt_FK_kluster);

            var settings = {
                "url": host+"api_public/public/unitsUpdate",
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
                        title: "Kemaskini Unit",
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
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_unit + " at Tetapan Unit.",window.sessionStorage.browser);
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
            title: "Hapus Unit",
            text: "Anda Pasti Untuk Hapus?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/unitsDelete",
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
                        title: "Hapus Unit",
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
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + upt_id + "]" + upt_nama_unit + " at Tetapan Unit.",window.sessionStorage.browser);
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