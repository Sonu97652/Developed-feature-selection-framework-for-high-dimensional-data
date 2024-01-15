from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import pandas as pd
import numpy as np
import os
import json

def df_info(fileName):
    df = pd.read_feather('files/'+fileName)
    return {
        'Name': fileName.replace('.feather', ''),
        'Cols': list(df.columns),
        'Rows': df.size,
        'Head': df.iloc[:10, :].to_dict(orient='records')
    }


@csrf_exempt
def home(request):
    files = [df_info(x) for x in os.listdir('files/') if '.feather' in x]

    return HttpResponse(json.dumps(files, default=str))

@csrf_exempt
def toy(request):
    body = json.loads(request.body)
    name = body.get('name', 'iris')
    print(name)
    exec(f'''from sklearn.a import load_{name}
f = load_{name}()
df = pd.DataFrame(data= np.c_[f['data'], f['target']],
                     columns= f['feature_names'] + ['target'])
df.to_feather('files/{name}-toy.feather')
# df.to_excel('files/{name}-toy.xlsx')
''')
    return HttpResponse(json.dumps({'message': 'ok'}))


def upload(request):
    ds = pd.read_excel(request.FILES['file'])
    print(ds.head)
    return HttpResponse("hehe")



from django.urls import path

url_patterns = [
    path('upload/', upload),
    path('toy/', toy),
    path('', home),
]