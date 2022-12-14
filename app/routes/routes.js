import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as formController from "./controllers/formController.js";

const router = new Router();

router.get("/", formController.viewForm);
router.post("/", formController.upLoadFile);
router.post("/files", formController.downloadFile);

export { router };
