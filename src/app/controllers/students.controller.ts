import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Moodle } from '../util/moodle';

@Controller('api/students')
export class StudentsController {

    private _moodle: Moodle = new Moodle();

    @Post("/")
    @Middleware([])
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await this._moodle.user.create(req.body);
            res.status(200).json(response);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

}