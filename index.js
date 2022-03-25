$(document).ready(function(){
    let content = window.sessionStorage.content;
    let token = window.sessionStorage.token;
    // $('#user_nama').innerHTML = nama;
    document.getElementById("user_nama").innerHTML=window.sessionStorage.nama;
    document.getElementById("user_namas").innerHTML=window.sessionStorage.nama;
    document.getElementById("user_emel").innerHTML=window.sessionStorage.emel;
    // $('#content').load(content+'.html');
    if(content != null && token != null){
        $('#content').load(content+'.html');
    }
    else if(token == null){
        window.location.replace("login/");
    }
});

var settings = {
    "url": host + "api_media/public/permohonanStatus/1",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    let bil = 0;
    $.each(response.data, function (i, field) {
        t_permohonan = new Date(field.tarikh_permohonan);
        if((field.FK_vip != '') && (window.sessionStorage.FK_kluster == '2'))  {
            bil++;
            document.getElementById("badge").classList.add("badge");
            data_notication = ' <li>'+
                                    '<a id="view_permohonan" onclick="viewPermohonan()">'+
                                        '<i class="zmdi zmdi-notifications-none"></i>'+
                                        '<p>Permohonan Muat Turun Media oleh '+ field.nama +
                                        '<br>Nama Program: <b>'+ field.nama_program +'</b>.</p>'+
                                        '<span>'+ t_permohonan.getDate() + "/" + (t_permohonan.getMonth() + 1) + "/" + t_permohonan.getFullYear() +'</span>'+
                                    '</a>'+
                                    '<button class="delete"><i class="zmdi zmdi-close-circle-o"></i></button>'+
                                '</li>';
            $("#notificationlist").html(data_notication);                
        } else if((field.FK_vip == '') && (window.sessionStorage.FK_kluster != '2'))  {
            bil++;
            document.getElementById("badge").classList.add("badge");
            data_notication = ' <li>'+
                                    '<a id="view_permohonan" onclick="viewPermohonan()">'+
                                        '<i class="zmdi zmdi-notifications-none"></i>'+
                                        '<p>Permohonan Muat Turun Media oleh '+ field.nama +
                                        '<br>Nama Program: <b>'+ field.nama_program +'</b>.</p>'+
                                        '<span>'+ t_permohonan.getDate() + "/" + (t_permohonan.getMonth() + 1) + "/" + t_permohonan.getFullYear() +'</span>'+
                                    '</a>'+
                                    '<button class="delete"><i class="zmdi zmdi-close-circle-o"></i></button>'+
                                '</li>';
            $("#notificationlist").html(data_notication);       
        }
    });
    $('#notificationbill').html('Anda mempunyai ' + bil + ' notifikasi');
});

var settings = {
    "url": host + "api_public/public/menusList",
    "method": "GET",
    "timeout": 0,
};
$.ajax(settings).done(function (response) {
    $.each(response.data, function (i, item) {
        document.getElementById(item.idmenu).innerHTML = '<i style="font-size: large;" class="'+ item.icon +'"></i> <span style="font-size: medium;"><p style="white-space: pre-line">'+ item.menu +'</p></span>';
    });
});

$("#home").click(function () {
    window.sessionStorage.removeItem("content");
    window.location.reload();
});

