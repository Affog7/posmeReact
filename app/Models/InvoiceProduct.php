<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceProduct extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'invoice_id', 'quantity', 'price', 'sub_total'];

        /**
     * Get the product that owns the invoice product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the invoice that owns the invoice product.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
