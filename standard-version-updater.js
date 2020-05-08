module.exports.readVersion = function (contents) {
  return JSON.parse(contents).tracker.package.version;
}

module.exports.writeVersion = function (contents, version) {
  return contents.replace(/version="\d+\.\d+\.\d+"/gm, `version="${version}"`)
}
