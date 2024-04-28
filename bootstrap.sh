#!/usr/bin/bash
cd api-iam
npm i
npm run build
npm run migration:run
npm run start &
cd ../api-insurance
npm i
npm run build
npm run migration:run
npm run start &
cd ../api-auth
npm i
npm run build
npm run start &
cd ../api-gateway
npm i
npm run build
npm run start &