$(function(){
    $.ajaxSetup ({
        cache: false
    });
    tablePeranan();
    tableCapaian();
    tablePengguna();
    
});

$("#capaian").click(function () {
    $('#buttonCapaian').removeClass('hidden');
    $('#buttonPeranan').addClass('hidden');
    $('#buttonPengguna').addClass('hidden');
});
$("#peranan").click(function () {
    $('#buttonPeranan').removeClass('hidden');
    $('#buttonCapaian').addClass('hidden');
    $('#buttonPengguna').addClass('hidden');
});
$("#pengguna").click(function () {
    $('#buttonPengguna').removeClass('hidden');
    $('#buttonPeranan').addClass('hidden');
    $('#buttonCapaian').addClass('hidden');
});

function tablePeranan() {
    var columsPeranan = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_peranan", "title": "Nama Peranan" },
        { "name": "nama_senarai", "title": "Senarai Capaian", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var settings = {
        "url": host + "api_pentadbir/public/perananList",
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataListPeranan").val(convertList);
        var list = [];
        var senarai_capaian = "";
        let bil = 1;
        let nama_submodul = "";
        $.each(response.data, function (i, field) {
            senarai_capaian = "";
            let inc = 1;
            while (inc <= 7)    {
                switch(inc) {
                    case 1: nama_submodul = "<b>Tetapan</b>: "; break;
                    case 2: nama_submodul = "<b>Senarai Program</b>: "; break;
                    case 3: nama_submodul = "<b>Senarai Permohonan</b>: "; break;
                    case 4: nama_submodul = "<b>Laporan</b>: "; break;
                    case 5: nama_submodul = "<b>Senarai Pengguna</b>: "; break;
                    case 6: nama_submodul = "<b>Peranan & Capaian</b>: "; break;
                    case 7: nama_submodul = "<b>Jejak Audit</b>: "; break;
                }
                senarai_capaian = senarai_capaian + nama_submodul; 
                // console.log(senarai_capaian)
                if (field.FK_capaian.indexOf('C'+inc) >= 0)
                    senarai_capaian = senarai_capaian + "Create, ";
                if (field.FK_capaian.indexOf('R'+inc) >= 0)
                    senarai_capaian = senarai_capaian + "Read, ";
                if (field.FK_capaian.indexOf('U'+inc) >= 0)
                    senarai_capaian = senarai_capaian + "Update, ";
                if (field.FK_capaian.indexOf('D'+inc) >= 0)
                    senarai_capaian = senarai_capaian + "Delete, ";
                senarai_capaian = senarai_capaian + "<br>";
                inc++;
            }
            // console.log(senarai_capaian)
            list.push({
                id: field.id_peranan,
                nama_peranan: field.nama_peranan,
                nama_senarai: '<p style="white-space: pre-line">'+senarai_capaian+"</p>", 
                bil: bil++,
                "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' 
                            // '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_peranan+'\')"><i class="ti-trash"></i>'
            });
        });
    
        $("#listPeranan").footable({
            "columns": columsPeranan,
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
}

function tableCapaian() {
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_peranan", "title": "Nama Peranan" },
        { "name": "nama", "title": "Nama Pegawai", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var settings = {
        "url": host + "api_pentadbir/public/capaianList",
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataList").val(convertList);
        var list = [];
        $.each(response.data, function (i, field) {
            let bil = 1;
            list.push({
                id: field.id_capaian,
                nama_peranan: field.nama_peranan,
                nama: field.nama,
                bil: bil++,
                "upt_btn":  '<button class="button button-box button-sm button-primary" style="display: none;" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                            '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_capaian+'\')"><i class="ti-trash"></i>'
            });
        });
    
        $("#listCapaian").footable({
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
}

function tablePengguna(){
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama", "title": "Nama" },
        { "name": "jenis_pengguna", "title": "Sektor" },
        { "name": "nama_peranan", "title": "Peranan" },
        { "name": "emel", "title": "Emel", "breakpoints": "md sm xs" },
        { "name": "no_kad_pengenalan", "title": "No. K/P", "breakpoints": "md sm xs" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "lg md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];
    var settings = {
        "url": host + "api_pentadbir/public/usersListAll",
        "method": "GET",
        "timeout": 0,
      };
    
    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataListPengguna").val(convertList);
        var list = [];
        let bil = 1;
    
        $.each(response.data, function (i, field) {
            t_lahir = new Date(field.tarikh_lahir);        
            list.push({
                id: field.id_users, nama: field.nama, emel: field.emel, no_kad_pengenalan: field.no_kad_pengenalan, 
                notel: field.notel, jenis_pengguna: field.jenis_pengguna, nama_peranan: field.nama_peranan, 
                bil: bil++,
                "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                            '<button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_users+'\')"><i class="ti-trash"></i>'
            });
        });
    
        $("#listPengguna").footable({
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

function loadData(indexs){   

    let data = JSON.parse($("#dataListPeranan").val());
    
    $('#upt_id').val(data[indexs].id_peranan);
    $('#upt_nama_peranan').val(data[indexs].nama_peranan);   
    
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id_peranan + "] at Tetapan Admin Pengguna.",window.sessionStorage.browser);

    $("#update-peranan").modal("show");  

    $('input[type=checkbox]').prop('checked',false);
    var upt_FK_capaian = [];

    listmodul = sessionStorage.listsubmodule.split(",");
    listcapaian = data[indexs].FK_capaian.split(",");
    listproses = ['C','R','U','D'];

    for(var c=0;c<listcapaian.length;c++){
        for(var m=0;m<listmodul.length;m++){

            for(var p=0;p<listproses.length;p++){

                var curprocess = listproses[p]+""+listmodul[m];
                
                if(listcapaian[c].indexOf(curprocess) >= 0){

                    $('#upt_'+curprocess).prop('checked',true);
                    
                }
                
            }
            
        }
    }

}

$('#FK_users').change(function(){
    var settings = {
        "url": host+"api_pentadbir/public/usersgovsIntan/"+$("#FK_users").val(),
        "method": "GET",
        "timeout": 0,
      };
    $.ajax(settings).done(function (response) {
        // alert(response.data)
        $("#FK_user").val(response.data.id_users);
        $("#FK_kampus").val(response.data.FK_kampus);
        $("#FK_kluster").val(response.data.FK_kluster);
        $("#FK_subkluster").val(response.data.FK_subkluster);
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

$("#registerPeranan").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Peranan Pengguna",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-peranan").modal("hide");
            let FK_capaian = [];
            let nama_peranan = $("#nama_peranan").val();
            $.each(jQuery("input[name='crud']:checked"), function() {
                FK_capaian.push({FK_capaian: jQuery(this).val()});
            });
            var stringFK_capaian = JSON.stringify(FK_capaian);
            
            // var param = {
            //     twmTitle: nama_peranan,
            //     twmDescription: FK_capaian,
            // }
            // console.log(param)
                        
            var form = new FormData();
            form.append("nama_peranan",nama_peranan);
            form.append("FK_submodul","0");
            form.append("FK_capaian",stringFK_capaian);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);
            
            var settings = {
                "url": host+"api_pentadbir/public/addPeranan",
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
                    console.log(result)
                    swal({
                        title: "Daftar Peranan Pengguna",
                        text: result.message,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        sessionStorage.token = result.token;
                        // window.location.reload();      
                    });
                } else  {
                    saveLog(window.sessionStorage.id,"Register Data [nama_peranan: "+ nama_peranan +"], [FK_capaian: "+ FK_capaian +"],  at Tetapan Peranan & Capaian.",window.sessionStorage.browser);
                    // window.location.reload();  
                }                
            });
        });
    }
});

$("#updatePeranan").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Peranan Pengguna",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#reg-peranan").modal("hide");
            let FK_capaian = [];
            let upt_id = $("#upt_id").val();
            let nama_peranan = $("#upt_nama_peranan").val();
            $.each(jQuery("input[name='upt_crud']:checked"), function() {
                FK_capaian.push({FK_capaian: jQuery(this).val()});
            });
            var stringFK_capaian = JSON.stringify(FK_capaian);
            
            // var param = {
            //     twmTitle: nama_peranan,
            //     twmDescription: FK_capaian,
            // }
            // console.log(param)
                        
            var form = new FormData();
            form.append("id_peranan",upt_id);
            form.append("nama_peranan",nama_peranan);
            form.append("FK_submodul","0");
            form.append("FK_capaian",stringFK_capaian);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);
            
            var settings = {
                "url": host+"api_pentadbir/public/perananUpdate",
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
                    console.log(result)
                    swal({
                        title: "Kemaskini Peranan Pengguna",
                        text: result.message,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        sessionStorage.token = result.token;
                        // window.location.reload();      
                    });
                } else  {
                    saveLog(window.sessionStorage.id,"Update Data [nama_peranan: "+ nama_peranan +"], [FK_capaian: "+ FK_capaian +"],  at Tetapan Peranan & Capaian.",window.sessionStorage.browser);
                    window.location.reload();  
                }                
            });
        });
    }
});

