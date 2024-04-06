<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
class HistoriqueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getMyTask($date=null)
    {
        if(!$date)  $date = Carbon::today();
       
        $historiques = auth()->user()->historiques()->whereDate('created_at', $date)->take(50)->get();
    
         return response()->json($historiques);
    }

    public function getMyAllTask(){
        $historiques = auth()->user()->historiques()
        ->selectRaw('DATE_FORMAT(created_at, "%d/%m/%Y") as date, COUNT(*) as total')
        ->groupBy('date')
        ->get();
         return response()->json($historiques);
    }

    public function fetchHistoriqueAt(Request $req) {
        $dateat = $req->dateat;
        $dateat = Carbon::createFromFormat('d/m/Y', $dateat);

        try {
            // Utilisation de la méthode whereDate pour filtrer par la date spécifiée
            $historiques = auth()->user()->historiques()->whereDate('created_at', $dateat)->get();
            
            // Vous pouvez également ajouter d'autres conditions ou trier les résultats ici si nécessaire
            
            return response()->json($historiques, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getReport($date = null) {
       
       
        if(!$date)  $date = Carbon::today();
       $historiques = auth()->user()->historiques()->where('modele','invoices')->get();
     foreach( $historiques as $his){
        $his->reports = DB::select('
            select * from '.$his->modele.' where id = '.$his->modele_id.' 
        ');
     }

dd($historiques);
        $reports =  
        
        auth()->user()->reports()
        ->selectRaw('DATE_FORMAT(created_at, "%d/%m/%Y") as date, SUM(total_amount) as total')
        ->groupBy('date')
        ->whereDate('created_at', $date)->get();
         return response()->json($reports);
    }
 
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
