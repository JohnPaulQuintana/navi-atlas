import { useState } from "react";
import {
  FiLayers,
  FiBox,
  FiGitBranch,
  FiCheckCircle,
  FiPlayCircle,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiAlertCircle,
  FiThumbsUp,
  FiThumbsDown,
  FiCode,
} from "react-icons/fi";

import frameMainFloorVideo from "../assets/videos/frame-main-floor.mp4";
import SpaceVideo from "../assets/videos/Space.mp4";
import WalkableVideo from "../assets/videos/walkable.mp4";
import IntersectionVideo from "../assets/videos/Intersection.mp4";
import ExportVideo from "../assets/videos/Export.mp4";
import DemoVideo from "../assets/videos/demo.mp4";

const steps = [
  {
    icon: FiLayers,
    title: "Create the Main Floor Frame",
    bullets: [
      "Create a Frame in Figma representing the entire floor.",
      "This Frame will become the SVG canvas.",
      "Keep all rooms, facilities, nodes, and paths inside this Frame.",
    ],
    important: [
      "Only one main floor Frame should be exported.",
      "Everything must be placed inside this Frame.",
    ],
    hierarchy: `
Main Floor
├─ Spaces
├─ Walkable
└─ Intersection
    `,
    video: frameMainFloorVideo,
    tip: "Name your main frame clearly, such as 'Main Floor' or 'Level 1' for easy identification during export.",
  },
  {
    icon: FiBox,
    title: "Create and Group Spaces",
    bullets: [
      "Use Rectangle elements for rooms, offices, facilities, and navigable spaces.",
      "Add a Text label inside each space.",
      "Group the Rectangle and Text label together.",
      "Use group names such as S1, R1, or another consistent naming convention.",
    ],
    important: ["Room names must be unique.", "Avoid special characters."],
    validExamples: ["Room 1", "Room 2", "Library", "Registrar Office"],
    invalidExamples: ["Room_1", "Room-1", "Room#1"],
    hierarchy: `
S1
├─ Room 1 (Rectangle)
└─ Room 1 (Text)
    `,
    video: SpaceVideo,
    tip: "Keep room names short and descriptive. Users will search by these names during navigation.",
  },
  {
    icon: FiGitBranch,
    title: "Create Walkable Paths",
    bullets: [
      "Create a Walkable group.",
      "Use Line elements as hallway segments.",
      "Leave gaps between hallway segments.",
      "Each line should represent one straight hallway.",
    ],
    important: [
      "Do NOT connect lines directly.",
      "Gaps will be connected using Intersection nodes.",
    ],
    hierarchy: `
Walkable
├─ Line
├─ Line Copy
└─ Line Copy 2
    `,
    video: WalkableVideo,
    tip: "For complex hallways with turns, break them into multiple line segments. The system will connect them automatically.",
  },
  {
    icon: FiGitBranch,
    title: "Create Intersection Nodes",
    bullets: [
      "Create an Intersection group.",
      "Use Circle elements.",
      "Place nodes on turns and junctions.",
      "Some nodes may act as room doors.",
    ],
    important: [
      "Door nodes MUST exactly match the room name.",
      "Room and Door names are case-sensitive.",
      "Incorrect naming will break routing.",
    ],
    validExamples: ["Room 1 ↔ Room 1", "Library ↔ Library"],
    invalidExamples: ["Room 1 ↔ Door 1", "Library ↔ Library Door"],
    hierarchy: `
Intersection
├─ Room 1
├─ N1 | Ellipse | Ellipse 1 
├─ N2 | Ellipse | Ellipse 2
└─ N3 | Ellipse | Ellipse 3
    `,
    video: IntersectionVideo,
    tip: "Place intersection nodes at every point where paths change direction or split. More nodes create more accurate routing.",
  },
  {
    icon: FiCheckCircle,
    title: "Export the SVG Map",
    bullets: [
      "Select the entire Main Floor Frame.",
      "Export as SVG.",
      "Set Image Resampling to Basic.",
      "Uncheck Outline Text.",
      "Check Include ID Attribute.",
    ],
    important: ["Do NOT export PNG.", "Do NOT export individual groups."],
    video: ExportVideo,
    tip: "Always verify your SVG file size before upload. Clean, well-structured SVGs parse faster and more accurately.",
  },
  {
    icon: FiCheckCircle,
    title: "Upload to NaviAtlas",
    bullets: [
      "Upload the exported SVG.",
      "Wait for parsing.",
      "Review the generated routes.",
      "Test navigation.",
    ],
    important: [
      "SVG files are not stored in a database.",
      "Refreshing the page removes the uploaded SVG.",
      "Keep a backup of your exported SVG.",
    ],
    video: DemoVideo,
    tip: "Test navigation between at least 3 different room pairs to verify your structure is correct before final deployment.",
  },
];