$("#registerCapaian").on('submit',function(e){
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
            $("#reg-capaian").modal("hide");
            let FK_users = $('#FK_user').val();
            let FK_peranan = $('#FK_peranan').val();
                        
            var form = new FormData();
            form.append("FK_users",FK_users);
            form.append("FK_peranan",FK_peranan);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);

            var param = {
                twmTitle: FK_users,
                twmDescription: FK_peranan,
            }
            console.log(param)
            
            var settings = {
                "url": host+"api_pentadbir/public/addCapaian",
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
                        title: "Daftar Capaian Pengguna",
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
                    saveLog(window.sessionStorage.id,"Register Data [FK_peranan: "+ FK_peranan +"], [FK_users: "+ FK_users +"],  at Tetapan Peranan & Capaian.",window.sessionStorage.browser);
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
                // console.log(response)
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
                // console.log(response)
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
                value: item.id_kampus,
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
                value: item.id_kampus,
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
                value: item.id_kluster,
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
                value: item.id_kluster,
                text : item.nama_kluster 
            }));
        });
        
    });
// END Dropdown Kluster List

//Dropdown Subkluster List
var settings = {
    "url": host+"api_public/public/subklustersList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_subkluster').empty();
        $('#FK_subkluster').append($('<option>', { 
            value: "",
            text : "Pilih Subkluster" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_subkluster').append($('<option>', { 
                value: item.id_subkluster,
                text : item.nama_subkluster 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_subkluster').empty();
        $('#upt_FK_subkluster').append($('<option>', { 
            value: "",
            text : "Pilih Subkluster" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_subkluster').append($('<option>', { 
                value: item.id_subkluster,
                text : item.nama_subkluster 
            }));
        });
        
    });
