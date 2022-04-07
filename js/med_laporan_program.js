$(function(){
    $.ajaxSetup ({
        cache: false
    });
    tableProgram();
    programList();
    kategoriList();
    kampusList();
    klusterList();
    tahunList();
    
});

var confirmed = false;

$("#carian").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let FK_kategori = $("#FK_kategori").val();
        let nama_program = $("#nama_program").val();
        let tarikh_mula = $("#tarikh_mula").val();
        let tarikh_akhir = $("#tarikh_akhir").val();
        let FK_kampus = $("#FK_kampus").val();
        let FK_kluster = $("#FK_kluster").val();
        let tahun_program = $("#tahun_program").val();
        
        // var param = {
        //     1: FK_kategori,
        //     2: nama_program,
        //     3: tarikh_mula,
        //     4: tarikh_akhir,
        //     5: FK_kampus,
        //     6: FK_kluster,
        //     7: tahun_program,
        // }
        // console.log(param)
        
        var form = new FormData();
        // formData.append("key","mSideDiary");
        form.append("FK_kategori",FK_kategori);
        form.append("nama_program",nama_program);
        form.append("tarikh_mula",tarikh_mula);
        form.append("tarikh_akhir",tarikh_akhir);
        form.append("FK_kampus",FK_kampus);
        form.append("FK_kluster",FK_kluster);
        form.append("tahun_program",tahun_program);
        
        carianProgram(form);
    }
});

function kategoriList()  {
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
        
    });
    // END Dropdown Kategori List
}

function kampusList(){
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
        
    });
    // END Dropdown Kampus List
}

function klusterList(){
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
        
    });
    // END Dropdown Kluster List
}

function tahunList(){
    //Dropdown Kluster List
    var settings = {
        "url": host+"api_media/public/programListTahun",
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#tahun_program').empty();
        $('#tahun_program').append($('<option>', { 
            value: "",
            text : "Pilih Tahun" 
        }));
        $.each(response.data, function (i, item) {
            $('#tahun_program').append($('<option>', { 
                value: item.tahun,
                text : item.tahun 
            }));
        });
        
    });
    // END Dropdown Kluster List
}

function programList(){
    //Dropdown User List
    var settings = {
        "url": host+"api_media/public/programList",
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#nama_programss').empty();
        $.each(response.data, function (i, item) {
            $('#nama_programss').append($('<option>', { 
                value: item.nama_program,
                text : item.nama_program
            }));
        });            
    });
    // END Dropdown User List
}

$('#nama_programs').change(function(){
    $("#nama_program").val($('#nama_programs').val()); 
})

$('#tarikh_mula').change(function(){
    if ($('#tarikh_akhir').val() != '')  {        
        var tarikh_mula = new Date($('#tarikh_mula').val());
        var tarikh_akhir = new Date($('#tarikh_akhir').val());
        if ((tarikh_akhir - tarikh_mula) < 0)   {
            swal({
                title: "Tarikh Tidak Sah!",
                text: "Tarikh Mula (" + $('#tarikh_mula').val() + ") Melebihi Tarikh Akhir (" + $('#tarikh_akhir').val() + ")",
                type: "error",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 1500
            });
        }
    }
})

$('#tarikh_akhir').change(function(){
    if ($('#tarikh_mula').val() == '')  {
        swal({
            title: "Tarikh Mula",
            text: "Sila tetapkan tarikh mula program",
            type: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            html: false,
            timer: 1500
        });
    } else  {
        var tarikh_mula = new Date($('#tarikh_mula').val());
        var tarikh_akhir = new Date($('#tarikh_akhir').val());
        if ((tarikh_akhir - tarikh_mula) < 0)   {
            swal({
                title: "Tarikh Tidak Sah!",
                text: "Tarikh Mula (" + $('#tarikh_mula').val() + ") melebihi Tarikh Akhir (" + $('#tarikh_akhir').val() + ")",
                type: "error",
                showConfirmButton: false,
                allowOutsideClick: false,
                html: false,
                timer: 1500
            });
        }
    }
})

function tableProgram(){
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_program", "title": "Nama Program" },
        { "name": "t_program", "title": "Tarikh Program", "breakpoints": "md sm xs" },
        { "name": "nama_kategori", "title": "Kategori Program", "breakpoints": "md sm xs" },
    ];
    var settings = {
        "url": host + "api_media/public/programListAll",
        "method": "GET",
        "timeout": 0,
      };
    
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
            list.push({
                id: field.id_program,
                nama_kategori: field.nama_kategori, bilangan_fail: field.bilangan_fail, kod_format: field.kod_format, 
                t_program:  t_program.getDate() + "/" + (t_program.getMonth() + 1) + "/" + t_program.getFullYear(), 
                nama_program: field.nama_program, saiz_fail: field.saiz_fail, bil: bil++,
            });
        });
    
        $("#listProgram").footable({
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

function carianProgram(form){
    var colums = [
        { "name": "bil", "title": "Bil" },
        { "name": "nama_program", "title": "Nama Program" },
        { "name": "t_program", "title": "Tarikh Program", "breakpoints": "md sm xs" },
        { "name": "nama_kategori", "title": "Kategori Program", "breakpoints": "md sm xs" },
        { "name": "nama_kampus", "title": "Kampus", "breakpoints": "md sm xs" },
        { "name": "nama_kluster", "title": "Kluster", "breakpoints": "md sm xs" },
        { "name": "tahun", "title": "Tahun", "breakpoints": "md sm xs" },
    ];

    var settings = {
        "url": host+"api_media/public/programLaporan",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        let convertList = JSON.stringify(response.data);
        $("#dataListProgram").val(convertList);
        var list = [];
        let bil = 1;
        console.log(response)
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
            list.push({
                id: field.id_program,
                nama_kategori: field.nama_kategori, nama_kampus: field.nama_kampus, nama_kluster: field.nama_kluster, 
                bilangan_fail: field.bilangan_fail, kod_format: field.kod_format, 
                t_program:  t_program.getDate() + "/" + (t_program.getMonth() + 1) + "/" + t_program.getFullYear(), 
                nama_program: field.nama_program, saiz_fail: field.saiz_fail, tahun: field.tahun, bil: bil++,
            });
            // console.log(field)
        });
        $("#listProgram").empty();
        $("#listProgram").footable({
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

        $('#collapseCarian').removeClass('show');
        $('#collapseMaklumat').addClass('show');
    });
}