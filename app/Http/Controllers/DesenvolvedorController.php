<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Desenvolvedor;
use App\Http\Requests\DesenvolvedorRequest;
use DB;

class DesenvolvedorController extends Controller
{
    public function __construct(Desenvolvedor $desenvolvedores){
        $this->desenvolvedores = $desenvolvedores;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $desenvolvedores = $this->desenvolvedores->with('nivel')->get();

        if($request->busca){
            $desenvolvedores = $this->desenvolvedores->where('nome', 'like', '%'.$request['busca'].'%')->with('nivel')->get();
        }

        return response()->json([
            'success' => true,
            'desenvolvedores' => $desenvolvedores
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DesenvolvedorRequest $request)
    {
        DB::beginTransaction();
        try {
            
           $desenvolvedor = $this->desenvolvedores::create($request->all());
        
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Desenvolvedo(a) cadastrado com sucesso!'
            ], 201);

        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 400);
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
        $desenvolvedor = $this->desenvolvedores::with('nivel')->findOrFail($id);

        return response()->json([
            'success' => true,
            'desenvolvedor' => $desenvolvedor
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(DesenvolvedorRequest $request, $id)
    {
        
        DB::beginTransaction();
        try {
            $desenvolvedor = $this->desenvolvedores::findOrFail($id);
           
            $desenvolvedor->update($request->all());

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Desenvolvedor(a) atualizado(a) com sucesso!'
            ], 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 400);
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
            $desenvolvedor = $this->desenvolvedores::findOrFail($id);
        
            $desenvolvedor->delete(); 

            DB::commit();
            return response()->json([
                'success' => true,
                'data' => 'Desenvolvedor(a) deletado(a) com sucesso!'
            ], 200);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 400);
        }
    }
}
