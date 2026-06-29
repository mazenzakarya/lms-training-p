import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
// import Express from 'express';
import { Multer } from 'multer';


@Injectable()
export class UploadService {

    public async uploadImg(file: Express.Multer.File) {
        const fileExtension = file.mimetype.split('/')[1];
        const fileName = `${uuidv4()}.${fileExtension}`;
        const dir = path.join(__dirname, '..', 'uploads', 'images');

        await fs.promises.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, fileName);

        await fs.promises.writeFile(filePath, file.buffer);
        return fileName;

    }

    public async uploadVideo(file) {
        const fileExtention = file.mimetype.split('/')[1];
        const fileName = `${uuidv4()}.${fileExtention}`;
        const filePath = path.join(__dirname, '..', 'uploads', 'videos');
        await fs.promises.writeFile(filePath, file.buffer)
        return fileName;
    }
    //add delete method later

    // public async deleteItem(fileName) {
    //     fs.rm('../uploads', { recursive: true, force: true }, (err) => {
    //         if (err) throw err;
    //         return HttpStatus.ACCEPTED
    //     });
    // }
}
