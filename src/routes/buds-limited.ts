import { Express } from 'express';

import { CS571Route } from "@cs571/f23-api-middleware/src/interfaces/route";
import BadgerBudSummary from '../model/bud-summary';

export class CS571BudsLimitedRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/buds-limited';

    private readonly buds: BadgerBudSummary[];

    public constructor(buds: BadgerBudSummary[]) {
        this.buds = buds;
    }

    public addRoute(app: Express): void {
        app.get(CS571BudsLimitedRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'private, max-age=60').send(this.buds);
        })
    }

    public getRouteName(): string {
        return CS571BudsLimitedRoute.ROUTE_NAME;
    }
}