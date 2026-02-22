import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  getProjectMembers,
  updateProjectMember,
  deleteProjectMember,
} from "../controllers/project.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  validateProjectPermission,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import {
  createProjectValidator,
  addMemberToProjectValidator,
} from "../validators/index.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router
  .route("/:projectId/member/")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProjectValidator(),
    validate,
    addProjectMember,
  );

router
  .route("/:projectId/member/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateProjectMember)
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProjectMember,
  );

export default router;
