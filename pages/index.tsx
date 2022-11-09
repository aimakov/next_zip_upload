import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState();
  const [uploadFile, setUploadFile] = useState("");

  const changeHandler = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmission = async () => {
    const response = await axios.post("https://app.netlify.com/sites/", file, {
      headers: {
        Authorization: "Bearer pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
        "Content-Type": "application/zip",
      },
    });

    console.log(response);
  };

  // const handleFileReader = (event: React.FormEvent) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (e) => {
  //     setUploadFile({
  //       data: reader.result.split(",").pop(),
  //       fileName: event.target.files[0].name,
  //     });
  //   };
  // };

  // const reqZip = async () => {
  //   const response = await axios.post("/api/upload", uploadFile);
  //   console.log(response.data.default_domain);
  // };

  const reqZip = async () => {
    const response = await axios.post("/api/upload", file);
    console.log(response.data.default_domain);
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <div>
        <button onClick={reqZip}>Submit</button>
      </div>
    </div>
  );
}
