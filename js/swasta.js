document.getElementById("no_kad_pengenalan_swasta").value = window.sessionStorage.regno_kad_pengenalan;

$("#registerswasta").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_swasta").val();
        let nama = $("#nama_swasta").val();
        let FK_jantina = $("#FK_jantina_swasta").val();
        let emel = $("#emel_swasta").val();
        let tarikh_lahir = $("#tarikh_lahir_swasta").val();
        let notel = $("#notel_swasta").val();
        let FK_jenis_pengguna = "2";
        let FK_warganegara = $("#FK_warganegara_swasta").val();
        let FK_gelaran = $("#FK_gelaran_swasta").val();
        let FK_bangsa = $("#FK_bangsa_swasta").val();
        let FK_etnik = $("#FK_etnik_swasta").val();
        let FK_agama = $("#FK_agama_swasta").val();
        let FK_negara_lahir = $("#FK_negara_lahir_swasta").val();
        let FK_negeri_lahir = $("#FK_negeri_lahir_swasta").val();
        let katalaluan = $("#katalaluan_swasta").val();
        // let ucreate = window.sessionStorage.noanggota;
        // var param = {
        //     twmTitle: no_kad_pengenalan,
        //     twmDescription: nama,
        //     a: FK_jantina,
        //     b: emel,
        //     c: tarikh_lahir,
        // }
        // console.log(param)
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
            // console.log(response);
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
                // console.log(response);
                result = JSON.parse(response);
                let FK_users = result.data.id;
                let nama_majikan = $("#nama_majikan_swasta").val();
                let notel_majikan = $("#notel_majikan_swasta").val();
                let jawatan = $("#jawatan_swasta").val();
                let emel_majikan = $("#emel_majikan_swasta").val();
                let alamat1_organisasi = $("#alamat1_organisasi_swasta").val();
                let alamat2_organisasi = $("#alamat2_organisasi_swasta").val();
                let poskod_organisasi = $("#poskod_organisasi_swasta").val();
                let daerah_organisasi = $("#daerah_organisasi_swasta").val();
                let negeri_organisasi = $("#negeri_organisasi_swasta").val();
                let negara_organisasi = $("#negara_organisasi_swasta").val();
                let alamat1_rumah = $("#alamat1_rumah_swasta").val();
                let alamat2_rumah = $("#alamat2_rumah_swasta").val();
                let poskod_rumah = $("#poskod_rumah_swasta").val();
                let daerah_rumah = $("#daerah_rumah_swasta").val();
                let negeri_rumah = $("#negeri_rumah_swasta").val();
                let negara_rumah = $("#negara_rumah_swasta").val();
                
                var formswasta = new FormData();
                formswasta.append("FK_users", FK_users);
                formswasta.append("nama_majikan", nama_majikan);
                formswasta.append("notel_majikan", notel_majikan);
                formswasta.append("jawatan", jawatan);
                formswasta.append("emel_majikan", emel_majikan);
                formswasta.append("alamat1_organisasi", alamat1_organisasi);
                formswasta.append("alamat2_organisasi", alamat2_organisasi);
                formswasta.append("poskod_organisasi", poskod_organisasi);
                formswasta.append("daerah_organisasi", daerah_organisasi);
                formswasta.append("negeri_organisasi", negeri_organisasi);
                formswasta.append("negara_organisasi", negara_organisasi);
                formswasta.append("alamat1_rumah", alamat1_rumah);
                formswasta.append("alamat2_rumah", alamat2_rumah);
                formswasta.append("poskod_rumah", poskod_rumah);
                formswasta.append("daerah_rumah", daerah_rumah);
                formswasta.append("negeri_rumah", negeri_rumah);
                formswasta.append("negara_rumah", negara_rumah);
                formswasta.append("statusrekod", "1");

                var settingsreguserswastas = {
                    "url": host + "api_pentadbir/public/addUserswastas",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": formswasta
                };                

                $.ajax(settingsreguserswastas).done(function (response) {
                    // console.log(response);
                    result = JSON.parse(response);
                    let nama_mk = $("#nama_mk_swasta").val();
                    let notel_mk = $("#notel_mk_swasta").val();
                    
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
                        // console.log(response);
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
                            window.sessionStorage.removeItem("regno_kad_pengenalan");
                            window.sessionStorage.removeItem("regFK_jenis_pengguna");
                            window.sessionStorage.removeItem("contentregister");
                            window.location.reload();
                        });
                    });
                });
            });            
        });
    }
});

$("#poskod_rumah_swasta").blur(function(){
    var settings = {
        "url": host + "api_public/public/sysposkod/" + $("#poskod_rumah_swasta").val(),
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        document.getElementById("daerah_rumah_swasta").value=response.data.bandar;
        document.getElementById("negeri_rumah_swasta").value=response.data.nama;    
        document.getElementById("negara_rumah_swasta").value=response.data.kodnegara;    
    }); 
});

$("#poskod_organisasi_swasta").blur(function(){
    var settings = {
        "url": host + "api_public/public/sysposkod/" + $("#poskod_organisasi_swasta").val(),
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        document.getElementById("daerah_organisasi_swasta").value=response.data.bandar;
        document.getElementById("negeri_organisasi_swasta").value=response.data.nama;    
        document.getElementById("negara_organisasi_swasta").value=response.data.kodnegara;    
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

        $('#FK_jantina_swasta').empty();
        $('#FK_jantina_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Jantina" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_jantina_swasta').append($('<option>', { 
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
        $('#FK_warganegara_swasta').empty();
        $('#FK_warganegara_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Warganegara" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_warganegara_swasta').append($('<option>', { 
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
        $('#FK_gelaran_swasta').empty();
        $('#FK_gelaran_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Gelaran" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_gelaran_swasta').append($('<option>', { 
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
        $('#FK_bangsa_swasta').empty();
        $('#FK_bangsa_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Bangsa" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_bangsa_swasta').append($('<option>', { 
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
        $('#FK_etnik_swasta').empty();
        $('#FK_etnik_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Etnik" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_etnik_swasta').append($('<option>', { 
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
        $('#FK_agama_swasta').empty();
        $('#FK_agama_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Agama" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_agama_swasta').append($('<option>', { 
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
        $('#FK_negara_lahir_swasta').empty();
        $('#FK_negara_lahir_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Negara" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_negara_lahir_swasta').append($('<option>', { 
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
        $('#FK_negeri_lahir_swasta').empty();
        $('#FK_negeri_lahir_swasta').append($('<option>', { 
            value: "",
            text : "Pilih Negeri" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_negeri_lahir_swasta').append($('<option>', { 
                value: item.id,
                text : item.nama_negeri 
            }));
        });
        
    });
// END Dropdown Negeri List