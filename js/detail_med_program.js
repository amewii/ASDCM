// var imglist = [];

$.fileup({
    // url: 'file/upload',
    inputID: 'upload-2',
    dropzoneID: 'upload-2-dropzone',
    queueID: 'upload-2-queue',
    lang: 'en',
    onSelect: function(file) {
        $('#multiple button').show();
    },
    onRemove: function(file, total) {
        if (file === '*' || total === 1) {
            $('#multiple button').hide();
        }
    },
    onSuccess: function(response, file_number, file) {
        // console.log(file.name+" - "+"success,");
        // console.log(file_number);
        var file_data = file;   
        var form_data = new FormData();                  
        form_data.append('file', file_data);
        form_data.append('updated_by', window.sessionStorage.id);
        $.ajax({
            url: host + 'api_media/public/programUpload/' + window.sessionStorage.med_program_id,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            method: 'post',
            timeout: 0
        });
        imglist = $('#dataList').val();
        if(imglist == ""){
            imglist = [];
        }
        else{
            imglist =  JSON.parse(JSON.parse($('#dataList').val()));
            // console.log(imglist)
        }
        imglist.push({images: window.sessionStorage.med_program_id + "_" + file.name});
        $('#dataList').val(JSON.stringify(JSON.stringify(imglist)));
        // console.log(imglist)
        var form_upload = new FormData();                  
        form_upload.append('file', JSON.stringify(imglist));
        form_upload.append('updated_by', window.sessionStorage.id);
        var settings = {
            "url": host + "api_media/public/programUpload2/" + window.sessionStorage.med_program_id,
            "method": "POST",
            "timeout": 0,
            contentType: false,
            processData: false,
            data: form_upload,
        };        
        $.ajax(settings).done(function (response) {}); 
        //api_upload_img
    },
    onError: function(event, file, file_number) {
        console.log(file.name+" - "+"error,");
        //swal error
    },
    onFinish: function(e){
        window.location.reload();
    }
});

var settings = {
    "url": host + "api_media/public/program/" + window.sessionStorage.med_program_id,
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function (response) {
    t_program = new Date(response.data.tarikh_program);
    $("#disp_id").val(response.data.PK);
    $("#upt_id").val(response.data.PK);
    $("#disp_nama_program").text(response.data.nama_program);
    $("#disp_tarikh_program").text(t_program.getDate() + "/" + (t_program.getMonth() + 1) + "/" + t_program.getFullYear());
    $("#disp_nama_kampus").text(response.data.nama_kampus);
    $("#disp_nama_kluster").text(response.data.nama_kluster);
    $("#disp_nama_unit").text(response.data.nama_unit);
    $("#disp_nama_kategori").text(response.data.nama_kategori);
    $("#disp_bilangan_fail").text(response.data.bilangan_fail);
    $("#disp_kod_format").text(response.data.kod_format);
    $("#disp_saiz_fail").text(response.data.saiz_fail);
    $("#uptid").val(response.data.PK);
    let convertList = JSON.stringify(response.data.media_path);
    $('#dataList').val(convertList);

    if(convertList == "null"){
        $('#dataList').val("");
    }
    images = JSON.parse(response.data.media_path);
    $.each(images, function (i, field) {
        
        // listImages =    '<div class="col-lg-3 col-12 mb-30 border">'+
        //                     '<div class="row adomx-checkbox-radio-group" style="padding: 10px;">'+
        //                         '<div class="row">'+
        //                             '<div class="col align-self-start hidden">'+
        //                                 '<input type="checkbox" id="img'+field.images+'" name="img'+field.images+'" value="'+field.images+'" /> <i class="icon"></i>'+
        //                             '</div>'+
        //                             '<div class="col align-self-end hidden" align="right">'+
        //                                 '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + field.images + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> '+
        //                             '</div>'+
        //                             '<label class="adomx-checkbox" for="img'+field.images+'">'+
        //                                 '<div class="col-12" align="center">'+
        //                                     '<img src="../api_asdcm/api_media/public/uploads/'+field.images+'" height="150px" alt="">'+
        //                                 '</div>'+
        //                             '</label>'+
        //                         '</div>   '+
        //                     '</div>   '+
        //                 '</div>';
        listImages =    '<div class="col-lg-3 col-12 mb-30 border">'+
                            '<div class="row adomx-checkbox-radio-group" style="padding: 10px;">'+
                                '<div class="col-12" align="center">'+
                                    '<img src="../api_asdcm/api_media/public/uploads/'+field.images+'" height="150px" alt="" onclick="loadData(\'' + field.images + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate">'+
                                '</div>'+
                            '</div>   '+
                        '</div>';
    $("#listImages").append(listImages);
    });
});

