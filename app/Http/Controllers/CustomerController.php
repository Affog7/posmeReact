<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Custormer;


class CustomerController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function find($text){
        $Custormer = Custormer::where('name','like','%'.$text.'%')
                                ->orWhere('email','like','%'.$text.'%')
                                ->orWhere('phone','like','%'.$text.'%')
                                ->orWhere('address','like','%'.$text.'%')
                                ->get();

        return response()->json($Custormer);
 
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $new = new Custormer;
       $new->name = $request->name;
       $new->phone = $request->tel;
       $new->email = $request->email;
       $new->address = $request->address;

       $new->save();

       return response()->json($new);
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
