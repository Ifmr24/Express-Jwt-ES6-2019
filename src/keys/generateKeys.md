# ES512

# private key

openssl ecparam -genkey -name secp521r1 -noout -out privateKey.pem

# public key

openssl ec -in privateKey.pem -pubout -out publicKey.pem
