$(function(){
    $.ajaxSetup ({
        cache: false
    });
    kategoriList();
    kampusList();
    klusterList();
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
                value: item.id,
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
                value: item.id,
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
                value: item.id,
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