import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.model";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    // Create a new user
    async createUser(user: Partial<User>) {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    // Find a user by email
    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    //get all users
    async getAllUsers() {
        return this.userModel.find();
    }

    // Find a user by ID
    async findById(id: string) {
        return this.userModel.findById(id);
    }
}