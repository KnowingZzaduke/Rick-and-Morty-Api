export function status(status) {
  switch (status) {
    case "Alive":
      return "🟢";

    case "Died":
      return "🔴";

    case "unknown":
      return "❓";

    default:
      return "⚫";
  }
}
