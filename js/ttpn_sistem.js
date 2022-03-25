var settings = {
    "url": host + "api_pentadbir/public/tetapansList",
    "method": "GET",
    "timeout": 0,
  };

$.ajax(settings).done(function (response) {
    $('#upt_id').val(response.data.id);
    $('#nama_sistem').val(response.data.nama_sistem);
    $('#versi_sistem').val(response.data.versi_sistem);
    $('#pelepasan_sistem').val(response.data.pelepasan_sistem);
    if (response.data.status_sistem == 'Aktif') {
        $('#status_sistem').prop('checked', true);
    }
    $('#min_katalaluan').val(response.data.min_katalaluan);
    if (response.data.polisi_katalaluan == 'Aktif') {
        $('#polisi_katalaluan').prop('checked', true);
    }
    $('#text_status_sistem').text(response.data.status_sistem);
    $('#text_polisi_katalaluan').text(response.data.polisi_katalaluan);
    $('#active_until').val(response.data.active_until);
});

//FUNCTION UPDATE
var confirmed = false;

$("#update").on('submit',function(e){
    let $this = $(this);
    if (!confirmed) {
        e.preventDefault();
        swal({
            title: "Kemaskini Tetapan Sistem",
            text: "Anda Pasti Untuk Kemaskini?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            closeOnConfirm: true,
            allowOutsideClick: false,
            html: false
        }).then(function(){
            let polisi_katalaluan = "";
            let status_sistem = "";
            let upt_id = $("#upt_id").val();
            let nama_sistem = $("#nama_sistem").val();
            let versi_sistem = $("#versi_sistem").val();
            let pelepasan_sistem = $("#pelepasan_sistem").val();
            if (document.getElementById('polisi_katalaluan').checked)    {
                polisi_katalaluan = 'Aktif';
            } else  {
                polisi_katalaluan = 'Tidak Aktif';
            }
            if (document.getElementById('status_sistem').checked)    {
                status_sistem = 'Aktif';
            } else  {
                status_sistem = 'Tidak Aktif';
            }
            let min_katalaluan = $("#min_katalaluan").val();
            let active_until = $("#active_until").val();
            var param = {
                twmTitle: pelepasan_sistem,
                twmDescription: status_sistem,
                a: min_katalaluan,
                b: active_until,
                c: nama_sistem,
            }
            console.log(param)
            var form = new FormData();
            form.append("id", upt_id);
            form.append("nama_sistem", nama_sistem);
            form.append("versi_sistem", versi_sistem);
            form.append("pelepasan_sistem", pelepasan_sistem);
            form.append("status_sistem", status_sistem);
            form.append("min_katalaluan", min_katalaluan);
            form.append("polisi_katalaluan", polisi_katalaluan);
            form.append("active_until", active_until);
            form.append("updated_by", window.sessionStorage.id);

            var settings = {
                "url": host+"api_pentadbir/public/tetapansUpdate",
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };

            $.ajax(settings).done(function (response) {
                console.log(response)
                result = JSON.parse(response);
                if (!result.success) {
                    // Swal(result.message, result.data, "error");
                    // return;
                    swal({
                        title: "Kemaskini Tetapan Sistem",
                        text: result.data,
                        type: "error",
                        closeOnConfirm: true,
                        allowOutsideClick: false,
                        html: false
                    }).then(function(){
                        window.location.reload();        
                    });
                } else {
                    saveLog(window.sessionStorage.id,"Update Data for [id = " + upt_id + "] at Tetapan Sistem.",window.sessionStorage.browser);
                    window.location.reload();  
                }
            });

        });
    }
});