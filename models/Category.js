const CategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parent: { type: String },
    createdAt: Date,
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedAt: Date,
    updateBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
})

module.exports = mongoose.model("Category", CategorySchema)