$(function(){
    $.ajaxSetup ({
        cache: false
    });
    users_info(window.sessionStorage.id,function(){
  	    if ((result.data.users_intan) == 1)   {
            $('#displayjawatan').text(result.data.nama_kluster + ", " + result.data.nama_subkluster + ", " + result.data.nama_unit);
        } else  {
            $('#displayjawatan').text(result.data.nama_kementerian + ", " + result.data.nama_agensi + ", " + result.data.nama_bahagian);
        }
        $('#displayno_kad_pengenalan').val(result.data.no_kad_pengenalan);
        $('#displayemel').val(result.data.emel);
        $('#displaytarikhlahir').val(result.data.tarikh_lahir);
        $('#notel').val(result.data.notel);
        $('#displaynamamk').val(result.data.nama_mk);
        $('#displaynotelmk').val(result.data.notel_mk);
    });
    
});

function users_info(id,returnValue){
    var settings = {
        "url": host + "api_pentadbir/public/usersListKerajaan/"+id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        result = response;
        if(result.success){ 
            // console.log(response.data)
            returnValue();
        }
        else{
            swal(response.message,"Tiada Data",'warning');
        }
    });
}

$("#ubahkatalaluan").click(function () {
    $('#step-3').removeClass('hidden');
    $('#divubahkatalaluan').addClass('hidden');
});
$("#tutupubahkatalaluan").click(function () {    
    $('#step-3').addClass('hidden');
});

