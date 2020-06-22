#!/bin/sh

set -eu
echo " "
MAX_REPOS="$INPUT_MAX_REPOS"
SAVE_LOCATION="$INPUT_SAVE_LOCATION"
FILE_NAME="$INPUT_FILE_NAME"
GITHUB_USERNAME="$INPUT_GITHUB_USERNAME"
GH_TOKEN="$INPUT_GH_TOKEN"
SAVE_FULL_PATH="$GITHUB_WORKSPACE/$SAVE_LOCATION"

cd $GITHUB_WORKSPACE && ls -lah
echo " "
echo "☑️ Validating Save Location"
if [[ ! -e $SAVE_FULL_PATH ]]; then
  mkdir -p $SAVE_FULL_PATH
fi

echo "##[group] ⬇️ Installing Required Node Dependencies"
cd /github-latest-repo-node-app
npm install
echo "##[endgroup]"

echo " "
echo "🏃 Running Application"
node index.js "$GITHUB_USERNAME" "$MAX_REPOS" "$GH_TOKEN" "$SAVE_FULL_PATH/$FILE_NAME"

cd $GITHUB_WORKSPACE

if [ "$(git status "$SAVE_FULL_PATH/$FILE_NAME" --porcelain)" != "" ]; then
  echo "##[group] 👌 Pushing To Github"
  git config --local user.email "githubactionbot@gmail.com" && git config --local user.name "Github Action Bot"
  git add "$SAVE_FULL_PATH/$FILE_NAME"
  git commit -m "💬 #$GITHUB_RUN_NUMBER - Github Latest Repository JSON Updated/ ⚡ Triggered By $GITHUB_SHA"
  git push "https://x-access-token:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY"
  echo "##[endgroup]"
else
  echo "✅ Nothing To Push"
fi
