import { Express } from 'express';

import { CS571Route } from "@cs571/f23-api-middleware/src/interfaces/route";
import BadgerBudSummary from '../model/bud-summary';

export class CS571BudDetailRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/bud';

    private readonly buds: BadgerBudSummary[];

    public constructor(buds: BadgerBudSummary[]) {
        this.buds = buds;
    }

    public addRoute(app: Express): void {
        app.get(CS571BudDetailRoute.ROUTE_NAME, (req, res) => {
            const id = req.query.id;
            const match = this.buds.find(bud => bud.id === id);
            if (match) {
                res.status(200).send(match);
            } else {
                res.status(404).send({
                    msg: "Badger Bud not found!"
                });

            }
        })
    }

    public getRouteName(): string {
        return CS571BudDetailRoute.ROUTE_NAME;
    }
}