// END Dropdown Subkluster List

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
                value: item.id_unit,
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
                value: item.id_unit,
                text : item.nama_unit 
            }));
        });
        
    });
// END Dropdown Unit List

//Dropdown Peranan List
var settings = {
    "url": host+"api_pentadbir/public/perananList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_peranan').empty();
        $('#FK_peranan').append($('<option>', { 
            value: "",
            text : "Pilih Peranan" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_peranan').append($('<option>', { 
                value: item.id_peranan,
                text : item.nama_peranan 
            }));
        });

        //LIST OPTION UPDATE
        $('#upt_FK_peranan').empty();
        $('#upt_FK_peranan').append($('<option>', { 
            value: "",
            text : "Pilih Peranan" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_FK_peranan').append($('<option>', { 
                value: item.id_peranan,
                text : item.nama_peranan 
            }));
        });
        
    });
// END Dropdown Peranan List

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

//Checkbox Submodul List
sessionStorage.listsubmodule = [];
var listsubmodule = [];
var settings = {
    "url": host + "api_public/public/submodulsList",
    "method": "GET",
    "timeout": 0,
};
// console.log(checkboxval);
$.ajax(settings).done(function (response) {
    //LIST OPTION
    $.each(response.data, function (i, item) {
        $('#FK_capaian').append($('<table width="100%">'+
                                        '<tbody>'+
                                            '<tr>'+
                                                '<td width="30%"><label class="adomx-checkbox">'+ item.nama_submodul +'</label></td>'+
                                                '<td width="10%"><label class="adomx-checkbox"><input class="form-control" type="checkbox" name="crud" value="C'+ item.id_submodul +'" id="c'+ item.id_submodul +'"/> <i class="icon"></i> Create</label></td>'+
                                                '<td width="10%"><label class="adomx-checkbox"><input class="form-control" type="checkbox" name="crud" value="R'+ item.id_submodul +'" id="r'+ item.id_submodul +'"/> <i class="icon"></i> Read</label></td>'+
                                                '<td width="10%"><label class="adomx-checkbox"><input class="form-control" type="checkbox" name="crud" value="U'+ item.id_submodul +'" id="u'+ item.id_submodul +'"/> <i class="icon"></i> Update</label></td>'+
                                                '<td width="10%"><label class="adomx-checkbox"><input class="form-control" type="checkbox" name="crud" value="D'+ item.id_submodul +'" id="d'+ item.id_submodul +'"/> <i class="icon"></i> Delete</label></td>'+
                                            '</tr>'+
                                        '</tbody>'+
                                    '</table>'));
        
                                    
        $('#upt_FK_capaian').append($('<table width="100%">'+
                                            '<tbody>'+
                                                '<tr>'+
                                                    '<td width="30%"><label class="adomx-checkbox">'+ item.nama_submodul +'</label></td>'+
                                                    '<td width="10%"><label class="adomx-checkbox" id="tc'+ item.id_submodul +'"><input class="form-control" type="checkbox" name="upt_crud" value="C'+ item.id_submodul +'" id="upt_C'+ item.id_submodul +'"/> <i class="icon"></i> Create</label></td>'+
                                                    '<td width="10%"><label class="adomx-checkbox" id="tr'+ item.id_submodul +'"><input class="form-control" type="checkbox" name="upt_crud" value="R'+ item.id_submodul +'" id="upt_R'+ item.id_submodul +'"/> <i class="icon"></i> Read</label></td>'+
                                                    '<td width="10%"><label class="adomx-checkbox" id="tu'+ item.id_submodul +'"><input class="form-control" type="checkbox" name="upt_crud" value="U'+ item.id_submodul +'" id="upt_U'+ item.id_submodul +'"/> <i class="icon"></i> Update</label></td>'+
                                                    '<td width="10%"><label class="adomx-checkbox" id="td'+ item.id_submodul +'"><input class="form-control" type="checkbox" name="upt_crud" value="D'+ item.id_submodul +'" id="upt_D'+ item.id_submodul +'"/> <i class="icon"></i> Delete</label></td>'+
                                                '</tr>'+
                                            '</tbody>'+
                                        '</table>'));
                                        listsubmodule.push(item.id_submodul);
    });    
    sessionStorage.listsubmodule = listsubmodule;

});
// END Checkbox Format List