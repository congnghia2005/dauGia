import mongoose from "mongoose"

const create = (model) => async (req, res) => {
    try {
        const doc = new model(req.body);
        const result = await doc.save();

        res.status(201).json({
            success: true,
            message: "Created successfully",
            data: result
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAll = (model) => async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const results = await model.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const get = (model) => async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        const result = await model.findById(id);

        if (!result) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const update = (model) => async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        const result = await model.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const remove = (model) => async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        const result = await model.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }

        res.status(200).json({ success: true, message: 'Deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { create, getAll, get, update, remove };