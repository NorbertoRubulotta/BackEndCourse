
//MongoDB

export const CNX_STR = 'mongodb+srv://coderhouse:coderhouse@cluster0.z9shnaw.mongodb.net/ecommerce';  // Remota
/* export const CNX_STR = 'mongodb://root:mongopassword@localhost?authSource=admin'  */// local 
export const DB_NAME = 'ecommerce';

// FireStore
export const FIREBASE_CREDENTIALS = {
    "type": "service_account",
    "project_id": "coderhouseecommerce-8c3ed",
    "private_key_id": "6cf8d77a654e79a4e00b6c9919a4fe417d3aaaee",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFOVwyDdZuVT5F\n5O4vtuE1z/roxHlZ5HadD8S5IW8C32bCW2bX4xbroHJGk2WuK53hMydqMFJRvlUP\nx6rPhbdnvVgScxUxoZGbwRoHEWoqDPNcZYMvCrF8SGAuMPBny0kaQcQ1TbffL+l5\nUOkj4XX3LCWxd182DB/J+Uj+oA6oCXZYKDM7zR65LM0vm+Tx0Qjjy6DZgkNzhtmx\n3jUnh0fQKy4KZLkvVuJHU2xRpMrBwnDnQyo+j93yHb/Z86RkWlM8vhBB2Rt3Ab0L\nNF82tC5yr6B3UDLc+GwKxS1OzZZM222vXP9kJlZpEtVOlbFc8VMNO2t8z9nB3hjw\nfDSGzmDTAgMBAAECggEAByL9upP0m/Z6s+XGVrSr7poRjsW5TG7vedx9tmNG1JhH\n7CWJkatWg31BVVt1FPngEyuaNAX+nJWiF1mWzT6d9eOModJHRI3/ql6w9euD53Sj\ng8bqmdOtu30U+ebsdB0PjqMtme4vhqSBstGiNhms/p462PKkX9zNc64RHaGmFh99\nM5DJR/Su8WSS3Ruu0xjQOMFYvVH8VmvU3sTZ6LeOvKlSBGHwEbFpzUJdeSX1fGOF\n3MNn0Bm0ODHFwveOeFzWS51MZaCvHN9vGT2ki1aR2SGUDqUtDrN0S5RwCqRzKX75\n4ohtgU5YWr/7X+4cslBAkmSrywemjgh/GacdLZyEfQKBgQD2YtqOluD2rttZVzIa\n8pvflwi++siRz+9zttEkNOczgI7+9YHAYxt8zspx+cPO7gZWNVQ2f6wA+URubqyR\nyIbybk0kESyWiCrNCFFuIiwKP38//mZCsfj6BO7xuyGK0jCbVohkKHjChRdAgaLp\np7GVEYGR6jK0tbErE1+MvlFbvQKBgQDM621lhazbAsKODqcAzffdunvMemq2Zhiw\ndE6uAWr5PwinJwbets5eb4DbTn6gyfbovOpNV6KugtyrUHjYAFi7RcSir2WSNFp5\n17woTEZhcGdbNnJBW8oQtBg666arJBPeVAwIqu9os2xtkh4paNOyr92rL+amBrfz\n1rhID/uvzwKBgQCVIbiQXhrEtYnnRbP6Q6a9aznL/xevymBxddKZS7w1nDbxc8CZ\npmNY5AH9guRWOBR10cmrQxPlcvtMrIifpPSpgMIIdqy6YKkneUVwmBZ4DX8ESQO0\nkuzUyG+ouU/QKvFo1LOxjB2r/8rXLKBjNTFzvSjkHRGb9+3I2O0Yz4mHMQKBgBy4\nLifZWUWEmIHSWeOJ+mAv/6PD0Grp2jH4ywImHrj59Zt/o73Y/wlLNVMHKEYeqCUs\nPOZEDv/IRWcZKyaSvdzZRVrLnD+maLvE2ZEIR6DmYQXulorEc4htxSuU1VINB1/U\nha89Tbpt0xd0MBf7ohfcAAQ6/Wdtb6CUClXHL64PAoGAdmelABWJcfWjBzZQRRGX\nnO0wvEJbGg/mhx2iV4UqfLFr4Y+II3/pY2V/ygFZRFsQP23G8AhF5osuG0sADCkh\nG0eO7JNRU3kSJnwu2AkNZWk5DoJKHo5xNn+CUSFFX7TEps2FFSfL1WX8t9dl/H0C\no+PynBpN0R/RABgZlYt+uBY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-k3ujd@coderhouseecommerce-8c3ed.iam.gserviceaccount.com",
    "client_id": "103698652644164351789",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k3ujd%40coderhouseecommerce-8c3ed.iam.gserviceaccount.com"
};

// Files
export const RUTA = '../products.txt';
export const CART_ROUT = '../cart.txt';

// PERSISTENCIA
//export const PERSISTENCIA = 'mongodb';
export const PERSISTENCIA = 'firestore';
// export const PERSISTENCIA = 'fs';