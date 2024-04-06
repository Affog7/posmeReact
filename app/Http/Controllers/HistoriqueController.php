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
        foreach( $historiques as $his) {
            $his->reports_details = DB::select('
                select * from '.$his->modele.' where id = '.$his->modele_id.'
            ');       
             
         }
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




    public function getReport(Request $req) {
        $montant_total_caisse = 0;
        $montant_total_vente = 0;
        $montant_total_paye = 0;
        $montant_total_impaye = 0;

      
        $dateat = $req->dateat;
        $dateat = ($dateat != null) ? Carbon::createFromFormat('d/m/Y', $dateat) : Carbon::today();
        
    // take all invoices by date
    $historiques = auth()->user()->historiques()
    
    ->where('modele','invoices')
    ->whereDate('created_at', $dateat)
    ->groupBy("user_id","modele","modele_id",)
                    ->get();

    // select occurrence
    foreach( $historiques as $his) {
        $his->reports_details = DB::select('
            select * from '.$his->modele.' where id = '.$his->modele_id.'
        ');       
         
     }

        $reports = auth()->user()->reports()
        ->selectRaw('is_paid, SUM(total_amount) as total')
        ->whereDate('created_at', $dateat)
        ->groupBy('is_paid')->get();
 
        foreach($reports as $re){
            if($re->is_paid) $montant_total_paye = $re->total;
            if(!$re->is_paid) $montant_total_impaye = $re->total;
        }
        
         return response()->json([
                                "montant_total_direct_paye" => $montant_total_paye,
                                "montant_total_direct_impaye" => $montant_total_impaye,
                                "details" => $historiques]);
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
