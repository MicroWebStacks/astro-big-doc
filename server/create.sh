openssl req -x509 -newkey rsa:2048 -keyout cert/keytmp.pem -out cert/cert.pem -days 365
openssl rsa -in cert/keytmp.pem -out cert/key.pem
