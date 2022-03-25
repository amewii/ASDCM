var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Pegawai" },
    { "name": "nama_kampus", "title": "Kampus", "breakpoints": "md sm xs" },
    { "name": "nama_kluster", "title": "Kluster", "breakpoints": "md sm xs" },
    { "name": "nama_unit", "title": "Unit", "breakpoints": "md sm xs" },
    { "name": "nama_modul", "title": "Modul", "breakpoints": "md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/useradminsList",
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
            id: field.PK,
            nama_kampus: '<p style="white-space: pre-line">'+field.nama_kampus+"</p>", 
            nama_kluster: '<p style="white-space: pre-line">'+field.nama_kluster+"</p>", 
            nama_unit: '<p style="white-space: pre-line">'+field.nama_unit+"</p>", 
            nama_modul: '<p style="white-space: pre-line">'+field.nama_modul+"</p>", 
            nama: '<p style="white-space: pre-line">'+field.nama+"</p>", 
            kategori: field.kategori, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" style="display: none;" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.PK+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#useradminList").footable({
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
    $('#upt_FK_kampus').val(data[indexs].FK_kampus);   
    $('#upt_FK_kluster').val(data[indexs].FK_kluster);   
    $('#upt_FK_unit').val(data[indexs].FK_unit);   
    $('#upt_FK_modul').val(data[indexs].FK_modul);   
    $('#upt_kategori').val(data[indexs].kategori);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].PK + "] at Tetapan Admin Pengguna.",window.sessionStorage.browser);

    $("#update-useradmin").modal("show");
    document.getElementById("upt_FK_kampus").focus();    
}

$('#FK_users').change(function(){
    var settings = {
        "url": host+"api_pentadbir/public/usersgovsIntan/"+$("#FK_users").val(),
        "method": "GET",
        "timeout": 0,
      };
    $.ajax(settings).done(function (response) {
        $("#FK_user").val(response.data.PK);
        $("#FK_kampus").val(response.data.FK_kampus);
        $("#FK_kluster").val(response.data.FK_kluster);
        $("#FK_unit").val(response.data.FK_unit);
    });    
})

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar User Admin",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-useradmin").modal("hide");
            let FK_kampus = $("#FK_kampus").val();
            let FK_kluster = $("#FK_kluster").val();
            let FK_unit = $("#FK_unit").val();
            let FK_modul = $("#FK_modul").val();
            let FK_users = $("#FK_user").val();
            let kategori = $("#kategori").val();
            
            // var param = {
            //     twmTitle: FK_kampus,
            //     twmDescription: FK_kluster,
            //     twmSdate: FK_unit,
            //     twmEdate: FK_modul,
            //     twmYear: kategori,
            // }
            // console.log(param)
            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("FK_kampus",FK_kampus);
            form.append("FK_kluster",FK_kluster);
            form.append("FK_unit",FK_unit);
            form.append("FK_modul",FK_modul);
            form.append("FK_users",FK_users);
            form.append("kategori",kategori);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);
            
            var settings = {
                "url": host+"api_public/public/addUseradmins",
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
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Daftar User Admin",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        sessionStorage.token = result.token;
                        window.location.reload();      
                    });
                } else  {
                    let FK_useradmin = result.data.id;
                    var settings = {
                        "url": host+"api_public/public/submoduls/" + FK_modul,
                        "method": "GET",
                        "timeout": 0,
                    };
        
                    $.ajax(settings).done(function (response) {
                        $.each(response.data, function (i, item) {
                            var formSubmodul = new FormData();
                            formSubmodul.append("FK_users",FK_users);
                            formSubmodul.append("FK_useradmin",FK_useradmin);
                            formSubmodul.append("FK_submodul",item.id);
                            formSubmodul.append("FK_capaian","1");
                            formSubmodul.append("created_by",window.sessionStorage.id);
                            formSubmodul.append("updated_by",window.sessionStorage.id);
                            formSubmodul.append("statusrekod","1");
                            var settings = {
                                "url": host+"api_public/public/addUsersubmoduls",
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "data": formSubmodul
                            };
                            $.ajax(settings).done(function (response) {});
                        });
                    });
                    // sessionStorage.token = result.token;
                    saveLog(window.sessionStorage.id,"Register Data [FK_users: "+ FK_users +"], [FK_modul: "+ FK_modul +"],  at Tetapan Admin Pengguna.",window.sessionStorage.browser);
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
            title: "Kemaskini Useradmin",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_FK_kampus = $("#upt_FK_kampus").val();
            let upt_FK_kluster = $("#upt_FK_kluster").val();
            let upt_FK_unit = $("#upt_FK_unit").val();
            let upt_FK_modul = $("#upt_FK_modul").val();
            let FK_users = $("#FK_users").val();
            let upt_kategori = $("#upt_kategori").val();

            var param = {
                twmTitle: upt_FK_kampus,
                twmDescription: upt_FK_kluster,
                twmSdate: upt_FK_unit,
                twmEdate: upt_FK_modul,
                twmYear: upt_kategori,
            }

            var form = new FormData();
            form.append("id", upt_id);
            form.append("FK_kampus",upt_FK_kampus);
            form.append("FK_kluster",upt_FK_kluster);
            form.append("FK_unit",upt_FK_unit);
            form.append("FK_modul",upt_FK_modul);
            form.append("FK_users",FK_users);
            form.append("kategori",upt_kategori);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);

            var settings = {
                "url": host+"api_public/public/useradminsUpdate",
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
                        title: "Kemaskini User Admin",
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
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "], [FK_users = " + FK_users + "], [FK_modul = " + upt_FK_modul + "] at Tetapan Admin Pengguna.",window.sessionStorage.browser);
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
            title: "Hapus Useradmin",
            text: "Anda Pasti Untuk Hapus?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/useradminsDelete",
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
                        title: "Hapus User Admin",
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
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + id + "], [FK_users = " + FK_users + "], [FK_modul = " + upt_FK_modul + "] at Tetapan Admin Pengguna.",window.sessionStorage.browser);
                window.location.reload();  
            });
        });

}

