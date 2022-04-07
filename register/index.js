var confirmed = false;
if (window.sessionStorage.FK_jenis_pengguna == '1')    {
    window.sessionStorage.content = "kerajaan";
    $('#content').load('kerajaan.html');
    // document.getElementById("kerajaan").classList.add("show");
    // document.getElementById("kerajaan").classList.add("active");
} else if (window.sessionStorage.FK_jenis_pengguna == '2')    {
    window.sessionStorage.content = "swasta";
    $('#content').load('swasta.html');
    // document.getElementById("swasta").classList.add("show");
    // document.getElementById("swasta").classList.add("active");
} else if (window.sessionStorage.FK_jenis_pengguna == '3')    {
    window.sessionStorage.content = "pelajar";
    $('#content').load('pelajar.html');
    // document.getElementById("pelajar").classList.add("show");
    // document.getElementById("pelajar").classList.add("active");
}
document.getElementById("no_kad_pengenalan_semak").focus();
if ((typeof window.sessionStorage.no_kad_pengenalan !== 'undefined') && typeof window.sessionStorage.FK_jenis_pengguna == 'undefined') {
    document.getElementById("checkic").classList.add("hidden");
    document.getElementById("checkic2").classList.remove("hidden");
    document.getElementById("FK_jenis_pengguna").focus();
    document.getElementById("no_kad_pengenalan_daftar").value = window.sessionStorage.no_kad_pengenalan;
}

if ((typeof window.sessionStorage.no_kad_pengenalan !== 'undefined') && typeof window.sessionStorage.FK_jenis_pengguna !== 'undefined') {
    document.getElementById("checkic").classList.add("hidden");
    document.getElementById("aftercheckic").classList.remove("hidden");   
}

$("#checkusers").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_semak").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);

        // console.log(nama_user)
        var settings = {
            "url": host+"api_pentadbir/public/users",
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
            // console.log(result);
            if (!result.success) {
                swal({
                    title: "Semak Pengguna",
                    text: "Sila Masukkan Kategori Pengguna",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.no_kad_pengenalan = no_kad_pengenalan;
                    window.location.reload();   
                });
            } else  {                
                swal({
                    title: "Semak Pengguna",
                    text: "No Kad Pengenalan " + no_kad_pengenalan + " telah berdaftar di dalam sistem.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.replace("../login");      
                });
            }
        });
    }
});

$("#checkusers2").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let FK_jenis_pengguna = $("#FK_jenis_pengguna").val();
        let FK_jenis_pengguna_text = $("#FK_jenis_pengguna").text();
        swal({
            title: "Daftar Pengguna",
            text: "Sila lengkapkan butiran pendaftaran.",
            type: "question",
            confirmButtonText: "Teruskan",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            sessionStorage.FK_jenis_pengguna = FK_jenis_pengguna;
            window.location.reload();   
        });
    }
});

//Dropdown Jenis Pengguna List
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
// END Dropdown Jenis Pengguna List