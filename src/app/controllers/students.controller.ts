import { Controller, Get, Middleware } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Moodle } from '../util/moodle';

@Controller('api/students')
export class CourseController {

    @Get('')
    @Middleware([])
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Moodle.getCourseList();
            res.status(200).json(response);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get(':id')
    @Middleware([])
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Moodle.getCourse(req.params.id);
            res.status(200).json(response);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get(':id/students')
    @Middleware([])
    async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Moodle.getCourseStudents(req.params.id);
            res.status(200).json(response);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get(':id/forums')
    @Middleware([])
    async getForums(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Moodle.getCourseForums(req.params.id);
            res.status(200).json(response);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

}