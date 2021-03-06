<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Pegawai;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $orderBy = ($request->has('orderBy')) ? $request->input('orderBy') : 'nik';
        $order = ($request->has('order')) ? $request->input('order') : 'asc';

        if ($request->has('query')) {
            $query = ($request->input('searchBy') == 'role') ? str_replace(' ', '_', $request->input('query')) : $request->input('query');

            $data_pegawai = Pegawai::orderBy($orderBy, $order)->where($request->input('searchBy'), 'like', '%' . $query . '%')->paginate(15);
        } else {
            $data_pegawai = Pegawai::orderBy($orderBy, $order)->paginate(15);
        }

        return view('pegawai.index', compact('data_pegawai', 'request'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('pegawai.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'nik' => 'required|unique:pegawai,nik,' . $pegawai->nik . ',nik',
            'nama_lengkap' => 'required',
            'email' => 'required|unique:pegawai,email,' . $pegawai->nik . ',nik',
            'active'       => 'required|in:0,1',
            'role' => 'required|in:employee,finance,administration,super_admin',
        ]);
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        Pegawai::create($input);

        return redirect('/user')->with('success', 'Sukses menambah ' . $input['nama_lengkap'] . '.');
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Pegawai $pegawai
     * @return Response
     */
    public function show(Pegawai $pegawai)
    {
        return view('pegawai.show', compact('pegawai'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Pegawai $pegawai
     * @return Response
     */
    public function edit(Pegawai $pegawai)
    {
        if (($pegawai->role == 'super_admin') && ($pegawai->nik != auth()->user()->nik)) {
            return redirect('/user')->with('error', 'Anda tidak dapat melakukan edit terhadap super admin lain.');
        }

        return view('pegawai.edit', compact('pegawai'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\UpdatePegawaiRequest
     * @param  App\Pegawai $pegawai
     * @return Response
     */
    public function update(Request $request, Pegawai $pegawai)
    {
        $this->validate($request, [
            'nik' => 'required|unique:pegawai,nik,' . $pegawai->nik . ',nik',
            'nama_lengkap' => 'required',
            'email' => 'required|unique:pegawai,email,' . $pegawai->nik . ',nik',
            'active'       => 'required|in:0,1',
            'role' => 'required|in:employee,finance,administration,super_admin',
        ]);
        if($request->has('password')) {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
        } else {
            $input = $request->except('password');
        }

        $pegawai->fill($input)->save();

        return redirect('/user')->with('success', 'Sukses memperbarui ' . $input['nama_lengkap'] . '.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Pegawai $pegawai
     * @return Response
     */
    public function destroy(Pegawai $pegawai)
    {
        if (($pegawai->role == 'super_admin') && ($pegawai->nik != auth()->user()->nik)) {
            return redirect('/user')->with('error', 'Anda tidak dapat menghapus super admin lain.');
        }

        $pegawai->delete();

        return redirect('/user')->with('success', 'Sukses menghapus ' . $pegawai->nama_lengkap . '.');
    }

    /**
     * Show the form for editing the password.
     *
     * @return Response
     */
    public function editPassword()
    {
        return view('user.changepassword');
    }

    /**
     * Update the specified resource password.
     *
     * @param  Request $request
     * @return Response
     */
    public function updatePassword(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|confirmed',
        ]);

        $pegawai = Auth::user();

        $pegawai->password = bcrypt($request->input('password'));
        $pegawai->save();

        return redirect('/user/password')->with('success', 'Kata sandi berhasil diubah.');
    }
}
