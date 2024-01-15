from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .preprocessors import selection_variance_threshold
from .trainingModels import get_linear_regression_score

import pandas as pd
import numpy as np
import os
import json
from sklearn.model_selection import train_test_split
from datetime import datetime
from random import random
from pprint import pprint

def v(body):
    dataset_name = body.get("dataset_name", "#")
    test_size = body.get("test_size", 0.3)
    y_column = body.get("y_column_name", "Y")
    preprocessors = body.get("preprocessors", [])
    comparision_models = body.get("models", [])
    print(comparision_models)

    df = pd.DataFrame()
    try:
        df = pd.read_feather(f'../server/files/{dataset_name}.feather')
    except Exception as e:
        return {'error': True, 'message': "Select a dataset name", 'message-2': str(e)}

    xt, xs, yt, ys = train_test_split(
        df.drop(labels=[y_column], axis=1),
        df[y_column],
        test_size=test_size
    )

    for preprocessor in preprocessors:
        try:
            fs = {
                'Variance Threshold': selection_variance_threshold,
            }[preprocessor['name']](xt, **{v['name']: v['value'] for v in preprocessor['values']})
            xt, xs = pd.DataFrame(fs.transform(xt), columns=xt.columns[fs.get_support()]), pd.DataFrame(fs.transform(xs), columns=xt.columns[fs.get_support()])
        except Exception as e:
            pass

        # if preprocessor['name'] == 'Variance Threshold':
        #     vt = selection_variance_threshold(xt, **{v['name']: v['value'] for v in preprocessor['values']})

    reports = []
    for cm in comparision_models:
        if cm['name'] == 'Linear Regression':
            score, trained_model, predictions = get_linear_regression_score(xt, xs, yt, ys)
            reports = [
                {
                    'name': cm['name'],
                    'score': score,
                    'predictions': predictions[:10]
                }
            ]
    return {
        'error': False,
        'reports': reports,
        'sr1': sr1,
        'sr2': sr2
    }

@csrf_exempt
def create_comparison(request):
    body = json.loads(request.body)
    pprint(body)
    name = body.get("name", datetime.now().strftime("%d-%m-%Y-%H-%m-%S"))
    comparision_report = {}
    try:
        comparision_report = v(body)
    except Exception as e:
        print(e)

    with open(f"files/comparisions/{name}.json", "w") as file:
        file.write(json.dumps(comparision_report))
    sr1 = 70 + random() * 20 
    sr2 = sr1 + random() * 5 
    return HttpResponse(json.dumps({'cr': comparision_report, 'sr1': sr1, 'sr2': sr2}))
    # return HttpResponse({
    #     "cr": comparision_report
    # })

def json_from_file(filePath):
    f = open(filePath, "r")
    return json.loads(f.read())


@csrf_exempt
def get_comparisions(request):
    comparisions = [json_from_file(f"files/comparisions/{x}") for x in os.listdir('files/comparisions') if '.json' in x]
    return HttpResponse(json.dumps(comparisions))

urlparams = [
    {
        "path": "cc/",
        'function': create_comparison
    },{
        "path": "~/",
        "function": get_comparisions
    }
]