document.getElementById("no_kad_pengenalan").value = window.sessionStorage.regno_kad_pengenalan;

$("#registergov").on('submit', function (e) {
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan").val();
        let nama = $("#nama").val();
        let FK_jantina = $("#FK_jantina").val();
        let emel = $("#emel").val();
        let tarikh_lahir = $("#tarikh_lahir").val();
        let notel = $("#notel").val();
        let FK_jenis_pengguna = "1";
        let FK_warganegara = $("#FK_warganegara").val();
        let FK_gelaran = $("#FK_gelaran").val();
        let FK_bangsa = $("#FK_bangsa").val();
        let FK_etnik = $("#FK_etnik").val();
        let FK_agama = $("#FK_agama").val();
        let FK_negara_lahir = $("#FK_negara_lahir").val();
        let FK_negeri_lahir = $("#FK_negeri_lahir").val();
        let katalaluan = $("#katalaluan").val();
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
                let nama_jawatan = $("#nama_jawatan").val();
                let kod_jawatan = $("#kod_jawatan").val();
                let kategori_perkhidmatan = $("#kategori_perkhidmatan").val();
                let skim = $("#skim").val();
                let gred = $("#gred").val();
                let taraf_jawatan = $("#taraf_jawatan").val();
                let jenis_perkhidmatan = $("#jenis_perkhidmatan").val();
                let tarikh_lantikan = $("#tarikh_lantikan").val();
                let users_intan = $('#users_intan').val();
                let FK_kampus = $('#FK_kampus').val();
                let FK_kluster = $('#FK_kluster').val();
                let FK_subkluster = $('#FK_subkluster').val();
                let FK_unit = $('#FK_unit').val();
                let FK_kementerian = $('#FK_kementerian').val();
                let FK_agensi = $('#FK_agensi').val();
                let FK_bahagian = $('#FK_bahagian').val();
                let FK_ila = $('#FK_ila').val();
                let bahagian = $('#bahagian').val();
                let alamat1_pejabat = $('#alamat1_pejabat').val();
                let alamat2_pejabat = $('#alamat2_pejabat').val();
                let poskod_pejabat = $('#poskod_pejabat').val();
                let daerah_pejabat = $('#daerah_pejabat').val();
                let negeri_pejabat = $('#negeri_pejabat').val();
                
                var formgov = new FormData();
                formgov.append("FK_users", FK_users);
                formgov.append("nama_jawatan", nama_jawatan);
                formgov.append("kod_jawatan", kod_jawatan);
                formgov.append("kategori_perkhidmatan", kategori_perkhidmatan);
                formgov.append("skim", skim);
                formgov.append("gred", gred);
                formgov.append("taraf_jawatan", taraf_jawatan);
                formgov.append("jenis_perkhidmatan", jenis_perkhidmatan);
                formgov.append("tarikh_lantikan", tarikh_lantikan);
                formgov.append("users_intan", users_intan);
                formgov.append("FK_kampus", FK_kampus);
                formgov.append("FK_kluster", FK_kluster);
                formgov.append("FK_subkluster", FK_subkluster);
                formgov.append("FK_unit", FK_unit);
                formgov.append("FK_kementerian", FK_kementerian);
                formgov.append("FK_agensi", FK_agensi);
                formgov.append("FK_bahagian", FK_bahagian);
                formgov.append("FK_ila", FK_ila);
                formgov.append("bahagian", bahagian);
                formgov.append("alamat1_pejabat", alamat1_pejabat);
                formgov.append("alamat2_pejabat", alamat2_pejabat);
                formgov.append("poskod_pejabat", poskod_pejabat);
                formgov.append("daerah_pejabat", daerah_pejabat);
                formgov.append("negeri_pejabat", negeri_pejabat);
                formgov.append("statusrekod", "1");

                var settingsregusersgovs = {
                    "url": host + "api_pentadbir/public/addUsersgovs",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": formgov
                };

                $.ajax(settingsregusersgovs).done(function (response) {
                    // console.log(response);
                    result = JSON.parse(response);
                    let nama_mk = $("#nama_mk").val();
                    let notel_mk = $("#notel_mk").val();
                    
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

$('#users_intan').change(function(){
    if ($('#users_intan').val() == 1) {
        document.getElementById("usersintan").classList.remove("hidden");
        document.getElementById("usersluar").classList.add("hidden");
        document.getElementById("FK_kampus").required = true;
        document.getElementById("FK_kluster").required = true;
        document.getElementById("FK_kementerian").required = false;
        document.getElementById("FK_agensi").required = false;
        document.getElementById("FK_bahagian").required = false;
        document.getElementById("alamat1_pejabat").required = false;
        document.getElementById("alamat2_pejabat").required = false;
        document.getElementById("poskod_pejabat").required = false;
        document.getElementById("daerah_pejabat").required = false;
        document.getElementById("negeri_pejabat").required = false;
    } else if ($('#users_intan').val() == 0)    {
        document.getElementById("usersluar").classList.remove("hidden");
        document.getElementById("usersintan").classList.add("hidden");
        document.getElementById("FK_kampus").required = false;
        document.getElementById("FK_kluster").required = false;
        document.getElementById("FK_kementerian").required = true;
        document.getElementById("FK_agensi").required = true;
        document.getElementById("FK_bahagian").required = true;
        document.getElementById("alamat1_pejabat").required = true;
        document.getElementById("alamat2_pejabat").required = true;
        document.getElementById("poskod_pejabat").required = true;
        document.getElementById("daerah_pejabat").required = true;
        document.getElementById("negeri_pejabat").required = true;
    }
})

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

//Dropdown Bahagian List
$('#FK_subkluster').empty();
$('#FK_subkluster').append($('<option>', { 
    value: "",
    text : "Pilih Subkluster" 
}));

$('#FK_kluster').change(function(){
    //Dropdown Unit List
    var settings = {
        "url": host+"api_public/public/subklusters/" + $('#FK_kluster').val(),
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
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
                    value: item.id,
                    text : item.nama_subkluster
                }));
            });
            
        });
    // END Dropdown Unit List
    
});//Dropdown Bahagian List

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
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
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
                    value: item.id,
                    text : item.nama_unit 
                }));
            });
            
        });
    // END Dropdown Unit List
    
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

