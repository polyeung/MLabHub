"""Public Index Server tests."""
import utils


def test_multiple_terms(index_client):
    """Multiple word query.

    The PageRank weight parameter 'w' is missing.  The default value 0.5 should
    be used by the Index Server.

    'index_client' is a fixture fuction that provides a Flask test server
    interface. It is implemented in conftest.py and reused by many tests.
    Docs: https://docs.pytest.org/en/latest/fixture.html

    """
    # Query the REST API
    response = index_client.get("/api/v1/hits/?q=world+flags")
    assert response.status_code == 200

    # Compare actual hits to solution hits
    hits_actual = response.get_json()["hits"]
    hits_solution = [
        {"docid": 182259, "score": 0.007643772514792284},
        {"docid": 16266126, "score": 0.006317422351918645},
        {"docid": 2182698, "score": 0.0058736878459715635},
        {"docid": 21648, "score": 0.0034988027716098395},
        {"docid": 836172, "score": 0.0030585539614913122}
    ]
    utils.assert_rest_api_hit_eq(hits_actual, hits_solution)


def test_special_characters(index_client):
    """Special characters in query.

    'index_client' is a fixture fuction that provides a Flask test server
    interface. It is implemented in conftest.py and reused by many tests.
    Docs: https://docs.pytest.org/en/latest/fixture.html
    """
    # Query the REST API
    response = index_client.get("/api/v1/hits/?q=little+^@@seba@@stian&w=0")
    assert response.status_code == 200

    # Compare actual hits to solution hits
    hits_actual = response.get_json()["hits"]
    hits_solution = [
        {"docid": 4944216, "score": 0.06120746229444898},
        {"docid": 153552, "score": 0.030558369767885344},
        {"docid": 72735, "score": 0.023417789556822673},
        {"docid": 1756209, "score": 0.015378720269588779},
        {"docid": 26388, "score": 0.009288795113624635},
        {"docid": 27372819, "score": 0.007368896526084989},
        {"docid": 42540, "score": 0.007234002841583591},
        {"docid": 7567080, "score": 0.0031640665004036782},
        {"docid": 17268, "score": 0.0021615776384726355}
    ]
    utils.assert_rest_api_hit_eq(hits_actual, hits_solution)


def test_stopwords(index_client):
    """Stopwords in query.

    'index_client' is a fixture fuction that provides a Flask test server
    interface. It is implemented in conftest.py and reused by many tests.
    Docs: https://docs.pytest.org/en/latest/fixture.html
    """
    # Query the REST API
    response = index_client.get("/api/v1/hits/?q=the+little+sebastian&w=0")
    assert response.status_code == 200

    # Compare actual hits to solution hits
    hits_actual = response.get_json()["hits"]
    hits_solution = [
        {"docid": 4944216, "score": 0.06120746229444898},
        {"docid": 153552, "score": 0.030558369767885344},
        {"docid": 72735, "score": 0.023417789556822673},
        {"docid": 1756209, "score": 0.015378720269588779},
        {"docid": 26388, "score": 0.009288795113624635},
        {"docid": 27372819, "score": 0.007368896526084989},
        {"docid": 42540, "score": 0.007234002841583591},
        {"docid": 7567080, "score": 0.0031640665004036782},
        {"docid": 17268, "score": 0.0021615776384726355}
    ]
    utils.assert_rest_api_hit_eq(hits_actual, hits_solution)


def test_term_not_in_index(index_client):
    """Query term not in inverted index.

    'index_client' is a fixture fuction that provides a Flask test server
    interface. It is implemented in conftest.py and reused by many tests.
    Docs: https://docs.pytest.org/en/latest/fixture.html
    """
    response = index_client.get("/api/v1/hits/?q=issued+aaaaaaa&w=0.5")
    assert response.status_code == 200
    assert response.get_json() == {"hits": []}
