"use client";

import { useEffect, useState } from "react";
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
} from "lucide-react";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title?: string | undefined;
  isDark: boolean;
}

export function PDFViewerModal({
  isOpen,
  onClose,
  fileUrl,
  title,
  isDark,
}: PDFViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useGoogleViewer, setUseGoogleViewer] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setUseGoogleViewer(false);
      setScale(1.0);
      setRotation(0);
    }
  }, [isOpen, fileUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    if (!useGoogleViewer) {
      // Try Google Docs Viewer as fallback
      setUseGoogleViewer(true);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setUseGoogleViewer(false);
  };

  const changeScale = (newScale: number) => {
    setScale(Math.min(Math.max(0.5, newScale), 3.0));
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const getViewerUrl = () => {
    // Check if it's a Google Drive URL
    if (fileUrl.includes("drive.google.com")) {
      // Convert Google Drive sharing URL to direct PDF URL
      const fileId = fileUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      // Fallback to Google Docs viewer
      return `https://docs.google.com/viewer?url=${encodeURIComponent(
        fileUrl
      )}&embedded=true`;
    }

    if (useGoogleViewer) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(
        fileUrl
      )}&embedded=true`;
    }
    return `${fileUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;
  };

  const getLocalDownloadUrl = () => {
    // Map Google Drive URLs to local certificate files
    const driveToLocalMap: Record<string, string> = {
      "1UrbrvQGX8VEr-dswaB4YTRd4RUztkeU5": "/certificates/graduated certificate.pdf",
      "1QqHQEd1vrxRHbxoNqKjxi-axLp91iRdE": "/certificates/ITI certificate.pdf",
      "1-Sr1lCm1S1V8vStFuLR_nCRp_vwSBiek": "/certificates/Device Configuration and Management.pdf",
      "1wXcZ48s_YKEjnIfZoIY9LbVmyi6P202P": "/certificates/Course_Certificate_MG_En.pdf",
      "1XGRNWHD01SOqPKOlLyl0tZNhsF7x6zy8": "/certificates/Course_Certificate_RJS_En.pdf",
      "1N1TDVW2BlO7SZlMpbQu-YWu66Ywkg8hy": "/certificates/Course_Certificate_ES6_En.pdf",
      "1KAdHM5_SeHQWO6QVJMu0w1RABqHKWSZj": "/certificates/_Course_Certificate_TS_En.pdf",
      "1yeDgxJqHGLI6NZdnvA_45_bU-N9jY39J": "/certificates/Course_Certificate_Js_En.pdf",
      "1ecUxbusAr3L7PwznjvnPOn1E91h3G_QX": "/certificates/Course_Certificate_En.pdf",
    };

    // Check if it's a Google Drive URL and get the file ID
    if (fileUrl.includes("drive.google.com")) {
      const fileId = fileUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId && driveToLocalMap[fileId]) {
        return driveToLocalMap[fileId];
      }
    }

    // If it's already a local URL, return as is
    if (fileUrl.startsWith("/certificates/")) {
      return fileUrl;
    }

    // Fallback to original URL
    return fileUrl;
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] ${
        isDark ? "bg-black/80" : "bg-slate-900/70"
      } backdrop-blur-sm flex items-center justify-center p-4`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full max-w-7xl max-h-[95vh] rounded-2xl overflow-hidden shadow-2xl ${
          isDark ? "bg-slate-900" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b ${
            isDark
              ? "border-slate-700 text-slate-200"
              : "border-slate-200 text-slate-800"
          }`}
        >
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold truncate">
              {title || "Document"}
            </h3>
            <p
              className={`text-xs ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {fileUrl.includes("drive.google.com")
                ? "Google Drive Viewer"
                : useGoogleViewer
                ? "Google Docs Viewer"
                : "PDF Viewer"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => changeScale(scale - 0.1)}
                disabled={scale <= 0.5}
                className={`p-2 rounded-md transition ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-50"
                }`}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span
                className={`text-xs px-2 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => changeScale(scale + 0.1)}
                disabled={scale >= 3.0}
                className={`p-2 rounded-md transition ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-50"
                }`}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            {/* Rotation Control */}
            <button
              onClick={rotate}
              className={`p-2 rounded-md transition ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800"
              }`}
              aria-label="Rotate"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {hasError && (
              <button
                onClick={handleRetry}
                className={`p-2 rounded-md transition ${
                  isDark
                    ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300"
                    : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                }`}
                aria-label="Retry"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md transition ${
                isDark
                  ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300"
                  : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
              }`}
              aria-label="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={getLocalDownloadUrl()}
              download
              className={`p-2 rounded-md transition ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800"
              }`}
              aria-label="Download"
            >
              <Download className="h-4 w-4" />
            </a>

            <button
              onClick={onClose}
              className={`p-2 rounded-md transition ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800"
              }`}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 w-full h-[calc(95vh-80px)] relative overflow-auto">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Loading PDF...
                  {useGoogleViewer && " (using Google Docs Viewer)"}
                </p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">📄</div>
                <p
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {fileUrl.includes("drive.google.com")
                    ? "Google Drive Access Required"
                    : "Unable to display PDF"}
                </p>
                <p
                  className={`text-sm mb-4 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {fileUrl.includes("drive.google.com")
                    ? "This Google Drive file requires authentication. Please open it directly in Google Drive or download it."
                    : "The PDF cannot be displayed in the browser. Please try opening it in a new tab or downloading it."}
                </p>
                <div className="flex gap-2 justify-center">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-md transition ${
                      isDark
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    {fileUrl.includes("drive.google.com")
                      ? "Open in Google Drive"
                      : "Open in New Tab"}
                  </a>
                                     <a
                     href={getLocalDownloadUrl()}
                     download
                     className={`px-4 py-2 rounded-md transition ${
                       isDark
                         ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                         : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                     }`}
                   >
                     Download
                   </a>
                </div>
              </div>
            </div>
          )}

          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <iframe
              src={getViewerUrl()}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={title || "PDF Document"}
              style={{
                opacity: isLoading || hasError ? 0 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