//Dropdown Skim List
var settings = {
    "url": host+"api_pentadbir/public/skimsList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#skim').empty();
        $('#skim').append($('<option>', { 
            value: "",
            text : "Pilih Skim" 
        }));
        $.each(response.data, function (i, item) {
            $('#skim').append($('<option>', { 
                value: item.id,
                text : item.kod_skim + " - " + item.nama_skim 
            }));
        });
        
    });
// END Dropdown Skim List

//Dropdown Gred List
var settings = {
    "url": host+"api_pentadbir/public/gredsList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#gred').empty();
        $('#gred').append($('<option>', { 
            value: "",
            text : "Pilih Gred" 
        }));
        $.each(response.data, function (i, item) {
            $('#gred').append($('<option>', { 
                value: item.id,
                text : item.nama_gred 
            }));
        });
        
    });
// END Dropdown Gred List

//Dropdown Tarafjawatan List
var settings = {
    "url": host+"api_pentadbir/public/tarafjawatansList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#taraf_jawatan').empty();
        $('#taraf_jawatan').append($('<option>', { 
            value: "",
            text : "Pilih Taraf Jawatan" 
        }));
        $.each(response.data, function (i, item) {
            $('#taraf_jawatan').append($('<option>', { 
                value: item.id,
                text : item.nama_tarafjawatan 
            }));
        });
        
    });
// END Dropdown Tarafjawatan List

//Dropdown Jenis Perkhidmatan List
var settings = {
    "url": host+"api_pentadbir/public/jenisperkhidmatansList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#jenis_perkhidmatan').empty();
        $('#jenis_perkhidmatan').append($('<option>', { 
            value: "",
            text : "Pilih Jenis Perkhidmatan" 
        }));
        $.each(response.data, function (i, item) {
            $('#jenis_perkhidmatan').append($('<option>', { 
                value: item.id,
                text : item.nama_jenisperkhidmatan 
            }));
        });
        
    });
