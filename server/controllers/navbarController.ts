import {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
// import model here once done named NavBarTitle

const create = (req: Request, res: Response, next: NextFunction) => {
    let {category, index, parentCategory} = req.body;

    const navBarheading = new NavBarTitle({
        _id: new mongoose.Types.ObjectId(),
        category,
        index,
        parentCategory
    });

    return navBarheading
        .save()
        .then((newNavBarheading) => {
            return res.status(201).json({blog: newNavBarheading});
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.pageID;

    NavBarTitle.findById(_id)
        .exec()
        .then((title) => {
            if (title) {
                return res.status(200).json({title});
            } else {
                return res.status(404).json({
                    error: 'Page not found.'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                error: error.message
            });
        });
};

const readByCategory = (req: Request, res: Response, next: NextFunction) => {
    const category = req.params.category;

    NavBarTitle.find({category: category})
        .exec()
        .then((titles) => {
            if (titles) {
                return res.status(200).json({
                    count: titles.length,
                    titles: titles
                });
            } else {
                return res.status(404).json({
                    error: 'Pages not found.'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                error: error.message
            });
        });
};

const edit = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.pageID;

    NavBarTitle.findById(_id)
        .exec()
        .then((title) => {
            if (title) {
                title.set(req.body);
                tile.save()
                    .then((savedTitle) => {

                        return res.status(201).json({
                            title: savedTitle
                        });
                    })
                    .catch((error) => {

                        return res.status(500).json({
                            message: error.message
                        });
                    });
            } else {
                return res.status(401).json({
                    message: 'NOT FOUND'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

const deletePage = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    NavBarTitle.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'Page deleted'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

export default {create, read, readByCategory, edit, deletePage};