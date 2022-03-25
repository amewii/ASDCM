var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "kod_kategori", "title": "Kod" },
    { "name": "nama_kategori", "title": "Nama" },
    { "name": "bilangan_fail", "title": "Max Bilangan Fail", "breakpoints": "md sm xs" },
    { "name": "kod_format", "title": "Format", "breakpoints": "md sm xs" },
    { "name": "saiz_fail", "title": "Saiz Fail", "breakpoints": "md sm xs" },
    { "name": "status_rekod", "title": "Status", "breakpoints": "md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_media/public/kategoriprogramListAll",
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
            id: field.id, kod_kategori: field.kod_kategori, nama_kategori: field.nama_kategori, 
            bilangan_fail: field.bilangan_fail, kod_format: field.kod_format, saiz_fail: field.saiz_fail + " MB", bil: bil++,
            status_rekod: '<label class="adomx-switch-2 success"><input type="checkbox" id="status_sistem" class="form-control mb-20" '+checked+' onclick="del_rekod(\''+field.id+'\')"> <i class="lever"></i> <span id="text_statusrekod'+field.id+'" class="badge '+ badge +'">'+text_statusrekod+'</span></label>', 
            upt_btn:  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
        });
    });

    $("#medkategoriList").footable({
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
    $('#upt_kod_kategori').val(data[indexs].kod_kategori);   
    $('#upt_nama_kategori').val(data[indexs].nama_kategori);   
    $('#upt_bilangan_fail').val(data[indexs].bilangan_fail);   
    $('#upt_checkboxformatval').val(data[indexs].kod_format);   
    $('#upt_checkboxformat').val(data[indexs].kod_format);   
    $('#upt_saiz_fail').val(data[indexs].saiz_fail); 
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_kategori + " at Tetapan Kategori Media.",window.sessionStorage.browser);
    
    const checkboxval = data[indexs].kod_format;

    // alert(kod_format)

    $("#update-medkategori").modal("show");
    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Kategori Media",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-medkategori").modal("hide");
            let kod_kategori = $("#kod_kategori").val();
            let nama_kategori = $("#nama_kategori").val();
            let bilangan_fail = $("#bilangan_fail").val();
            let saiz_fail = $("#saiz_fail").val();
            let kod_format = $('#checkboxformat [type="checkbox"]:checked').map(function () {
                return this.value;
            }).get();
            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("kod_kategori",kod_kategori);
            form.append("nama_kategori",nama_kategori);
            form.append("bilangan_fail",bilangan_fail);
            form.append("kod_format",kod_format);
            form.append("saiz_fail",saiz_fail);
            form.append("created_by",window.sessionStorage.no_kad_pengenalan);
            form.append("updated_by",window.sessionStorage.no_kad_pengenalan);
            form.append("statusrekod",'1');
            console.log(kod_format)
            var settings = {
                "url": host+"api_media/public/addKategoriprogram",
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
                        title: "Daftar Kategori Media",
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
                        title: "Daftar Kategori Media",
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
                                saveLog(window.sessionStorage.id,"Register Data ["+ nama_kategori +"] at Tetapan Kategori Media.",window.sessionStorage.browser);
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
            title: "Kemaskini Kategori Media",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_kod_kategori = $("#upt_kod_kategori").val();
            let upt_nama_kategori = $("#upt_nama_kategori").val();
            let upt_bilangan_fail = $("#upt_bilangan_fail").val();
            let upt_kod_format = $("#upt_kod_format").val();
            let upt_saiz_fail = $("#upt_saiz_fail").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("kod_kategori", upt_kod_kategori);
            form.append("nama_kategori",upt_nama_kategori);
            form.append("bilangan_fail",upt_bilangan_fail);
            form.append("kod_format",upt_kod_format);
            form.append("saiz_fail",upt_saiz_fail);
            form.append("updated_by",window.sessionStorage.no_kad_pengenalan);

            var settings = {
                "url": host+"api_media/public/kategoriprogramUpdate",
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
                    swal({
                        title: "Kemaskini Kategori Media",
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
                        title: "Kemaskini Kategori Media",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_kategori + " at Tetapan Kategori Media.",window.sessionStorage.browser);
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
    form.append("id", id);    

    var settings = {
        "url": host+"api_media/public/kategoriprogramDelete",
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
                title: "Hapus Kategori Media",
                text: "Gagal!",
                type: "error",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function(){
                window.location.reload();        
            });
        }
        if (result.data.statusrekod == 1)   {
            $('#text_statusrekod'+result.data.id).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else  {
            $('#text_statusrekod'+result.data.id).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog(window.sessionStorage.id,"Change Record Status for [id = " + id + "] at Tetapan Kategori Media.",window.sessionStorage.browser);
    });
}

//Checkbox Format List
var settings = {
    "url": host + "api_media/public/formatList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
};
// console.log(checkboxval);
$.ajax(settings).done(function (response) {
    //LIST OPTION
    $.each(response.data, function (i, item) {
        $('#checkboxformat').append($('<label class="adomx-checkbox"><input class="form-control" type="checkbox" name="kod_format[]" value="'+ item.kod_format +'" id="'+ item.kod_format +'"/> <i class="icon"></i> '+ item.kod_format +'</label>'));        
    });
    $.each(response.data, function (i, item) {
        // console.log(item.kod_format);
        $('#upt_checkboxformatval').val(item.kod_format);
        $('#upt_checkboxformat').append($('<label class="adomx-checkbox"><input class="form-control" type="checkbox" name="kod_format[]" value="'+ item.kod_format +'" id="'+ item.kod_format +'"/> <i class="icon"></i> '+ item.kod_format +'</label>'));        
    });
    
});
// END Checkbox Format List