$("#ttpn_agama").click(function () {
    window.sessionStorage.content = "html/ttpn_agama";
    saveLog(window.sessionStorage.id,"View Tetapan Agama.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_agama.html');
});

$("#ttpn_bangsa").click(function () {
    window.sessionStorage.content = "html/ttpn_bangsa";
    saveLog(window.sessionStorage.id,"View Tetapan Bangsa.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_bangsa.html');
});

$("#ttpn_etnik").click(function () {
    window.sessionStorage.content = "html/ttpn_etnik";
    saveLog(window.sessionStorage.id,"View Tetapan Etnik.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_etnik.html');
});

$("#ttpn_gelaran").click(function () {
    window.sessionStorage.content = "html/ttpn_gelaran";
    saveLog(window.sessionStorage.id,"View Tetapan Gelaran.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_gelaran.html');
});

$("#ttpn_kampus").click(function () {
    window.sessionStorage.content = "html/ttpn_kampus";
    saveLog(window.sessionStorage.id,"View Tetapan Kampus.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_kampus.html');
});

$("#ttpn_kluster").click(function () {
    window.sessionStorage.content = "html/ttpn_kluster";
    saveLog(window.sessionStorage.id,"View Tetapan Kluster.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_kluster.html');
});

$("#ttpn_modul").click(function () {
    window.sessionStorage.content = "html/ttpn_modul";
    saveLog(window.sessionStorage.id,"View Tetapan Modul.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_modul.html');
});

$("#ttpn_negara").click(function () {
    window.sessionStorage.content = "html/ttpn_negara";
    saveLog(window.sessionStorage.id,"View Tetapan Negara.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_negara.html');
});

$("#ttpn_negeri").click(function () {
    window.sessionStorage.content = "html/ttpn_negeri";
    saveLog(window.sessionStorage.id,"View Tetapan Negeri.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_negeri.html');
});

$("#ttpn_unit").click(function () {
    window.sessionStorage.content = "html/ttpn_unit";
    saveLog(window.sessionStorage.id,"View Tetapan Unit.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_unit.html');
});

$("#ttpn_warganegara").click(function () {
    window.sessionStorage.content = "html/ttpn_warganegara";
    saveLog(window.sessionStorage.id,"View Tetapan Warganegara.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_warganegara.html');
});

$("#ttpn_useradmin").click(function () {
    window.sessionStorage.content = "html/ttpn_useradmin";
    saveLog(window.sessionStorage.id,"View Tetapan Admin Pengguna.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_useradmin.html');
});

$("#log").click(function () {
    window.sessionStorage.content = "html/log";
    saveLog(window.sessionStorage.id,"View Log Sistem.",window.sessionStorage.browser);
    $('#content').load('html/log.html');
});

$("#ttpn_usersubmodul").click(function () {
    window.sessionStorage.content = "html/ttpn_usersubmodul";
    saveLog(window.sessionStorage.id,"View Tetapan Capaian.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_usersubmodul.html');
});

$("#ttpn_capaian").click(function () {
    window.sessionStorage.content = "html/ttpn_capaian";
    saveLog(window.sessionStorage.id,"View Tetapan Capaian.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_capaian.html');
});

$("#senarai_pengguna").click(function () {
    window.sessionStorage.content = "html/senarai_pengguna";
    saveLog(window.sessionStorage.id,"View Senarai Pengguna.",window.sessionStorage.browser);
    $('#content').load('html/senarai_pengguna.html');
});

$("#ttpn_nama_menu").click(function () {
    window.sessionStorage.content = "html/ttpn_nama_menu";
    saveLog(window.sessionStorage.id,"View Senarai Menu.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_nama_menu.html');
});

$("#ttpn_sistem").click(function () {
    window.sessionStorage.content = "html/ttpn_sistem";
    saveLog(window.sessionStorage.id,"View Tetapan Sistem.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_sistem.html');
});

$("#ttpn_med_format").click(function () {
    window.sessionStorage.content = "html/ttpn_med_format";
    saveLog(window.sessionStorage.id,"View Tetapan Format Media.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_med_format.html');
});

$("#ttpn_med_kategori").click(function () {
    window.sessionStorage.content = "html/ttpn_med_kategori";
    saveLog(window.sessionStorage.id,"View Tetapan Kategori Media.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_med_kategori.html');
});

$("#ttpn_med_status").click(function () {
    window.sessionStorage.content = "html/ttpn_med_status";
    saveLog(window.sessionStorage.id,"View Tetapan Status Media.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_med_status.html');
});

$("#ttpn_med_tempoh").click(function () {
    window.sessionStorage.content = "html/ttpn_med_tempoh";
    saveLog(window.sessionStorage.id,"View Tetapan Tempoh Media.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_med_tempoh.html');
});

$("#ttpn_vip").click(function () {
    window.sessionStorage.content = "html/ttpn_vip";
    saveLog(window.sessionStorage.id,"View Tetapan VIP Media.",window.sessionStorage.browser);
    $('#content').load('html/ttpn_vip.html');
});

$("#med_program").click(function () {
    window.sessionStorage.content = "html/med_program";
    saveLog(window.sessionStorage.id,"View Program Media.",window.sessionStorage.browser);
    $('#content').load('html/med_program.html');
});

$("#med_permohonan").click(function () {
    window.sessionStorage.content = "html/med_permohonan";
    saveLog(window.sessionStorage.id,"View Permohonan Media.",window.sessionStorage.browser);
    $('#content').load('html/med_permohonan.html');
});

function viewPermohonan(){   
    window.sessionStorage.content = "html/med_permohonan";
    saveLog(window.sessionStorage.id,"View Permohonan Media.",window.sessionStorage.browser);
    $('#content').load('html/med_permohonan.html');
}

$("#logKeluar").click(function () {
    document.getElementById("menu-kanan").classList.remove("show");
    swal({
        title: "Log Keluar",
        text: "Anda Pasti Untuk Log Keluar?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        closeOnConfirm: true,
        allowOutsideClick: false,
        html: false
    }).then(function () {
        saveLog(window.sessionStorage.id,"Logout.",window.sessionStorage.browser);
        window.sessionStorage.clear();
        window.location.replace("login/");
    });
});

function saveLog(FK_users, action_made, browser_name){   
    var form = new FormData();
    form.append("FK_users", FK_users);
    form.append("action_made", action_made);
    form.append("browser_name", browser_name);
    var settings = {
        "url": host + "api_public/public/addLogs",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        return;
    });    
}