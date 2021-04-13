#run `bash backEnd.sh` to test and run the backend server
echo "# TV Tracker Backend Test Results" > testResults.md;
npm test |& tee -a testResults.md; #outputs the result of npm test to stdout and to testResults.md
npx nodemon;