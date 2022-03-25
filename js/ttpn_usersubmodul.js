var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Pegawai" },
    { "name": "nama_modul", "title": "Nama Modul", "breakpoints": "md sm xs" },
    { "name": "nama_submodul", "title": "Nama Submodul", "breakpoints": "md sm xs" },
    { "name": "peranan", "title": "Peranan", "breakpoints": "md sm xs" },
    { "name": "nama_kampus", "title": "Nama Kampus", "breakpoints": "md sm xs" },
    { "name": "nama_kluster", "title": "Nama Kluster", "breakpoints": "md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_public/public/usersubmodulsList",
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
            nama_kluster: '<p style="white-space: pre-line">'+field.nama_kluster+"</p>", nama_capaian: field.nama_capaian, 
            nama_modul: field.nama_modul, nama: field.nama, nama_submodul: field.nama_submodul, 
            peranan: field.peranan, kategori: field.kategori, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.PK+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#usersubmodulList").footable({
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

    let datas = JSON.parse($("#dataList").val());
    $('#upt_id').val(datas[indexs].PK);   
    $('#upt_FK_users').val(datas[indexs].FK_users);   
    $('#upt_FK_useradmin').val(datas[indexs].FK_useradmin);   
    $('#upt_FK_capaian').val(datas[indexs].FK_capaian);  
    saveLog(window.sessionStorage.id,"View Data of [id = " + datas[indexs].PK + "], [FK_users = " + datas[indexs].FK_users + "] at Tetapan Agama.",window.sessionStorage.browser);
    
    var settings = {
        "url": host+"api_public/public/useradmins/" + $('#upt_FK_useradmin').val(),
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };
    console.log(settings);
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION  
        //Dropdown Sub Modul List
        // console.log(response);
        var settings = {
            "url": host+"api_public/public/submoduls/" + response.data.FK_modul,
            "method": "GET",
            "timeout": 0,
            // "header":{
            //     "Authentication": "ASDCM"+window.sessionStorage.token
            //   }
        };
        // console.log(settings);
    
            $.ajax(settings).done(function (response) {
                //LIST OPTION UPDATE
                $('#upt_FK_submodul').empty();
                $('#upt_FK_submodul').append($('<option>', { 
                    value: "",
                    text : "Pilih Sub Modul" 
                }));
                $.each(response.data, function (i, item) {
                    $('#upt_FK_submodul').append($('<option>', { 
                        value: item.id,
                        text : item.nama_submodul 
                    }));
                });
                
            });
        // END Dropdown Sub Modul List
    });

    $('#upt_FK_submodul').val(datas[indexs].FK_submodul);   
    $("#update-usersubmodul").modal("show");
    
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Capaian Pengguna",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-usersubmodul").modal("hide");
            let FK_users = $("#FK_users").val();
            let FK_useradmin = $("#FK_useradmin").val();
            let FK_submodul = $("#FK_submodul").val();
            let FK_capaian = $("#FK_capaian").val();
            
            var param = {
                twmTitle: FK_users,
                twmDescription: FK_useradmin,
                twmSdate: FK_submodul,
                twmEdate: FK_capaian,
            }
            console.log(param)
            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("FK_users",FK_users);
            form.append("FK_useradmin",FK_useradmin);
            form.append("FK_submodul",FK_submodul);
            form.append("FK_capaian",FK_capaian);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);
            form.append("statusrekod",1);
            
            var settings = {
                "url": host+"api_public/public/addUsersubmoduls",
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
                if (result.success == 'false') {
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Daftar Capaian Pengguna",
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
                saveLog(window.sessionStorage.id,"Register Data [FK_users: "+ FK_users +"], [FK_useradmin: "+ FK_useradmin +"] at Tetapan Capaian.",window.sessionStorage.browser);
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
            title: "Kemaskini Capaian Pengguna",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_FK_users = $("#upt_FK_users").val();
            let upt_FK_useradmin = $("#upt_FK_useradmin").val();
            let upt_FK_submodul = $("#upt_FK_submodul").val();
            let upt_FK_capaian = $("#upt_FK_capaian").val();
            
            var param = {
                twmTitle: upt_FK_users,
                twmDescription: upt_FK_useradmin,
                twmSdate: upt_FK_submodul,
                twmEdate: upt_FK_capaian,
            }
            console.log(param)
            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("id", upt_id);
            form.append("FK_users",upt_FK_users);
            form.append("FK_useradmin",upt_FK_useradmin);
            form.append("FK_submodul",upt_FK_submodul);
            form.append("FK_capaian",upt_FK_capaian);
            form.append("updated_by",window.sessionStorage.id);

            var settings = {
                "url": host+"api_public/public/usersubmodulsUpdate",
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
                        title: "Kemaskini Capaian Pengguna",
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
                saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "], [FK_users = " + upt_FK_users + "], [FK_useradmin = " + upt_FK_useradmin + "] at Tetapan Admin Pengguna.",window.sessionStorage.browser);
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
            title: "Hapus Capaian Pengguna",
            text: "Anda Pasti Untuk Hapus?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/usersubmodulsDelete",
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
                        title: "Hapus Capaian Pengguna",
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
                saveLog(window.sessionStorage.id,"Delete Data for [id = " + id + "] at Tetapan Admin Pengguna.",window.sessionStorage.browser);
                window.location.reload();  
            });
        });

}

