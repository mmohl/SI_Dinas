@extends('layouts.master')

@section('page_title', 'Ubah Transportasi')

@section('content')

        <section class="content-header">
            <p>Ubah Transportasi</p>
            <span class="bcumb">
                <i class="fa fa-fw fa-bookmark"></i>
                <a href="/dashboard">Halaman Utama</a>
                <i class="fa fa-angle-right fa-fw"></i> <a href="/transportasi">Data Transportasi</a>
                <i class="fa fa-angle-right fa-fw"></i> {{ $transportasi->nama_transportasi }}
                <i class="fa fa-angle-right fa-fw"></i> Ubah
            </span>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-widget">
                        <div class="box-header">
                            <h4>Formulir Ubah Transportasi</h4>
                        </div>

                        <hr style="margin-top: 10px;">

                        {!! Form::model(
                                $transportasi,
                                [
                                    'method' => 'PATCH',
                                    'url' => ['/transportasi/' . $transportasi->id]
                                ]
                            ) !!}
                            <div class="box-body">
                                @if ($errors->any())
                                    <div class="alert alert-danger">
                                        @foreach ($errors->all() as $error)
                                            <i class="fa fa-fw fa-exclamation"></i> {{ $error }}
                                            <br>
                                        @endforeach
                                    </div>
                                @endif
                                @include('transportasi._form')
                            </div>
                            <div class="box-footer">
                                {!! Form::button('<i class="fa fa-fw fa-floppy-o"></i> Simpan', ['type' => 'submit', 'class' => 'btn btn-success']) !!}
                            </div>
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </section>

@endsection
