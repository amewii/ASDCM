var kod_jabatan = window.sessionStorage.jabatan;
var kod_bahagian = window.sessionStorage.bahagian;
var sebutharga_id = "";
var tender_id = "";
var kod = "";
var PK_kerja = "";
var idkerja = getUrlVars()['id'];
var capaian = 0;
var kod_get = getUrlVars()['kod'];

$(document).ready(function(){
    $("#loading_modal").modal('show');
    load_anggota('getAnggota','','',function(){
        $("#jabatan_bahagian").html(data.jabatan+", "+data.bahagian);
    });

    if(kod_get == MD5("tender")){
        idkerja = getUrlVars()['idt'];
        // tender(idkerja,'22');
        kod = "22";
    }
    else{
        // sebutharga(idkerja,'11');
        kod = "11";
    }
    let pegawai = window.sessionStorage.noanggota;

    check_capaian(19,window.sessionStorage.pentadbir_id,function(e){
        capaian = e;
       
        dokumen(idkerja,kod);
        rSideDiary(pegawai,idkerja,kod,'','',capaian);
    });

});

$("#tarikh_awal").on('change',function(){
    let tarikh_awal = $("#tarikh_awal").val();
    $("#tarikh_akhir").val(tarikh_awal);
});

$("#cetak").on('click',function(){
    let tarikh_awal = $("#tarikh_awal").val();
    let tarikh_akhir = $("#tarikh_akhir").val();
    let pegawai = window.sessionStorage.noanggota;
    if(tarikh_awal != "" && tarikh_akhir != ""){
        popUp(host+'api_projek2/cetak/cetak-laporanTapak.php?kod='+kod+'&id='+MD5(idkerja)+'&date1='+tarikh_awal+'&date2='+tarikh_akhir+'&idu='+pegawai);
    }
    else{
        swal("Tarikh","Sila Pilih Tarikh Untuk Janaan Laporan","warning");
    }
    
});

var confirmed = false;
$("#form_search").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        
        let pegawai = window.sessionStorage.noanggota;
        let tarikh_awal = $("#tarikh_awal").val();
        let tarikh_akhir = $("#tarikh_akhir").val();

        rSideDiary(pegawai,idkerja,kod,tarikh_awal,tarikh_akhir,capaian);

    }
});

function dokumen(id,kod){

    url = host+"api_iper/control/cSebutharga.php?key=sebutharga_detail";
    if(kod == "22"){
        url = host+"api_iper/control/cTender.php?key=tender_detail";
    } 
    param = {"id":id};
    $.post(url,param,function(e){
        let response = JSON.parse(e);
        if(kod == "22"){
            response = response.data;
        }
        url = host+"api_iper/control/cxBayaran.php?key=lantikan"; //get kontraktor info
        $.each(response,function(i,field){
            if(kod == "22"){
                $("#code").html(field.bil_tender);
                $("#id_pk").val(field.tender_id);
                param = {"id":field.tender_id,"kod":kod};
            }
            else if(kod == "11"){
                $("#code").html(field.bil_sebutharga);
                $("#id_pk").val(field.sebutharga_id);
                param = {"id":field.sebutharga_id,"kod":kod};
            }
            $("#amaun").html(field.harga_la);
            $("#tkerja").html(field.perihal_kerja);
            $("#peg").html(field.nama_pegawai);

            $.post(url,param,function(e){
                let results = JSON.parse(e);
                $.each(results,function(i,field){
                    PK_bayaran = field.PK_bayaran;
                    $("#tmula").html(field.tmula);
                    $("#tsiap").html(field.tsiap);
                    $("#nsyarikat").html(field.nama);
                    $("#norujuk").html(field.norujuk);
                    $("#statusrekod").html(field.statusrekod);
                    $("#btempoh").html(field.baki_tempoh);
                    $("#btempoh").prop('class','label label-md success');
                    if((field.baki_tempoh*1) < 0 && field.statusrekod == "Pelaksanaan"){
                        $("#btempoh").prop('class','label label-md danger');
                    }
                    else if((field.baki_tempoh*1) < 14){
                        $("#btempoh").prop('class','label label-md warning');
                    }
                });

                // apk(PK_bayaran,harga);
                // eot(PK_bayaran);
            });
            $("#loading_modal").modal('hide');
        });
    });
}

