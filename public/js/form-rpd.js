$(document).ready(function(){
    $('.btn-tambah-peserta').on('click', function() {
        var list_peserta = $('.list-peserta').html();

        var new_row =
            '<div class="row peserta">' +
                '<div class="col-md-12"><hr></div>' +
                '<div class="col-md-4">' +
                    '<div class="form-group">' +
                        '<label for="list_peserta">Peserta</label>' +
                        '<select class="form-control list-peserta" id="list_peserta" name="list_peserta">' +
                            list_peserta +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-2">' +
                    '<div class="form-group">' +
                        '<label for="tujuan_kegiatan">Tujuan Kegiatan</label>' +
                        '<select class="form-control" id="tujuan_kegiatan" name="list_tujuan_kegiatan"><option value="project">Project</option><option value="prospek">Prospek</option><option value="pelatihan">Pelatihan</option></select>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-6" style="margin-top: 24px;">' +
                    '<button type="button" class="btn btn-default btn-tambah-kegiatan" data-loading-text="Loading..."><i class="fa fa-fw fa-plus"></i> Tambah Kegiatan</button> ' +
                    '<button type="button" class="btn btn-danger btn-hapus-peserta pull-right"><i class="fa fa-fw fa-minus"></i></button>' +
                '</div>' +
            '</div>';

        $('.box-body.box-participants').append(new_row);

        attachAddActivityEvent();
        attachRemoveParticipantEvent();
        attachParticipantChangesEvent();
    });

    attachAddActivityEvent();
    attachParticipantChangesEvent();

    // Datepicker
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
    });

    // Autofocus when modal shown
    $('.modal').on('shown.bs.modal', function() {
        $(this).find('[autofocus]').focus();
    });

    // Init select2
    $('select[name=jenis_perjalanan], select[name=sarana_penginapan], select[name=list_tujuan_kegiatan]')
        .select2({ width: '100%', minimumResultsForSearch: Infinity });

    $('select[name=kode_kota_asal], select[name=kode_kota_tujuan]')
        .select2({ width: '100%' });

    // Wizard
    $(".next-step").click(function () {
        var $active = $('.wizard .nav-tabs li.active');

        nextTab($active);
    });

    $(".prev-step").click(function () {
        var $active = $('.wizard .nav-tabs li.active');

        prevTab($active);
    });

    $('select[name=jenis_perjalanan').on('change', function() {
        var jenis_perjalanan = $(this).val()
        var kode_kota_asal = $('select[name=kode_kota_asal]').val();

        var $kota_tujuan = $('select[name=kode_kota_tujuan]');

        if (jenis_perjalanan == 'dalam_kota') {
            $kota_tujuan.val(kode_kota_asal).trigger('change');
            attachCityChangesEvent();
        }  else {
            $('select[name=kode_kota_asal').off('change.kota.asal');
        }
    });

    attachCityChangesEvent();

});

function nextTab(active) {
    $(active).next().find('a[data-toggle="tab"]').click();
}

function prevTab(active) {
    $(active).prev().find('a[data-toggle="tab"]').click();
}

function attachRemoveParticipantEvent() {
    $('.btn-hapus-peserta').off('click').on('click', function() {
        var $row = $(this).closest('.row.peserta');

        $row.remove();
    });
}

function attachParticipantChangesEvent() {
    $('select[name=list_peserta]').off('change.list_peserta').on('change.list_peserta', function () {
            var $row = $(this).closest('.row.peserta');
            var id = $row.find('select[name=list_peserta]').val();

            $row.find('input[name="id_peserta[]"]').val(id);
        }
    );
}

