import {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
// import model here once done named PageContent

const create = (req: Request, res: Response, next: NextFunction) => {
    let {title, category, header_image, content} = req.body;

    const page = new PageContent({
        _id: new mongoose.Types.ObjectId(),
        title,
        category,
        header_image,
        content
    });

    return page
        .save()
        .then((newPage) => {
            return res.status(201).json({blog: newPage});
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.pageID;

    PageContent.findById(_id)
        .exec()
        .then((page) => {
            if (page) {
                return res.status(200).json({page});
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

    PageContent.find({category: category})
        .exec()
        .then((pages) => {
            if (pages) {
                return res.status(200).json({
                    count: pages.length,
                    pages: pages
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

    PageContent.findById(_id)
        .exec()
        .then((page) => {
            if (page) {
                page.set(req.body);
                page.save()
                    .then((savedPage) => {

                        return res.status(201).json({
                            page: savedPage
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
    PageContent.findByIdAndDelete(_id)
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