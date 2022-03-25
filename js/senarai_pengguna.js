$("#reg-users").click(function(){
    $("#divSenarai").prop('class','box collapse');
    $("#divRegister").prop("class","box");
    // $("#liRekodBaru").removeClass('collapse');
    // saveLog(window.sessionStorage.id,"View Tetapan Modul.",window.sessionStorage.browser);
});

$("#list-users").click(function(){
    window.sessionStorage.removeItem("regno_kad_pengenalan");
    window.sessionStorage.removeItem("regFK_jenis_pengguna");
    window.sessionStorage.removeItem("contentregister");
    window.location.reload();
    // $("#liRekodBaru").removeClass('collapse');
    // saveLog(window.sessionStorage.id,"View Tetapan Modul.",window.sessionStorage.browser);
});

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Nama" },
    { "name": "emel", "title": "Emel", "breakpoints": "md sm xs" },
    { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
    { "name": "notel", "title": "No. Tel.", "breakpoints": "md sm xs" },
    { "name": "tarikh_lahir", "title": "Tarikh Lahir", "breakpoints": "md sm xs" },
    { "name": "nama_negara", "title": "Negara", "breakpoints": "lg md sm xs" },
    { "name": "nama_negeri", "title": "Negeri", "breakpoints": "lg md sm xs" },
    { "name": "nama_jantina", "title": "Jantina", "breakpoints": "lg md sm xs" },
    { "name": "nama_warganegara", "title": "Warganegara", "breakpoints": "lg md sm xs" },
    { "name": "nama_bangsa", "title": "Bangsa", "breakpoints": "lg md sm xs" },
    { "name": "nama_etnik", "title": "Etnik", "breakpoints": "lg md sm xs" },
    { "name": "nama_agama", "title": "Agama", "breakpoints": "lg md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "lg md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_pentadbir/public/usersListKerajaan",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let convertList = JSON.stringify(response.data);
    $("#dataListKerajaan").val(convertList);
    var list = [];
    let bil = 1;

    $.each(response.data, function (i, field) {
        t_lahir = new Date(field.tarikh_lahir);        
        list.push({
            id: field.id, nama: field.nama, emel: field.emel, no_kad_pengenalan: field.no_kad_pengenalan, 
            notel: field.notel, tarikh_lahir: t_lahir.getDate() + "/" + (t_lahir.getMonth() + 1) + "/" + t_lahir.getFullYear(), nama_negara: field.nama_negara,
            nama_negeri: field.nama_negeri, nama_jantina: field.nama_jantina, nama_warganegara: field.nama_warganegara,
            nama_bangsa: field.nama_bangsa, nama_etnik: field.nama_etnik, nama_agama: field.nama_agama, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#usersListKerajaan").footable({
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

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Nama" },
    { "name": "emel", "title": "Emel", "breakpoints": "md sm xs" },
    { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
    { "name": "notel", "title": "No. Tel.", "breakpoints": "md sm xs" },
    { "name": "tarikh_lahir", "title": "Tarikh Lahir", "breakpoints": "md sm xs" },
    { "name": "nama_negara", "title": "Negara", "breakpoints": "lg md sm xs" },
    { "name": "nama_negeri", "title": "Negeri", "breakpoints": "lg md sm xs" },
    { "name": "nama_jantina", "title": "Jantina", "breakpoints": "lg md sm xs" },
    { "name": "nama_warganegara", "title": "Warganegara", "breakpoints": "lg md sm xs" },
    { "name": "nama_bangsa", "title": "Bangsa", "breakpoints": "lg md sm xs" },
    { "name": "nama_etnik", "title": "Etnik", "breakpoints": "lg md sm xs" },
    { "name": "nama_agama", "title": "Agama", "breakpoints": "lg md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "lg md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_pentadbir/public/usersListSwasta",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let convertList = JSON.stringify(response.data);
    $("#dataListSwasta").val(convertList);
    var list = [];
    let bil = 1;

    $.each(response.data, function (i, field) {
        t_lahir = new Date(field.tarikh_lahir);        
        list.push({
            id: field.id, nama: field.nama, emel: field.emel, no_kad_pengenalan: field.no_kad_pengenalan, 
            notel: field.notel, tarikh_lahir: t_lahir.getDate() + "/" + (t_lahir.getMonth() + 1) + "/" + t_lahir.getFullYear(), nama_negara: field.nama_negara,
            nama_negeri: field.nama_negeri, nama_jantina: field.nama_jantina, nama_warganegara: field.nama_warganegara,
            nama_bangsa: field.nama_bangsa, nama_etnik: field.nama_etnik, nama_agama: field.nama_agama, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#usersListSwasta").footable({
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

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama", "title": "Nama" },
    { "name": "emel", "title": "Emel", "breakpoints": "md sm xs" },
    { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
    { "name": "notel", "title": "No. Tel.", "breakpoints": "md sm xs" },
    { "name": "tarikh_lahir", "title": "Tarikh Lahir", "breakpoints": "md sm xs" },
    { "name": "nama_negara", "title": "Negara", "breakpoints": "lg md sm xs" },
    { "name": "nama_negeri", "title": "Negeri", "breakpoints": "lg md sm xs" },
    { "name": "nama_jantina", "title": "Jantina", "breakpoints": "lg md sm xs" },
    { "name": "nama_warganegara", "title": "Warganegara", "breakpoints": "lg md sm xs" },
    { "name": "nama_bangsa", "title": "Bangsa", "breakpoints": "lg md sm xs" },
    { "name": "nama_etnik", "title": "Etnik", "breakpoints": "lg md sm xs" },
    { "name": "nama_agama", "title": "Agama", "breakpoints": "lg md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "lg md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_pentadbir/public/usersListPelajar",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let convertList = JSON.stringify(response.data);
    $("#dataListPelajar").val(convertList);
    var list = [];
    let bil = 1;

    $.each(response.data, function (i, field) {
        t_lahir = new Date(field.tarikh_lahir);        
        list.push({
            id: field.id, nama: field.nama, emel: field.emel, no_kad_pengenalan: field.no_kad_pengenalan, 
            notel: field.notel, tarikh_lahir: t_lahir.getDate() + "/" + (t_lahir.getMonth() + 1) + "/" + t_lahir.getFullYear(), nama_negara: field.nama_negara,
            nama_negeri: field.nama_negeri, nama_jantina: field.nama_jantina, nama_warganegara: field.nama_warganegara,
            nama_bangsa: field.nama_bangsa, nama_etnik: field.nama_etnik, nama_agama: field.nama_agama, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#usersListPelajar").footable({
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
    $('#upt_nama_user').val(data[indexs].nama_user);   

    $("#update-user").modal("show");
    
}

// FUNCTION REGISTER
var confirmed = false;
if (window.sessionStorage.regFK_jenis_pengguna == '1')    {
    window.sessionStorage.contentregister = "./html/kerajaan";
    $('#contentRegister').load('./html/kerajaan.html');
    // document.getElementById("kerajaan").classList.add("show");
    // document.getElementById("kerajaan").classList.add("active");
} else if (window.sessionStorage.regFK_jenis_pengguna == '2')    {
    window.sessionStorage.contentregister = "./html/swasta";
    $('#contentRegister').load('./html/swasta.html');
    // document.getElementById("swasta").classList.add("show");
    // document.getElementById("swasta").classList.add("active");
} else if (window.sessionStorage.regFK_jenis_pengguna == '3')    {
    window.sessionStorage.contentregister = "./html/pelajar";
    $('#contentRegister').load('./html/pelajar.html');
    // document.getElementById("pelajar").classList.add("show");
    // document.getElementById("pelajar").classList.add("active");
}
document.getElementById("no_kad_pengenalan_semak").focus();
if ((typeof window.sessionStorage.regno_kad_pengenalan !== 'undefined') && typeof window.sessionStorage.regFK_jenis_pengguna == 'undefined') {
    document.getElementById("checkic").classList.add("hidden");
    document.getElementById("checkic2").classList.remove("hidden");
    document.getElementById("FK_jenis_pengguna").focus();
    document.getElementById("no_kad_pengenalan_daftar").value = window.sessionStorage.regno_kad_pengenalan;
    $("#divSenarai").prop('class','box collapse');
    $("#divRegister").prop("class","box");
}

if ((typeof window.sessionStorage.regno_kad_pengenalan !== 'undefined') && typeof window.sessionStorage.regFK_jenis_pengguna !== 'undefined') {
    document.getElementById("checkic").classList.add("hidden");
    document.getElementById("aftercheckic").classList.remove("hidden"); 
    $("#divSenarai").prop('class','box collapse');
    $("#divRegister").prop("class","box");  
}

$("#checkusers").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let regno_kad_pengenalan = $("#no_kad_pengenalan_semak").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",regno_kad_pengenalan);

        // console.log(nama_user)
        var settings = {
            "url": host+"api_pentadbir/public/users",
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
            // console.log(result);
            if (!result.success) {
                swal({
                    title: "Semak Pengguna",
                    text: "Sila Masukkan Kategori Pengguna",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.regno_kad_pengenalan = regno_kad_pengenalan;
                    window.location.reload();   
                });
            } else  {                
                swal({
                    title: "Semak Pengguna",
                    text: "No Kad Pengenalan " + regno_kad_pengenalan + " telah berdaftar di dalam sistem.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();
                });
            }
        });
    }
});

$("#checkusers2").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let regFK_jenis_pengguna = $("#FK_jenis_pengguna").val();
        let FK_jenis_pengguna_text = $("#FK_jenis_pengguna").text();
        swal({
            title: "Daftar Pengguna",
            text: "Sila lengkapkan butiran pendaftaran.",
            type: "question",
            confirmButtonText: "Teruskan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            sessionStorage.regFK_jenis_pengguna = regFK_jenis_pengguna;
            window.location.reload();   
        });
    }
});

//Dropdown Jenis Pengguna List
var settings = {
    "url": host+"api_pengguna/public/jenispenggunasList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_jenis_pengguna').empty();
        $('#FK_jenis_pengguna').append($('<option>', { 
            value: "",
            text : "Pilih Kategori Pengguna" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_jenis_pengguna').append($('<option>', { 
                value: item.id,
                text : item.jenis_pengguna 
            }));
        });
        
    });
// END Dropdown Jenis Pengguna List

//FUNCTION UPDATE

$("#update").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini User",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_user = $("#upt_nama_user").val();
            let statusrekod = "EDT";

            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_user", upt_nama_user);

            var settings = {
                "url": host+"api_public/public/usersUpdate",
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
                        title: "Kemaskini User",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        window.location.reload();        
                    });
                }
                swal({
                    title: "Kemaskini User",
                    text: "Berjaya!",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.location.reload();        
                });

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
            title: "Hapus User",
            text: "Anda Pasti Untuk Hapus?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_public/public/usersDelete",
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
                        title: "Hapus User",
                        text: "Gagal!",
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        window.location.reload();        
                    });
                }
                swal({
                    title: "Hapus User",
                    text: "Berjaya!",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.location.reload();        
                });

            });
        });

}