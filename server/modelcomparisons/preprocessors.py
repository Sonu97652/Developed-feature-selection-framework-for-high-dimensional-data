import pandas as pd
from sklearn.feature_selection import VarianceThreshold


def selection_variance_threshold(dataset: pd.DataFrame, threshold=0.2):
    var_thres = VarianceThreshold(threshold)
    var_thres.fit(dataset)
    return var_thres