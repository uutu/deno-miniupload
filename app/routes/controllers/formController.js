import * as fileService from "../../services/fileService.js";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const viewForm = async ({ render }) => {
  const lastId = await fileService.lastUploadedId();
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
  console.log(pw);

  await fileService.upLoadSentFile(fileDetails, base64Encoded, hash);

  // Returns the generated password for said file
  response.body = pw;
};

const downloadFile = async ({ request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const id = params.get("id");
  const password = params.get("password");

  // verifies the password sent by the user
  const hash = await bcrypt.hash(password);

  const result = await fileService.downloadFileId(id);

  const pwMatch = await bcrypt.compare(password, result.password);

  if (result && pwMatch) {
    response.headers.set("Content-Type", result.type);
    const arr = base64.toUint8Array(result.data);
    response.headers.set("Content-Length", arr.length);
    response.body = arr;
  } else {
    response.status = 401;
  }
};

export { viewForm, upLoadFile, downloadFile };
