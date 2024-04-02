<?php

namespace App\Observers;
use App\Models\Historique;
class HistoriqueObserver
{
    public function created($model)
    {
        $this->createHistoryRecord($model, 'insert');
    }

    public function updated($model)
    {
        $this->createHistoryRecord($model, 'update');
    }

    private function createHistoryRecord($model, $action)
    {
        Historique::create([
            'action' => $action,
            'modele' => $model->getTable(),
            'user_id' => auth()->user()->id,
            'modele_id' => $model->id,
        ]);
    }
}
