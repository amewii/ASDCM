var confirmed = false;
document.getElementById("no_kad_pengenalan_semak").focus();
if ((typeof window.sessionStorage.no_kad_pengenalan !== 'undefined')) {
    $("#checkic").addClass("hidden");
    $("#checkic2").removeClass("hidden");
    $("#no_kad_pengenalan_daftar").val(window.sessionStorage.no_kad_pengenalan);
}

if ((typeof window.sessionStorage.no_kad_pengenalan !== 'undefined') && typeof window.sessionStorage.emel !== 'undefined') {
    $("#checkic").addClass("hidden");
    $("#checkic2").addClass("hidden");
    $("#checkic3").removeClass("hidden");
    $("#no_kad_pengenalan_final").val(window.sessionStorage.no_kad_pengenalan);
    $("#emel_final").val(window.sessionStorage.emel);
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
                    title: "Lupa Katalaluan",
                    text: "No Kad Pengenalan " + no_kad_pengenalan + " tidak berdaftar di dalam sistem.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "Sila Masukkan Email Pengguna " + no_kad_pengenalan,
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.no_kad_pengenalan = no_kad_pengenalan;
                    window.location.reload();   
                });
            }
        });
    }
});

$("#checkusers2").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_daftar").val();
        let emel = $("#emel_semak").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("emel",emel);

        // console.log(nama_user)
        var settings = {
            "url": host+"api_pentadbir/public/usersIcEmel",
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
                    title: "Lupa Katalaluan",
                    text: "Rekod tidak sah.",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "Sila Masukkan Katalaluan Baharu",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.no_kad_pengenalan = no_kad_pengenalan;
                    sessionStorage.emel = emel;
                    window.location.reload();   
                });
            }
        });
    }
});

$("#ckatalaluan").blur(function(){
    if ($('#katalaluan').val() !== $('#ckatalaluan').val()) {
        alert("Katalaluan tidak sepadan.");
    } else  {
        $('#hantar').prop('disabled', false);
    }
});

$("#checkusers3").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        let no_kad_pengenalan = $("#no_kad_pengenalan_final").val();
        let katalaluan = $("#katalaluan").val();

        var form = new FormData();
        form.append("no_kad_pengenalan",no_kad_pengenalan);
        form.append("katalaluan",katalaluan);

        // console.log(nama_user)
        var settings = {
            "url": host+"api_pentadbir/public/usersReset",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        console.log(settings);

        $.ajax(settings).done(function (response) {
            // console.log(response);
            result = JSON.parse(response);
            // console.log(result);
            if (!result.success) {            
                swal({
                    title: "Lupa Katalaluan",
                    text: "Gagal.",
                    type: "error",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    sessionStorage.token = result.token;
                    window.location.reload();
                });
            } else  {    
                swal({
                    title: "Lupa Katalaluan",
                    text: "Katalaluan telah disetsemula. Sila log masuk menggunakan katalaluan baharu.",
                    type: "success",
                    closeOnConfirm: true,
                    allowOutsideClick: false,
                    html: false
                }).then(function(){
                    window.sessionStorage.removeItem("no_kad_pengenalan");
                    window.sessionStorage.removeItem("emel");
                    window.location.replace(window.sessionStorage.url);   
                });
            }
        });
    }
});