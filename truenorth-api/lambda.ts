import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as bodyParser from 'body-parser';

let cachedServer;

const binaryMimeTypes = [
    "application/octet-stream"
];

const whitelist = [
    'http://localhost:5175',
    'https://de0se529mdxbo.cloudfront.net',
    'http://localhost:5001',
    process.env.ORIGIN
];

export const handler = async (event, context) => {
    console.log('event ==> ', JSON.stringify(event, null, 4));
    if (!cachedServer) {
        const origin = (origin, callback) => {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
        const cors = {
            origin,
            allowedHeaders:
                'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,Access-Control-Allow-Origin,Access-Control-Allow-Credentials',
            methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
            credentials: true
        }

        const nestApp = await NestFactory.create(AppModule, { cors });
        await nestApp.init();

        nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

        cachedServer = serverlessExpress({
            app: nestApp.getHttpAdapter().getInstance(),
            binarySettings: { contentTypes: binaryMimeTypes }
        });
    }

    return cachedServer(event, context);
};
