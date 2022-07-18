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
const Author_1 = __importDefault(require("../models/Author"));
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const author = new Author_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    try {
        const author_1 = yield author.save();
        return res.status(200).json({ author_1 });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
const readAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        const author = yield Author_1.default.findById(authorId);
        return author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const readAllAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield Author_1.default.find();
        return res.status(200).json({ authors });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        const author = yield Author_1.default.findById(authorId);
        if (author) {
            author.set(req.body);
            try {
                const author_1 = yield (yield author.save()).populate('author');
                return res.status(200).json({ author_1 });
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
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        const author = yield Author_1.default.findByIdAndDelete(authorId);
        return author ? res.status(200).json({ author, message: 'deleted' }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.default = { createAuthor, readAuthor, readAllAuthor, updateAuthor, deleteAuthor };