function rSideDiary(pegawai,FK_dokumen,kod,tarikh_awal,tarikh_akhir,capaian){
    let url = local+"cSideDiary.php";
    let param = {"key":"rSideDiary","id_pk":FK_dokumen,"pegawai":pegawai,"kod":kod,"tarikh_awal":tarikh_awal,"tarikh_akhir":tarikh_akhir,"capaian":capaian,"token":window.sessionStorage.token};
    
    $.post(url,param,function(response){
        obj = JSON.parse(response);
        // console.log(response);
        if(obj.result == "success"){
            $("#list_ltapak").html('');
            jQuery(function($){
                let ltapak = [];
                let colums = [
                    {"name":"tarikh","title":"Tarikh"},
                    {"name":"catatan","title":"Ulasan"},
                    {"name":"images","title":"Gambar Lokasi","breakpoints":"sm xs"},
                    {"name":"statusrekod","title":"Pautan","breakpoints":"sm xs"} 
                  ];
                  $.each(obj.data,function(i,field){
                    // ltapak.push({"tarikh":field.dsemak,"catatan":field.catatan+
                    // "<br>"+'<img class="img-thumbnail m-r m-b" width="200" src="../sideDiary/'+field.file+'"/>'+
                    // '<img class="img-thumbnail m-r m-b" width="200" src="../sideDiary/'+field.file2+'"/>'+
                    // '<img class="img-thumbnail m-r m-b" width="200" src="../sideDiary/'+field.file3+'"/>',
                    // "statusrekod":'<button onclick="editLtapak('+field.PK_sidediary+')" class="btn btn-outline-danger btn-sm"><i class="fa fa-remove"></i> Hapus</button>'});
                    list_img1 = "";
                    list_img2 = "";
                    list_img3 = "";

                    obj_img = JSON.parse(field.file);
                    let num = 1;
                    $.each(obj_img,function(s,img){
                        if(num == 1){
                            //<img width="100%" src="'+host+'sideDiary/'+img['images']+'"/><p class="m-t">
                            list_img1 += '<div class="m-a text-center">'+
                            '<a data-toggle="modal" class="text-info" onclick="load_img(\''+host+'sideDiary/'+img['images']+'\',\''+img['message']+'\')" data-target="#gambar_detail"><i class="fa fa-image fa-2x"></i></p></a></div>';
                            num++;
                        }
                        else if(num == 2){
                            list_img2 += '<div class="m-a text-center">'+
                            '<a data-toggle="modal" class="text-info" onclick="load_img(\''+host+'sideDiary/'+img['images']+'\',\''+img['message']+'\')" data-target="#gambar_detail"><i class="fa fa-image fa-2x"></i><p class="m-t"></p></a></div>';
                            num++;
                        }
                        else{
                            list_img3 += '<div class="m-a text-center">'+
                            '<a data-toggle="modal" class="text-info" onclick="load_img(\''+host+'sideDiary/'+img['images']+'\',\''+img['message']+'\')" data-target="#gambar_detail"><i class="fa fa-image fa-2x"></i><p class="m-t"></p></a></div>';
                            num = 1;
                        }
                        
                    })
                    ltapak.push({"tarikh":field.dsemak,"catatan":field.catatan,
                    "images":'<div class="col-md-4 m-0">'+list_img1+'</div>'+'<div class="col-md-4 m-0">'+list_img2+'</div>'+'<div class="col-md-4 m-0">'+list_img3+'</div>',
                    "statusrekod":'<button onclick="editLtapak('+field.PK_sidediary+')" class="btn btn-outline-danger btn-sm m-a"><i class="fa fa-remove"></i> Hapus</button>'+
                    '<button onclick="popUp(\''+host+'api_projek2/cetak/cetak-laporanTapak.php?idu='+window.sessionStorage.noanggota+'&kod='+kod+'&id='+MD5(FK_dokumen)+'&date1='+field.tarikh+'&date2='+field.tarikh+'&sidediary_id='+field.PK_sidediary+'&capaian=2'+'\')" class="btn btn-sm btn-outline-primary m-a"><i class="fa fa-print"></i> Cetak</button>'});
                  });

                  $("#list_ltapak").footable({
                    //data-ui-jp="footable" data-filter="#filter" data-page-size="5"
                    "columns": colums,
                    "rows": ltapak,
                    "paging":{
                        "enabled":true,
                        "size":10
                    },
                    "filtering":{
                        "enabled":true,
                        "placeholder":"Carian...",
                        "dropdownTitle": "Carian untuk:"
                    }
                    
                });
                $("#loading_modal").modal('hide');
            });
        }
        else{
            $("#loading_modal").modal('hide');
            $("#list_ltapak").html('<thead>'+
            '<tr>'+
              '<th>Tarikh</th><th>Catatan</th><th class="text-center">Gambar</th><th class="text-right">Status Rekod</th>'+
            '</tr>'+
          '</thead>'+
          '<tbody><tr class="grey-100"><td colspan="4" class="text-center"><i>Tiada Laporan Tapak Oleh Pegawai</i></td></tr></tbody>');
            swal(obj.result,"Senarai Laporan Tapak","info");
        }
        
    });
}

function load_img(val,msg){
    $("#detail_img").prop('src',val);
    $("#msg_img").html(msg);
}

