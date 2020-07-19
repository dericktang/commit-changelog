#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const projectDir = process.cwd();
const spawn =require("cross-spawn");
const childProcess = require("child_process");

let argv = process.argv;
let rawGitArgs = argv.slice(2, argv.length);
let commond = null; let whatNpm ="npm"

if(rawGitArgs.length>1){
    whatNpm = rawGitArgs[1];
}

if (rawGitArgs[0] === "init"){
  console.log(whatNpm+" install commitizen -g");
  spawn.sync(whatNpm,['install','-g','commitizen'],{stdio:'inherit'})
  console.log(whatNpm+" install yorkie --save-dev");
  spawn.sync(whatNpm,['install','yorkie','--save-dev'],{stdio:'inherit'})
  console.log(whatNpm+" install conventional-changelog-cli --save-dev");
  spawn.sync(whatNpm,['install','conventional-changelog-cli','--save-dev'],{stdio:'inherit'})
  console.log(whatNpm+" install cz-conventional-changelog --save-dev");
  spawn.sync(whatNpm,['install','cz-conventional-changelog','--save-dev'],{stdio:'inherit'})
  console.log(whatNpm+" install verify-commit --save-dev");
  spawn.sync(whatNpm,['install','verify-commit','--save-dev'],{stdio:'inherit'})

  const packageJsonPath = projectDir + "/package.json";
  const pkgInfo = require(packageJsonPath);
  if (!pkgInfo.gitHooks) {
    pkgInfo.gitHooks = {};
  }
  Object.assign(pkgInfo.gitHooks, {
    "commit-msg": "node ./node_modules/verify-commit/index.js",
  });
  if (!pkgInfo.config) {
    pkgInfo.config = {};
  }
  Object.assign(pkgInfo.config, {
    commitizen: {
      path: "./node_modules/cz-conventional-changelog",
    },
  });
  if (!pkgInfo.scripts) {
    pkgInfo.scripts = {};
  }
  Object.assign(pkgInfo.scripts, {
    changelog: "conventional-changelog -p angular -i CHANGELOG.md -s",
  });
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkgInfo, null, 4) + "\n");
  console.info(`${chalk.bgRed.white(" 完成初始化 ")}`);
  return ;
}

console.error(`${chalk.red("invalid commond \r\n use commitChangeLog init or  commitChangeLog init npm/tnpm/cnpm")}`);
