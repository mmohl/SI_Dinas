<div class="form-group">
    <div class="row">
        <div class="col-md-3">
            {!! Form::label('id_tipe', 'Tipe Pengeluaran') !!}
            {!! Form::select('id_tipe', $list_tipe, null, ['class' => 'form-control', 'autofocus']) !!}
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="form-group">
            <div class="row">
                <div class="col-md-12">
                    {!! Form::label('tanggal', 'Tanggal') !!}
                    {!! Form::text('tanggal', null, ['class' => 'form-control datepicker']) !!}
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-md-12">
                    {!! Form::label('biaya', 'Biaya') !!}
                    {!! Form::input('number', 'biaya', null, ['class' => 'form-control']) !!}
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-md-12">
                    {!! Form::label('personel', 'Personel') !!}
                    <div class="row" style="margin-top: 5px;">
                        <div class="col-md-12">
                            @foreach ($lpd->rpd->peserta as $peserta)
                                <label style="font-weight:normal">
                                    {!! Form::checkbox(
                                        'personel[]',
                                        $peserta->nik,
                                        in_array(
                                            $peserta->nik,
                                            (isset($pengeluaran)) ? $pengeluaran->personel->lists('nik')->all() : []
                                        )
                                    ) !!} {{ $peserta->nama_lengkap }}
                                </label>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group">
            <div class="row">
                <div class="col-md-12">
                    {!! Form::label('keterangan', 'Keterangan') !!}
                    {!! Form::text('keterangan', null, ['class' => 'form-control']) !!}
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-md-12">
                    {!! Form::label('struk', 'Struk') !!}
                    {!! Form::text('struk', null, ['class' => 'form-control']) !!}
                </div>
            </div>
        </div>
    </div>
</div>