function editLtapak(id){
    swal({
        title: "Laporan Tapak",
        text: "Anda Pasti Untuk Hapus?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function(){
        url = local+"cSideDiary.php";
        param = {"key":"hapus","id":id,"token":window.sessionStorage.token};
        $.post(url,param,function(response){
            obj = JSON.parse(response);
            if(obj.result == "success"){
                window.location.reload();
            }
            else{
                swal('Hapus Gagal',obj.data,'error');
            }
        });
    });
}

$("#upt_tapak").on("click",function(){
    let d = new Date();
    month = d.getMonth()+1;
    realmoth = month+"";
    if(month < 10){
        realmoth = "0"+month;
    }
    dates = d.getFullYear()+"-"+realmoth+"-"+d.getDate();
    $("#dupdate").val(dates);
    noanggota = window.sessionStorage.noanggota;
    nama = window.sessionStorage.namapenuh;
    $("#pegawai").html('<option value="'+noanggota+'">'+nama+'</option>');
    $("#upt_progress").modal("show");
});

$("#backs").on('click',function(){
    id_back = "id";

    if(kod_get == MD5("tender")){
        id_back = "idt";
    }
    window.location.replace('pelaksanaan_in.html?'+id_back+'='+idkerja+"&kod="+kod_get);
});

$("#form-uptProgress").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Simpan Laporan Kerja",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            $("#upt_progress").modal("hide");
            let FK_dokumen = $("#id_pk").val();
            let catatan = $("#catatan").val();
            let dsemak = $("#dupdate").val();
            let peratus = $("#peratus").val();
            let pegawai = $("#pegawai").val();
            let ucreate = window.sessionStorage.noanggota;
            let json_img = $("#json_img").val();
            // let upload_1 = $("#upload_1")[0].files[0];
            // let upload_2 = $("#upload_2")[0].files[0];
            // let upload_3 = $("#upload_3")[0].files[0];

            
            var formData = new FormData();
            formData.append("key","mSideDiary");
            formData.append("FK_dokumen",FK_dokumen);
            formData.append("kod",kod);
            formData.append("file",json_img);
            formData.append("catatan",catatan);
            formData.append("dsemak",dsemak);
            formData.append("peratus",peratus);
            formData.append("pegawai",pegawai);
            formData.append("ucreate",ucreate);
            formData.append("token",window.sessionStorage.token);
            $("#loading_modal").modal("show");
            $.ajax({
                url : local+"cSideDiary.php",
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response){
                    if(response != null){
                        filename = JSON.parse(response);

                        if(filename.result == "success" || filename.result == "success_upt"){
                            // $("#load").modal("hide");
                            window.location.reload();
                        }
                        else{
                            $("#loading_modal").modal("hide");
                            swal("Fail Save",filename.result,"error");
                        }
                    }
                    else{
                        $("#loading_modal").modal("hide");
                        swal("Fail Save",filename.err_messege,"error");
                    }
                }
            });

        });
    }
});

var img_list = [];
$("#attach_tmp").click(function(){
    let attach = $("#upload_1").val();
    if(attach == ""){
        swal("ALERT","Sila Pilih Gambar","warning");
        $("#upload_1").focus();
    }
    else{
        $("#load_tmp").prop("style","display:true;");
        let upload_1 = $("#upload_1")[0].files[0];
        var formData = new FormData();
        formData.append("upload_1",upload_1);
        formData.append("key","attach_img");
        formData.append("token",window.sessionStorage.token);
        $.ajax({
            url : local+"cSideDiary.php",
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != null){
                    filename = JSON.parse(response);

                    if(filename.result == "success"){
                        img_catatan = $("#img_catatan").val();
                        img_list.push({"images":filename.message,"message":img_catatan});
                        // let num = 0;
                        loadDataList();
                        $("#load_tmp").prop("style","display:none;");
                    }
                    else{
                        $("#load_tmp").prop("style","display:none;");
                        swal("Fail Save",filename.message,"error");
                    }
                }
                else{
                    $("#load_tmp").prop("style","display:none;");
                    swal("Fail Save",filename.message,"error");
                }
            }
        });
    } 
});

function loadDataList(){
    $("#img_list1").html('');
    $("#img_list2").html('');
    $.each(img_list,function(i,obj){
        if(i % 2 == 0){
            $("#img_list1").append('<div class="img-thumnail"><a class=" text-danger" onclick="del_listImage('+i+')"><i class="fa fa-times"></i></a><img src="'+host+'tmp_upload/'+obj.images+'" width="100%"><br><p>'+obj.message+'</p></div>');
        }
        else{
            $("#img_list2").append('<div class="img-thumnail"><a class=" text-danger" onclick="del_listImage('+i+')"><i class="fa fa-times"></i></a><img src="'+host+'tmp_upload/'+obj.images+'" width="100%"><br><p>'+obj.message+'</p></div>');
        }
        $("#upload_1").val('');
        $("#img_catatan").val('');
        $("#json_img").html(JSON.stringify(img_list));
    });
}

function del_listImage(index){
    let kod = img_list.splice(index,1);
    loadDataList();
}