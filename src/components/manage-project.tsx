import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreateProject from "./create-project";


interface Project {
    _id: string;
    name: string;
}

interface ProjectProps {
    project: Project;
    deleteProject: (id: string) => void;
}

const ProjectRow: React.FC<ProjectProps> = ({ project, deleteProject }) => (
    <tr>
        <td>{project.name}</td>
        <td>
            <a href="#" onClick={() => { 
                if(window.confirm('Are you sure you want to delete this project?')) 
                    deleteProject(project._id) 
            }} 
            className="badge badge-danger">Delete</a>
        </td>
    </tr>
);

const ManageProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const API_URL = process.env.API_URL
    const fetchProjects = async () => {
        try {
            const response = await axios.get<Project[]>(`${API_URL}/projects/`, {
                method: 'GET',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
            setProjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/projects/${id}`);
            setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const projectRows = projects.map(project => (
        <ProjectRow
            key={project._id}
            project={project}
            deleteProject={deleteProject}
        />
    ));

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projectRows}
                </tbody>
            </table>
            <br />
            <CreateProject />
        </div>
    );
};

export default ManageProjects;