function attachAddActivityEvent() {
    $('.btn-tambah-kegiatan').off('click').on('click', function() {
        var $btn = $(this).button('loading');

        var $row = $(this).closest('.row.peserta');

        var id_peserta = $row.find('select[name=list_peserta]').val();
        var tujuan = $row.find('select[name=list_tujuan_kegiatan]').val();

        if (tujuan == 'project') {
            $.ajax({
                type : 'GET',
                url : '/json/project',
                dataType : 'json',
                encode : true,
            })
            .done(function(response) {
                var total = response.length;
                var list_data = '';

                $.each(response, function(total, list) {
                    list_data +=
                        '<option value="' + list.kode + '">' +
                            list.nama_project + ' (' + list.nama_lembaga + ')' +
                        '</option>';
                })

                form_kegiatan =
                    '<div class="col-md-12">' +
                        '<div class="row">' +
                            '<div class="col-md-4">' +
                                '<input type="hidden" name="id_peserta[]" value="' + id_peserta + '">' +
                                '<input type="hidden" name="tujuan_kegiatan[]" value="' + tujuan + '">' +
                                '<div class="form-group">' +
                                    '<label for="kode_kegiatan">Nama Project</label>' +
                                    '<select class="form-control" id="kode_kegiatan" name="kode_kegiatan[]">' +
                                        list_data +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-4">' +
                                '<div class="form-group">' +
                                    '<label for="kode_kegiatan">Kegiatan</label>' +
                                    '<select class="form-control" id="kode_kegiatan" name="kegiatan[]">' +
                                        '<option value="REQUIREMENT_GATHERING">Requirement Gathering</option>' +
                                        '<option value="UAT">UAT</option>' +
                                        '<option value="REVIEW">Review</option>' +
                                        '<option value="TRAINING_USER">Training User</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-4">' +
                                '<button type="button" class="btn btn-danger btn-hapus-kegiatan pull-right" style="margin-top: 24px;"><i class="fa fa-fw fa-minus"></i></button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

                $row.append(form_kegiatan);

                $('select[name="kode_kegiatan[]"]').select2({ width: '100%' });
                $('select[name="kegiatan[]"]').select2({ minimumResultsForSearch: Infinity });

                attachRemoveActivityEvent();

                $btn.button('reset');
            });
        } else if (tujuan == 'prospek') {
            $.ajax({
                type : 'GET',
                url : '/json/prospek',
                dataType : 'json',
                encode : true,
            })

            .done(function(response) {
                var total = response.length;
                var list_data = '';

                $.each(response, function(total, list) {
                    list_data +=
                        '<option value="' + list.kode + '">' +
                            list.nama_prospek + ' (' + list.nama_lembaga + ')' +
                        '</option>';
                })

                form_kegiatan =
                    '<div class="col-md-12">' +
                        '<div class="row">' +
                            '<div class="col-md-4">' +
                                '<input type="hidden" name="id_peserta[]" value="' + id_peserta + '">' +
                                '<input type="hidden" name="tujuan_kegiatan[]" value="' + tujuan + '">' +
                                '<div class="form-group">' +
                                    '<label for="kode_kegiatan">Nama Prospek</label>' +
                                    '<select class="form-control" id="kode_kegiatan" name="kode_kegiatan[]">' +
                                        list_data +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-8" style="margin-top: 24px;">' +
                                '<input type="hidden" name="kegiatan[]" value="-">' +
                                '<button type="button" class="btn btn-default btn-modal-prospek">' +
                                    '<i class="fa fa-fw fa-plus"></i> Prospek Baru' +
                                '</button>' +
                                '<button type="button" class="btn btn-danger btn-hapus-kegiatan pull-right"><i class="fa fa-fw fa-minus"></i></button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

                $row.append(form_kegiatan);

                $('select[name="kode_kegiatan[]"]').select2( {width: '100%' } );

                attachRemoveActivityEvent();

                $('.btn-modal-prospek').on('click', function(event) {
                    $('#modal-tambah-prospek').modal('show');

                    var $row_activity = $(this).closest('.col-md-12');

                    $('form[name=tambah-prospek]').off('submit').on('submit', function(event) {
                        $('.modal').modal('hide');

                        var id_peserta = $row_activity.find('input[name="id_peserta[]"]').val();
                        var tujuan = $row_activity.find('input[name="tujuan_kegiatan[]"]').val();

                        $row_activity.find('select[name="kode_kegiatan[]"]').prop("disabled", true);

                        var $form = $(this);

                        var nama_prospek = $form.find('input[name=nama_prospek]').val();
                        var nama_lembaga = $form.find('input[name=nama_lembaga]').val();
                        var alamat = $form.find('textarea[name=alamat]').val();
                        var token = $form.find('input[name=_token]').val();

                        var form_data = {
                            'nama_prospek' : nama_prospek,
                            'nama_lembaga' : nama_lembaga,
                            'alamat' : alamat,
                            '_token' : token
                        };

                        $.ajax({
                            type : 'POST',
                            url : '/prospek/store',
                            data : form_data,
                            dataType : 'json',
                            encode : true,
                        })

                        .done(function(response) {
                            $form.find('input[name=nama_prospek]').val('');
                            $form.find('input[name=nama_lembaga]').val('');
                            $form.find('textarea[name=alamat]').val('');

                            $row_activity.find('.col-md-4').remove();

                            var total = response.length;
                            var list_data = '';

                            $.each(response, function(total, list) {
                                list_data +=
                                    '<option value="' + list.kode + '">' +
                                        list.nama_prospek + ' (' + list.nama_lembaga + ')' +
                                    '</option>';
                            })

                            form_prospek =
                                '<div class="col-md-4">' +
                                    '<input type="hidden" name="id_peserta[]" value="' + id_peserta + '">' +
                                    '<input type="hidden" name="tujuan_kegiatan[]" value="' + tujuan + '">' +
                                    '<div class="form-group">' +
                                        '<label for="kode_kegiatan">Nama Prospek</label>' +
                                        '<select class="form-control" id="kode_kegiatan" name="kode_kegiatan[]">' +
                                            list_data +
                                        '</select>' +
                                    '</div>' +
                                '</div>'

                            $row_activity.find('.row').prepend(form_prospek);

                            $('select[name="kode_kegiatan[]"]').select2({width: '100%' });
                        });

                        event.preventDefault();
                    });
                });

                $btn.button('reset');
            });
        } else {
            $.ajax({
                type : 'GET',
                url : '/json/pelatihan',
                dataType : 'json',
                encode : true,
            })

            .done(function(response) {
                var total = response.length;
                var list_data = '';

                $.each(response, function(total, list) {
                    list_data +=
                        '<option value="' + list.kode + '">' +
                            list.nama_pelatihan + ' (' + list.nama_lembaga + ')' +
                        '</option>';
                })

                form_kegiatan =
                    '<div class="col-md-12">' +
                        '<div class="row">' +
                            '<div class="col-md-4">' +
                                '<input type="hidden" name="id_peserta[]" value="' + id_peserta + '">' +
                                '<input type="hidden" name="tujuan_kegiatan[]" value="' + tujuan + '">' +
                                '<div class="form-group">' +
                                    '<label for="kode_kegiatan">Nama Pelatihan</label>' +
                                    '<select class="form-control" id="kode_kegiatan" name="kode_kegiatan[]">' +
                                        list_data +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-8" style="margin-top: 24px;">' +
                                '<input type="hidden" name="kegiatan[]" value="-">' +
                                '<button type="button" class="btn btn-default btn-modal-pelatihan">' +
                                    '<i class="fa fa-fw fa-plus"></i> Pelatihan Baru' +
                                '</button>' +
                                '<button type="button" class="btn btn-danger btn-hapus-kegiatan pull-right"><i class="fa fa-fw fa-minus"></i></button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

                $row.append(form_kegiatan);

                $('select[name="kode_kegiatan[]"]').select2({width: '100%' });

                attachRemoveActivityEvent();

                $('.btn-modal-pelatihan').on('click', function() {
                    $('#modal-tambah-pelatihan').find('.alert').remove();

                    $('#modal-tambah-pelatihan').modal('show');

                    var $row_activity = $(this).closest('.col-md-12');

                    $('form[name=tambah-pelatihan]').off('submit').on('submit', function(event) {
                        $('.modal').modal('hide');

                        var id_peserta = $row_activity.find('input[name="id_peserta[]"]').val();
                        var tujuan = $row_activity.find('input[name="tujuan_kegiatan[]"]').val();

                        $row_activity.find('select[name="kode_kegiatan[]"]').prop("disabled", true);

                        var $form = $(this);

                        var nama_pelatihan = $form.find('input[name=nama_pelatihan]').val();
                        var nama_lembaga = $form.find('input[name=nama_lembaga]').val();
                        var tanggal_mulai = $form.find('input[name=tanggal_mulai]').val();
                        var tanggal_selesai = $form.find('input[name=tanggal_selesai]').val();
                        var alamat = $form.find('textarea[name=alamat]').val();
                        var token = $form.find('input[name=_token]').val();

                        var form_data = {
                            'nama_pelatihan' : nama_pelatihan,
                            'nama_lembaga' : nama_lembaga,
                            'tanggal_mulai' : tanggal_mulai,
                            'tanggal_selesai' : tanggal_selesai,
                            'alamat' : alamat,
                            '_token' : token
                        };

                        $.ajax({
                            type : 'POST',
                            url : '/pelatihan/store',
                            data : form_data,
                            dataType : 'json',
                            encode : true,
                        })

                        .done(function(response) {
                            $form.find('input[name=nama_pelatihan]').val('');
                            $form.find('input[name=nama_lembaga]').val('');
                            $form.find('input[name=tanggal_mulai]').val('');
                            $form.find('input[name=tanggal_selesai]').val('');
                            $form.find('textarea[name=alamat]').val('');

                            $row_activity.find('.col-md-4').remove();

                            var total = response;
                            var list_data = '';

                            $.each(response, function(total, list) {
                                list_data +=
                                    '<option value="' + list.kode + '">' +
                                        list.nama_pelatihan + ' (' + list.nama_lembaga + ')' +
                                    '</option>';
                            });

                            form_pelatihan =
                                '<div class="col-md-4">' +
                                    '<input type="hidden" name="id_peserta[]" value="' + id_peserta + '">' +
                                    '<input type="hidden" name="tujuan_kegiatan[]" value="' + tujuan + '">' +
                                    '<div class="form-group">' +
                                        '<label for="kode_kegiatan">Nama Pelatihan</label>' +
                                        '<select class="form-control" id="kode_kegiatan" name="kode_kegiatan[]">' +
                                            list_data +
                                        '</select>' +
                                    '</div>' +
                                '</div>';

                            $row_activity.find('.row').prepend(form_pelatihan);

                            $('select[name="kode_kegiatan[]"]').select2({width: '100%' });
                        })

                        .fail(function(response) {
                            $('#modal-tambah-pelatihan').modal('show');

                            error =
                                '<div class="alert alert-danger">' +
                                    JSON.parse(response.responseText).tanggal_selesai[0] +
                                '</div>';

                            $('#modal-tambah-pelatihan').find('.modal-body').prepend(error);
                        })

                        event.preventDefault();
                    });
                });

                $btn.button('reset');
            });
        }
    });

    $('select[name=list_peserta]').select2( {width: '100%', display: 'block' } );
}

function attachRemoveActivityEvent() {
    $('.btn-hapus-kegiatan').off('click').on('click', function() {
        var $row_activity = $(this).closest('.col-md-12');
        $row_activity.remove();
    });
}

function attachCityChangesEvent() {
    $('select[name=kode_kota_asal').on('change.kota.asal', function () {
        var kode_kota_asal = $('select[name=kode_kota_asal]').val();
        var $kota_tujuan = $('select[name=kode_kota_tujuan]');

        $kota_tujuan.val(kode_kota_asal).trigger('change');
    });

}