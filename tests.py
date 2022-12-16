from app import create_app
import unittest


class ApiTests(unittest.TestCase):
    def setUp(self):
        self.app = app = create_app("app.config.TestingConfig")

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
