import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashingProvider {
    async hash(data: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(data, 10);
        return hashedPassword;
    }

    async compare(data: string, hashedData: string): Promise<boolean> {
        return await bcrypt.compare(data, hashedData);
    }
}