export default function ViewGuide() {
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>(
    {},
  );
  // const [activeVideo, setActiveVideo] = useState(null);

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full min-h-screen pt-28 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              SVG <span className="text-green-400">Structure Guide</span>
            </h1>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
              v1.0
            </span>
          </div>

          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Design SVG maps in Figma that NaviAtlas can parse for rooms,
            intersections, walkable paths, and navigation routes.
          </p>
        </div>

        {/* Version Info Card */}
        <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-400">
                  <FiInfo size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-400 mb-2">
                Version 1.0 Features
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Indoor map simulation and SVG-based route generation. The system
                extracts Spaces, Walkable Paths, and Intersection Nodes from
                uploaded SVG files.
              </p>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <span>Automatic extraction of rooms and facilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <span>Indoor route simulation and path visualization</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <span>SVG structure validation and parsing</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <span>Interactive map navigation</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <span>Configurable routing between locations</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                  Planned Improvements
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="px-2 py-1 rounded bg-white/5 text-white/60">
                    Navigation menu generation
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 text-white/60">
                    Search and quick navigation
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 text-white/60">
                    Persistent SVG storage
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 text-white/60">
                    Enhanced parsing APIs
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 text-white/60">
                    Multi-floor support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => {
                const element = document.getElementById(`step-${idx}`);
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
            >
              <div className="font-mono text-green-400 text-[10px] mb-1">
                Step {idx + 1}
              </div>
              <div className="font-medium truncate">{step.title}</div>
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isExpanded = expandedSteps[idx] || false;

            return (
              <div
                key={idx}
                id={`step-${idx}`}
                className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition-all"
              >
                {/* Header - Always visible */}
                <button
                  onClick={() => toggleStep(idx)}
                  className="w-full p-6 text-left flex items-start justify-between group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <span className="text-green-400">
                          <Icon size={20} />
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                          Step {idx + 1}
                        </span>
                        <h2 className="text-xl font-semibold">{step.title}</h2>
                      </div>
                      <p className="text-white/60 text-sm line-clamp-1">
                        {step.bullets[0]}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 text-white/40 group-hover:text-white/60">
                    {isExpanded ? (
                      <FiChevronUp size={20} />
                    ) : (
                      <FiChevronDown size={20} />
                    )}
                  </div>
                </button>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10">
                    {/* Pro Tip Banner */}
                    {step.tip && (
                      <div className="mb-5 p-3 rounded-lg bg-green-500/5 border-l-2 border-green-400">
                        <p className="text-xs text-green-400 font-mono mb-1">
                          PRO TIP
                        </p>
                        <p className="text-sm text-white/80">{step.tip}</p>
                      </div>
                    )}

                    {/* Steps List */}
                    <div className="mb-5">
                      <h3 className="text-sm font-semibold text-white/60 mb-3">
                        Steps
                      </h3>
                      <ul className="space-y-2">
                        {step.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-white/80"
                          >
                            <span className="text-green-400 font-mono text-xs mt-0.5">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Two Column Layout for Examples */}
                    {(step.validExamples || step.invalidExamples) && (
                      <div className="grid md:grid-cols-2 gap-4 mb-5">
                        {step.validExamples && (
                          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-green-400">
                                <FiThumbsUp size={14} />
                              </span>

                              <h3 className="text-sm font-medium text-green-400">
                                Valid Examples
                              </h3>
                            </div>
                            <ul className="space-y-1">
                              {step.validExamples.map((item, i) => (
                                <li
                                  key={i}
                                  className=" text-white/70 font-mono text-xs"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.invalidExamples && (
                          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-red-400">
                                <FiThumbsDown size={14} />
                              </span>

                              <h3 className="text-sm font-medium text-red-400">
                                Invalid Examples
                              </h3>
                            </div>
                            <ul className="space-y-1">
                              {step.invalidExamples.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-white/70 font-mono"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Important Notes */}
                    {step.important && (
                      <div className="mb-5 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-yellow-400">
                            <FiAlertCircle size={14} />
                          </span>

                          <h3 className="text-sm font-medium text-yellow-400">
                            Important Notes
                          </h3>
                        </div>
                        <ul className="space-y-1">
                          {step.important.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-white/70 flex items-start gap-2"
                            >
                              <span className="text-yellow-400">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Hierarchy Structure */}
                    {step.hierarchy && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-400">
                            <FiCode size={14} />
                          </span>
                          <h3 className="text-sm font-medium text-white/60">
                            Recommended Structure
                          </h3>
                        </div>
                        <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-xs text-green-300/80 font-mono leading-relaxed">
                            {step.hierarchy}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Video */}
                    {step.video && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-400">
                            <FiPlayCircle size={14} />
                          </span>
                          <h3 className="text-sm font-medium text-white/60">
                            Video Tutorial
                          </h3>
                        </div>
                        <video
                          className="w-full rounded-lg border border-white/10"
                          controls
                          preload="metadata"
                          poster={step.video.replace(".mp4", "-poster.jpg")}
                        >
                          <source src={step.video} type="video/mp4" />
                        </video>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            SVG Structure Guide v1.0 | Designed for NaviAtlas Platform
          </p>
        </div>
      </div>
    </div>
  );
}