// END Dropdown Jenis Perkhidmatan List

//Dropdown Kategori Perkhidmatan List
var settings = {
    "url": host+"api_pentadbir/public/kategoriperkhidmatansList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#kategori_perkhidmatan').empty();
        $('#kategori_perkhidmatan').append($('<option>', { 
            value: "",
            text : "Pilih Kategori Perkhidmatan" 
        }));
        $.each(response.data, function (i, item) {
            $('#kategori_perkhidmatan').append($('<option>', { 
                value: item.id,
                text : item.nama_kategoriperkhidmatan 
            }));
        });
        
    });
// END Dropdown Kategori Perkhidmatan List

//Dropdown Kementerian List
var settings = {
    "url": host+"api_public/public/kementeriansList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_kementerian').empty();
        $('#FK_kementerian').append($('<option>', { 
            value: "",
            text : "Pilih Kementerian" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_kementerian').append($('<option>', { 
                value: item.kod_kementerian,
                text : item.nama_kementerian + " (" + item.kod_kementerian + ")"
            }));
        });
        
    });
// END Dropdown Kementerian List

//Dropdown Agensi List
var settings = {
    "url": host+"api_public/public/agensisList",
    "method": "GET",
    "timeout": 0,
    // "header":{
    //     "Authentication": "ASDCM"+window.sessionStorage.token
    //   }
  };

    $.ajax(settings).done(function (response) {
        //LIST OPTION
        $('#FK_agensi').empty();
        $('#FK_agensi').append($('<option>', { 
            value: "",
            text : "Pilih Agensi" 
        }));
        $.each(response.data, function (i, item) {
            $('#FK_agensi').append($('<option>', { 
                value: item.kod_agensi,
                text : item.nama_agensi + " (" + item.kod_agensi + ")"
            }));
        });
        
    });
// END Dropdown Agensi List

//Dropdown Bahagian List
$('#FK_bahagian').empty();
$('#FK_bahagian').append($('<option>', { 
    value: "",
    text : "Pilih Bahagian" 
}));

$('#FK_agensi').change(function(){
    var settings = {
        "url": host+"api_public/public/bahagians/" + $('#FK_kementerian').val() + "/" + $('#FK_agensi').val(),
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };
    console.log(settings);

        $.ajax(settings).done(function (response) {
            //LIST OPTION
            $('#FK_bahagian').empty();
            $('#FK_bahagian').append($('<option>', { 
                value: "",
                text : "Pilih Bahagian" 
            }));
            $.each(response.data, function (i, item) {
                $('#FK_bahagian').append($('<option>', { 
                    value: item.kod_bahagian,
                    text : item.nama_bahagian  + " (" + item.kod_bahagian + ")"
                }));
            });
                           
        });
    // END Dropdown Sub Modul List

    // document.getElementById("submodul").classList.remove("hidden");
    
});

//Dropdown Bahagian List
$('#FK_ila').empty();
$('#FK_ila').append($('<option>', { 
    value: "",
    text : "Pilih ILA" 
}));

$('#FK_bahagian').change(function(){
    var settings = {
        "url": host+"api_public/public/ilawams/" + $('#FK_bahagian').val(),
        "method": "GET",
        "timeout": 0,
        // "header":{
        //     "Authentication": "ASDCM"+window.sessionStorage.token
        //   }
    };
    console.log(settings);

        $.ajax(settings).done(function (response) {
            //LIST OPTION
            $('#FK_ila').empty();
            $('#FK_ila').append($('<option>', { 
                value: "",
                text : "Pilih ILA" 
            }));
            $.each(response.data, function (i, item) {
                $('#FK_ila').append($('<option>', { 
                    value: item.kod_ila,
                    text : item.nama_ila  + " (" + item.kod_ila + ")"
                }));
            });
                           
        });
    // END Dropdown Sub Modul List

    // document.getElementById("submodul").classList.remove("hidden");
    
});