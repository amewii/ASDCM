var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "kod_modul", "title": "Kod Modul" },
    { "name": "nama_modul", "title": "Nama Modul" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs"  },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/modulsList",
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
            id: field.id, kod_modul: field.kod_modul, nama_modul: field.nama_modul, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-info" title="Perincian" onclick="detail(\'' + field.id + '\',\'' + i + '\')" id="btnPerincian"><i class="ti-menu"></i>'
        });
    });

    $("#modulList").footable({
        "columns": colums,
        "rows": list,
        "paging": {
            "enabled": true,
            "size": 10
        },
        "filtering": {
            "enabled": true,
            "placeholder": "Carian...",
            "dropdownTitle": "Carian untuk:"
        }
    });
});

function loadData(indexs){   

    let data = JSON.parse($("#dataList").val());
    $('#upt_id').val(data[indexs].id);
    $('#upt_kod_modul').val(data[indexs].kod_modul);
    $('#upt_nama_modul').val(data[indexs].nama_modul);
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_modul + " at Tetapan Modul.",window.sessionStorage.browser);

    $("#update-modul").modal("show");
    document.getElementById("upt_nama_modul").focus();    
}

function detail(id,indexs){
    let d = JSON.parse($("#dataList").val());
    let data = d[indexs];

    $("#nama_modult").html(data.nama_modul);
    $("#kod_modult").html(data.kod_modul);
    $("#idt").html(data.id);

    var form = new FormData();
    form.append("FK_modul", data.id);

    var settings = {
    "url": host+"api_public/public/submoduls",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
    };
    // console.log(settings)
    $.ajax(settings).done(function (response) {
    // console.log(response)
    let result = JSON.parse(response);
        $("#listProgramdet").html('');
    if(result.success){
        var columns = [
            { "name": "bil", "title": "Bil" },
            { "name": "nama_submodul", "title": "Sub Modul" },
            { "name": "upt_btn", "title": "Tindakan",'class':"text-center" }
        ];
        
        var list = [];
        
        let data = result.data;
        let bil = 1;
        // alert(data);
        let convertDetList = JSON.stringify(data);
        $("#dataDetailList").val(convertDetList);

        $.each(data,function(i,field){
            list.push({bil:bil++, id: field.id, nama_submodul:field.nama_submodul, 
            "upt_btn":'<button class="button button-box button-sm button-primary" title="Kemaskini" data-backdrop="static" data-keyboard="false"  onclick="loadDataDetail(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
            });
        });

        $("#listSubmodul").footable({
            "columns": columns,
            "rows": list,
            "paging": {
                "enabled": true,
                "size": 10
            },
            "filtering": {
                "enabled": true,
                "placeholder": "Carian...",
                "dropdownTitle": "Carian untuk:"
            }

        });
    }
    });


    $("#divPerincian").prop('class','box');
    $("#divModul").prop("class","box collapse");
    $("#liRekodBaru").addClass('collapse');
    saveLog(window.sessionStorage.id,"View Detail Data of [id = " + data.id + "]" + data.nama_modul + " at Tetapan Modul.",window.sessionStorage.browser);
}

$("#btnKembali").click(function(){
    $("#divPerincian").prop('class','box collapse');
    $("#divModul").prop("class","box");
    $("#liRekodBaru").removeClass('collapse');
    saveLog(window.sessionStorage.id,"View Tetapan Modul.",window.sessionStorage.browser);
});

function loadDataDetail(indexs) {   

    let data = JSON.parse($("#dataDetailList").val());
    // alert(data[indexs].pgm_id);
    $('#upt_nama_modul').val(data[indexs].nama_modul);
    $('#upt_nama_submodul').val(data[indexs].nama_submodul);
    $('#upt_idt').val(data[indexs].id);
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_submodul + " at Tetapan Sub Modul.",window.sessionStorage.browser);

    $("#update-per-submodul").modal("show");
}

//FUNCTION UPDATE

var confirmed = false;
$("#update").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Modul",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_kod_modul = $("#upt_kod_modul").val();
            let upt_nama_modul = $("#upt_nama_modul").val();
            let statusrekod = "1";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("kod_modul", upt_kod_modul);
            form.append("nama_modul", upt_nama_modul);
            // form.append("recordstatus", statusrekod);

            var settings = {
                "url": host+"api_public/public/modulsUpdate",
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
                        title: "Kemaskini Modul",
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
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_modul + " at Tetapan Modul.",window.sessionStorage.browser);
                window.location.reload();
            });

        });
    }
});

//FUNCTION UPDATE TERPERINCI

$("#updatet").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Sub Modul",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Kemaskini",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_idt").val();
            let upt_nama_submodul = $("#upt_nama_submodul").val();
            let statusrekod = "1";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_submodul", upt_nama_submodul);
            // form.append("recordstatus", statusrekod);

            var settings = {
                "url": host+"api_public/public/submodulsUpdate",
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
                        title: "Kemaskini Sub Modul",
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
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_submodul + " at Tetapan Sub Modul.",window.sessionStorage.browser);
                window.location.reload();  
            });

        });
    }
});

// FUNCTION DELETE

function del_rekod(i){

    let statusrekod = '0';
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id", id);
    

    swal({
            title: "Hapus Modul",
            text: "Anda Pasti Untuk Hapus?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_tetapan_picoms/public/modulsDelete",
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
                    Swal(result.message, result.data, "error");
                    return;
                }

                // sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + id + "]" + upt_nama_submodul + " at Tetapan Sub Modul.",window.sessionStorage.browser);
                window.location.reload();

            });
        });

}

// FUNCTION DELETE

function del_rekodt(i){

    let statusrekod = '0';
    let id = i;

    var form = new FormData();
    // form.append("recordstatus", statusrekod);
    form.append("id", id);
    

    swal({
            title: "Hapus Sub Modul",
            text: "Anda Pasti Untuk Hapus?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_tetapan_picoms/public/submodulsDelete",
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
                    Swal(result.message, result.data, "error");
                    return;
                }

                // sessionStorage.token = result.token;
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + id + "]" + upt_nama_submodul + " at Tetapan Sub Modul.",window.sessionStorage.browser);
                window.location.reload();

            });
        });

}