//Dropdown Modul List
var settings = {
    "url": host+"api_public/public/useradminsModul/"+window.sessionStorage.id,
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
};

$.ajax(settings).done(function (response) {
    //LIST OPTION
    $('#FK_useradmin').empty();
    $('#FK_useradmin').append($('<option>', { 
        value: "",
        text : "Pilih Modul" 
    }));
    $.each(response.data, function (i, item) {
        $('#FK_useradmin').append($('<option>', { 
            value: item.PK,
            text : item.nama_modul
        }));
    });

    //LIST OPTION UPDATE
    $('#upt_FK_useradmin').empty();
    $('#upt_FK_useradmin').append($('<option>', { 
        value: "",
        text : "Pilih Modul" 
    }));
    $.each(response.data, function (i, item) {
        $('#upt_FK_useradmin').append($('<option>', { 
            value: item.PK,
            text : item.nama_modul 
        }));
    });
    
});
// END Dropdown Modul List

//Dropdown Sub Modul List
$('#FK_submodul').empty();
$('#FK_submodul').append($('<option>', { 
    value: "",
    text : "Pilih Sub Modul" 
}));

$('#FK_useradmin').change(function(){
    // console.log($('#FK_useradmin').val());

    var settings = {
        "url": host+"api_public/public/useradmins/" + $('#FK_useradmin').val(),
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };
    // console.log(settings);
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION  
        //Dropdown Sub Modul List
        console.log(response);
        var settings = {
            "url": host+"api_public/public/submoduls/" + response.data.FK_modul,
            "method": "GET",
            "timeout": 0,
            // "header":{
            //     "Authentication": "ASDCM"+window.sessionStorage.token
            //   }
        };
        console.log(settings);

            $.ajax(settings).done(function (response) {
                //LIST OPTION
                $('#FK_submodul').empty();
                $('#FK_submodul').append($('<option>', { 
                    value: "",
                    text : "Pilih Sub Modul" 
                }));
                $.each(response.data, function (i, item) {
                    $('#FK_submodul').append($('<option>', { 
                        value: item.id,
                        text : item.nama_submodul 
                    }));
                });
                               
            });
        // END Dropdown Sub Modul List
    });

    // document.getElementById("submodul").classList.remove("hidden");
    
});

$('#upt_FK_useradmin').change(function(){
    // console.log($('#upt_FK_useradmin').val());

    var settings = {
        "url": host+"api_public/public/useradmins/" + $('#upt_FK_useradmin').val(),
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };
    // console.log(settings);
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION  
        //Dropdown Sub Modul List
        console.log(response);
        var settings = {
            "url": host+"api_public/public/submoduls/" + response.data.FK_modul,
            "method": "GET",
            "timeout": 0,
            // "header":{
            //     "Authentication": "ASDCM"+window.sessionStorage.token
            //   }
        };
        console.log(settings);

            $.ajax(settings).done(function (response) {
                //LIST OPTION UPDATE
                $('#upt_FK_submodul').empty();
                $('#upt_FK_submodul').append($('<option>', { 
                    value: "",
                    text : "Pilih Sub Modul" 
                }));
                $.each(response.data, function (i, item) {
                    $('#upt_FK_submodul').append($('<option>', { 
                        value: item.id,
                        text : item.nama_submodul 
                    }));
                });
                
            });
        // END Dropdown Sub Modul List
    });

    // document.getElementById("submodul").classList.remove("hidden");
    
});

//Dropdown Capaian List
var settings = {
    "url": host+"api_public/public/capaiansList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_capaian').empty();
        $('#FK_capaian').append($('<option>', { 
            value: "",
            text : "Pilih Peranan" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_capaian').append($('<option>', { 
                value: item.id,
                text : item.peranan 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_capaian').empty();
        $('#upt_FK_capaian').append($('<option>', { 
            value: "",
            text : "Pilih Peranan" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_capaian').append($('<option>', { 
                value: item.id,
                text : item.peranan 
            }));
        });
        
    });
// END Dropdown Capaian List

//Dropdown User List
var settings = {
    "url": host+"api_pentadbir/public/usersList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_users').empty();
        $('#FK_users').append($('<option>', { 
            value: "",
            text : "Pilih Pegawai" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_users').append($('<option>', { 
                value: item.PK,
                text : item.nama 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_users').empty();
        $('#upt_FK_users').append($('<option>', { 
            value: "",
            text : "Pilih Pegawai" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_users').append($('<option>', { 
                value: item.PK,
                text : item.nama 
            }));
        });
        
    });
// END Dropdown User List