//Dropdown Kampus List
var settings = {
    "url": host+"api_public/public/kampusList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_kampus').empty();
        $('#FK_kampus').append($('<option>', { 
            value: "",
            text : "Pilih Kampus" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_kampus').append($('<option>', { 
                value: item.id,
                text : item.nama_kampus
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_kampus').empty();
        $('#upt_FK_kampus').append($('<option>', { 
            value: "",
            text : "Pilih Kluster" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_kampus').append($('<option>', { 
                value: item.id,
                text : item.nama_kampus 
            }));
        });
        
    });
// END Dropdown Kampus List

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

//Dropdown Unit List
var settings = {
    "url": host+"api_public/public/unitsList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_unit').empty();
        $('#FK_unit').append($('<option>', { 
            value: "",
            text : "Pilih Unit" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_unit').append($('<option>', { 
                value: item.PK,
                text : item.nama_unit 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_unit').empty();
        $('#upt_FK_unit').append($('<option>', { 
            value: "",
            text : "Pilih Unit" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_unit').append($('<option>', { 
                value: item.PK,
                text : item.nama_unit 
            }));
        });
        
    });
// END Dropdown Unit List

//Dropdown Modul List
var settings = {
    "url": host+"api_public/public/modulsList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_modul').empty();
        $('#FK_modul').append($('<option>', { 
            value: "",
            text : "Pilih Modul" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_modul').append($('<option>', { 
                value: item.id,
                text : item.nama_modul 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_modul').empty();
        $('#upt_FK_modul').append($('<option>', { 
            value: "",
            text : "Pilih Modul" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_modul').append($('<option>', { 
                value: item.id,
                text : item.nama_modul 
            }));
        });
        
    });
// END Dropdown Modul List

//Dropdown User List
var settings = {
    "url": host+"api_pentadbir/public/usersgovsIntanList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_userss').empty();
        $.each(response.data, function (i, item) {
            $('#FK_userss').append($('<option>', { 
                value: item.no_kad_pengenalan,
                text : item.nama
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_users').empty();
        $('#upt_FK_users').append($('<option>', { 
            value: "",
            text : "Pilih Pengguna" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_users').append($('<option>', { 
                value: item.PK,
                text : item.nama
            }));
        });
        
    });
// END Dropdown User List