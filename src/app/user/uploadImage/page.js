"use client";

import { useState } from "react";

export default function UploadForm() {
    // console.log("props", props)
  const [file, setFile] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("please select any file");

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: "200px" , textAlign: "center"}}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}


