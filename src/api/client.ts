const API = "http://localhost:5000/api/svg";
// const API = "https://svg-simulation-server.onrender.com/api/svg";

export async function wakeServer() {
  try {
    const res = await fetch(`${API}`);

    const data = await res.json();

    return {
      success: res.ok,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function uploadSVG(file: File) {
  try {
    const formData = new FormData();
    formData.append("svg", file);

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // normalize backend response
    return {
      success: data.status === "success",
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Network error",
    };
  }
}

export async function getTestPath(
  filename: string,
  startRoomId?: string,
  endRoomId?: string,
) {
  const res = await fetch(`${API}/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename,
      startRoomId,
      endRoomId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch path");
  }

  return await res.json();
}
