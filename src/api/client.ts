const API = import.meta.env.VITE_API_URL
// const API = "https://svg-simulation-server.onrender.com/api/svg";

export async function wakeServer() {
  try {
    const res = await fetch(API);

    const data = await res.json();

    return {
      success: res.ok,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "Unable to connect to server",
    };
  }
}

export async function uploadSVG(file: File) {
  try {
    const formData = new FormData();

    formData.append("svg", file);

    const res = await fetch(
      `${API}/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
          data.error ||
          "SVG upload failed",
      );
    }

    return {
      success:
        data.status === "success" ||
        data.success === true,
      data,
      message: data.message,
    };
  } catch (error: any) {
    throw new Error(
      error.message ||
        "Network error",
    );
  }
}

export async function getTestPath(
  filename: string,
  startRoomId?: string,
  endRoomId?: string,
) {
  try {
    const res = await fetch(
      `${API}/test`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          filename,
          startRoomId,
          endRoomId,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message ||
          data.error ||
          "Failed to generate route",
      );
    }

    return data;
  } catch (error: any) {
    throw new Error(
      error.message ||
        "Failed to connect to navigation service",
    );
  }
}