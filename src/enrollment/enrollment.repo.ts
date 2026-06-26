import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Enrollment } from "./enrollment.model";

@Injectable()
export class EnrollmentRepository {

    constructor(
        @InjectModel(Enrollment.name)
        private readonly enrollmentModel: Model<Enrollment>
    ) { }

    public create(data: Partial<Enrollment>) {
        return this.enrollmentModel.create(data);
    }

    public findOne(filter: any) {
        return this.enrollmentModel.findOne(filter);
    }

    public deleteOne(filter: any) {
        return this.enrollmentModel.deleteOne(filter);
    }

    public findMany(filter: any) {
        return this.enrollmentModel.find(filter);
    }
}