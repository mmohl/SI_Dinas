<?php

use Illuminate\Database\Seeder;

class ProspekTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('prospek')->delete();

        $now = date('Y-m-d H:i:s');
        
        DB::table('prospek')->insert([
        	'nama_prospek' 	=> 'GIS UKM Bandung',
        	'nama_lembaga'	=> 'Pemkot Bandung',
        	'alamat'		=> 'Jalan Merdeka No 120',
            'created_at'    => $now,
            'updated_at'    => $now,
        ]);

        DB::table('prospek')->insert([
        	'nama_prospek' 	=> 'GIS UKM Kab Garut',
        	'nama_lembaga'	=> 'Pemkab Garut',
        	'alamat'		=> 'Jalan Utama No 10',
            'created_at'    => $now,
            'updated_at'    => $now,
        ]);

        DB::table('prospek')->insert([
        	'nama_prospek' 	=> 'Sistem Informasi Kepegawaian',
        	'nama_lembaga'	=> 'Pemkot Tanggerang',
        	'alamat'		=> 'Jalan Sulaiman No 120',
            'created_at'    => $now,
            'updated_at'    => $now,
        ]);

        DB::table('prospek')->insert([
        	'nama_prospek' 	=> 'Sistem Informasi Absensi',
        	'nama_lembaga'	=> 'PT Grama',
        	'alamat'		=> 'Jalan Sudirman No 120',
            'created_at'    => $now,
            'updated_at'    => $now,
        ]);

        DB::table('prospek')->insert([
        	'nama_prospek' 	=> 'GIS UKM Kab.Bandung',
        	'nama_lembaga'	=> 'Pemkab Bandung',
        	'alamat'		=> 'Jalan Al-Fathu No 120',
            'created_at'    => $now,
            'updated_at'    => $now,
        ]);

    }
}
