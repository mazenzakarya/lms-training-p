import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.model";
import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";

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

    //find group by user
    async getUserGroups(id: string) {
        return this.userModel.findById(id).select('groups')
    }

    //update user refresh token
    public async updateRefreshToken(id: string, refreshToken: string) {

        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        user.refreshToken = refreshToken;
        return await user.save();
    }

    //edit user
    public async update(user: User) {
        return user.save()
    }
}