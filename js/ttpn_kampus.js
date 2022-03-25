// FUNCTION LIST

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama_kampus", "title": "Nama" },
    { "name": "alamat", "title": "Alamat", "breakpoints": "md sm xs" },
    { "name": "status_rekod", "title": "Status" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs"  },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/kampusList",
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
        if (field.kampusstatusrekod == '1') {
            checked = 'checked';
            badge = 'badge-success';
            text_statusrekod = 'Aktif';
        } else  {
            badge = 'badge-danger';
            text_statusrekod = 'Tidak Aktif';   
        }
        list.push({
            id: field.PK, nama_kampus: field.nama_kampus, alamat: '<p style="white-space: pre-line">'+field.alamat+"<br>"+field.bandar+"<br>"+field.poskod+"<br>"+field.nama_negeri+"</p>", 
            FK_negeri: field.FK_negeri, bil: bil++,
            status_rekod: '<label class="adomx-switch-2 success"><input type="checkbox" id="status_sistem" class="form-control mb-20" '+checked+' onclick="del_rekod(\''+field.PK+'\')"> <i class="lever"></i> <span id="text_statusrekod'+field.PK+'" class="badge '+ badge +'">'+text_statusrekod+'</span></label>', 
            upt_btn:  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '
        });
    });

    $("#kampusList").footable({
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
        },

    });
});

function loadData(indexs){   

    let data = JSON.parse($("#dataList").val());
    $('#upt_id').val(data[indexs].id);   
    $('#upt_nama_kampus').val(data[indexs].nama_kampus);
    $('#upt_alamat').val(data[indexs].alamat);
    $('#upt_poskod').val(data[indexs].poskod);
    $('#upt_bandar').val(data[indexs].bandar);
    $('#upt_negeri').val(data[indexs].FK_negeri);
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_kampus + " at Tetapan Kampus.",window.sessionStorage.browser);

    $("#update-kampus").modal("show");
    document.getElementById("upt_nama_kampus").focus();    
}

//FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Kampus",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-kampus").modal("hide");
            let nama_kampus = $("#nama_kampus").val();
            let alamat = $("#alamat").val();
            let poskod = $("#poskod").val();
            let bandar = $("#bandar").val();
            let negeri = $("#negeri").val();
            
            var form = new FormData();
            form.append("nama_kampus",nama_kampus);
            form.append("alamat",alamat);
            form.append("poskod",poskod);
            form.append("bandar",bandar);
            form.append("FK_negeri",negeri);
            console.log(nama_kampus)
            var settings = {
                "url": host+"api_public/public/addKampus",
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
                        title: "Daftar Kampus",
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
                        title: "Daftar Kampus",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id,"Register Data ["+ nama_kampus +"] at Tetapan Kampus.",window.sessionStorage.browser);
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
            title: "Kemaskini Kampus",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_kampus = $("#upt_nama_kampus").val();
            let upt_alamat = $("#upt_alamat").val();
            let upt_poskod = $("#upt_poskod").val();
            let upt_bandar = $("#upt_bandar").val();
            let upt_negeri = $("#upt_negeri").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_kampus", upt_nama_kampus);
            form.append("alamat", upt_alamat);
            form.append("poskod", upt_poskod);
            form.append("bandar", upt_bandar);
            form.append("FK_negeri", upt_negeri);

            var settings = {
                "url": host+"api_public/public/kampusUpdate",
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
                        title: "Kemaskini Kampus",
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
                        title: "Kemaskini Etnik",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "]" + upt_nama_kampus + " at Tetapan Kampus.",window.sessionStorage.browser);
                                window.location.reload();     
                            }
                        }
                    );
                }  
            });

        });
    }
});

//FUNCTION DELETE

function del_rekod(i){

    let statusrekod = 'DEL';
    let id = i;

    var form = new FormData();
    form.append("id", id);    

    var settings = {
        "url": host+"api_public/public/kampusDelete",
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
                title: "Hapus Kampus",
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
        if (result.data.statusrekod == 1)   {
            $('#text_statusrekod'+result.data.id).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else  {
            $('#text_statusrekod'+result.data.id).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog(window.sessionStorage.id,"Delete Data for [id = " + upt_id + "]" + upt_nama_kampus + " at Tetapan Kampus.",window.sessionStorage.browser);
    });

}

//Dropdown Negeri List
var settings = {
    "url": host + "api_public/public/negerisList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#negeri').empty();
        $('#negeri').append($('<option>', { 
            value: "",
            text : "Pilih Negeri"
        }));
        $.each(response.data, function (i, item) {
            $('#negeri').append($('<option>', { 
                value: item.id,
                text : item.nama_negeri 
            }));
        });

         //LIST OPTION UPDATE
        $('#upt_negeri').empty();
        $('#upt_negeri').append($('<option>', { 
            value: "",
            text : "Pilih Negeri"
        }));
        $.each(response.data, function (i, item) {
            $('#upt_negeri').append($('<option>', { 
                value: item.id,
                text : item.nama_negeri 
            }));
        });
        
    });
// END Dropdown Negeri List