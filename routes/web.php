<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CaisseController;
use App\Http\Controllers\HistoriqueController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['auth'])->group(function () {

    // paiement routes
    Route::post('/payments', [PaymentController::class, 'store'])->name('payments.store');


    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::post('/invoice/store', [InvoiceController::class, 'store'])->name('invoice.store');
 
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/searchCustomerBy/{text}', [CustomerController::class, 'find']);
    Route::get('/caisse', [CaisseController::class, 'index']);

    Route::get('/invoices', [CaisseController::class, 'getAllInvoice']);

    Route::get('/myalltask', [HistoriqueController::class, 'getMyTask']);
    Route::get('/getAllTasks', [HistoriqueController::class, 'getMyAllTask']);
    Route::post('/myalltask/at', [HistoriqueController::class, 'fetchHistoriqueAt']);


    Route::post('/myallreports', [HistoriqueController::class, 'getReport']);

    Route::get('/invoice_print/{id}', [CaisseController::class, 'getPdfInvoice']);
    Route::post('/saveCustomer', [CustomerController::class, 'store']);


    Route::get("/admin/settings", function(){
        return view("settings");
    } );

    Route::get("/admin/payment", function(){
        return view("payments.index");
    } );

    Route::get("/admin/invoices", function(){
        return view("admin.invoices");
    } );

});

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.authenticate');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');