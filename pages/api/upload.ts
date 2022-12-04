import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import AdmZip from "adm-zip";

import { NetlifyAPI } from "netlify";

export default async function uploadZip(req: NextApiRequest, res: NextApiResponse) {
    const opts = {
        userAgent: "netlify/js-client",
        scheme: "https",
        host: "api.netlify.com",
        pathPrefix: "/api/v1",
        accessToken: "pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
        agent: undefined, // e.g. HttpsProxyAgent
        globalParams: {}, // parameters you want available for every request.
        // Global params are only sent of the OpenAPI spec specifies the provided params.
    };

    // const handleSubmission = async (file) => {
    //   const response = await axios.post(
    //     "https://api.netlify.com/api/v1/sites",
    //     file,
    //     {
    //       headers: {
    //         Authorization: "Bearer pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
    //         "Content-Type": "application/zip",
    //       },
    //     }
    //   );
    //   console.log("Response" + response);
    //   return response;
    // };

    let files = req.body;
    fs.writeFile(files.fileName, files.data, "base64", async function (err) {
        if (err) res.status(200).json("Error");
        else {
            // const response = await handleSubmission();
            const file = fs.createReadStream(files.fileName);

            axios
                .post("https://api.netlify.com/api/v1/sites", file, {
                    headers: {
                        "Content-Type": "application/zip",
                        Authorization: "Bearer pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
                    },
                })
                .then((result) => {
                    console.log(result.data.subdomain);

                    res.status(200).json({ link: result.data.subdomain });
                });
        }
    });

    // console.log(fs.readFileSync("files.fileName", "utf8"));

    // const client = new NetlifyAPI(
    //   "pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
    //   opts
    // );

    // const zip = new AdmZip("2048.zip");

    // const file = fs.createReadStream(`2048.zip`); // WORKING VERSION
    // const file = fs.createReadStream(req.body);
    // axios
    //   .post("https://api.netlify.com/api/v1/sites", file, {
    //     headers: {
    //       "Content-Type": "application/zip",
    //       Authorization: "Bearer pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
    //     },
    //   })
    //   .then((result) => {
    //     console.log(result.data);
    //     res.status(200).json(result);
    //   });

    // const site = await client.createSite("regal-selkie-a46dba", {
    //   files: zip,
    // });
    // const file = fs.readFile("2048.zip", (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });
    // const site = await client.createSiteDeploy("serene-arithmetic-41a206", file);
    // console.log(site);

    // console.log(response);

    // console.log(site);

    // const response = handleSubmission(site);

    // res.status(200).json("Done");
}
