// Definir base.href dinamicamente para funcionar no GitHub Pages e Live Server
const isGithub = location.hostname.includes("github.io");
const projectFolder = isGithub
? "/" + location.pathname.split("/")[1] + "/"
: location.pathname.split("/").slice(0, location.pathname.indexOf("docs") + 1).join("/") + "/";
const base = document.createElement("base");
base.href = projectFolder.endsWith("/") ? projectFolder : projectFolder + "/";
document.head.appendChild(base);