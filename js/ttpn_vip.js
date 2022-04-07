$(function () {
    $.ajaxSetup({
        cache: false
    });
    tableVip();
    gelaranList();
});

function tableVip() {
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_vip", "title": "Nama Vip" },
        { "name": "jawatan_vip", "title": "Jawatan Vip", "breakpoints": "md sm xs" },
        { "name": "status_rekod", "title": "Status", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var settings = {
        "url": host + "api_public/public/vipsListAll",
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
            if (field.vipstatusrekod == '1') {
                checked = 'checked';
                badge = 'badge-success';
                text_statusrekod = 'Aktif';
            } else {
                badge = 'badge-danger';
                text_statusrekod = 'Tidak Aktif';
            }
            list.push({
                id: field.id_vip, nama_vip: field.nama_gelaran + " " + field.nama_vip, jawatan_vip: field.jawatan_vip, bil: bil++,
                status_rekod: '<label class="adomx-switch-2 success"><input type="checkbox" id="status_sistem" class="form-control mb-20" ' + checked + ' onclick="del_rekod(\'' + field.id_vip + '\')"> <i class="lever"></i> <span id="text_statusrekod' + field.id_vip + '" class="badge ' + badge + '">' + text_statusrekod + '</span></label>',
                upt_btn: '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
            });
        });

        $("#vipList").footable({
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

function gelaranList() {
    //Dropdown Gelaran List
    var settings = {
        "url": host + "api_public/public/gelaransList",
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_gelaran').empty();
        $('#FK_gelaran').append($('<option>', {
            value: "",
            text: "Pilih Gelaran"
        }));
        $.each(response.data, function (i, item) {
            $('#FK_gelaran').append($('<option>', {
                value: item.id_gelaran,
                text: item.nama_gelaran
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_gelaran').empty();
        $('#upt_FK_gelaran').append($('<option>', {
            value: "",
            text: "Pilih Gelaran"
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_gelaran').append($('<option>', {
                value: item.id_gelaran,
                text: item.nama_gelaran
            }));
        });

    });
    // END Dropdown Gelaran List
}

function loadData(indexs) {

    let data = JSON.parse($("#dataList").val());
    $('#upt_id').val(data[indexs].id_vip);
    $('#upt_nama_vip').val(data[indexs].nama_vip);
    $('#upt_jawatan_vip').val(data[indexs].jawatan_vip);
    $('#upt_FK_gelaran').val(data[indexs].FK_gelaran);
    saveLog(window.sessionStorage.id, "View Data of [id = " + data[indexs].id_vip + "]" + data[indexs].nama_vip + " at Tetapan VIP.", window.sessionStorage.browser);

    $("#update-vip").modal("show");
    document.getElementById("upt_nama_vip").focus();
}

$("#reg-vip").on('shown.bs.modal', function(){
    $(this).find('#nama_vip').focus();
});

$("#update-vip").on('shown.bs.modal', function(){
    $(this).find('#upt_nama_vip').focus();
});

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Vip",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let nama_vip = $("#nama_vip").val();
            let jawatan_vip = $("#jawatan_vip").val();
            let FK_gelaran = $("#FK_gelaran").val();
            var param = {
                twmTitle: nama_vip,
                twmDescription: FK_gelaran,
            }
            // console.log(param)
            var form = new FormData();
            form.append("nama_vip", nama_vip);
            form.append("jawatan_vip", jawatan_vip);
            form.append("FK_gelaran", FK_gelaran);
            form.append("created_by", window.sessionStorage.id);
            form.append("updated_by", window.sessionStorage.id);
            form.append("statusrekod", "1");
            // console.log(nama_vip)
            var settings = {
                "url": host + "api_public/public/addVips",
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
                    swal({
                        title: "Daftar VIP",
                        text: result.message + " " + result.data,
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                $("#reg-vip").modal("hide");
                                tableFormat();      
                            }
                        }
                    );
                } else {
                    swal({
                        title: "Daftar VIP",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id, "Register Data [" + nama_vip + "] at Tetapan VIP.", window.sessionStorage.browser);
                                $("#reg-vip").modal("hide");
                                tableFormat();      
                            }
                        }
                    );
                }
            });

        });
    }
});

//FUNCTION UPDATE

$("#update").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Vip",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {
            let upt_id = $("#upt_id").val();
            let upt_nama_vip = $("#upt_nama_vip").val();
            let upt_jawatan_vip = $("#upt_jawatan_vip").val();
            let upt_FK_gelaran = $("#upt_FK_gelaran").val();

            var form = new FormData();
            form.append("id_vip", upt_id);
            form.append("nama_vip", upt_nama_vip);
            form.append("jawatan_vip", upt_jawatan_vip);
            form.append("FK_gelaran", upt_FK_gelaran);
            form.append("updated_by", window.sessionStorage.id);

            var settings = {
                "url": host + "api_public/public/vipsUpdate",
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
                        title: "Kemaskini VIP",
                        text: result.message + " " + result.data,
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                $("#update-vip").modal("hide");
                                tableVip();
                            }
                        }
                    );
                } else {
                    swal({
                        title: "Kemaskini VIP",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000
                    }).then(function () { },
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id, "Update Data for [id = " + upt_id + "]" + upt_nama_vip + " at Tetapan VIP.", window.sessionStorage.browser);
                                $("#update-vip").modal("hide");
                                tableVip();
                            }
                        }
                    );
                }
            });

        });
    }
});

// FUNCTION DELETE

function del_rekod(i) {
    let id = i;

    var form = new FormData();
    form.append("id_vip", id);

    var settings = {
        "url": host + "api_public/public/vipsDelete",
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
                title: "Hapus Vip",
                text: "Gagal!",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function () {
                sessionStorage.token = result.token;
                window.location.reload();
            });
        }
        if (result.data.statusrekod == 1) {
            $('#text_statusrekod' + result.data.id_vip).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else {
            $('#text_statusrekod' + result.data.id_vip).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog(window.sessionStorage.id, "Change Record Status for [id_vip = " + id + "] at Tetapan VIP.", window.sessionStorage.browser);
    });
}