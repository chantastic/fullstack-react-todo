import * as React from "react";

export default function useAriaAnnounce() {
  let [announcement, setAnnouncement] = React.useState(null);

  React.useEffect(() => {
    let latestAnnouncementCooldown = setTimeout(() => {
      setAnnouncement(null);
    }, 10_000);

    return () => clearTimeout(latestAnnouncementCooldown);
  }, [announcement]);

  function announce(announcement) {
    setAnnouncement(null);
    setTimeout(() => setAnnouncement(announcement), 10);
  }

  let visuallyHidden = {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  };

  function PoliteAnnouncement({ as: As = "div", children, style, ...props }) {
    return (
      <As
        role="status"
        aria-live="polite"
        style={
          typeof style === "function"
            ? style(visuallyHidden)
            : { ...visuallyHidden, ...style }
        }
        {...props}
      >
        {children || announcement}
      </As>
    );
  }

  return [announcement, announce, PoliteAnnouncement];
}
