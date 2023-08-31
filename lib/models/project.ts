import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String, required: true,},
}, {
    timestamps: true,
});


if (!mongoose.models.Project) {
    mongoose.model('Project', projectSchema);
}

const Project = mongoose.model('Project');

export default Project;