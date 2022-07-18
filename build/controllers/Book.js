"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = __importDefault(require("../models/Book"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = req.body;
    const book = new Book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author
    });
    try {
        const book_1 = yield book.save();
        return res.status(200).json({ book_1 });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
const readBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield Book_1.default.findById(bookId).populate('author').select('-__v');
        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const readAllBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.find().populate('author').select('-__v');
        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield Book_1.default.findById(bookId);
        if (book) {
            book.set(req.body);
            try {
                const book_1 = yield (yield book.save()).populate('author');
                return res.status(200).json({ book_1 });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield Book_1.default.findByIdAndDelete(bookId);
        return book ? res.status(200).json({ book, message: 'deleted' }) : res.status(404).json({ message: 'Notfound' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.default = { createBook, readBook, readAllBook, updateBook, deleteBook };
