import fs from 'fs'

import express, { Express } from 'express';

import { CS571DefaultSecretConfig, CS571Initializer } from '@cs571/f23-api-middleware'
import HW5PublicConfig from './model/configs/hw5-public-config';
import BadgerBudSummary from './model/bud-summary';
import BadgerBudDetail from './model/bud-detail';
import { CS571BudDetailRoute } from './routes/bud-detail';
import { CS571BudsRoute } from './routes/buds';
import { CS571BudsLimitedRoute } from './routes/buds-limited';

console.log("Welcome to HW5!");

const app: Express = express();

const appBundle = CS571Initializer.init<HW5PublicConfig, CS571DefaultSecretConfig>(app, {
  allowNoAuth: [],
  skipAuth: false
});

const makeBudSummary = (bud: any) => new BadgerBudSummary(
  bud.name,
  bud.age,
  bud.gender,
  bud.imgIds[0]
);

const makeBudDetail = (bud: any) => new BadgerBudDetail(
  bud.name,
  bud.age,
  bud.breed,
  bud.gender,
  bud.colors,
  bud.spayed,
  bud.neutered,
  bud.declawed,
  bud.imgIds,
  bud.description
);

const buds = JSON.parse(fs.readFileSync("includes/cats.json").toString())
const budsSummary = buds.map(makeBudSummary);
const budsDetail = buds.map(makeBudDetail);


appBundle.router.addRoutes([
  new CS571BudsRoute(budsDetail),
  new CS571BudsLimitedRoute(budsSummary),
  new CS571BudDetailRoute(budsDetail)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
