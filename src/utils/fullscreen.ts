/**
 * Utility to trigger browser Fullscreen Mode on mobile/desktop browsers
 */
export function toggleFullscreen() {
  const doc = window.document as any;
  const docEl = doc.documentElement as any;

  const requestFS =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullscreen ||
    docEl.msRequestFullscreen;

  const cancelFS =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    if (requestFS) {
      requestFS.call(docEl).catch(() => {});
    }
  } else {
    if (cancelFS) {
      cancelFS.call(doc).catch(() => {});
    }
  }
}

export function isFullscreenActive(): boolean {
  const doc = window.document as any;
  return Boolean(
    doc.fullscreenElement ||
      doc.mozFullScreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement
  );
}
