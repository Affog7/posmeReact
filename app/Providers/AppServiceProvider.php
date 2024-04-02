<?php

namespace App\Providers;
use App\Observers\HistoriqueObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Models\Invoice;
use App\Models\Custormer as Customer;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Invoice::observe(HistoriqueObserver::class);
        Customer::observe(HistoriqueObserver::class);
    }
}
