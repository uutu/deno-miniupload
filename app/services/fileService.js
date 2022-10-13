import { executeQuery } from "../database/database.js";

const lastUploadedId = async () => {
  const res = await executeQuery(
    "SELECT MAX(id) as max_id FROM miniupload_files;",
  );
  if (res && res.rows && res.rows.length == 1) {
    return res.rows[0].max_id;
  } else {
    return -1;
  }
};

const upLoadSentFile = async (fileDetails, base64Encoded, hash) => {
  await executeQuery(
    "INSERT INTO miniupload_files (name, type, password, data) VALUES ($name, $type, $password, $data);",
    {
      name: fileDetails.originalName,
      type: fileDetails.contentType,
      password: hash,
      data: base64Encoded,
    }
  );
};

export { lastUploadedId, upLoadSentFile };
