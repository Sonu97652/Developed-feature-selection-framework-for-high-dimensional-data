from sklearn.metrics import accuracy_score
from sklearn.linear_model import LinearRegression

def get_score(y_true, y_pred):
    return accuracy_score(y_true, y_pred)

def get_linear_regression_score(xt, xs, yt, ys):
    lr = LinearRegression()
    lr.fit(xt, yt)
    # This is hot to perdiction
    # prediction = lr.predict(xs)
    # print("YO", prediction.shape, ys.values.shape)
    # return lr.score(ys.values, prediction), lr, prediction
    return lr.score(xs, ys), lr, []
