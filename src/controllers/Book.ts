import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });

    try {
        const book_1 = await book.save();
        return res.status(200).json({ book_1 });
    } catch (error) {
        return res.status(400).json({ error });
    }
};
const readBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await Book.findById(bookId).populate('author').select('-__v');
        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};
const readAllBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.find().populate('author').select('-__v');
        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await Book.findById(bookId);
        if (book) {
            book.set(req.body);

            try {
                const book_1 = await (await book.save()).populate('author');
                return res.status(200).json({ book_1 });
            } catch (error) {
                return res.status(400).json({ error });
            }
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await Book.findByIdAndDelete(bookId);
        return book ? res.status(200).json({ book, message: 'deleted' }) : res.status(404).json({ message: 'Notfound' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default { createBook, readBook, readAllBook, updateBook, deleteBook };
