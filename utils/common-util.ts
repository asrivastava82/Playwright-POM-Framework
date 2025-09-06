import cryptoJs from 'crypto-js';

export default class CommonUtil {
    private secretKey: string;

    constructor(){
        //initiazing the secret key
       // this.secretKey = process.env.SECRET_KEY? process.env.SECRET_KEY : "";
       if(process.env.SECRET_KEY){
           this.secretKey = process.env.SECRET_KEY;
       }else{
              throw new Error("SECRET_KEY is not defined in environment variables");
       }

    }

    //provide encryption for data
public encryptData(data: string){
    const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
    console.log(encryptedData);
    return encryptedData;
}


public decryptData(encData: string){
    const decryptedData = cryptoJs.AES.decrypt(encData, this.secretKey).toString(cryptoJs.enc.Utf8);
    console.log(decryptedData);
    return decryptedData;
}

}