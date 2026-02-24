import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { Subtask } from "../models/subtask.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {});
const createTask = asyncHandler(async (req, res) => {});
const getTask = asyncHandler(async (req, res) => {});
const updateTask = asyncHandler(async (req, res) => {});
const deleteTask = asyncHandler(async (req, res) => {});
const createSubtask = asyncHandler(async (req, res) => {});
const updateSubtask = asyncHandler(async (req, res) => {});
const deleteSubtask = asyncHandler(async (req, res) => {});

export {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
};
