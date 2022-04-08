window.sessionStorage.med_permohonan_id = 0;

$(function () {
    $.ajaxSetup({
        cache: false
    });
    cekCapaian()
    tableProgram();
    kampusList();
    klusterList();
    uptklusterList();
    subklusterList();
    uptsubklusterList();
    unitList();
    uptunitList();
    kategoriprogramList();
    vipList();
});

function cekCapaian(){

    //TETAPAN MEDIA (ID:1)
    if(window.sessionStorage.control_program_media_C2 == 1){
        
        $('#control_program_media_C2').removeClass('hidden');
    }
    if(window.sessionStorage.control_program_media_R2 == 1){
        $('#control_program_media_R2').removeClass('hidden');
    }
    if(window.sessionStorage.control_program_media_U2 == 1){
        $('#control_program_media_U2').removeClass('hidden');
    }
    if(window.sessionStorage.control_program_media_D2 == 1){
        $('#control_program_media_D2').removeClass('hidden');
    }
}

function tableProgram() {
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_program", "title": "Nama Program" },
        { "name": "t_program", "title": "Tarikh Program", "breakpoints": "md sm xs" },
        { "name": "nama_kategori", "title": "Kategori Program", "breakpoints": "md sm xs" },
        // { "name": "butiran_program", "title": "Butiran Program" },
        // { "name": "gambar", "title": "Gambar Program", "breakpoints": "md sm xs" },
        { "name": "status_rekod", "title": "Status" },
        { "name": "upt_btn", "title": "Tindakan", "breakpoints": "md sm xs" },
        // {"name":"status","title":"Status","breakpoints":"sm xs"}
    ];

    var settings = {};
    if(window.sessionStorage.FK_peranan != 2){
        settings = {
            "url": host + "api_media/public/programListAll",
            "method": "GET",
            "timeout": 0,
        };
    }
    else{
        var settings = {
            "url": host + "api_media/public/programListKluster/"+window.sessionStorage.FK_kluster,
            "method": "GET",
            "timeout": 0,
          };
    }
    
    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataList").val(convertList);
        var list = [];
        let bil = 1;
    
        $.each(response.data, function (i, field) {
            t_program = new Date(field.tarikh_program);
            var checked;
            if (field.programstatusrekod == '1') {
                checked = 'checked';
                badge = 'badge-success';
                text_statusrekod = 'Aktif';
            } else  {
                badge = 'badge-danger';
                text_statusrekod = 'Tidak Aktif';   
            }

            if(window.sessionStorage.control_program_media_U2 == 1){
                list.push({
                    id: field.id_program,
                    butiran_program: field.nama_program + "</br>" + t_program.getDate() + "/" + (t_program.getMonth() + 1) + 
                                    "/" + t_program.getFullYear() + "</br>" + field.nama_kluster + "</br>" + field.nama_unit + 
                                    "</br>" + field.nama_kategori + "</br>" + '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                                    ' <button class="button button-box button-sm button-info" title="Perincian" onclick="detail(\'' + field.id_program + '\',\'' + i + '\')" id="btnPerincian"><i class="ti-menu"></i></button>' +
                                    ' <button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_program+'\')"><i class="ti-trash"></i>',
                    nama_kategori: field.nama_kategori, bilangan_fail: field.bilangan_fail, kod_format: field.kod_format, 
                    t_program:  t_program.getDate() + "/" + (t_program.getMonth() + 1) + "/" + t_program.getFullYear(), 
                    nama_program: field.nama_program, saiz_fail: field.saiz_fail, bil: bil++,
                    status_rekod: '<label class="adomx-switch-2 success"><input type="checkbox" id="status_sistem" class="form-control mb-20" '+checked+' onclick="del_rekod(\''+field.id_program+'\')"> <i class="lever"></i> <span id="text_statusrekod'+field.id_program+'" class="badge '+ badge +'">'+text_statusrekod+'</span></label>', 
                    upt_btn: '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                    ' <button class="button button-box button-sm button-info" title="Perincian" onclick="detail(\'' + field.id_program + '\',\'' + i + '\')" id="btnPerincian"><i class="ti-menu"></i></button>'
                });                
            }else{
                list.push({
                    id: field.id_program,
                    butiran_program: field.nama_program + "</br>" + t_program.getDate() + "/" + (t_program.getMonth() + 1) + 
                                    "/" + t_program.getFullYear() + "</br>" + field.nama_kluster + "</br>" + field.nama_unit + 
                                    "</br>" + field.nama_kategori + "</br>" + '<button class="button button-box button-sm button-primary" onclick="loadData(\'' + i + '\')" data-ui-toggle-class="zoom" data-ui-target="#animate"><i class="ti-pencil-alt"></i></button> ' +
                                    ' <button class="button button-box button-sm button-info" title="Perincian" onclick="detail(\'' + field.id_program + '\',\'' + i + '\')" id="btnPerincian"><i class="ti-menu"></i></button>' +
                                    ' <button class="button button-box button-sm button-danger" title="Hapus" onclick="del_rekod(\''+field.id_program+'\')"><i class="ti-trash"></i>',
                    nama_kategori: field.nama_kategori, bilangan_fail: field.bilangan_fail, kod_format: field.kod_format, 
                    t_program:  t_program.getDate() + "/" + (t_program.getMonth() + 1) + "/" + t_program.getFullYear(), 
                    nama_program: field.nama_program, saiz_fail: field.saiz_fail, bil: bil++,
                    status_rekod: '<label class="adomx-switch-2 success"><span id="text_statusrekod'+field.id_program+'" class="badge '+ badge +'">'+text_statusrekod+'</span></label>', 
                    upt_btn: ' <button class="button button-box button-sm button-info" title="Perincian" onclick="detail(\'' + field.id_program + '\',\'' + i + '\')" id="btnPerincian"><i class="ti-menu"></i></button>'
                });
            }
            
        });
    
        $("#programList").footable({
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

    let data = JSON.parse($("#dataList").val());
    $('#upt_id').val(data[indexs].id_program);   
    $('#upt_nama_program').val(data[indexs].nama_program);   
    $('#upt_tarikh_program').val(data[indexs].tarikh_program);   
    $('#upt_FK_kampus').val(data[indexs].id_kampus);   
    $('#upt_FK_kluster').val(data[indexs].id_kluster);   
    $('#upt_FK_subkluster').val(data[indexs].id_subkluster);   
    $('#upt_FK_unit').val(data[indexs].id_unit);    
    $('#upt_FK_kategori').val(data[indexs].id_kategoriprogram);   
    saveLog(window.sessionStorage.id,"View Data of [id = " + data[indexs].id_program + "]" + data[indexs].nama_program + " at Tetapan Program Media.",window.sessionStorage.browser);
    $("#update-program").modal("show");
    
}

$("#reg-program").on('shown.bs.modal', function(){
    $(this).find('#nama_program').focus();
});

$("#update-program").on('shown.bs.modal', function(){
    $(this).find('#upt_nama_program').focus();
});

function detail(i,indexs){
    let d = JSON.parse($("#dataList").val());
    let data = d[indexs];
    window.sessionStorage.med_program_id = data.id_program;
    window.sessionStorage.content = "html/detail_med_program";
    saveLog(window.sessionStorage.id,"View Data of [id = " + data.id_program + "]" + data.nama_program + " at Tetapan Program Media.",window.sessionStorage.browser);
    // $('#content').load('./js/detail_med_program.html');
    window.location.reload();
}

// FUNCTION REGISTER

var confirmed = false;
$("#register").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Daftar Program",
            text: "Anda Pasti Untuk Simpan?",
            type: "question",
            showCancelButton: true,
            confirmButtonText: "Simpan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let nama_program = $("#nama_program").val();
            let tarikh_program = $("#tarikh_program").val();
            let FK_kampus = $("#FK_kampus").val();
            let FK_kluster = $("#FK_kluster").val();
            let FK_subkluster = $("#FK_subkluster").val();
            let FK_unit = $("#FK_unit").val();
            let FK_kategori = $("#FK_kategori").val();
            let FK_vip = $('#checkboxvip [type="checkbox"]:checked').map(function () {
                return this.value;
            }).get();
            
            var form = new FormData();
            // formData.append("key","mSideDiary");
            form.append("nama_program",nama_program);
            form.append("tarikh_program",tarikh_program);
            form.append("FK_kampus",FK_kampus);
            form.append("FK_kluster",FK_kluster);
            form.append("FK_subkluster",FK_subkluster);
            form.append("FK_unit",FK_unit);
            form.append("FK_kategori",FK_kategori);
            form.append("FK_vip",FK_vip);
            form.append("created_by",window.sessionStorage.id);
            form.append("updated_by",window.sessionStorage.id);
            form.append("statusrekod","1");
            
            var param = {
                a: nama_program,
                b: tarikh_program,
                c: FK_kampus,
                d: FK_kluster,
                e: FK_subkluster,
                f: FK_unit,
                g: FK_kategori,
                h: FK_vip,
            }
            // console.log(param)
            
            var settings = {
                "url": host+"api_media/public/addProgram",
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
                        title: "Daftar Program",
                        text: result.message + " " + result.data,
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                $("#reg-program").modal("hide");
                                tableProgram();
                            }
                        }
                    );
                } else  {                    
                    swal({
                        title: "Daftar Program",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id,"Register Data ["+ nama_program +"] at Tetapan Program Media.",window.sessionStorage.browser);
                                $("#reg-program").modal("hide");
                                tableProgram();
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
            title: "Kemaskini Program",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let upt_id = $("#upt_id").val();
            let upt_nama_program = $("#upt_nama_program").val();
            let upt_tarikh_program = $("#upt_tarikh_program").val();
            let upt_FK_kampus = $("#upt_FK_kampus").val();
            let upt_FK_kluster = $("#upt_FK_kluster").val();
            let upt_FK_subkluster = $("#upt_FK_subkluster").val();
            let upt_FK_unit = $("#upt_FK_unit").val();
            let upt_FK_kategori = $("#upt_FK_kategori").val();

            var param = {
                twmNamaProgram: upt_nama_program,
                twmTitle: upt_FK_kampus,
                twmDescription: upt_FK_kluster,
                twmSdate: upt_FK_unit,
                twmEdate: upt_tarikh_program,
                twmYear: upt_FK_kategori,
            }
            // console.log(param);

            var form = new FormData();
            form.append("id_program", upt_id);
            form.append("nama_program",upt_nama_program);
            form.append("tarikh_program",upt_tarikh_program);
            form.append("FK_kampus",upt_FK_kampus);
            form.append("FK_kluster",upt_FK_kluster);
            form.append("FK_subkluster",upt_FK_subkluster);
            form.append("FK_unit",upt_FK_unit);
            form.append("FK_kategori",upt_FK_kategori);
            form.append("updated_by",window.sessionStorage.id);

            var settings = {
                "url": host+"api_media/public/programUpdate",
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
                        title: "Kemaskini Program",
                        text: result.message + " " + result.data,
                        type: "error",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        html: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {    
                                $("#update-program").modal("hide");
                                tableProgram();
                            }
                        }
                    );
                } else {                    
                    swal({
                        title: "Kemaskini Program",
                        text: result.message,
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 1000
                    }).then(function(){},
                        function (dismiss) {
                            if (dismiss === 'timer') {
                                saveLog(window.sessionStorage.id,"Update Data for [id_program = " + upt_id + "]" + upt_nama_program + " at Tetapan Program Media.",window.sessionStorage.browser);
                                $("#update-program").modal("hide");
                                tableProgram();   
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
    
    let id = i;

    var form = new FormData();
    form.append("id_program", id);    

    var settings = {
        "url": host+"api_media/public/programDelete",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

    $.ajax(settings).done(function (response) {
        result = JSON.parse(response);
        if (!result.success) {
            // Swal(result.message, result.data, "error");
            // return;
            swal({
                title: "Hapus Program",
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
            $('#text_statusrekod'+result.data.id_program).text('Aktif').removeClass("badge-danger").addClass("badge-success");
        } else  {
            $('#text_statusrekod'+result.data.id_program).text('Tidak Aktif').removeClass("badge-success").addClass("badge-danger");
        }
        saveLog(window.sessionStorage.id,"Change Record Status for [id = " + id + "] at Tetapan Program Media.",window.sessionStorage.browser);
    });
}

$('#FK_kampus').change(function(){
    if ($('#FK_kampus').val() == 11) {
        $("#divFK_kluster").show();
        $("#divFK_subkluster").show();
        $("#divFK_unit").show();
        $("#divFK_kluster").prop('required', true);
        $("#divFK_subkluster").prop('required', true);
        // $("#divFK_unit").prop('required', true);
    } else {
        $("#divFK_kluster").hide();
        $("#divFK_subkluster").show();
        $("#divFK_kluster").prop('required', true);
        $("#divFK_subkluster").prop('required', true);
        $("#divFK_unit").show();
        // $("#divFK_unit").prop('required', true);
    }
})

function kampusList()   {
    //Dropdown Kampus List
    var settings = {
        "url": host+"api_public/public/kampusList",
        "method": "GET",
        "timeout": 0,
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
}

function klusterList()  {
    //Dropdown Kluster List
    $('#FK_kampus').change(function(){
        $('#FK_kluster').empty();
        $('#FK_kluster').append($('<option>', { 
            value: "",
            text : "Pilih Kluster" 
        }));
        var settings = {
            "url": host+"api_public/public/klusters/" + $('#FK_kampus').val(),
            "method": "GET",
            "timeout": 0
        };
        $.ajax(settings).done(function (response) {
            //LIST OPTION
            $.each(response.data, function (i, item) {
                if ($('#FK_kampus').val() != '11')  {
                    var selected = 'selected';
                    $('#FK_kluster').append($('<option>', { 
                        value: item.id_kluster,
                        text : item.nama_kluster
                    }).attr(selected,true));
                    subklusterListNonKiara();
                    // alert(selected)
                } else  {
                    $('#FK_kluster').append($('<option>', { 
                        value: item.id_kluster,
                        text : item.nama_kluster
                    }));
                }
            });            
        });
        // END Dropdown Kluster List
    });
}

function subklusterListNonKiara()   {
    //Dropdown Subkluster List
    $('#FK_subkluster').empty();
    $('#FK_subkluster').append($('<option>', { 
        value: "",
        text : "Pilih Subkluster" 
    }));
    
    //Dropdown Subkluster List
    var settings = {
        "url": host+"api_public/public/subklusters/" + $('#FK_kluster').val(),
        "method": "GET",
        "timeout": 0
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
        
    });
}

function subklusterList()   {
    //Dropdown Subkluster List
    $('#FK_subkluster').empty();
    $('#FK_subkluster').append($('<option>', { 
        value: "",
        text : "Pilih Subkluster" 
    }));
    
    $('#FK_kluster').change(function(){
        //Dropdown Subkluster List
        var settings = {
            "url": host+"api_public/public/subklusters/" + $('#FK_kluster').val(),
            "method": "GET",
            "timeout": 0
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
                
            });
        // END Dropdown Subkluster List
        
    });//Dropdown Subkluster List
}

function unitList() {
    $('#FK_unit').empty();
    $('#FK_unit').append($('<option>', { 
        value: "",
        text : "Pilih Unit" 
    }));
    
    $('#FK_subkluster').change(function(){
        //Dropdown Unit List
        var settings = {
            "url": host+"api_public/public/units/" + $('#FK_kluster').val() + "/" + $('#FK_subkluster').val(),
            "method": "GET",
            "timeout": 0
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
            
        });
        // END Dropdown Unit List
        
    });
}

function uptklusterList()   {
    $('#upt_FK_kluster').empty();
    $('#upt_FK_kluster').append($('<option>', { 
        value: "",
        text : "Pilih Kluster" 
    }));
    var settings = {
        "url": host+"api_public/public/klustersList",
        "method": "GET",
        "timeout": 0
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION UPDATE
        $.each(response.data, function (i, item) {
            $('#upt_FK_kluster').append($('<option>', { 
                value: item.id_kluster,
                text : item.nama_kluster
            }));
        });            
    });
    // END Dropdown Kluster List
    $('#upt_FK_kampus').change(function(){
        $('#upt_FK_kluster').empty();
        $('#upt_FK_kluster').append($('<option>', { 
            value: "",
            text : "Pilih Kluster" 
        }));
        var settings = {
            "url": host+"api_public/public/klusters/" + $('#upt_FK_kampus').val(),
            "method": "GET",
            "timeout": 0
        };
        
        $.ajax(settings).done(function (response) {
            //LIST OPTION UPDATE
            $.each(response.data, function (i, item) {
                if ($('#upt_FK_kampus').val() != '11')  {
                    var selected = 'selected';
                    $('#upt_FK_kluster').append($('<option>', { 
                        value: item.id_kluster,
                        text : item.nama_kluster
                    }).attr(selected,true));
                    uptsubklusterListNonKiara();
                    // alert(selected)
                } else  {
                    var selected = 'selected';
                    $('#upt_FK_kluster').append($('<option>', { 
                        value: item.id_kluster,
                        text : item.nama_kluster
                    }));
                }
            });            
        });
        // END Dropdown Kluster List
    });
}

function uptsubklusterListNonKiara()   {
    //Dropdown Subkluster List
    $('#upt_FK_subkluster').empty();
    $('#upt_FK_subkluster').append($('<option>', { 
        value: "",
        text : "Pilih Subkluster" 
    }));
    
    var settings = {
        "url": host+"api_public/public/subklustersList",
        "method": "GET",
        "timeout": 0
    };
    $.ajax(settings).done(function (response) {
        //LIST OPTION
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

    $('#upt_FK_kluster').change(function(){
        $('#upt_FK_subkluster').empty();
        $('#upt_FK_subkluster').append($('<option>', { 
            value: "",
            text : "Pilih Kluster" 
        }));
        var settings = {
            "url": host+"api_public/public/subklusters/" + $('#upt_FK_kluster').val(),
            "method": "GET",
            "timeout": 0
        };
        
        $.ajax(settings).done(function (response) {
            //LIST OPTION UPDATE
            $.each(response.data, function (i, item) {
                $('#upt_FK_subkluster').append($('<option>', { 
                    value: item.id_subkluster,
                    text : item.nama_subkluster
                }));
            });            
        });
        // END Dropdown Kluster List
    });
}

function uptsubklusterList()   {
    //Dropdown Subkluster List
    $('#upt_FK_subkluster').empty();
    $('#upt_FK_subkluster').append($('<option>', { 
        value: "",
        text : "Pilih Subkluster" 
    }));
    
    //Dropdown Subkluster List
    var settings = {
        "url": host+"api_public/public/subklustersList",
        "method": "GET",
        "timeout": 0
      };
        $.ajax(settings).done(function (response) {
            //LIST OPTION
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
    
    //Dropdown Subkluster List
    $('#upt_FK_subkluster').empty();
    $('#upt_FK_subkluster').append($('<option>', { 
        value: "",
        text : "Pilih Subkluster" 
    }));
    
    $('#upt_FK_kluster').change(function(){
        //Dropdown Subkluster List
        var settings = {
            "url": host+"api_public/public/subklusters/" + $('#upt_FK_kluster').val(),
            "method": "GET",
            "timeout": 0
          };
            $.ajax(settings).done(function (response) {
                //LIST OPTION
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
        
    });//Dropdown Subkluster List
}

function uptunitList() {
    $('#upt_FK_unit').empty();
    $('#upt_FK_unit').append($('<option>', { 
        value: "",
        text : "Pilih Unit" 
    }));
    
    //Dropdown Unit List
    var settings = {
        "url": host+"api_public/public/unitsList",
        "method": "GET",
        "timeout": 0
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
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

    $('#upt_FK_unit').empty();
    $('#upt_FK_unit').append($('<option>', { 
        value: "",
        text : "Pilih Unit" 
    }));
    
    $('#upt_FK_subkluster').change(function(){
        //Dropdown Unit List
        var settings = {
            "url": host+"api_public/public/units/" + $('#upt_FK_kluster').val() + "/" + $('#upt_FK_subkluster').val(),
            "method": "GET",
            "timeout": 0
        };
        
        $.ajax(settings).done(function (response) {
            //LIST OPTION
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
        
    });
}

function kategoriprogramList() {
    //Dropdown Kategori List
    var settings = {
        "url": host+"api_media/public/kategoriprogramList",
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
      };
    
        $.ajax(settings).done(function (response) {
            //LIST OPTION
            $('#FK_kategori').empty();
            $('#FK_kategori').append($('<option>', { 
                value: "",
                text : "Pilih Kategori" 
            }));
            $.each(response.data, function (i, item) {
                $('#FK_kategori').append($('<option>', { 
                    value: item.id_kategoriprogram,
                    text : item.nama_kategori 
                }));
            });
    
            //LIST OPTION UPDATE
            $('#upt_FK_kategori').empty();
            $('#upt_FK_kategori').append($('<option>', { 
                value: "",
                text : "Pilih Kategori" 
            }));
            $.each(response.data, function (i, item) {
                $('#upt_FK_kategori').append($('<option>', { 
                    value: item.id_kategoriprogram,
                    text : item.nama_kategori 
                }));
            });
            
        });
    // END Dropdown Kategori List
}

function vipList()  {
    //Checkbox Vip List
    var settings = {
        "url": host + "api_public/public/vipsList",
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
            $('#checkboxvip').append($('<label class="adomx-checkbox"><input class="form-control" type="checkbox" name="kod_vip[]" value="'+ item.PK +'" id="'+ item.PK +'"/> <i class="icon"></i> '+ item.nama_gelaran + ' ' + item.nama_vip +'</label>'));        
        });
        $.each(response.data, function (i, item) {
            // console.log(item.kod_vip);
            $('#upt_checkboxvipval').val(item.kod_vip);
            $('#upt_checkboxvip').append($('<label class="adomx-checkbox"><input class="form-control" type="checkbox" name="kod_vip[]" value="'+ item.PK +'" id="'+ item.PK +'"/> <i class="icon"></i> '+ item.nama_gelaran + ' ' + item.kod_vip +'</label>'));        
        });
        
    });
    // END Checkbox Vip List
}