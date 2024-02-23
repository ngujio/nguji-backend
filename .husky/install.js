if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0)
}

function install() {
  const { exec } = require("child_process")
  exec("npx husky install")
}
install()
