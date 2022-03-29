$(function(){
    $.ajaxSetup ({
        cache: false
    });
    kategoriList();
    statusList();
    tahunList();

    users_info(window.sessionStorage.id,function(){
  	    if ((result.data.users_intan) == 1)   {
            $('#displayjawatan').text(result.data.nama_kluster + ", " + result.data.nama_subkluster + ", " + result.data.nama_unit);
        } else  {
            $('#displayjawatan').text(result.data.nama_kementerian + ", " + result.data.nama_agensi + ", " + result.data.nama_bahagian);
        }
        $('#displayno_kad_pengenalan').val(result.data.no_kad_pengenalan);
        $('#displayjantina').val(result.data.nama_jantina);
        $('#displayemel').val(result.data.emel);
    });
    
});

function kategoriList()  {
    //Dropdown Kategori List
    var settings = {
        "url": host+"api_pentadbir/public/jenispenggunasList",
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
    // END Dropdown Kategori List
}

function statusList(){
    //Dropdown Kampus List
    var settings = {
        "url": host+"api_media/public/statusList",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_status').empty();
        $('#FK_status').append($('<option>', { 
            value: "",
            text : "Pilih Status" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_status').append($('<option>', { 
                value: item.id,
                text : item.nama_status
            }));
        });
        
    });
    // END Dropdown Kampus List
}

function tahunList(){
    //Dropdown Kluster List
    var settings = {
        "url": host+"api_media/public/permohonanListTahun",
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#tahun_permohonan').empty();
        $('#tahun_permohonan').append($('<option>', { 
            value: "",
            text : "Pilih Tahun" 
        }));
        $.each(response.data, function (i, item) {
            $('#tahun_permohonan').append($('<option>', { 
                value: item.tahun,
                text : item.tahun 
            }));
        });
        
    });
    // END Dropdown Kluster List
}