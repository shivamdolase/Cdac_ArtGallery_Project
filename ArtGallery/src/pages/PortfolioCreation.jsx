// React Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Portfolia.css";

function PortfolioCreation() {
  const [projects, setProjects] = useState([]); // State to store project data
  const [editProject, setEditProject] = useState(null); // State to manage editing

  // Fetch all projects from the server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      username: e.target.Uname.value,
      userId: e.target.Uid.value,
      title: e.target.Ptitle.value,
      description: e.target.Pdisc.value,
      type: e.target.Ptype.value,
      price: e.target.price.value,
    };

    try {
      if (editProject) {
        // Update existing project
        await axios.put(`/api/projects/${editProject.id}`, newProject);
        setProjects(
          projects.map((project) =>
            project.id === editProject.id ? { ...project, ...newProject } : project
          )
        );
      } else {
        // Add new project
        const response = await axios.post("/api/projects", newProject);
        setProjects([...projects, response.data]);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }

    e.target.reset();
    setEditProject(null);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    document.getElementById("portfolioForm").Uname.value = project.username;
    document.getElementById("portfolioForm").Uid.value = project.userId;
    document.getElementById("portfolioForm").Ptitle.value = project.title;
    document.getElementById("portfolioForm").Pdisc.value = project.description;
    document.getElementById("portfolioForm").Ptype.value = project.type;
    document.getElementById("portfolioForm").price.value = project.price;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <div className="container my-5" id="maindiv1">
        <div className="container my-5">
          <div className="text-center" id="port-div">
            <h1 className="display-4 font-weight-bold" id="port-header">
              Portfolio
            </h1>
          </div>
        </div>

        <div id="div1">
          <form autoComplete="off" onSubmit={handleSubmit} id="portfolioForm">
            <table id="add-img">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Uname" className="lab">
                      User Name
                    </label>
                  </td>
                  <td>
                    <input type="text" id="Uname" name="Uname" placeholder="Name" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Uid" className="lab">
                      User Id
                    </label>
                  </td>
                  <td>
                    <input type="text" id="Uid" name="Uid" placeholder="Id" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Ptitle" className="lab">
                      Project Title
                    </label>
                  </td>
                  <td>
                    <input type="text" id="Ptitle" name="Ptitle" placeholder="Title" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Pdisc" className="lab">
                      Project Description
                    </label>
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      id="Pdisc"
                      name="Pdisc"
                      rows="4"
                      placeholder="Enter your review"
                      required
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Ptype" className="lab">
                      Project Type
                    </label>
                  </td>
                  <td>
                    <select name="Ptype" id="Ptype" className="form-control" required>
                      <option value="">Select Project Type</option>
                      <option value="Abstract">Abstract</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Painting">Painting</option>
                      <option value="Sculptor">Sculptor</option>
                      <option value="Traditional Art">Traditional Art</option>
                      <option value="Digital Art">Digital Art</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="price" className="lab">
                      Price
                    </label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="In Rupees"
                      className="form-control"
                      min="100"
                      step="0.01"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="submit" id="submit-btn" value={editProject ? "Update Project" : "Upload Project"} />
                  </td>
                  <td>
                    <input type="reset" id="reset-btn" value="Reset" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>

      {/* Table for displaying projects */}
      <div className="mt-5">
        <h2 className="text-center">Uploaded Projects</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Project Title</th>
              <th>Project Type</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.username}</td>
                <td>{project.title}</td>
                <td>{project.type}</td>
                <td>{project.price}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PortfolioCreation;
