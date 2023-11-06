import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import rateLimit from "express-rate-limit";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from 'body-parser';
import fs from "fs"

async function bootstrap() {

  let app: NestExpressApplication;

  if (process.env.NODE_ENV === "production") {
    console.log("Setting SSL/TLS certificates.")
    const keyFile = fs.readFileSync(process.env.KEY_FILE_PATH!);
    const certFile = fs.readFileSync(process.env.CERT_FILE_PATH!);
    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      }
    });
  } else {
    app = await NestFactory.create(AppModule, {});
  }

  if (process.env.NODE_ENV === "production") {
    app.use(
      rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      })
    );
  }

  process.setMaxListeners(Infinity);

  console.log(`NODE_ENV`, process.env.NODE_ENV);
  console.log(`CMD`, `${process.cwd()}`);

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const whitelist = [
    'http://localhost:5175',
    'http://localhost:5173',
    'https://d2jueizvbpdpsf.cloudfront.net',
    'http://localhost:5001',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    allowedHeaders:
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,Access-Control-Allow-Origin,Access-Control-Allow-Credentials',
    methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
    credentials: true
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Truenorth API")
    .setDescription("Truenorth API description")
    .setVersion("v1")
    .addTag("Truenorth")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "Bearer"
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(port, () => {
    console.log(`[WEB] Port ${port}`, "localhost");
  });
}
bootstrap();
