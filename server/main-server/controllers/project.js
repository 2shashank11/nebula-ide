const pool = require('../db');
const environments = require('../lib/environments');

const getEnvironments = async (req, res) => {
    try {
        const envs = environments.map(env => ({
            id: env.id,
            envLabel: env.envLabel,
            environment: env.environment,
            icon: env.icon,
        }))
        return res.status(200).json(envs);
    } catch (error) {
        console.error('Error fetching environments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllProjects = async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM projects
            WHERE user_id = $1;
        `;
        const values = [req.user.id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const createNewProject = async (req, res) => {
    const { projectName, environmentName } = req.body;

    try {
        const exists = await pool.query('SELECT * FROM projects WHERE name = $1 AND user_id = $2', [projectName, req.user.id]);
        if (exists.rows.length > 0) {
            return res.status(400).json({ message: 'Project with this name already exists' });
        }

        const env = environments.filter(item => item.environment === environmentName)[0];
        if (!env) {
            return res.status(400).json({ message: 'Invalid environment' });
        }
        const userId = req.user.id;
        const language = env.language;
        const entryPoint = env.entry_point;
        const icon = env.icon;
        const envLabel = env.envLabel;

        const query = `
        INSERT INTO projects (user_id, name, environment, language, entry_point, icon, env_label)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
        const values = [userId, projectName, env.environment, language, entryPoint, icon, envLabel];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(500).json({ message: 'Failed to create project' });
        }
        const project = result.rows[0];
        return res.status(201).json({ message: 'Project created successfully', payload: project });
    }
    catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const updateProjectDetails = async (req, res) => {
    const projectData = req.body;
    const projectId = projectData.id;

    try {
        query = `
        UPDATE projects
        SET name = $1, description = $2, is_shared = $3, is_starred = $4
        WHERE id = $5
        RETURNING *;
        `;
        const values = [
            projectData.name,
            projectData.description,
            projectData.is_shared,
            projectData.is_starred,
            projectId
        ];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const updatedProject = result.rows[0];
        return res.status(200).json({ message: 'Project updated successfully', payload: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteProject = async (req, res) => {
    const projectId = req.params.projectId
    
    try{
        const query = `
        DELETE FROM projects
        WHERE id = $1
        RETURNING *;
        `;
        const values = [projectId];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json({ message: 'Project deleted successfully', payload: result.rows[0] });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    getEnvironments,
    createNewProject,
    getAllProjects,
    updateProjectDetails,
    deleteProject,

};