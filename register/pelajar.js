document.getElementById("no_kad_pengenalan_pelajar").value = window.sessionStorage.no_kad_pengenalan;

$("#registerpelajar").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_pelajar").val();
        let nama = $("#nama_pelajar").val();
        let FK_jantina = $("#FK_jantina_pelajar").val();
        let emel = $("#emel_pelajar").val();
        let tarikh_lahir = $("#tarikh_lahir_pelajar").val();
        let notel = $("#notel_pelajar").val();
        let FK_jenis_pengguna = "3";
        let FK_warganegara = $("#FK_warganegara_pelajar").val();
        let FK_gelaran = $("#FK_gelaran_pelajar").val();
        let FK_bangsa = $("#FK_bangsa_pelajar").val();
        let FK_etnik = $("#FK_etnik_pelajar").val();
        let FK_agama = $("#FK_agama_pelajar").val();
        let FK_negara_lahir = $("#FK_negara_lahir_pelajar").val();
        let FK_negeri_lahir = $("#FK_negeri_lahir_pelajar").val();
        let katalaluan = $("#katalaluan_pelajar").val();
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
        form.append("FK_jenis_pengguna", FK_jenis_pengguna);
        form.append("FK_warganegara", FK_warganegara);
        form.append("FK_gelaran", FK_gelaran);
        form.append("FK_bangsa", FK_bangsa);
        form.append("FK_etnik", FK_etnik);
        form.append("FK_agama", FK_agama);
        form.append("FK_negara_lahir", FK_negara_lahir);
        form.append("FK_negeri_lahir", FK_negeri_lahir);
        form.append("katalaluan", katalaluan);
        // formData.append("token",window.sessionStorage.token);
        var settingsregusers = {
            "url": host + "api_pentadbir/public/addUsers",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settingsregusers).done(function (response) {
            console.log(response);
            result = JSON.parse(response);
            if (!result.success) {
                Swal(result.message, result.data, "error");
                return;
            }

            var settingsfetchusers = {
                "url": host + "api_pentadbir/public/users",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settingsfetchusers).done(function (response) {
                console.log(response);
                result = JSON.parse(response);
                let FK_users = result.data.id;
                let nama_sekolah = $("#nama_sekolah_pelajar").val();
                let alamat1_sekolah = $("#alamat1_sekolah_pelajar").val();
                let alamat2_sekolah = $("#alamat2_sekolah_pelajar").val();
                let poskod_sekolah = $("#poskod_sekolah_pelajar").val();
                let daerah_sekolah = $("#daerah_sekolah_pelajar").val();
                let negeri_sekolah = $("#negeri_sekolah_pelajar").val();
                let negara_sekolah = $("#negara_sekolah_pelajar").val();
                let alamat1_rumah = $("#alamat1_rumah_pelajar").val();
                let alamat2_rumah = $("#alamat2_rumah_pelajar").val();
                let poskod_rumah = $("#poskod_rumah_pelajar").val();
                let daerah_rumah = $("#daerah_rumah_pelajar").val();
                let negeri_rumah = $("#negeri_rumah_pelajar").val();
                let negara_rumah = $("#negara_rumah_pelajar").val();
                
                var formpelajar = new FormData();
                formpelajar.append("FK_users", FK_users);
                formpelajar.append("nama_sekolah", nama_sekolah);
                formpelajar.append("alamat1_sekolah", alamat1_sekolah);
                formpelajar.append("alamat2_sekolah", alamat2_sekolah);
                formpelajar.append("poskod_sekolah", poskod_sekolah);
                formpelajar.append("daerah_sekolah", daerah_sekolah);
                formpelajar.append("negeri_sekolah", negeri_sekolah);
                formpelajar.append("negara_sekolah", negara_sekolah);
                formpelajar.append("alamat1_rumah", alamat1_rumah);
                formpelajar.append("alamat2_rumah", alamat2_rumah);
                formpelajar.append("poskod_rumah", poskod_rumah);
                formpelajar.append("daerah_rumah", daerah_rumah);
                formpelajar.append("negeri_rumah", negeri_rumah);
                formpelajar.append("negara_rumah", negara_rumah);
                formpelajar.append("statusrekod", "1");

                var settingsreguserpelajars = {
                    "url": host + "api_pentadbir/public/addUserspelajars",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": formpelajar
                };                

                $.ajax(settingsreguserpelajars).done(function (response) {
                    console.log(response);
                    result = JSON.parse(response);
                    let nama_mk = $("#nama_mk_pelajar").val();
                    let notel_mk = $("#notel_mk_pelajar").val();
                    
                    var formmk = new FormData();
                    formmk.append("FK_users", FK_users);
                    formmk.append("nama_mk", nama_mk);
                    formmk.append("notel_mk", notel_mk);
                    formmk.append("statusrekod", "1");

                    var settingsregmk = {
                        "url": host + "api_pentadbir/public/addMaklumatkecemasans",
                        "method": "POST",
                        "timeout": 0,
                        "processData": false,
                        "mimeType": "multipart/form-data",
                        "contentType": false,
                        "data": formmk
                    };

                    $.ajax(settingsregmk).done(function (response) {
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
                            window.location.replace("../../user/login");
                
                        });
                    });
                });
            });            
        });
    }
});

$("#poskod_rumah_pelajar").blur(function(){
    var settings = {
        "url": host + "api_public/public/sysposkod/" + $("#poskod_rumah_pelajar").val(),
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        document.getElementById("daerah_rumah_pelajar").value=response.data.bandar;
        document.getElementById("negeri_rumah_pelajar").value=response.data.nama;    
    }); 
});

$("#poskod_sekolah_pelajar").blur(function(){
    var settings = {
        "url": host + "api_public/public/sysposkod/" + $("#poskod_sekolah_pelajar").val(),
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        document.getElementById("daerah_sekolah_pelajar").value=response.data.bandar;
        document.getElementById("negeri_sekolah_pelajar").value=response.data.nama;    
    }); 
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

        $('#FK_jantina_pelajar').empty();
        $('#FK_jantina_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Jantina" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_jantina_pelajar').append($('<option>', { 
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
        $('#FK_warganegara_pelajar').empty();
        $('#FK_warganegara_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Warganegara" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_warganegara_pelajar').append($('<option>', { 
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
        $('#FK_gelaran_pelajar').empty();
        $('#FK_gelaran_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Gelaran" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_gelaran_pelajar').append($('<option>', { 
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
        $('#FK_bangsa_pelajar').empty();
        $('#FK_bangsa_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Bangsa" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_bangsa_pelajar').append($('<option>', { 
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
        $('#FK_etnik_pelajar').empty();
        $('#FK_etnik_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Etnik" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_etnik_pelajar').append($('<option>', { 
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
        $('#FK_agama_pelajar').empty();
        $('#FK_agama_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Agama" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_agama_pelajar').append($('<option>', { 
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
        $('#FK_negara_lahir_pelajar').empty();
        $('#FK_negara_lahir_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Negara" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_negara_lahir_pelajar').append($('<option>', { 
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
        $('#FK_negeri_lahir_pelajar').empty();
        $('#FK_negeri_lahir_pelajar').append($('<option>', { 
            value: "",
            text : "Pilih Negeri" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_negeri_lahir_pelajar').append($('<option>', { 
                value: item.id,
                text : item.nama_negeri 
            }));
        });
        
    });
// END Dropdown Negeri List 