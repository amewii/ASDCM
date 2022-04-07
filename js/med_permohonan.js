window.sessionStorage.med_permohonan_id = 0;
var settings = {
    "url": host + "api_media/public/tempoh/1",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function (response) {
    $('#upt_tempoh').val(response.data.tempoh);
});

$("#back").click(function () {
    window.sessionStorage.content = "med_program";
    $('#content').load('med_program.html');
});

var colums = [
    { "name": "bil", "title": "Bil" },
    { "name": "nama_program", "title": "Nama Program" },
    { "name": "nama", "title": "Nama Pemohon", "breakpoints": "md sm xs" },
    { "name": "tarikh_permohonan", "title": "Tarikh Permohonan", "breakpoints": "md sm xs" },
    { "name": "tarikh_luput", "title": "Tarikh Luput", "breakpoints": "md sm xs" },
    { "name": "nama_status", "title": "Status", "breakpoints": "md sm xs" },
    { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
    // {"name":"status","title":"Status","breakpoints":"sm xs"}
];
var settings = {
    "url": host + "api_media/public/permohonanList",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let convertList = JSON.stringify(response.data);
    $("#dataList").val(convertList);
    var list = [];
    let bil = 1;

    $.each(response.data, function (i, field) {
        t_permohonan = new Date(field.tarikh_permohonan);
        if (field.tarikh_luput == null)    {
            t_luput_list = "-";
        } else  {
            t_luput = new Date(field.tarikh_luput);
            t_luput_list = t_luput.getDate() + "/" + (t_luput.getMonth() + 1) + "/" + t_luput.getFullYear()
        }
        let badge_status = '';
        now = new Date();
        if (field.status_permohonan == '2')   {
            if (t_luput - now < 0)  {
                var form = new FormData();
                form.append("id", field.id_permohonan);
                form.append("status_permohonan","5");
                var settings = {
                    "url": host + "api_media/public/permohonanLuput",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };
                $.ajax(settings).done(function (response) {});
                badge_status = '<span class="badge badge-danger">Luput</span>';
            } else {
                badge_status = '<span class="badge badge-success">'+ field.nama_status +'</span>';
            }
        }
            else if (field.status_permohonan == '3')
                badge_status = '<span class="badge badge-danger">'+ field.nama_status +'</span>';
            else if (field.status_permohonan == '4')
                badge_status = '<span class="badge badge-danger">'+ field.nama_status +'</span>';
            else  if (field.status_permohonan == '1')
                badge_status = '<span class="badge badge-primary">'+ field.nama_status +'</span>';
            else  if (field.status_permohonan == '5')
                badge_status = '<span class="badge badge-danger">'+ field.nama_status +'</span>';
            list.push({
            id: field.PK, FK_users: field.FK_users, nama_program: field.nama_program, nama: field.nama,
            tarikh_permohonan: t_permohonan.getDate() + "/" + (t_permohonan.getMonth() + 1) + "/" + t_permohonan.getFullYear(), 
            tarikh_luput: t_luput_list, 
            nama_status: badge_status, bil: bil++,
            "upt_btn":  '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                        ' <button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.PK+'\')"><i class="ti-trash"></i>'
        });
    });

    $("#permohonanList").footable({
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
    var t_luput = new Date();
    var t_pengesahan = new Date();    
    document.getElementById("disp_nama_program").innerHTML=data[indexs].nama_program;
    document.getElementById("disp_nama").innerHTML=data[indexs].nama;
    document.getElementById("disp_tarikh_permohonan").innerHTML=t_permohonan.getDate() + "/" + (t_permohonan.getMonth() + 1) + "/" + t_permohonan.getFullYear();
    
    $('#upt_id').val(data[indexs].id_permohonan);   
    $('#upt_status_permohonan').val(data[indexs].status_permohonan);   
    $('#upt_tarikh_pengesahan').val(t_pengesahan.getFullYear() + "-" + (t_pengesahan.getMonth() + 1) + "-" + t_pengesahan.getDate());
    $('#upt_tarikh_luput').val(t_luput.getFullYear() + "-" + (t_luput.getMonth() + 1) + "-" + t_luput.getDate());   
    $('#upt_pegawai_pelulus').val(window.sessionStorage.id);   
    $('#upt_updated_by').val(window.sessionStorage.id);   
    // alert(new Date(new Date().setDate(new Date().getDate() + $('#upt_tempoh').val() - 252)));   
    
    $("#update-permohonan").modal("show");
    
}

function detail(i,indexs){
    let d = JSON.parse($("#dataList").val());
    let data = d[indexs];
    window.sessionStorage.med_program_id = data.FK_program;
    window.sessionStorage.med_permohonan_id = data.PK;
    window.sessionStorage.content = "detail_med_program";
    // $('#content').load('detail_med_permohonan.html');
    window.location.reload();
}

var confirmed = false;

//FUNCTION UPDATE

$("#update").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Permohonan",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){ 
            
            let upt_id = $("#upt_id").val();
            let upt_status_permohonan = $("#upt_status_permohonan").val();
            let upt_tarikh_pengesahan = $("#upt_tarikh_pengesahan").val();
            let upt_tarikh_luput = $("#upt_tarikh_luput").val();
            let upt_tempoh = $("#upt_tempoh").val();
            let upt_pegawai_pelulus = $("#upt_pegawai_pelulus").val();
            let upt_updated_by = $("#upt_updated_by").val();
            
            var param = {
                twmTitle: upt_id,
                twmDescription: upt_tarikh_pengesahan,
                twmSdate: upt_tarikh_luput,
                twmEdate: upt_tempoh,
                twmYear: upt_updated_by,
            }
            
            console.log(param);
            var form = new FormData();
            form.append("id_permohonan", upt_id);
            form.append("status_permohonan",upt_status_permohonan);
            form.append("tarikh_pengesahan",upt_tarikh_pengesahan);
            form.append("tarikh_luput",upt_tarikh_luput);
            form.append("tempoh",upt_tempoh);
            form.append("pegawai_pelulus",upt_pegawai_pelulus);
            form.append("updated_by",upt_updated_by);

            var settings = {
                "url": host+"api_media/public/permohonanUpdate",
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
                        title: "Kemaskini Permohonan",
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
                    title: "Kemaskini Permohonan",
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
            title: "Hapus Permohonan",
            text: "Anda Pasti Untuk Hapus?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function () {

            var settings = {
                "url": host+"api_media/public/permohonanDelete",
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
                        title: "Hapus Permohonan",
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
                    title: "Hapus Permohonan",
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

//Dropdown Kampus List
var settings = {
    "url": host+"api_media/public/statusList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION UPDATE
        $('#upt_status_permohonan').empty();
        $('#upt_status_permohonan').append($('<option>', { 
            value: "",
            text : "Pengesahan" 
        }));
        $.each(response.data, function (i, item) {
            $('#upt_status_permohonan').append($('<option>', { 
                value: item.id_status,
                text : item.nama_status 
            }));
        });
        
    });
// END Dropdown Kampus List