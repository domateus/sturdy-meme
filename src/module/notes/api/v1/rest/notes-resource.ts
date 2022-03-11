import * as service from "@service/notes-service";
import express from "express";

const router = express.Router();

router.get(
  process.env.BASE_URL + "/notes/api/v1/rest/notes",
  async (_req, resp) => {
    const response = await service.getAll();
    return resp.status(200).send(response);
  }
);

export default router;
