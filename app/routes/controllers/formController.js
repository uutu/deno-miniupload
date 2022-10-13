import { lastUploadedId } from "../../services/fileService.js";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const upLoadFile = async ({ request, response }) => {
  const body = request.body({ type: "form-data" });
  const reader = await body.value;

  const data = await reader.read();
  const fileDetails = data.files[0];

  const fileContents = await Deno.readAll(await Deno.open(fileDetails.filename));
  const base64Encoded = base64.fromUint8Array(fileContents);

  // Generate arbitrary password
  const pw = `${Math.floor(100000 * Math.random())}`
  const hash = await bcrypt.hash(pw);

  await fileService.upLoadSentFile(fileDetails, base64Encoded, hash);

  response.body = pw;
};

export { viewForm, upLoadFile };
