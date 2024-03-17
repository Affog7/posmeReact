<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use Illuminate\Support\Facades\DB;

class CaisseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("caisse");
    }


    public function getPdfInvoice($id)
    {
        $receipt = Invoice::find($id);
        return view("pdf.invoice", compact("receipt"));
    }
    
    /**
     * get all invoices details
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllInvoice()
    {
        $invoices = Invoice::join("custormers", "custormers.id", "=", "invoices.customer_id")
        ->join("users", "users.id", "=", "invoices.user_id")
        ->select("custormers.name as client",
        DB::raw('DATE_FORMAT(invoices.created_at, "%d/%m/%Y %h:%m:%s") as created_invoice'),
        "custormers.id as client_id", "invoices.*", "users.name")
        ->orderBy("invoices.receipt_number", "desc") 
        ->get();
    
        foreach($invoices as $invoice) {
            $invoice->products = InvoiceProduct::join("products","products.id","=","invoice_products.product_id")
                                        ->select("products.name","products.image","invoice_products.*","invoice_products.quantity as qty")
                                        ->where("invoice_id",$invoice->id)
                                        ->get();
                                       
        }

        return response()->json($invoices);
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
