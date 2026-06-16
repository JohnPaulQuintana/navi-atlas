import CodeExample from "../components/Interactive/components/docs/CodeExample";
import ResponseExample from "../components/Interactive/components/docs/ResponseExample";
import sampleSVG from "../assets/maps/GROUND.svg";
import sample3D from "../assets/maps/r1.PNG";

type Language = "curl" | "javascript" | "python" | "php" | "csharp";

export default function Documentation() {
  const examples: Record<Language, string> = {
    curl: `curl --location 'https://svg-simulation-server.onrender.com/api/svg/upload' \\
--header 'Accept: application/json' \\
--form 'svg=@campus-map.svg'`,

    javascript: `const formData = new FormData();
formData.append("svg", file);

const response = await fetch(
  "https://svg-simulation-server.onrender.com/api/svg/upload",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  }
);

const data = await response.json();`,

    python: `import requests

response = requests.post(
    "https://svg-simulation-server.onrender.com/api/svg/upload",
    headers={
        "Accept": "application/json"
    },
    files={
        "svg": open("campus-map.svg", "rb")
    }
)

print(response.json())`,

    php: `$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://svg-simulation-server.onrender.com/api/svg/upload",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Accept: application/json"
    ],
    CURLOPT_POSTFIELDS => [
        "svg" => new CURLFile("campus-map.svg")
    ]
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;`,

    csharp: `using var client = new HttpClient();

var form = new MultipartFormDataContent();
form.Add(
    new StreamContent(File.OpenRead("campus-map.svg")),
    "svg",
    "campus-map.svg"
);

client.DefaultRequestHeaders.Add(
    "Accept",
    "application/json"
);

var response = await client.PostAsync(
    "https://svg-simulation-server.onrender.com/api/svg/upload",
    form
);

var content = await response.Content.ReadAsStringAsync();`,
  };

  const testExamples: Record<Language, string> = {
    curl: `curl --location 'https://svg-simulation-server.onrender.com/api/svg/test' \\
--header 'Content-Type: application/json' \\
--header 'Accept: application/json' \\
--data '{
  "filename": "fd39dd21eb40f50d-1781645987103.svg"
}'`,

    javascript: `const response = await fetch(
  "https://svg-simulation-server.onrender.com/api/svg/test",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      filename:
        "fd39dd21eb40f50d-1781645987103.svg",
    }),
  }
);

const data = await response.json();`,

    python: `import requests

response = requests.post(
    "https://svg-simulation-server.onrender.com/api/svg/test",
    headers={
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    json={
        "filename":
        "fd39dd21eb40f50d-1781645987103.svg"
    }
)

print(response.json())`,

    php: `$payload = [
    "filename" =>
    "fd39dd21eb40f50d-1781645987103.svg"
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL =>
      "https://svg-simulation-server.onrender.com/api/svg/test",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Accept: application/json"
    ],
    CURLOPT_POSTFIELDS =>
      json_encode($payload)
]);

$response = curl_exec($curl);

curl_close($curl);

echo $response;`,

    csharp: `using var client = new HttpClient();

var payload = new
{
    filename =
    "fd39dd21eb40f50d-1781645987103.svg"
};

var response = await client.PostAsJsonAsync(
    "https://svg-simulation-server.onrender.com/api/svg/test",
    payload
);

var content =
    await response.Content.ReadAsStringAsync();`,
  };

  return (
    <div className="w-full min-h-screen pt-28 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="uppercase text-4xl md:text-6xl font-bold tracking-tight">
            API <span className="text-green-400">Documentation</span>
          </h1>

          <p className="text-lg text-white/70 max-w-3xl mx-auto mt-6">
            Upload SVG maps and generate navigation routes using the NaviAtlas
            API.
          </p>
        </div>

        <section className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">SVG to 3D Conversion</h2>

          <p className="text-white/70 mb-6">
            Upload an SVG floor map and NaviAtlas automatically generates a
            navigable 3D environment.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-400 mb-3">SVG Input</h3>

              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <img src={sampleSVG} alt="SVG Map" className="w-full" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-400 mb-3">
                Generated 3D Map
              </h3>

              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <img src={sample3D} alt="3D Map" className="w-full" />
              </div>
            </div>
          </div>
        </section>
        {/* Base URL */}
        <section className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Base URL</h2>

          <div className="bg-black/40 rounded-lg p-4 font-mono text-green-400">
            https://svg-simulation-server.onrender.com
          </div>
        </section>

        {/* Rate Limits */}
        <section className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4">Endpoint</th>
                  <th className="text-left p-4">Limit</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-4">POST /upload</td>
                  <td className="p-4">10 requests / 15 minutes</td>
                </tr>

                <tr className="border-t border-white/10">
                  <td className="p-4">POST /test</td>
                  <td className="p-4">30 requests / 15 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Upload Endpoint */}
        <section className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
              POST
            </span>

            <h2 className="text-2xl font-bold">/api/svg/upload</h2>
          </div>

          <p className="text-white/70 mb-6">
            Upload an SVG map and receive a filename that can be used for route
            generation.
          </p>

          <h3 className="font-semibold mb-3">Headers</h3>

          <pre className="bg-black/40 rounded-lg p-4 overflow-auto text-sm mb-6">
            {`{
  "Accept": "application/json"
}`}
          </pre>

          <h3 className="font-semibold mb-3">Content Type</h3>

          <div className="bg-black/40 rounded-lg p-4 font-mono mb-6">
            multipart/form-data
          </div>

          <h3 className="font-semibold mb-3">Form Data</h3>

          <div className="overflow-hidden rounded-lg border border-white/10 mb-6">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4">Field</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Required</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-4">svg</td>
                  <td className="p-4">file</td>
                  <td className="p-4">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold mb-3">Example Request</h3>

          <CodeExample examples={examples} />

          <ResponseExample
            title="Success Response"
            status="200 OK"
            variant="success"
          >
            {`{
  "status": "success",
  "filename": "27772c749b42a0ad-1781644971080.svg"
}`}
          </ResponseExample>

          <ResponseExample
            title="Error Response"
            status="400 Bad Request"
            variant="error"
          >
            {`{
  "status": "failed",
  "error": "No file uploaded"
}`}
          </ResponseExample>

          <div className="mt-6 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <p className="text-sm text-white/70">
              Save the returned{" "}
              <span className="text-green-400 font-mono">filename</span>. This
              value is required when generating routes.
            </p>
          </div>
        </section>

        {/* Route Endpoint */}
        <section className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
              POST
            </span>

            <h2 className="text-2xl font-bold text-green-400">/api/svg/test</h2>
          </div>

          <p className="text-white/70 mb-6">
            Parse an uploaded SVG and return all map data required for rendering
            and navigation.
          </p>

          <h3 className="font-semibold mb-3 text-green-400">Headers</h3>

          <pre className="bg-black/40 rounded-lg p-4 overflow-auto text-sm mb-6">
            {`{
  "Content-Type": "application/json",
  "Accept": "application/json"
}`}
          </pre>

          <h3 className="font-semibold mb-3 text-green-400">Initial Map Load</h3>

          <p className="text-white/60 text-sm mb-3">
            Load SVG data and initialize the map.
          </p>

          <pre className="bg-black/40 rounded-lg p-4 overflow-auto text-sm mb-6">
            {`{
  "filename":
  "fd39dd21eb40f50d-1781645987103.svg"
}`}
          </pre>

          <h3 className="font-semibold mb-3 text-green-400">Navigation Request</h3>

          <p className="text-white/60 text-sm mb-3">
            Generate a route after the user selects a destination room.
          </p>

          <pre className="bg-black/40 rounded-lg p-4 overflow-auto text-sm mb-6">
            {`{
  "filename":
  "e921261d0d11b660-1781647155822.svg",
  "startRoomId": "Entrance",
  "endRoomId": "Basketball Court"
}`}
          </pre>

          <h3 className="font-semibold mb-3 text-green-400">Example Request</h3>

          <CodeExample examples={testExamples} />

          <ResponseExample
            title="Success Response"
            status="200 OK"
            variant="success"
          >
            {`{
  "startRoomId": "Entrance",
  "endRoomId": "Basketball Court",
  "success": true,
  "svg": "<svg>...</svg>",
  "roomNodes": {...},
  "walkable": [...],
  "roomAnchors": {...},
  "path": {...}
}`}
          </ResponseExample>

          <h3 className="font-semibold mb-3 mt-8 text-green-400">
            Response Fields
          </h3>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4">Field</th>
                  <th className="text-left p-4">Description</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-4">svg</td>
                  <td className="p-4">Original SVG markup</td>
                </tr>

                <tr className="border-t border-white/10">
                  <td className="p-4">roomNodes</td>
                  <td className="p-4">Detected rooms and coordinates</td>
                </tr>

                <tr className="border-t border-white/10">
                  <td className="p-4">walkable</td>
                  <td className="p-4">Walkable path segments</td>
                </tr>

                <tr className="border-t border-white/10">
                  <td className="p-4">roomAnchors</td>
                  <td className="p-4">Room navigation anchors</td>
                </tr>

                <tr className="border-t border-white/10">
                  <td className="p-4">path</td>
                  <td className="p-4">Generated navigation route</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold mb-4 mt-8 text-green-400">
            Request Flow
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                1
              </div>

              <div>
                <h4 className="font-medium">Upload SVG</h4>
                <p className="text-white/60 text-sm">
                  Upload the SVG file using
                  <span className="font-mono text-green-400">
                    {" "}
                    POST /api/svg/upload
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                2
              </div>

              <div>
                <h4 className="font-medium">Receive Filename</h4>
                <p className="text-white/60 text-sm">
                  Save the filename returned by the upload endpoint.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                3
              </div>

              <div>
                <h4 className="font-medium">Load Map Data</h4>

                <pre className="bg-black/40 rounded-lg p-3 mt-2 text-xs">
                  {`{
  "filename": "map.svg"
}`}
                </pre>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                4
              </div>

              <div>
                <h4 className="font-medium">User Selects Destination</h4>

                <pre className="bg-black/40 rounded-lg p-3 mt-2 text-xs">
                  {`{
  "filename": "map.svg",
  "startRoomId": "Entrance",
  "endRoomId": "Basketball Court"
}`}
                </pre>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                5
              </div>

              <div>
                <h4 className="font-medium">Render Route</h4>
                <p className="text-white/60 text-sm">
                  The API returns the same response structure containing SVG,
                  rooms, paths, anchors, and the calculated route.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
