import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface EventMetadata {
  [key: string]: unknown;
}

export function trackEvent(
  eventName: string,
  metadata: EventMetadata = {}
) {
  const visitorId = localStorage.getItem("visitorId");
  const sessionId = sessionStorage.getItem("sessionId");

  if (!visitorId || !sessionId) return;

  fetch(`${API_URL}/analytics/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      visitor_id: visitorId,
      session_id: sessionId,
      event_name: eventName,
      page: window.location.pathname,
      metadata,
    }),
  }).catch(console.error);
}

export default function useAnalytics() {
  const location = useLocation();

  // Register visitor once per browser
  useEffect(() => {
    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitorId", visitorId);
    }

    let sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", sessionId);
    }

    fetch(`${API_URL}/analytics/visitor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitor_id: visitorId,
        session_id: sessionId,
        language: navigator.language,
        platform: navigator.platform,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }).catch(console.error);
  }, []);

  // Track page changes only
  useEffect(() => {
    const visitorId = localStorage.getItem("visitorId");
    const sessionId = sessionStorage.getItem("sessionId");

    if (!visitorId || !sessionId) return;

    fetch(`${API_URL}/analytics/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitor_id: visitorId,
        session_id: sessionId,
        page: location.pathname,
        referrer: document.referrer,
      }),
    }).catch(console.error);
  }, [location.pathname]);
}