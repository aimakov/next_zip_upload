import React, { useState } from "react";
import axios from "axios";

export default function Home() {
    const [file, setFile] = useState();

    const changeHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };

    const handleSubmission = async () => {
        const response = await axios.post("https://api.netlify.com/api/v1/sites", file, {
            headers: {
                Authorization: "Bearer pa83q_ldh0eDTF1odouwRuiI5JCIu1swRfZc5G3ogkI",
                "Content-Type": "application/zip",
            },
        });

        console.log(response);
    };

    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    );
}
