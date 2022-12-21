from app import create_app
import unittest


class ApiTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app("app.config.TestingConfig")

    def test_root(self):
        with self.app.test_client() as client:
            response = client.get("/")
            self.assertEqual(200, response.status_code)
            self.assertEqual("This is a Python Flask Application", response.text)

    def test_sample(self):
        with self.app.test_client() as client:
            response = client.get("/sample")
            self.assertEqual(200, response.status_code)
            self.assertEqual("87", response.json["id"])

    def test_submissions_returns_all_submissions(self):
        with self.app.test_client() as client:
            response = client.get("/submissions")
            self.assertEqual(200, response.status_code)
            self.assertEqual(11, len(response.json))
            self.assertEqual("87", response.json[0]["id"])

    def test_submissions_with_page_equals_1_returns_first_5_results(self):
        with self.app.test_client() as client:
            response = client.get("/submissions?page=1")
            self.assertEqual(200, response.status_code)
            self.assertEqual(5, len(response.json))
            self.assertEqual("87", response.json[0]["id"])

    def test_submissions_with_page_equakls_2_returns_second_5_results(self):
        with self.app.test_client() as client:
            response = client.get("/submissions?page=2")
            self.assertEqual(200, response.status_code)
            self.assertEqual(5, len(response.json))
            self.assertEqual("92", response.json[0]["id"])