function loadData(indexs){ 
    let data = JSON.parse($("#dataList").val());
    let img = new Image();
    img.src = '../api_asdcm/api_media/public/uploads/'+indexs;
    $('#imgText').val(indexs);
    document.getElementById('imgTags').appendChild(img);
    // saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id + "]" + data[indexs].nama_agama + " at Tetapan Agama.",window.sessionStorage.browser);

    $("#tag-gambar").modal("show");
    // document.getElementById("upt_nama_agama").focus();    
}


// let data = JSON.parse(db);
console.log($('#dataList').val());
// $.each(db, function (i, field) {        
//     imglist.push({images: field.images});
// });
// console.log(imglist);

$("#closeButton").click(function () {
    const list = document.getElementById("imgTags");
    list.removeChild(list.firstElementChild);
});

$("#back").click(function () {
    if (window.sessionStorage.med_permohonan_id == 0)  {
        window.sessionStorage.content = "html/med_program";
        $('#content').load('html/med_program.html');
    } else {
        window.sessionStorage.content = "html/med_permohonan";
        $('#content').load('html/med_permohonan.html');
    }
});

var confirmed = false;
$("#taggambar").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Tag VIP",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#tag-gambar").modal("hide");
            // let media_path = $("#media_path").val();
            let id = $("#upt_id").val();
            let imgText = $("#imgText").val();
            let FK_users = $("#FK_users").val();
            // var param = {
            //     twmTitle: media_path,
            //     twmDescription: id,
            // }
            // console.log(param)
            
            var form = new FormData();
            form.append("id",id);
            form.append("imgText",imgText);
            form.append("FK_users",FK_users);
            form.append("updated_by",window.sessionStorage.id);
            
            var settings = {
                "url": host+"api_media/public/programTagging",
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
                        title: "Daftar Program",
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
                    title: "Tagging Media",
                    text: "Berjaya!",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();      
                });
            });

        });
    }
});

$("#reg-permohonan").click(function () {
    swal({
        title: "Muat Turun Media",
        text: "Anda Pasti Untuk Membuat Permohonan Muat Turun?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function(){
        $("#reg-permohonan").modal("hide");
        t_program = new Date();
        let FK_users = window.sessionStorage.id;
        let FK_program = $("#disp_id").val();
        let status_permohonan = "1";
        let tarikh_permohonan = t_program.getFullYear() + "-" + (t_program.getMonth() + 1) + "-" + t_program.getDate();
        let statusrekod = "1";
        

        // var param = {
        //     twmTitle: FK_program,
        //     twmDescription: status_permohonan,
        //     twmSdate: tarikh_permohonan,
        //     twmEdate: statusrekod,
        // }
        // console.log(param)
        
        var form = new FormData();
        // formData.append("key","mSideDiary");
        form.append("FK_users",FK_users);
        form.append("FK_program",FK_program);
        form.append("status_permohonan",status_permohonan);
        form.append("tarikh_permohonan",tarikh_permohonan);
        form.append("created_by",window.sessionStorage.id);
        form.append("updated_by",window.sessionStorage.id);
        form.append("statusrekod","1");
        
        var settings = {
            "url": host+"api_media/public/addPermohonan",
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
                    title: "Muat Turun Media",
                    text: "Permohonan Gagal!",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.location.reload();      
                });
            }
            swal({
                title: "Muat Turun Media",
                text: "Permohonan Berjaya Direkod!",
                type: "success",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function(){
                sessionStorage.token = result.token;
                window.location.reload();      
            });
        });

    });
});

// $('#FK_users').change(function(){
//     var settings = {
//         "url": host+"api_public/public/vips/"+$("#FK_users").val(),
//         "method": "GET",
//         "timeout": 0,
//       };
//     $.ajax(settings).done(function (response) {
//         $("#FK_user").val(response.data.PK);
//         $("#FK_kampus").val(response.data.FK_kampus);
//         $("#FK_kluster").val(response.data.FK_kluster);
//         $("#FK_unit").val(response.data.FK_unit);
//     });    
// })

//Dropdown User List
var settings = {
    "url": host+"api_public/public/vipsList",
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
                value: item.nama_gelaran + " " + item.nama_vip,
                text : item.nama_gelaran + " " + item.nama_vip
            }));
        });
        
    });
// END Dropdown User List