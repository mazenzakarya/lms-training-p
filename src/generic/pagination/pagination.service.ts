import { Model, QueryFilter } from 'mongoose';


export async function paginate<T>(
    model: Model<T>,
    filter: QueryFilter<T>,
    page = 1,
    limit = 10,
) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(filter).skip(skip).limit(limit),
        model.countDocuments(filter),
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}