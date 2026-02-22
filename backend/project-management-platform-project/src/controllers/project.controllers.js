import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "projectdata",
        pipeline: [
          {
            $lookup: {
              from: "projectmembers",
              localField: "_id",
              foreignField: "project",
              as: "projectmembers",
            },
          },
          {
            $addFields: {
              members: {
                $size: "$projectmembers",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        projectdata: {
          _id: 1,
          name: 1,
          description: 1,
          members: 1,
          createdAt: 1,
          createdBy: 1,
          // projectmembers: 1,
        },
        // projectdata: 1,
        role: 1,
        _id: 0,
      },
    },

    {
      $unwind: "$projectdata",
    },
  ]);

  if (!projects) {
    throw new ApiError(400, "Error Fetching Project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN,
  });

  res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;

  const project = await Project.findByIdAndUpdate(
    projectId,
    { name, description },
    { new: true },
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  await ProjectMember.deleteMany({ project: projectId });
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project deleted successfully"));
});

const addProjectMember = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  const { projectId } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const project = Project.findById(projectId);

  if (!project) {
    throw new ApiError(400, "Invalid project ID");
  }

  const projectMember = await ProjectMember.findOneAndUpdate(
    {
      user: new mongoose.Types.ObjectId(user._id),
      project: new mongoose.Types.ObjectId(projectId),
    },
    {
      user: new mongoose.Types.ObjectId(user._id),
      project: new mongoose.Types.ObjectId(projectId),
      role,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { projectMember },
        "Project member added successfully",
      ),
    );
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const projectMember = await ProjectMember.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        project: 1,
        user: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 0,
      },
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectMember },
        "Project member fetched successfully",
      ),
    );
});

const updateProjectMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;
  const { newRole } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project ID");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (!AvailableUserRole.includes(newRole)) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const projectMember = await ProjectMember.findOneAndUpdate(
    {
      user: user._id,
      project: projectId,
    },
    {
      role: newRole,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!projectMember) {
    throw new ApiError(404, "User is not a member of this project");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { projectMember },
        "Project member role updated successfully",
      ),
    );
});

const deleteProjectMember = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project ID");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project Not Found");
  }

  const deletedMember = await ProjectMember.findOneAndDelete({
    user: user._id,
    project: projectId,
  });

  if (!deletedMember) {
    throw new ApiError(404, "User is not a member of this project");
  }

  const projectmembers = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "projectmembers",
        foreignField: "project",
        localField: "_id",
        as: "projectmembers",
      },
    },
    {
      $addFields: {
        members: {
          $size: "$projectmembers", // <---
        },
      },
    },
    {
      $project: {
        members: 1,
        _id: 0
      },
    },
  ]);

  const members = projectmembers[0]?.members

  if(members === 0) {
    const deleteProject = await Project.findByIdAndDelete(projectId)

    if (!deleteProject) {
     throw new ApiError(400, "Error deleting project");
   }
  }

  res.status(200).json(
    new ApiResponse(
      200,
      { deletedMember },
      "Project member deleted successfully",
    ),
  );
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  getProjectMembers,
  updateProjectMember,
  deleteProjectMember,
};
