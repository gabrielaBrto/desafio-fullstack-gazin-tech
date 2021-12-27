<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nivel;
use App\Http\Requests\NivelRequest;
use DB;

class NivelController extends Controller
{
    public function __construct(Nivel $niveis){
        $this->niveis = $niveis;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $niveis = $this->niveis::withCount('desenvolvedor')->get();

        if($request->busca){
            $niveis = $this->niveis->where('nivel', 'like', '%'.$request['busca'].'%')->withCount('desenvolvedor')->get();
        }

        return response()->json([
            'success' => true,
            'niveis' => $niveis
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NivelRequest $request)
    {
        DB::beginTransaction();
        try {
            $nivel = $this->niveis::create($request->all());
     
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Nível cadastrado com sucesso!'
            ], 201);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ],400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $nivel = $this->niveis::findOrFail($id);
        return response()->json([
            'success' => true,
            'nivel' => $nivel
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(NivelRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $nivel = $this->niveis::findOrFail($id);
           
            $nivel->update($request->all());

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Nível atualizado com sucesso!'
            ], 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
           
            $nivel = $this->niveis::findOrFail($id);
        
            if($nivel->desenvolvedor()->exists()){
                return response()->json([
                    'success' => false
                ], 501);
            }
            
            $nivel->delete();     

            DB::commit();
            return response()->json([
                'success' => true
            ], 204);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 400);
        }
        
    }
}
