import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionUtils {

    private key;
    private iv;

    constructor(private config: ConfigService) {
        this.key = this.config.get<string>('SECRET_KEY');
        this.iv = this.config.get<string>('SECRET_IV');
    }

    // Methods for the encrypt and decrypt Using AES
    encrypt(value: string): string {
        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(value),
            this.key,
            {
                keySize: 128 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            },
        );
        return encrypted.toString();
    }

    decrypt(decString): string {
        const decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

}
