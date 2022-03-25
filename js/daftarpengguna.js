// const { default: Swal } = require("sweetalert2");

// const { default: Swal } = require("sweetalert2");
var confirmed = false;

$("#register").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan").val();
        let nama = $("#nama").val();
        let FK_jantina = $("#FK_jantina").val();
        let emel = $("#emel").val();
        let tarikh_lahir = $("#tarikh_lahir").val();
        let notel = $("#notel").val();
        let FK_warganegara = $("#FK_warganegara").val();
        let FK_gelaran = $("#FK_gelaran").val();
        let FK_bangsa = $("#FK_bangsa").val();
        let FK_etnik = $("#FK_etnik").val();
        let FK_agama = $("#FK_agama").val();
        let FK_negara_lahir = $("#FK_negara_lahir").val();
        let FK_negeri_lahir = $("#FK_negeri_lahir").val();
        let katalaluan = $("#katalaluan").val();
        // let ucreate = window.sessionStorage.noanggota;
        var param = {
            twmTitle: no_kad_pengenalan,
            twmDescription: nama,
            a: FK_jantina,
            b: emel,
            c: tarikh_lahir,
        }
        console.log(param)
        var form = new FormData();
        // formData.append("key","mSideDiary");
        form.append("no_kad_pengenalan", no_kad_pengenalan);
        form.append("nama", nama);
        form.append("FK_jantina", FK_jantina);
        form.append("emel", emel);
        form.append("tarikh_lahir", tarikh_lahir);
        form.append("notel", notel);
        form.append("FK_warganegara", FK_warganegara);
        form.append("FK_gelaran", FK_gelaran);
        form.append("FK_bangsa", FK_bangsa);
        form.append("FK_etnik", FK_etnik);
        form.append("FK_agama", FK_agama);
        form.append("FK_negara_lahir", FK_negara_lahir);
        form.append("FK_negeri_lahir", FK_negeri_lahir);
        form.append("katalaluan", katalaluan);
        // formData.append("token",window.sessionStorage.token);
        var settings = {
            "url": host + "api_pentadbir/public/addUsers",
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
                Swal(result.message, result.data, "error");
                return;
            }
            swal({
                title: "Daftar Pengguna",
                text: "Pendaftaran berjaya! Sila log masuk ke dalam sistem.",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                allowOutsideClick: false,
                html: false
            }).then(function(){
                
                // sessionStorage.token = result.token;
                // sessionStorage.no_kad_pengenalan = result.no_kad_pengenalan;
                window.location.replace("login.html");
    
            });
        });
    }
});

//Dropdown Jantina List
var settings = {
    "url": host+"api_public/public/jantinasList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_jantina').empty();
        $('#FK_jantina').append($('<option>', { 
            value: "",
            text : "Pilih Jantina" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_jantina').append($('<option>', { 
                value: item.id,
                text : item.nama_jantina
            }));
        });
        
    });
// END Dropdown Jantina List

//Dropdown Warganegara List
var settings = {
    "url": host+"api_public/public/warganegarasList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_warganegara').empty();
        $('#FK_warganegara').append($('<option>', { 
            value: "",
            text : "Pilih Warganegara" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_warganegara').append($('<option>', { 
                value: item.id,
                text : item.nama_warganegara 
            }));
        });
        
    });
// END Dropdown Warganegara List

//Dropdown Gelaran List
var settings = {
    "url": host+"api_public/public/gelaransList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_gelaran').empty();
        $('#FK_gelaran').append($('<option>', { 
            value: "",
            text : "Pilih Gelaran" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_gelaran').append($('<option>', { 
                value: item.id,
                text : item.nama_gelaran 
            }));
        });
        
    });
// END Dropdown Gelaran List

//Dropdown Bangsa List
var settings = {
    "url": host+"api_public/public/bangsasList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_bangsa').empty();
        $('#FK_bangsa').append($('<option>', { 
            value: "",
            text : "Pilih Bangsa" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_bangsa').append($('<option>', { 
                value: item.id,
                text : item.nama_bangsa 
            }));
        });
        
    });
// END Dropdown Bangsa List

//Dropdown Etnik List
var settings = {
    "url": host+"api_public/public/etniksList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_etnik').empty();
        $('#FK_etnik').append($('<option>', { 
            value: "",
            text : "Pilih Etnik" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_etnik').append($('<option>', { 
                value: item.id,
                text : item.nama_etnik 
            }));
        });
        
    });
// END Dropdown Etnik List

//Dropdown Agama List
var settings = {
    "url": host+"api_public/public/agamasList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_agama').empty();
        $('#FK_agama').append($('<option>', { 
            value: "",
            text : "Pilih Agama" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_agama').append($('<option>', { 
                value: item.id,
                text : item.nama_agama 
            }));
        });
        
    });
// END Dropdown Agama List

//Dropdown Negara List
var settings = {
    "url": host+"api_public/public/negarasList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_negara_lahir').empty();
        $('#FK_negara_lahir').append($('<option>', { 
            value: "",
            text : "Pilih Negara" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_negara_lahir').append($('<option>', { 
                value: item.id,
                text : item.nama_negara 
            }));
        });
        
    });
// END Dropdown Negara List

//Dropdown Negeri List
var settings = {
    "url": host+"api_public/public/negerisList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_negeri_lahir').empty();
        $('#FK_negeri_lahir').append($('<option>', { 
            value: "",
            text : "Pilih Negeri" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_negeri_lahir').append($('<option>', { 
                value: item.id,
                text : item.nama_negeri 
            }));
        });
        
    });
// END Dropdown Negeri List